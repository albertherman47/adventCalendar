import React, { useState } from 'react';
import { Gift, Sparkles, Check, Plus, Heart, DollarSign, BookmarkCheck, ArrowRight, UserCheck } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { trackEvent } from '../utils/analytics';

interface GiftHelperProps {
  language: SupportedLanguage;
  onSaveToGiftList: (gift: { recipient: string; idea: string; budget: number }) => void;
  onNavigateToGiftPlanner?: () => void;
}

interface Suggestion {
  title: string;
  reason: string;
  estimatedBudget: number;
  category: 'experience' | 'physical' | 'cozy' | 'gourmet';
}

const SUGGESTIONS_HU: Record<string, Suggestion[]> = {
  cozy: [
    { title: "Puha gyapjútakaró + kézműves téli fűszeres tea", reason: "Tökéletes a hosszú olvasós, kuckózós estékre a kanapén", estimatedBudget: 120, category: 'cozy' },
    { title: "Szójaviasz gyertya fa kanóccal (fenyő & vanília illat)", reason: "Azonnal meghitt ünnepi hangulatot varázsol a szobába", estimatedBudget: 65, category: 'cozy' },
    { title: "Kényelmes biopamut köntös vagy merinó gyapjú zokni", reason: "Egy egyszerű, kedves figyelmesség a mindennapi melegségért", estimatedBudget: 140, category: 'cozy' },
    { title: "Kézműves kerámiabögre helyi fazekastól", reason: "Minden reggeli kávézás egy kis különleges rituálévá válik", estimatedBudget: 95, category: 'cozy' },
  ],
  gourmet: [
    { title: "Kézműves finomságok kosara (dió mézben, forraltbor-fűszer)", reason: "Finom meglepetés anélkül, hogy felesleges tárgyakkal telne a lakás", estimatedBudget: 110, category: 'gourmet' },
    { title: "Prémium hidegen sajtolt olívaolaj + érlelt balzsamecet", reason: "Mindenki imádni fogja, aki szeret ízekkel teli ételeket főzni", estimatedBudget: 85, category: 'gourmet' },
    { title: "Kézműves bean-to-bar csokoládéválogatás kandírozott narancshéjjal", reason: "Elegáns, kifinomult ünnepi kényeztetés", estimatedBudget: 75, category: 'gourmet' },
    { title: "Elegáns francia kávéprés + specialty szemes kávé", reason: "A kedvenc kávézó illata és élménye otthon", estimatedBudget: 130, category: 'gourmet' },
  ],
  experience: [
    { title: "Két színházjegy, adventi koncert vagy filharmónia belépő", reason: "Megfizethetetlen közös emlékek kettesben", estimatedBudget: 160, category: 'experience' },
    { title: "Utalvány relaxáló masszázsra vagy melegvizes termálfürdőbe", reason: "Mély kikapcsolódás egy sűrű év után", estimatedBudget: 180, category: 'experience' },
    { title: "3 hónapos hangoskönyv vagy digitális könyvtár előfizetés", reason: "Inspiráció és pihenés utazás vagy séta közben", estimatedBudget: 90, category: 'experience' },
    { title: "Kreatív kerámiafestő vagy csokoládékészítő workshop", reason: "Vidám, kreatív és emlékezetes élmény", estimatedBudget: 150, category: 'experience' },
  ],
  thoughtful: [
    { title: "Egyedi fotókönyv a 2026-os év legszebb közös pillanataiból", reason: "A legmélyebb érzelmi értékű ajándék a szülőknek vagy párodnak", estimatedBudget: 80, category: 'physical' },
    { title: "Vászonkötésű tervezőnapló + finom toll a gondolatoknak", reason: "Inspiráció egy rendezett, nyugodt új évhez", estimatedBudget: 70, category: 'physical' },
    { title: "Minimalista képkeret kedvenc fotóval és kézzel írt levéllel", reason: "Meghitt, szívből jövő ajándék, ami nem kerül vagyonokba", estimatedBudget: 45, category: 'physical' },
    { title: "Társasjáték baráti és családi estékre (pl. Dixit, Codenames, Fesztáv)", reason: "Összehozza a szeretteket a képernyők helyett", estimatedBudget: 120, category: 'physical' },
  ],
};

