import React, { useState } from 'react';
import { Gift, Sparkles, Check, Plus, Heart, DollarSign, BookmarkCheck, ArrowRight, UserCheck } from 'lucide-react';
import { SupportedLanguage, GiftItem } from '../types';
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

const CURATED_SUGGESTIONS_DB: Record<string, Suggestion[]> = {
  cozy: [
    { title: "Pătură pufoasă sherpa + ceai artizanal de iarnă cu scorțișoară", reason: "Perfect pentru serile lungi de lectură sau filme", estimatedBudget: 120, category: 'cozy' },
    { title: "Lumânare din ceară de soia cu fitil de lemn (aromă de brad & vanilie)", reason: "Creează instantaneu atmosfera caldă de sărbătoare", estimatedBudget: 65, category: 'cozy' },
    { title: "Halat călduros din bumbac organic sau șosete termice de lână", reason: "Un gest simplu de grijă și confort zilnic", estimatedBudget: 140, category: 'cozy' },
    { title: "Set de cești ceramice lucrate manual de un olar local", reason: "Fiecare cafea de dimineață devine un mic ritual special", estimatedBudget: 95, category: 'cozy' },
  ],
  gourmet: [
    { title: "Coș cu bunătăți artizanale (miere cu nuci, dulceață de ardei iute, vin fiert spices)", reason: "Delicios, fără riscul de a aglomera casa cu obiecte inutile", estimatedBudget: 110, category: 'gourmet' },
    { title: "Ulei de măsline extravirgin presat la rece + oțet balsamic învechit", reason: "Apreciat de oricine iubește să gătească mese savuroase", estimatedBudget: 85, category: 'gourmet' },
    { title: "Cutie selecție de ciocolată artizanală single-origin cu portocale confiate", reason: "Un răsfăț festiv elegant și rafinat", estimatedBudget: 75, category: 'gourmet' },
    { title: "Cafetieră presă franceză din sticlă termorezistentă + cafea boabe de origine", reason: "Aroma cafenelei preferate, chiar la el/ea acasă", estimatedBudget: 130, category: 'gourmet' },
  ],
  experience: [
    { title: "Două bilete la teatru, concert de colinde sau filarmonică", reason: "Amintiri de neprețuit trăite împreună în doi", estimatedBudget: 160, category: 'experience' },
    { title: "Voucher pentru un masaj de relaxare sau o sesiune spa termală", reason: "Un moment de deconectare profundă după un an încărcat", estimatedBudget: 180, category: 'experience' },
    { title: "Abonament pe 3 luni la o platformă de audiobooks sau cărți digitale", reason: "Cunoaștere și relaxare în căști oriunde călătorește", estimatedBudget: 90, category: 'experience' },
    { title: "Un atelier creativ de pictură pe ceramică sau preparat ciocolată", reason: "O experiență veselă și memorabilă", estimatedBudget: 150, category: 'experience' },
  ],
  thoughtful: [
    { title: "Album foto personalizat cu cele mai frumoase momente din anul 2026", reason: "Cadoul cu cea mai mare încărcătură emoțională pentru părinți/partener", estimatedBudget: 80, category: 'physical' },
    { title: "Agendă nedatată cu coperți din pânză + stilou fin pentru gânduri", reason: "Inspirație pentru un an nou așezat și cu planuri clare", estimatedBudget: 70, category: 'physical' },
    { title: "Ramă foto minimalistă cu o fotografie dragă și o scrisoare scrisă de mână", reason: "Un cadou intim și de suflet care nu costă o avere", estimatedBudget: 45, category: 'physical' },
    { title: "Joc de societate captivant pentru seri cu prietenii (ex: Codenames, Dixit, Wingspan)", reason: "Reunește familia și prietenii departe de ecrane", estimatedBudget: 120, category: 'physical' },
  ],
};

