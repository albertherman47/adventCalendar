import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { getLocalizedAdventDays } from "./src/data/adventDays";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(express.json());

type ManagedTier = 'free' | 'standard' | 'premium';

function configuredAdminEmails(): Set<string> {
  return new Set((process.env.ADMIN_EMAILS || '').split(',').map((email) => email.trim().toLowerCase()).filter(Boolean));
}

async function getAdminContext(req: express.Request) {
  const authorization = req.header('authorization') || '';
  const accessToken = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  if (!accessToken) return { response: { status: 401, message: 'Jelentkezz be az adminfelület használatához.' } as const };
  const url = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !publishableKey || !serviceRoleKey || configuredAdminEmails().size === 0) {
    return { response: { status: 503, message: 'Az adminfelület szerveroldali beállítása hiányos.' } as const };
  }
  const { createClient } = await import('@supabase/supabase-js');
  const authClient = createClient(url, publishableKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await authClient.auth.getUser(accessToken);
  if (error || !data.user) return { response: { status: 401, message: 'A munkamenet lejárt. Jelentkezz be újra.' } as const };
  const email = data.user.email?.toLowerCase();
  if (!email || !configuredAdminEmails().has(email)) {
    return { response: { status: 403, message: 'Ehhez az oldalhoz nincs admin jogosultságod.' } as const };
  }
  const adminClient = createClient(url, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
  return { user: data.user, adminClient };
}

app.get('/api/admin/users', async (req, res) => {
  try {
    const context = await getAdminContext(req);
    if ('response' in context && context.response) return res.status(context.response.status).json({ message: context.response.message });
    const perPage = 100;
    const users: Array<{ id: string; email?: string; created_at: string }> = [];
    for (let page = 1; page <= 100; page += 1) {
      const { data, error } = await context.adminClient.auth.admin.listUsers({ page, perPage });
      if (error) throw error;
      users.push(...data.users.map(({ id, email, created_at }) => ({ id, email, created_at })));
      if (data.users.length < perPage) break;
    }
    const { data: entitlements, error } = await context.adminClient.from('account_entitlements').select('user_id, tier');
    if (error) throw error;
    const tierByUser = new Map((entitlements || []).map((row: { user_id: string; tier: ManagedTier }) => [row.user_id, row.tier]));
    return res.json({ users: users.map((user) => ({ ...user, tier: tierByUser.get(user.id) || 'free' })) });
  } catch (error) {
    console.error('Admin user list failed:', error);
    return res.status(500).json({ message: 'A felhasználók betöltése nem sikerült.' });
  }
});

app.put('/api/admin/users/:userId/entitlement', async (req, res) => {
  try {
    const context = await getAdminContext(req);
    if ('response' in context && context.response) return res.status(context.response.status).json({ message: context.response.message });
    const { userId } = req.params;
    const { tier } = req.body as { tier?: ManagedTier };
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(userId)) {
      return res.status(400).json({ message: 'Érvénytelen felhasználó-azonosító.' });
    }
    if (!tier || !['free', 'standard', 'premium'].includes(tier)) {
      return res.status(400).json({ message: 'Érvénytelen előfizetési csomag.' });
    }
    const { data: target, error: targetError } = await context.adminClient.auth.admin.getUserById(userId);
    if (targetError || !target.user) return res.status(404).json({ message: 'A felhasználó nem található.' });
    const { error } = await context.adminClient.from('account_entitlements').upsert({ user_id: userId, tier, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
    if (error) throw error;
    return res.json({ success: true, userId, tier });
  } catch (error) {
    console.error('Admin entitlement update failed:', error);
    return res.status(500).json({ message: 'A csomag módosítása nem sikerült.' });
  }
});

// API health endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Check Supabase connection configuration
app.get("/api/supabase/status", (_req, res) => {
  res.json({
    configured: true,
    supabaseUrl: "https://clapfpjmglvlyyoklnpe.supabase.co",
    publishableKeyConfigured: true,
    provider: "Supabase PostgreSQL",
  });
});

// Live Supabase database test endpoint
app.get("/api/supabase/test", async (_req, res) => {
  const startTime = Date.now();
  const url = process.env.SUPABASE_URL || "https://clapfpjmglvlyyoklnpe.supabase.co";
  const key = process.env.SUPABASE_KEY || "sb_publishable_CZDZq1S9h8RSKVM6Vcq1FA_lD-qXjjA";

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key);

    // 1. Check Auth service connectivity
    const authStart = Date.now();
    const { error: authError } = await supabase.auth.getSession();
    const authLatency = Date.now() - authStart;

    // 2. Check Database tables connectivity
    const dbStart = Date.now();
    const entitlementQuery = await supabase.from("account_entitlements").select("user_id").limit(1);
    const progressQuery = await supabase.from("account_progress").select("user_id").limit(1);
    const dbLatency = Date.now() - dbStart;

    const totalLatency = Date.now() - startTime;

    const accountEntitlementsTableExists = !entitlementQuery.error || entitlementQuery.error.code !== "PGRST205";
    const accountProgressTableExists = !progressQuery.error || progressQuery.error.code !== "PGRST205";
    const migrationInstructions = "Apply supabase/migrations/202609280001_secure_accounts_and_progress.sql";

    return res.json({
      success: true,
      connected: true,
      url,
      totalLatencyMs: totalLatency,
      auth: {
        reachable: !authError,
        latencyMs: authLatency,
        message: authError ? authError.message : "Supabase Auth szolgáltatás aktív és elérhető",
      },
      database: {
        reachable: true,
        latencyMs: dbLatency,
        accountEntitlementsTable: {
          exists: accountEntitlementsTableExists,
          status: accountEntitlementsTableExists ? "Elérhető és kész" : "A tábla még nincs létrehozva (PGRST205)",
          details: entitlementQuery.error?.code === "42501"
            ? "A tábla létezik; az anon szerepkör olvasása az RLS miatt tiltott."
            : entitlementQuery.error ? entitlementQuery.error.message : "Rendben",
        },
        accountProgressTable: {
          exists: accountProgressTableExists,
          status: accountProgressTableExists ? "Elérhető és kész" : "A tábla még nincs létrehozva (PGRST205)",
          details: progressQuery.error?.code === "42501"
            ? "A tábla létezik; az anon szerepkör olvasása az RLS miatt tiltott."
            : progressQuery.error ? progressQuery.error.message : "Rendben",
        },
      },
      sqlSchema: migrationInstructions,
      summary: accountEntitlementsTableExists && accountProgressTableExists
        ? "A Supabase fiók- és haladástáblák elérhetők."
        : "A Supabase elérhető, de a fiók- és haladástáblákhoz futtasd le a projekt migrációját.",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return res.status(500).json({
      success: false,
      connected: false,
      error: errorMsg,
      totalLatencyMs: Date.now() - startTime,
    });
  }
});

// Check if Gemini API key is configured
app.get("/api/gemini/status", (_req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const hasKey = Boolean(apiKey && apiKey.trim() !== "" && apiKey !== "MY_GEMINI_API_KEY");
  res.json({ hasKey });
});

// Advent content stays on the server. Guests receive the free sample doors;
// authenticated plans are checked against the account's database entitlement.
app.get("/api/advent-days", async (req, res) => {
  const languageParam = String(req.query.language || 'en').toLowerCase();
  const language = ['hu', 'en', 'de', 'ro', 'pl', 'cz', 'sk'].includes(languageParam) ? languageParam : 'en';
  const authorization = req.header('authorization') || '';
  const accessToken = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  let tier = 'free';

  if (authorization && !accessToken) {
    return res.status(401).json({ message: 'Érvénytelen munkamenet.' });
  }

  if (accessToken) {
    try {
      const supabaseUrl = process.env.SUPABASE_URL || 'https://clapfpjmglvlyyoklnpe.supabase.co';
      const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_KEY || 'sb_publishable_CZDZq1S9h8RSKVM6Vcq1FA_lD-qXjjA';
      const { createClient } = await import('@supabase/supabase-js');
      const accountClient = createClient(supabaseUrl, publishableKey, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: { headers: { Authorization: `Bearer ${accessToken}` } },
      });
      const { data: authData, error: authError } = await accountClient.auth.getUser(accessToken);
      if (authError || !authData.user) return res.status(401).json({ message: 'Jelentkezz be újra.' });

      const { data: entitlement, error: entitlementError } = await accountClient
        .from('account_entitlements')
        .select('tier')
        .eq('user_id', authData.user.id)
        .maybeSingle();
      if (entitlementError) {
        console.error('Unable to verify account plan:', entitlementError.message);
        return res.status(503).json({ message: 'A csomagjogosultság most nem ellenőrizhető.' });
      }
      if (entitlement?.tier === 'standard' || entitlement?.tier === 'premium') tier = entitlement.tier;
    } catch (error) {
      console.error('Advent content access check failed:', error);
      return res.status(503).json({ message: 'A hozzáférés most nem ellenőrizhető.' });
    }
  }

  const localizedDays = getLocalizedAdventDays(language as 'hu' | 'en' | 'de' | 'ro' | 'pl' | 'cz' | 'sk');
  const days = tier === 'free'
    ? localizedDays.map((day) => day.id === 1 || day.id === 4 ? day : ({
      ...day,
      content: { headline: '', description: '', actionSteps: [] },
      ritualTip: undefined,
      reflectionQuestion: undefined,
    }))
    : localizedDays;
  res.setHeader('Cache-Control', 'private, no-store');
  return res.json({ days, tier });
});

function getFallbackCard(recipient?: string, tone?: string, sender?: string, language?: string) {
  const rec = recipient?.trim() || (language === 'hu' ? 'Családunk és Barátaink' : language === 'ro' ? 'Familiei și Prietenilor' : 'Family & Friends');
  const snd = sender?.trim() || (language === 'hu' ? 'Szeretettel' : language === 'ro' ? 'Cu drag' : 'With love');

  if (language === 'hu') {
    return {
      coverTitle: "Békés, Boldog Karácsonyt!",
      coverSubtitle: "Meghitt ünnepi pillanatokat és csendes örömöt kívánunk • 2026",
      greeting: `Drága ${rec}!`,
      insideMessage: "Kívánjuk, hogy a karácsony varázsa töltsön be minden percet otthonotokban. Legyen az ünnep a lelassulásról, az őszinte beszélgetésekről, a meleg teáról és a szívből jövő ölelésekről. Köszönjük, hogy vagytok nekünk, és fényt hoztok a hétköznapokba is.",
      poem: "Csillagfény ragyog a havas fenyőágon,\nCsendes béke suhan át a világon.\nKandalló melege, gyertya lágy fénye,\nLegyen ez az ünnep szíved szép reménye.",
      signOff: `Szívből jövő öleléssel:\n${snd}`,
      suggestedTheme: "classic-burgundy",
      suggestedStamp: "star",
    };
  } else if (language === 'ro') {
    return {
      coverTitle: "Crăciun Fericit și Luminos!",
      coverSubtitle: "Pace, căldură și clipe de neuitat alături de cei dragi • 2026",
      greeting: `Dragă ${rec}!`,
      insideMessage: "Fie ca magia sărbătorilor de iarnă să vă umple căminul de liniște, bucurie și armonie. Vă mulțumim pentru toate amintirile minunate și vă dorim un Crăciun tihnit, plin de zâmbete calde și recunoștință.",
      poem: "Clinchet lin de clopoței,\nStele ninse peste văi,\nÎn cămin căldură vie,\nPace și multă bucurie.",
      signOff: `Cu toată dragostea,\n${snd}`,
      suggestedTheme: "classic-burgundy",
      suggestedStamp: "star",
    };
  } else {
    return {
      coverTitle: "Merry Christmas & Joyous Season",
      coverSubtitle: "Wishing you peaceful moments, warm laughter, and bright light • 2026",
      greeting: `Dearest ${rec},`,
      insideMessage: "May the quiet beauty of this holiday season fill your home with warmth, gratitude, and deep peace. Thank you for bringing so much brightness into our lives throughout the year.",
      poem: "Snow falls gently through the night,\nCandles glow with tender light.\nWarmest thoughts and peace untold,\nTreasured more than gifts of gold.",
      signOff: `With all our love,\n${snd}`,
      suggestedTheme: "classic-burgundy",
      suggestedStamp: "star",
    };
  }
}

// Generate Christmas Card Endpoint
app.post("/api/generate-card", async (req, res) => {
  try {
    const { recipient, tone, customDetails, sender, language = 'hu' } = req.body;

    const authorization = req.header('authorization') || '';
    const accessToken = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
    if (!accessToken) {
      return res.status(401).json({ message: 'Bejelentkezés szükséges.' });
    }

    const supabaseUrl = process.env.SUPABASE_URL || 'https://clapfpjmglvlyyoklnpe.supabase.co';
    const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_KEY || 'sb_publishable_CZDZq1S9h8RSKVM6Vcq1FA_lD-qXjjA';
    const { createClient } = await import('@supabase/supabase-js');
    const accountClient = createClient(supabaseUrl, publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
    });
    const { data: authData, error: authError } = await accountClient.auth.getUser(accessToken);
    if (authError || !authData.user) {
      return res.status(401).json({ message: 'A munkamenet lejárt. Jelentkezz be újra.' });
    }

    const { data: entitlement, error: entitlementError } = await accountClient
      .from('account_entitlements')
      .select('tier')
      .eq('user_id', authData.user.id)
      .maybeSingle();
    if (entitlementError) {
      console.error('Unable to verify account plan:', entitlementError.message);
      return res.status(503).json({ message: 'A csomagjogosultság most nem ellenőrizhető.' });
    }
    if (entitlement?.tier !== 'premium') {
      return res.status(403).json({ message: 'Az AI képeslap készítéshez Premium fiók szükséges.' });
    }

    if ([recipient, tone, customDetails, sender].some((value) => typeof value === 'string' && value.length > 2000)) {
      return res.status(400).json({ message: 'A megadott szöveg túl hosszú.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.trim() === "" || apiKey === "MY_GEMINI_API_KEY") {
      return res.status(200).json({
        success: false,
        noKey: true,
        message: "A Google Gemini API kulcs még nincs beállítva a Settings > Secrets menüben. Alapértelmezett prémium sablon betöltve.",
        card: getFallbackCard(recipient, tone, sender, language),
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const langInstruction =
      language === 'hu' ? 'Hungarian (magyar)' :
      language === 'ro' ? 'Romanian (română)' : 'English';

    const toneDescription =
      tone === 'vidam' ? 'playful, cheerful, heartwarming, and joyful' :
      tone === 'verses' ? 'rich in poetry, rhyming beauty, and lyrical warmth' :
      tone === 'elegans' ? 'sophisticated, noble, eloquent, and timeless' :
      tone === 'nosztalgikus' ? 'nostalgic, fond memories, retro winter atmosphere' :
      'deeply warm, heartfelt, peaceful, personal, and soulful';

    const systemInstruction = `You are an elite, award-winning Christmas greeting card writer and lyricist for the "Christmas Reset 2026" lifestyle brand.
Your task is to craft authentic, deeply touching, and elegant holiday card copy in ${langInstruction}.
Tone: ${toneDescription}.
Never use bureaucratic, generic SaaS, or cold phrases.
Include:
1. An inspiring 2-4 word front cover title.
2. An elegant subtitle or holiday motto.
3. A natural personal greeting (salutation) for the recipient.
4. A deeply moving, personal main message for the inside right spread (2-4 sentences).
5. An evocative, 4-line rhyming Christmas poem or festive verse for the inside left spread.
6. A warm sign-off and signature line.
7. Recommended theme style (one of 'classic-burgundy', 'evergreen-forest', 'starry-midnight', 'winter-silver', 'gingerbread-warm', 'vintage-airmail').
8. Recommended stamp motif (one of 'forest', 'star', 'fireplace', 'reindeer', 'bells', 'gingerbread').`;

    const userPrompt = `Create a custom Christmas card in ${langInstruction}:
- Recipient: "${recipient || (language === 'hu' ? 'Családunk' : 'Loved Ones')}"
- Preferred Tone: "${tone || 'meghitt'}"
- Specific personal memories, traditions or wishes to weave in: "${customDetails || 'Peace, warm evenings by the tree, health and gratitude'}"
- Sender / Signature: "${sender || (language === 'hu' ? 'Szeretettel a család' : 'With love')}"

Return purely a JSON object adhering to the specified schema.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.85,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            coverTitle: {
              type: Type.STRING,
              description: "2-4 word front cover title",
            },
            coverSubtitle: {
              type: Type.STRING,
              description: "Short, elegant tagline or subtitle",
            },
            greeting: {
              type: Type.STRING,
              description: "Salutation inside the card",
            },
            insideMessage: {
              type: Type.STRING,
              description: "Main personal heartfelt message (2-4 sentences)",
            },
            poem: {
              type: Type.STRING,
              description: "4-line rhyming festive poem",
            },
            signOff: {
              type: Type.STRING,
              description: "Sign-off and sender signature",
            },
            suggestedTheme: {
              type: Type.STRING,
              description: "Theme name: classic-burgundy, evergreen-forest, starry-midnight, winter-silver, gingerbread-warm, or vintage-airmail",
            },
            suggestedStamp: {
              type: Type.STRING,
              description: "Stamp motif: forest, star, fireplace, reindeer, bells, or gingerbread",
            },
          },
          required: ["coverTitle", "coverSubtitle", "greeting", "insideMessage", "poem", "signOff", "suggestedTheme", "suggestedStamp"],
        },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({
      success: true,
      card: parsed,
    });
  } catch (error: any) {
    console.error("Gemini card generation error:", error);
    return res.status(200).json({
      success: false,
      error: error.message || "Failed to generate with AI",
      card: getFallbackCard(req.body?.recipient, req.body?.tone, req.body?.sender, req.body?.language),
    });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