const SUGGESTIONS_EN: Record<string, Suggestion[]> = {
  cozy: [
    { title: "Plush wool throw blanket + artisanal spiced winter tea", reason: "Perfect for long, quiet evenings reading by the fire", estimatedBudget: 30, category: 'cozy' },
    { title: "Natural soy wax candle with wood wick (pine & vanilla)", reason: "Instantly brings comforting holiday fragrance into the room", estimatedBudget: 18, category: 'cozy' },
    { title: "Organic cotton bathrobe or thermal merino wool socks", reason: "A simple, tender gesture of daily warmth and comfort", estimatedBudget: 35, category: 'cozy' },
    { title: "Handcrafted ceramic mug from a local artisan potter", reason: "Turns every morning coffee into a mindful holiday ritual", estimatedBudget: 22, category: 'cozy' },
  ],
  gourmet: [
    { title: "Artisan gourmet basket (raw walnut honey, mulled wine spices)", reason: "Delicious treats that bring joy without cluttering the home", estimatedBudget: 28, category: 'gourmet' },
    { title: "Cold-pressed extra virgin olive oil + aged balsamic vinegar", reason: "Deeply appreciated by anyone who loves wholesome home cooking", estimatedBudget: 24, category: 'gourmet' },
    { title: "Single-origin craft dark chocolate with candied orange peel", reason: "An elegant, luxurious festive treat", estimatedBudget: 16, category: 'gourmet' },
    { title: "Glass French press + bag of freshly roasted specialty coffee beans", reason: "Brings the warmth of your favorite café right to their kitchen", estimatedBudget: 32, category: 'gourmet' },
  ],
  experience: [
    { title: "Two tickets to the theater, symphony, or holiday choir concert", reason: "Invaluable shared memories that last a lifetime", estimatedBudget: 45, category: 'experience' },
    { title: "Spa day pass or restorative relaxation massage voucher", reason: "A soothing reset after a demanding year", estimatedBudget: 50, category: 'experience' },
    { title: "3-month audiobook or digital reading subscription", reason: "Inspiration and relaxation for travel, walks, and quiet hours", estimatedBudget: 25, category: 'experience' },
    { title: "Hands-on pottery painting or artisan chocolate masterclass", reason: "A fun, memorable creative experience to savor together", estimatedBudget: 40, category: 'experience' },
  ],
  thoughtful: [
    { title: "Custom hardcover photo book of the highlights of 2026", reason: "The most emotionally meaningful gift for parents or partner", estimatedBudget: 25, category: 'physical' },
    { title: "Clothbound un-dated journal + fine brass pen", reason: "Quiet inspiration for a grounded, intentional new year", estimatedBudget: 20, category: 'physical' },
    { title: "Minimalist oak frame with a cherished photo & handwritten note", reason: "Intimate and soul-warming without costing a fortune", estimatedBudget: 15, category: 'physical' },
    { title: "Acclaimed board game for family nights (e.g. Wingspan, Dixit)", reason: "Brings family and friends together away from digital screens", estimatedBudget: 35, category: 'physical' },
  ],
};