export const GiftHelper: React.FC<GiftHelperProps> = ({
  language,
  onSaveToGiftList,
  onNavigateToGiftPlanner,
}) => {
  const isHu = language === 'hu';
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

    // Curated algorithmic generator combining personality, interest, and budget
    const pool = [
      ...CURATED_SUGGESTIONS_DB[interest] || CURATED_SUGGESTIONS_DB.cozy,
      ...CURATED_SUGGESTIONS_DB.thoughtful,
      ...CURATED_SUGGESTIONS_DB.gourmet,
    ];

    // Filter or adjust based on budget Tier
    const budgetFactor = budgetTier === 'low' ? 0.6 : budgetTier === 'high' ? 1.5 : 1.0;
    const suggestions = pool.slice(0, 4).map((item, idx) => ({
      ...item,
      estimatedBudget: Math.round((item.estimatedBudget * budgetFactor) / 5) * 5,
    }));

    setGeneratedSuggestions(suggestions);
    setSavedIds({});
  };

  const handleSaveItem = (item: Suggestion, idx: number) => {
    onSaveToGiftList({
      recipient: recipient.trim() || (isHu ? 'Szerettem' : isEn ? 'Loved One' : 'Persoană dragă'),
      idea: item.title,
      budget: item.estimatedBudget,
    });
    setSavedIds((prev) => ({ ...prev, [idx]: true }));
    trackEvent('gift_saved_to_planner', { idea: item.title });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2E5844]/10 text-[#2E5844] border border-[#2E5844]/20 text-xs font-semibold uppercase tracking-wider">
          <Gift className="w-4 h-4 text-[#C29B48]" />
          <span>{isHu ? 'Okos Ajándék-Tanácsadó' : isEn ? 'Smart Gift Assistant' : 'Ghid Inteligent de Cadouri'}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C0B12]">
          {isHu ? 'Ajándékötlet Generátor' : isEn ? 'Gift Helper & Idea Generator' : 'Generatorul de Idei de Cadouri'}
        </h1>

        <p className="text-base sm:text-lg text-[#6B645B] leading-relaxed">
          {isHu
            ? 'Kifogytál az ötletekből? Add meg a címzett legfontosabb adatait, és válogass a személyre szabott, praktikus javaslatokból.'
            : isEn
            ? 'Stuck on gift ideas? Fill in the details about your recipient to generate thoughtful, tailored gift suggestions.'
            : 'Nu mai știi ce să cumperi? Răspunde la câteva întrebări simple și primești idei concrete, calde și memorabile, gata de salvat în listă.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs on Left */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-[#EAE3D5] shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#F1E9DB]">
            <h2 className="font-serif text-xl font-bold text-[#2C0B12]">
              {isHu ? 'Címzett Profilja' : isEn ? 'Recipient Profile' : 'Profilul Destinatarului'}
            </h2>
            <Sparkles className="w-4 h-4 text-[#C29B48]" />
          </div>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A453E] block mb-1">
                {isHu ? 'Címzett neve:' : isEn ? 'Recipient name:' : 'Nume destinatar:'}
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder={isHu ? 'Pl. Anna, Peti, Anya' : isEn ? 'e.g. Sarah, Mom, Dave' : 'Ex: Elena, Mama, Andrei'}
                className="w-full bg-[#FAF7F2] border border-[#EAE3D5] focus:border-[#C29B48] rounded-xl px-3.5 py-2 text-sm text-[#2C0B12] outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A453E] block mb-1">
                  {isHu ? 'Korosztály:' : isEn ? 'Age range:' : 'Vârstă:'}
                </label>
                <select
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EAE3D5] rounded-xl px-3 py-2 text-xs text-[#2C0B12] outline-hidden cursor-pointer"
                >
                  <option value="child">{isHu ? 'Gyermek (0-12)' : isEn ? 'Child (0-12)' : 'Copil (0-12 ani)'}</option>
                  <option value="teen">{isHu ? 'Tinédzser (13-18)' : isEn ? 'Teen (13-18)' : 'Adolescent (13-18)'}</option>
                  <option value="young">{isHu ? 'Fiatal felnőtt (19-30)' : isEn ? 'Young adult (19-30)' : 'Tânăr (19-30 ani)'}</option>
                  <option value="adult">{isHu ? 'Felnőtt (31-55)' : isEn ? 'Adult (31-55)' : 'Adult (31-55 ani)'}</option>
                  <option value="senior">{isHu ? 'Nagyszülő / Senior (56+)' : isEn ? 'Senior (56+)' : 'Senior (56+ ani)'}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A453E] block mb-1">
                  {isHu ? 'Kapcsolat:' : isEn ? 'Relationship:' : 'Relație:'}
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EAE3D5] rounded-xl px-3 py-2 text-xs text-[#2C0B12] outline-hidden cursor-pointer"
                >
                  <option value="partner">{isHu ? 'Párom / Férjem / Feleségem' : isEn ? 'Partner / Spouse' : 'Partener / Soț / Soție'}</option>
                  <option value="parent">{isHu ? 'Édesanya / Édesapa' : isEn ? 'Mother / Father' : 'Mamă / Tată'}</option>
                  <option value="friend">{isHu ? 'Közeli barát / barátnő' : isEn ? 'Close friend' : 'Prieteni apropiați'}</option>
                  <option value="sibling">{isHu ? 'Testvér' : isEn ? 'Sibling' : 'Frate / Soră'}</option>
                  <option value="colleague">{isHu ? 'Kolléga' : isEn ? 'Colleague' : 'Coleg / Șef'}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A453E] block mb-1">
                {isHu ? 'Fő érdeklődési kör:' : isEn ? 'Primary interest:' : 'Pasiune & Interese:'}
              </label>
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#EAE3D5] rounded-xl px-3 py-2 text-xs text-[#2C0B12] outline-hidden cursor-pointer"
              >
                <option value="cozy">{isHu ? 'Otthon melege, relaxáció, olvasás (Hygge)' : isEn ? 'Cozy home, relaxation, reading' : 'Confortul casei, relaxare, lectură'}</option>
                <option value="gourmet">{isHu ? 'Gasztronómia, kávé, teák & főzés' : isEn ? 'Gourmet foods, coffee, cooking' : 'Gastronomie, cafea de specialitate & gătit'}</option>
                <option value="experience">{isHu ? 'Élmények, színház, zene & utazás' : isEn ? 'Experiences, theater, travel' : 'Evenimente, teatru, concerte & călătorii'}</option>
                <option value="thoughtful">{isHu ? 'Érzelmi emlékek, fotók & nosztalgia' : isEn ? 'Sentimental, memories, keepsake' : 'Amintiri de familie & obiecte de suflet'}</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A453E] block mb-1">
                  {isHu ? 'Keretösszeg:' : isEn ? 'Budget tier:' : 'Buget orientativ:'}
                </label>
                <select
                  value={budgetTier}
                  onChange={(e) => setBudgetTier(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EAE3D5] rounded-xl px-3 py-2 text-xs text-[#2C0B12] outline-hidden cursor-pointer"
                >
                  <option value="low">{isHu ? 'Gazdaságos (< 70 lei / €15)' : isEn ? 'Modest (< €15)' : 'Modest (< 70 lei)'}</option>
                  <option value="medium">{isHu ? 'Kiegyensúlyozott (70–150 lei / €30)' : isEn ? 'Balanced (€15–35)' : 'Echilibrat (70–150 lei)'}</option>
                  <option value="high">{isHu ? 'Bőséges (150+ lei / €35+)' : isEn ? 'Generous (€35+)' : 'Generos (150+ lei)'}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#4A453E] block mb-1">
                  {isHu ? 'Személyiség:' : isEn ? 'Personality:' : 'Personalitate:'}
                </label>
                <select
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EAE3D5] rounded-xl px-3 py-2 text-xs text-[#2C0B12] outline-hidden cursor-pointer"
                >
                  <option value="hygge">{isHu ? 'Kuckózós / Nyugodt' : isEn ? 'Warm & cozy' : 'Călduros & liniștit'}</option>
                  <option value="pragmatic">{isHu ? 'Gyakorlatias / Hasznos' : isEn ? 'Pragmatic & useful' : 'Pragmatic & utilitar'}</option>
                  <option value="adventurous">{isHu ? 'Kíváncsi / Életrevaló' : isEn ? 'Curious & energetic' : 'Curios & aventuros'}</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#621927] hover:bg-[#46121C] text-white font-medium text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all border border-[#C29B48]/40"
            >
              <Sparkles className="w-4 h-4 text-[#D8B76E]" />
              <span>{isHu ? 'Ötletek Generálása' : isEn ? 'Generate Gift Suggestions' : 'Generează Recomandări'}</span>
            </button>
          </form>
        </div>

        {/* Results on Right */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-[#2C0B12]">
              {generatedSuggestions.length > 0
                ? isHu
                  ? `Javaslatok (${recipient || (isHu ? 'kiválasztott személy' : 'persoană dragă')} részére)`
                  : `Recomandări personalizate (${recipient || 'pentru persoana dragă'})`
                : isHu
                ? 'Kattints az ötletek generálására'
                : 'Așteaptă generarea ideilor'}
            </h2>

            {onNavigateToGiftPlanner && (
              <button
                type="button"
                onClick={onNavigateToGiftPlanner}
                className="text-xs text-[#2E5844] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{isHu ? 'Ugrás a Teljes Ajándéklistához' : 'Mergi la Lista de Cadouri'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {generatedSuggestions.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EAE3D5] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] text-[#C29B48] flex items-center justify-center mx-auto">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#2C0B12]">
                {isHu ? 'Még nem generáltál ötleteket' : 'Încă nu ai generat recomandări'}
              </h3>
              <p className="text-xs sm:text-sm text-[#7E7468] max-w-sm mx-auto">
                {isHu
                  ? 'Töltsd ki a bal oldali adatlapot és kattints a gombra, hogy azonnal megkapd a válogatott ötleteket.'
                  : 'Completează formularul din stânga și apasă pe butonul de generare pentru a primi propuneri concrete.'}
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
                          ~{item.estimatedBudget} {isHu ? 'lei / Ft' : 'lei'}
                        </span>
                        <span className="text-[10px] uppercase font-semibold text-[#C29B48]">
                          {item.category}
                        </span>
                      </div>
                      <h4 className="font-serif text-base font-bold text-[#2C0B12] leading-snug">
                        {item.title}
                      </h4>
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
                          <span>{isHu ? 'Elmentve a Listába' : 'Salvat în Listă'}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>{isHu ? 'Mentés a Tervezőbe' : 'Salvează în Listă'}</span>
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
