import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

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
    const subQuery = await supabase.from("subscriptions").select("id").limit(1);
    const progQuery = await supabase.from("user_progress").select("user_id").limit(1);
    const dbLatency = Date.now() - dbStart;

    const totalLatency = Date.now() - startTime;

    const subscriptionsTableExists = !subQuery.error || subQuery.error.code !== "PGRST205";
    const userProgressTableExists = !progQuery.error || progQuery.error.code !== "PGRST205";

    const sqlSchema = `-- Supabase PostgreSQL Adatbázis Táblák a Christmas Reset 2026 projekthez
-- Másold be a Supabase Dashboard > SQL Editor felületre és kattints a 'Run' gombra:

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  email TEXT NOT NULL,
  customer_name TEXT,
  tier TEXT NOT NULL CHECK (tier IN ('standard', 'premium')),
  amount NUMERIC DEFAULT 0,
  currency TEXT DEFAULT 'EUR',
  is_gift BOOLEAN DEFAULT FALSE,
  gift_recipient_email TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON public.subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);

CREATE TABLE IF NOT EXISTS public.user_progress (
  user_id TEXT PRIMARY KEY,
  selected_tier TEXT DEFAULT 'free',
  has_purchased BOOLEAN DEFAULT FALSE,
  completed_days INT[] DEFAULT '{}',
  unlocked_days INT[] DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) engedélyezése biztonságos nyilvános olvasáshoz és íráshoz
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to subscriptions" ON public.subscriptions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select on subscriptions by email" ON public.subscriptions
  FOR SELECT USING (true);

CREATE POLICY "Allow public all on user_progress" ON public.user_progress
  FOR ALL USING (true) WITH CHECK (true);
`;

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
        subscriptionsTable: {
          exists: subscriptionsTableExists,
          status: subscriptionsTableExists ? "Elérhető és kész" : "A tábla még nincs létrehozva (PGRST205)",
          details: subQuery.error ? subQuery.error.message : "Rendben",
        },
        userProgressTable: {
          exists: userProgressTableExists,
          status: userProgressTableExists ? "Elérhető és kész" : "A tábla még nincs létrehozva (PGRST205)",
          details: progQuery.error ? progQuery.error.message : "Rendben",
        },
      },
      sqlSchema,
      summary: subscriptionsTableExists && userProgressTableExists
        ? "Minden adatbázistábla aktív és működik!"
        : "A Supabase kapcsolat működik és válaszol! A PostgreSQL táblák létrehozásához futtasd le a megadott SQL szkriptet a Supabase SQL Editorban.",
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