const SUGGESTIONS_DE: Record<string, Suggestion[]> = {
  cozy: [
    { title: "Kuscheldecke aus Wolle + winterliche Gewürzteemischung", reason: "Perfekt für lange, gemütliche Leseabende auf dem Sofa", estimatedBudget: 30, category: 'cozy' },
    { title: "Sojawachskerze mit Holzdocht (Tanne & Vanille)", reason: "Zaubert sofort festliche Wärme in jeden Raum", estimatedBudget: 18, category: 'cozy' },
    { title: "Bademantel aus Bio-Baumwolle oder wärmende Merinosocken", reason: "Ein liebevolles Geschenk für tägliches Wohlbefinden", estimatedBudget: 35, category: 'cozy' },
    { title: "Handgetöpferte Keramiktasse von einem lokalen Kunsthandwerker", reason: "Macht jeden Morgenkaffee zu einem kleinen Festritual", estimatedBudget: 22, category: 'cozy' },
  ],
  gourmet: [
    { title: "Korb mit handgemachten Köstlichkeiten (Walnusshonig, Glühweingewürz)", reason: "Köstlicher Genuss, ohne das Zuhause mit Gegenständen zu überladen", estimatedBudget: 28, category: 'gourmet' },
    { title: "Kaltgepresstes Olivenöl + gereifter Aceto Balsamico", reason: "Eine Freude für alle, die gerne mit Leidenschaft kochen", estimatedBudget: 24, category: 'gourmet' },
    { title: "Edle Bean-to-Bar Schokolade mit kandierten Orangenschalen", reason: "Ein feiner, raffinierter Genuss für Festtage", estimatedBudget: 16, category: 'gourmet' },
    { title: "Glas-French-Press + erlesene Kaffeebohnen", reason: "Der Duft des Lieblingscafés für daheim", estimatedBudget: 32, category: 'gourmet' },
  ],
  experience: [
    { title: "Zwei Theaterkarten oder Eintritt zum festlichen Chorkonzert", reason: "Unbezahlbare gemeinsame Erinnerungen zu zweit", estimatedBudget: 45, category: 'experience' },
    { title: "Gutschein für eine Entspannungsmassage oder Thermalbad", reason: "Tiefes Durchatmen nach einem fordernden Jahr", estimatedBudget: 50, category: 'experience' },
    { title: "3-Monats-Abo für Hörbücher oder E-Books", reason: "Inspiration und Ruhe beim Spazieren und Verweilen", estimatedBudget: 25, category: 'experience' },
    { title: "Kreativ-Workshop (z.B. Keramik bemalen oder Pralinen herstellen)", reason: "Ein fröhliches, unvergessliches Erlebnis", estimatedBudget: 40, category: 'experience' },
  ],
  thoughtful: [
    { title: "Individuelles Fotobuch mit den schönsten Momenten 2026", reason: "Das emotional wertvollste Geschenk für Eltern oder Partner", estimatedBudget: 25, category: 'physical' },
    { title: "Leinen-Notizbuch + edler Stift für Gedanken und Pläne", reason: "Inspiration für ein ruhiges, klares neues Jahr", estimatedBudget: 20, category: 'physical' },
    { title: "Schlichter Bilderrahmen mit Lieblingsfoto & handgeschriebenem Brief", reason: "Von Herzen kommend, ohne die Welt zu kosten", estimatedBudget: 15, category: 'physical' },
    { title: "Hochwertiges Gesellschaftsspiel (z.B. Flügelschlag, Dixit)", reason: "Verbindet Freunde und Familie abseits aller Bildschirme", estimatedBudget: 35, category: 'physical' },
  ],
};

const SUGGESTIONS_RO: Record<string, Suggestion[]> = {
  cozy: [
    { title: "Pătură pufoasă sherpa + ceai artizanal de iarnă cu scorțișoară", reason: "Perfect pentru serile lungi de lectură sau filme", estimatedBudget: 120, category: 'cozy' },
    { title: "Lumânare din ceară de soia cu fitil de lemn (aromă de brad & vanilie)", reason: "Creează instantaneu atmosfera caldă de sărbătoare", estimatedBudget: 65, category: 'cozy' },
    { title: "Halat călduros din bumbac organic sau șosete termice de lână", reason: "Un gest simplu de grijă și confort zilnic", estimatedBudget: 140, category: 'cozy' },
    { title: "Set de cești ceramice lucrate manual de un olar local", reason: "Fiecare cafea de dimineață devine un mic ritual special", estimatedBudget: 95, category: 'cozy' },
  ],
  gourmet: [
    { title: "Coș cu bunătăți artizanale (miere cu nuci, dulceață, vin fiert spices)", reason: "Delicios, fără riscul de a aglomera casa cu obiecte inutile", estimatedBudget: 110, category: 'gourmet' },
    { title: "Ulei de măsline extravirgin presat la rece + oțet balsamic învechit", reason: "Apreciat de oricine iubește să gătească mese savuroase", estimatedBudget: 85, category: 'gourmet' },
    { title: "Cutie selecție de ciocolată artizanală single-origin cu portocale", reason: "Un răsfăț festiv elegant și rafinat", estimatedBudget: 75, category: 'gourmet' },
    { title: "Cafetieră presă franceză din sticlă + cafea boabe de origine", reason: "Aroma cafenelei preferate, chiar la el/ea acasă", estimatedBudget: 130, category: 'gourmet' },
  ],
  experience: [
    { title: "Două bilete la teatru, concert de colinde sau filarmonică", reason: "Amintiri de neprețuit trăite împreună în doi", estimatedBudget: 160, category: 'experience' },
    { title: "Voucher pentru un masaj de relaxare sau o sesiune spa termală", reason: "Un moment de deconectare profundă după un an încărcat", estimatedBudget: 180, category: 'experience' },
    { title: "Abonament pe 3 luni la o platformă de audiobooks sau cărți digitale", reason: "Cunoaștere și relaxare în căști oriunde călătorește", estimatedBudget: 90, category: 'experience' },
    { title: "Un atelier creativ de pictură pe ceramică sau ciocolată", reason: "O experiență veselă și memorabilă", estimatedBudget: 150, category: 'experience' },
  ],
  thoughtful: [
    { title: "Album foto personalizat cu cele mai frumoase momente din anul 2026", reason: "Cadoul cu cea mai mare încărcătură emoțională", estimatedBudget: 80, category: 'physical' },
    { title: "Agendă nedatată cu coperți din pânză + stilou fin pentru gânduri", reason: "Inspirație pentru un an nou așezat și cu planuri clare", estimatedBudget: 70, category: 'physical' },
    { title: "Ramă foto minimalistă cu o fotografie dragă și o scrisoare scrisă de mână", reason: "Un cadou intim și de suflet care nu costă o avere", estimatedBudget: 45, category: 'physical' },
    { title: "Joc de societate captivant pentru seri cu prietenii (ex: Codenames, Dixit)", reason: "Reunește familia și prietenii departe de ecrane", estimatedBudget: 120, category: 'physical' },
  ],
};

function getSuggestionsDatabase(lang: SupportedLanguage): Record<string, Suggestion[]> {
  if (lang === 'hu') return SUGGESTIONS_HU;
  if (lang === 'de') return SUGGESTIONS_DE;
  if (lang === 'ro') return SUGGESTIONS_RO;
  return SUGGESTIONS_EN;
}

export const GiftHelper: React.FC<GiftHelperProps> = ({
  language,
  onSaveToGiftList,
  onNavigateToGiftPlanner,
}) => {
  const isHu = language === 'hu';
  const isDe = language === 'de';
  const isEn = language === 'en';

  const [recipient, setRecipient] = useState('');
  const [ageRange, setAgeRange] = useState('adult');
  const [relationship, setRelationship] = useState('partner');
  const [interest, setInterest] = useState('cozy');
  const [budgetTier, setBudgetTier] = useState('medium');
  const [personality, setPersonality] = useState('hygge');
  const [generatedSuggestions, setGeneratedSuggestions] = useState<Suggestion[]>([]);
  const [savedIds, setSavedIds] = useState<Record<number, boolean>>({});

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('gift_helper_generated', { relationship, interest, budgetTier, personality });

    const db = getSuggestionsDatabase(language);
    const pool = [
      ...(db[interest] || db.cozy),
      ...(db.thoughtful || db.cozy),
      ...(db.gourmet || db.cozy),
    ];

    const budgetFactor = budgetTier === 'low' ? 0.65 : budgetTier === 'high' ? 1.4 : 1.0;
    const suggestions = pool.slice(0, 4).map((item) => ({
      ...item,
      estimatedBudget: Math.round((item.estimatedBudget * budgetFactor) / 5) * 5,
    }));

    setGeneratedSuggestions(suggestions);
    setSavedIds({});
  };

  const handleSaveItem = (item: Suggestion, idx: number) => {
    const defaultRecipient = isHu ? 'Szerettem' : isDe ? 'Lieblingsmensch' : isEn ? 'Loved One' : 'Persoană dragă';
    onSaveToGiftList({
      recipient: recipient.trim() || defaultRecipient,
      idea: item.title,
      budget: item.estimatedBudget,
    });
    setSavedIds((prev) => ({ ...prev, [idx]: true }));
    trackEvent('gift_saved_to_planner', { idea: item.title });
  };

  const currencyLabel = isHu ? 'Ft' : isDe || isEn ? '€' : 'lei';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2E5844]/10 text-[#2E5844] border border-[#2E5844]/20 text-xs font-semibold uppercase tracking-wider">
          <Gift className="w-4 h-4 text-[#C29B48]" />
          <span>{isHu ? 'Okos Ajándék-Tanácsadó' : isDe ? 'Smarter Geschenke-Berater' : isEn ? 'Smart Gift Assistant' : 'Ghid Inteligent de Cadouri'}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C0B12]">
          {isHu ? 'Ajándékötlet Generátor' : isDe ? 'Geschenkideen-Generator' : isEn ? 'Gift Helper & Idea Generator' : 'Generatorul de Idei de Cadouri'}
        </h1>

        <p className="text-base sm:text-lg text-[#6B645B] leading-relaxed">
          {isHu
            ? 'Kifogytál az ötletekből? Add meg a címzett legfontosabb adatait, és válogass a személyre szabott, praktikus javaslatokból.'
            : isDe
            ? 'Fehlen Ihnen noch Ideen? Beantworten Sie ein paar kurze Fragen und erhalten Sie durchdachte, persönliche Empfehlungen.'
            : isEn
            ? 'Stuck on gift ideas? Fill in the details about your recipient to generate thoughtful, tailored gift suggestions.'
            : 'Nu mai știi ce să cumperi? Răspunde la câteva întrebări simple și primești idei concrete, calde și memorabile.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs on Left */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-[#EAE3D5] shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#F1E9DB]">
            <h2 className="font-serif text-xl font-bold text-[#2C0B12]">
              {isHu ? 'Címzett Profilja' : isDe ? 'Empfänger-Profil' : isEn ? 'Recipient Profile' : 'Profilul Destinatarului'}
            </h2>
            <Sparkles className="w-4 h-4 text-[#C29B48]" />
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A453E] block mb-1">
                {isHu ? 'Címzett neve:' : isDe ? 'Name des Empfängers:' : isEn ? 'Recipient name:' : 'Nume destinatar:'}
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder={isHu ? 'Pl. Anna, Peti, Anya' : isDe ? 'z.B. Julia, Papa, Thomas' : isEn ? 'e.g. Sarah, Mom, Dave' : 'Ex: Elena, Mama, Andrei'}
                className="w-full bg-[#FAF7F2] border border-[#EAE3D5] focus:border-[#C29B48] rounded-xl px-3.5 py-2 text-sm text-[#2C0B12] outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A453E] block mb-1">
                  {isHu ? 'Korosztály:' : isDe ? 'Altersgruppe:' : isEn ? 'Age range:' : 'Vârstă:'}
                </label>
                <select
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EAE3D5] rounded-xl px-3 py-2 text-xs text-[#2C0B12] outline-hidden cursor-pointer"
                >
                  <option value="child">{isHu ? 'Gyermek (0-12)' : isDe ? 'Kind (0-12)' : isEn ? 'Child (0-12)' : 'Copil (0-12 ani)'}</option>
                  <option value="teen">{isHu ? 'Tinédzser (13-18)' : isDe ? 'Teenager (13-18)' : isEn ? 'Teen (13-18)' : 'Adolescent (13-18)'}</option>
                  <option value="young">{isHu ? 'Fiatal felnőtt (19-30)' : isDe ? 'Junger Erw. (19-30)' : isEn ? 'Young adult (19-30)' : 'Tânăr (19-30 ani)'}</option>
                  <option value="adult">{isHu ? 'Felnőtt (31-55)' : isDe ? 'Erwachsener (31-55)' : isEn ? 'Adult (31-55)' : 'Adult (31-55 ani)'}</option>
                  <option value="senior">{isHu ? 'Nagyszülő / Senior (56+)' : isDe ? 'Senior (56+)' : isEn ? 'Senior (56+)' : 'Senior (56+ ani)'}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A453E] block mb-1">
                  {isHu ? 'Kapcsolat:' : isDe ? 'Beziehung:' : isEn ? 'Relationship:' : 'Relație:'}
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EAE3D5] rounded-xl px-3 py-2 text-xs text-[#2C0B12] outline-hidden cursor-pointer"
                >
                  <option value="partner">{isHu ? 'Párom / Házastársam' : isDe ? 'Partner / Ehepartner' : isEn ? 'Partner / Spouse' : 'Partener / Soț / Soție'}</option>
                  <option value="parent">{isHu ? 'Édesanya / Édesapa' : isDe ? 'Mutter / Vater' : isEn ? 'Mother / Father' : 'Mamă / Tată'}</option>
                  <option value="friend">{isHu ? 'Közeli barát / barátnő' : isDe ? 'Guter Freund / Freundin' : isEn ? 'Close friend' : 'Prieteni apropiați'}</option>
                  <option value="sibling">{isHu ? 'Testvér' : isDe ? 'Geschwister' : isEn ? 'Sibling' : 'Frate / Soră'}</option>
                  <option value="colleague">{isHu ? 'Kolléga / Ismerős' : isDe ? 'Kollege / Bekannter' : isEn ? 'Colleague / Acquaintance' : 'Coleg / Șef'}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A453E] block mb-1">
                {isHu ? 'Fő érdeklődési kör:' : isDe ? 'Interessen:' : isEn ? 'Primary interest:' : 'Pasiune & Interese:'}
              </label>
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#EAE3D5] rounded-xl px-3 py-2 text-xs text-[#2C0B12] outline-hidden cursor-pointer"
              >
                <option value="cozy">{isHu ? 'Otthon melege, relaxáció, olvasás (Hygge)' : isDe ? 'Gemütlichkeit, Entspannung, Lesen' : isEn ? 'Cozy home, relaxation, reading' : 'Confortul casei, relaxare, lectură'}</option>
                <option value="gourmet">{isHu ? 'Gasztronómia, kávé, teák & főzés' : isDe ? 'Gourmet, Kaffee, Tee & Genuss' : isEn ? 'Gourmet foods, coffee, cooking' : 'Gastronomie, cafea de specialitate & gătit'}</option>
                <option value="experience">{isHu ? 'Élmények, színház, zene & utazás' : isDe ? 'Erlebnisse, Theater, Konzerte' : isEn ? 'Experiences, theater, travel' : 'Evenimente, teatru, concerte & călătorii'}</option>
                <option value="thoughtful">{isHu ? 'Érzelmi emlékek, fotók & nosztalgia' : isDe ? 'Erinnerungen, Fotos & Herzenssachen' : isEn ? 'Sentimental, memories, keepsake' : 'Amintiri de familie & obiecte de suflet'}</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A453E] block mb-1">
                  {isHu ? 'Keretösszeg:' : isDe ? 'Budgetrahmen:' : isEn ? 'Budget tier:' : 'Buget orientativ:'}
                </label>
                <select
                  value={budgetTier}
                  onChange={(e) => setBudgetTier(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EAE3D5] rounded-xl px-3 py-2 text-xs text-[#2C0B12] outline-hidden cursor-pointer"
                >
                  <option value="low">{isHu ? 'Gazdaságos (< €15)' : isDe ? 'Günstig (< 15 €)' : isEn ? 'Modest (< €15)' : 'Modest (< 70 lei)'}</option>
                  <option value="medium">{isHu ? 'Kiegyensúlyozott (€15–35)' : isDe ? 'Ausgewogen (15–35 €)' : isEn ? 'Balanced (€15–35)' : 'Echilibrat (70–150 lei)'}</option>
                  <option value="high">{isHu ? 'Bőséges (€35+)' : isDe ? 'Großzügig (35+ €)' : isEn ? 'Generous (€35+)' : 'Generos (150+ lei)'}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A453E] block mb-1">
                  {isHu ? 'Személyiség:' : isDe ? 'Persönlichkeit:' : isEn ? 'Personality:' : 'Personalitate:'}
                </label>
                <select
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EAE3D5] rounded-xl px-3 py-2 text-xs text-[#2C0B12] outline-hidden cursor-pointer"
                >
                  <option value="hygge">{isHu ? 'Kuckózós / Nyugodt' : isDe ? 'Ruhig & gemütlich' : isEn ? 'Warm & cozy' : 'Călduros & liniștit'}</option>
                  <option value="pragmatic">{isHu ? 'Gyakorlatias / Hasznos' : isDe ? 'Pragmatisch & nützlich' : isEn ? 'Pragmatic & useful' : 'Pragmatic & utilitar'}</option>
                  <option value="adventurous">{isHu ? 'Kíváncsi / Életrevaló' : isDe ? 'Abenteuerlustig & aktiv' : isEn ? 'Curious & energetic' : 'Curios & aventuros'}</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#2E5844] hover:bg-[#1E3B2D] text-white font-serif font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D8B76E]" />
              <span>{isHu ? 'Személyre Szabott Ötletek Generálása' : isDe ? 'Passende Ideen generieren' : isEn ? 'Generate Tailored Ideas' : 'Generează Idei Personalizate'}</span>
            </button>
          </form>
        </div>

        {/* Generated Suggestions on Right */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h2 className="font-serif text-xl font-bold text-[#2C0B12]">
              {generatedSuggestions.length > 0
                ? isHu
                  ? `Javaslatok (${recipient || 'szeretted'} részére)`
                  : isDe
                  ? `Vorschläge (${recipient || 'für Ihren Herzensmenschen'})`
                  : isEn
                  ? `Suggestions for ${recipient || 'Loved One'}`
                  : `Recomandări personalizate (${recipient || 'pentru persoana dragă'})`
                : isHu
                ? 'Kattints az ötletek generálására'
                : isDe
                ? 'Warten auf Ideengenerierung'
                : isEn
                ? 'Click generate to see recommendations'
                : 'Așteaptă generarea ideilor'}
            </h2>

            {onNavigateToGiftPlanner && (
              <button
                type="button"
                onClick={onNavigateToGiftPlanner}
                className="text-xs text-[#2E5844] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{isHu ? 'Ugrás az Ajándéklistához' : isDe ? 'Zur Geschenkeliste' : isEn ? 'Go to Gift Planner' : 'Mergi la Lista de Cadouri'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {generatedSuggestions.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EAE3D5] text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] text-[#C29B48] flex items-center justify-center mx-auto">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#2C0B12]">
                {isHu ? 'Még nem generáltál ötleteket' : isDe ? 'Noch keine Ideen generiert' : isEn ? 'No gift ideas generated yet' : 'Încă nu ai generat recomandări'}
              </h3>
              <p className="text-xs sm:text-sm text-[#7E7468] max-w-sm mx-auto">
                {isHu
                  ? 'Töltsd ki a bal oldali adatlapot és kattints a zöld gombra a válogatott javaslatokért.'
                  : isDe
                  ? 'Füllen Sie das Formular links aus und klicken Sie auf den Button, um Vorschläge zu erhalten.'
                  : isEn
                  ? 'Fill out the form on the left and click the button to reveal curated suggestions.'
                  : 'Completează formularul din stânga și apasă pe butonul de generare pentru propuneri concrete.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {generatedSuggestions.map((item, idx) => {
                const isSaved = !!savedIds[idx];
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-[#EAE3D5] hover:border-[#C29B48] transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 max-w-md">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#7E7468] border border-[#EAE3D5]">
                          ~{item.estimatedBudget} {currencyLabel}
                        </span>
                        <span className="text-[10px] uppercase font-semibold text-[#C29B48]">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="font-serif text-base font-bold text-[#2C0B12] leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#7E7468] leading-relaxed">
                        {item.reason}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSaveItem(item, idx)}
                      disabled={isSaved}
                      className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isSaved
                          ? 'bg-[#E6EFEA] text-[#2E5844] border border-[#2E5844]/30'
                          : 'bg-[#621927] hover:bg-[#46121C] text-white border border-[#C29B48]/40 shadow-xs'
                      }`}
                    >
                      {isSaved ? (
                        <>
                          <BookmarkCheck className="w-4 h-4" />
                          <span>{isHu ? 'Elmentve a Listába' : isDe ? 'Gespeichert' : isEn ? 'Saved to Planner' : 'Salvat în Listă'}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>{isHu ? 'Mentés a Tervezőbe' : isDe ? 'Zur Liste hinzufügen' : isEn ? 'Save to Planner' : 'Salvează în Listă'}</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
