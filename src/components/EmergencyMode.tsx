import React, { useState } from 'react';
import { Clock, AlertTriangle, CheckCircle2, Circle, Sparkles, Printer, ArrowRight, ShieldCheck, Calendar, Gift, ShoppingBag, Utensils, Heart } from 'lucide-react';
import { SupportedLanguage, EmergencyTimeframe, UserProgress } from '../types';
import { trackEvent } from '../utils/analytics';

interface EmergencyModeProps {
  language: SupportedLanguage;
  userProgress: UserProgress;
  onToggleTask: (taskId: string) => void;
  onOpenDayModal?: (dayId: number) => void;
  onNavigateToCalendar?: () => void;
}

interface TimeframePlan {
  id: EmergencyTimeframe;
  label: { ro: string; hu: string; en: string };
  badge: { ro: string; hu: string; en: string };
  description: { ro: string; hu: string; en: string };
  tasks: {
    id: string;
    text: { ro: string; hu: string; en: string };
    category: { ro: string; hu: string; en: string };
    dayShortcut?: number;
    urgent?: boolean;
  }[];
}

const EMERGENCY_PLANS: TimeframePlan[] = [
  {
    id: '30-days',
    label: { ro: '30 de zile rămase', hu: '30 nap van hátra', en: '30 days left' },
    badge: { ro: 'Timp din belșug', hu: 'Kényelmes felkészülés', en: 'Plenty of time' },
    description: {
      ro: 'Ești la începutul pregătirilor. Pune bazele financiare și logistice fără niciun fel de grabă.',
      hu: 'Az adventi időszak elején jársz. Alapozd meg a költségvetést és a logisztikát kapkodás nélkül.',
      en: 'You are early in the season. Establish financial and logistical clarity with no rush.',
    },
    tasks: [
      {
        id: 'em-30-1',
        text: { ro: 'Stabilește Bugetul Total de Crăciun și plafonul pentru fiecare categorie', hu: 'Rögzítsd a teljes karácsonyi keretösszeget és a kategóriák határait', en: 'Set total Christmas budget and category caps' },
        category: { ro: 'Finanțe', hu: 'Pénzügy', en: 'Budget' },
        dayShortcut: 1,
      },
      {
        id: 'em-30-2',
        text: { ro: 'Începe Lista de Cadouri: notează toți destinatarii și o idee orientativă', hu: 'Kezdd el az ajándéklistát: írd fel az összes szeretted nevét és ötleteidet', en: 'Start gift list with all recipients and tentative ideas' },
        category: { ro: 'Cadouri', hu: 'Ajándékok', en: 'Gifts' },
        dayShortcut: 2,
      },
      {
        id: 'em-30-3',
        text: { ro: 'Notează în calendar petrecerile, serbările școlare și zilele libere', hu: 'Írd be a naptárba a céges vacsorákat, iskolai műsorokat és a szabadnapokat', en: 'Add office parties, school events and days off to calendar' },
        category: { ro: 'Calendar', hu: 'Naptár', en: 'Calendar' },
        dayShortcut: 3,
      },
      {
        id: 'em-30-4',
        text: { ro: 'Fă o sesiune rapidă de 20 minute de aerisire și ordine la intrare și living', hu: 'Tarts egy gyors 20 perces rendrakást az előszobában és a nappaliban', en: 'Do a 20-minute declutter of entrance and living area' },
        category: { ro: 'Casă', hu: 'Otthon', en: 'Home' },
        dayShortcut: 4,
      },
      {
        id: 'em-30-5',
        text: { ro: 'Verifică decorațiunile din anii trecuți și beculețele înainte de instalare', hu: 'Nézd át a tavalyi díszeket és teszteld az égősorokat', en: 'Check last year decorations and test fairy lights' },
        category: { ro: 'Decor', hu: 'Dekoráció', en: 'Decor' },
      },
    ],
  },
  {
    id: '14-days',
    label: { ro: '14 zile rămase', hu: '14 nap van hátra', en: '14 days left' },
    badge: { ro: 'Fază activă', hu: 'Aktív szakasz', en: 'Active phase' },
    description: {
      ro: 'Două săptămâni până la Crăciun: e momentul să comanzi cadourile online și să schițezi meniul.',
      hu: 'Két hét karácsonyig: most kell megrendelni az online ajándékokat és körvonalazni a menüt.',
      en: 'Two weeks to Christmas: time to order online gifts and sketch your dinner menu.',
    },
    tasks: [
      {
        id: 'em-14-1',
        text: { ro: 'Finalizează comenzile online de cadouri pentru a evita întârzierile de curierat', hu: 'Rendeld meg az összes online ajándékot a futárok késésének elkerülésére', en: 'Complete all online gift orders to prevent delivery delays' },
        category: { ro: 'Cadouri', hu: 'Ajándékok', en: 'Gifts' },
        dayShortcut: 2,
        urgent: true,
      },
      {
        id: 'em-14-2',
        text: { ro: 'Stabilește meniul de Crăciun (aperitive, fel principal, prăjituri)', hu: 'Véglegesítsd az ünnepi menüt (előételek, főétel, sütemények)', en: 'Finalize holiday menu (appetizers, main, desserts)' },
        category: { ro: 'Meniu', hu: 'Menü', en: 'Menu' },
        dayShortcut: 8,
      },
      {
        id: 'em-14-3',
        text: { ro: 'Pregătește lista de cumpărături pe categorii (alimente neperisabile vs. proaspete)', hu: 'Készítsd el a bevásárlólistát (tartós élelmiszerek vs. friss alapanyagok)', en: 'Create categorized shopping list (pantry vs. fresh items)' },
        category: { ro: 'Cumpărături', hu: 'Bevásárlás', en: 'Grocery' },
        dayShortcut: 9,
      },
      {
        id: 'em-14-4',
        text: { ro: 'Scrie și expediază felicitările de Crăciun pentru cei aflați departe', hu: 'Írd meg és add fel a képeslapokat a távol élő rokonoknak', en: 'Write and mail greeting cards to distant loved ones' },
        category: { ro: 'Papetărie', hu: 'Képeslapok', en: 'Cards' },
        dayShortcut: 11,
      },
      {
        id: 'em-14-5',
        text: { ro: 'Cumpără din timp băuturile, conservele și făina/zahărul pentru copt', hu: 'Vedd meg előre az italokat, konzerveket, lisztet és sütési kellékeket', en: 'Buy drinks, pantry items, flour and sugar ahead of crowds' },
        category: { ro: 'Cămară', hu: 'Spájz', en: 'Pantry' },
      },
    ],
  },
  {
    id: '7-days',
    label: { ro: '7 zile rămase', hu: '7 nap van hátra', en: '7 days left' },
    badge: { ro: 'Săptămâna decisivă', hu: 'A döntő hét', en: 'Crucial week' },
    description: {
      ro: 'O săptămână până la Ajun. Concentrează-te doar pe ce contează cu adevărat și elimină sarcinile inutile.',
      hu: 'Egy hét szentestéig. Fókuszálj csak a lényegre, és engedd el a felesleges teendőket.',
      en: 'One week to Christmas Eve. Prioritize essentials only and drop unnecessary perfectionism.',
    },
    tasks: [
      {
        id: 'em-7-1',
        text: { ro: '1. Verifică și bifează lista de cadouri — cumpără restul fizic din magazine', hu: '1. Ellenőrizd az ajándéklistát — vedd meg a hiányzókat személyesen a boltokban', en: '1. Review gift list — purchase remaining items in local stores' },
        category: { ro: 'Cadouri', hu: 'Ajándékok', en: 'Gifts' },
        dayShortcut: 2,
        urgent: true,
      },
      {
        id: 'em-7-2',
        text: { ro: '2. Cumpără sau pregătește hârtia de împachetat, scotch-ul și etichetele', hu: '2. Szerezd be a csomagolópapírt, ragasztószalagot és ajándékkísérőket', en: '2. Gather wrapping paper, tape, scissors and gift tags' },
        category: { ro: 'Împachetare', hu: 'Csomagolás', en: 'Wrapping' },
      },
      {
        id: 'em-7-3',
        text: { ro: '3. Finalizează meniul festiv și verifică numărul exact de porții și oaspeți', hu: '3. Véglegesítsd az ünnepi menüt és ellenőrizd az adagokat és vendéglétszámot', en: '3. Finalize festive menu, serving counts and guest list' },
        category: { ro: 'Meniu', hu: 'Menü', en: 'Menu' },
        dayShortcut: 8,
      },
      {
        id: 'em-7-4',
        text: { ro: '4. Creează lista de cumpărături pentru alimentele proaspete', hu: '4. Állítsd össze a friss áruk (hús, zöldség, tejtermék) listáját', en: '4. Create final grocery list for fresh produce & perishables' },
        category: { ro: 'Cumpărături', hu: 'Bevásárlás', en: 'Grocery' },
        dayShortcut: 9,
      },
      {
        id: 'em-7-5',
        text: { ro: '5. Verifică bradul, suportul și instalația de luminițe', hu: '5. Ellenőrizd a karácsonyfát, a talpat és a fényfüzéreket', en: '5. Check tree, stand, and fairy lights' },
        category: { ro: 'Decor', hu: 'Dekoráció', en: 'Decor' },
      },
      {
        id: 'em-7-6',
        text: { ro: '6. Împachetează primele cadouri gata pentru a nu lăsa totul în noaptea de 23', hu: '6. Csomagold be a már meglevő ajándékokat, ne hagyd december 23-ra', en: '6. Wrap gifts you already have; avoid leaving everything for Dec 23' },
        category: { ro: 'Împachetare', hu: 'Csomagolás', en: 'Wrapping' },
      },
      {
        id: 'em-7-7',
        text: { ro: '7. Stabilește planul serii de Ajun: ora cinei, colindele și ținutele', hu: '7. Tervezd meg a szenteste menetét: vacsoraidő, zene és ünnepi ruhák', en: '7. Plan Christmas Eve: dinner time, music and holiday outfits' },
        category: { ro: 'Ajun', hu: 'Szenteste', en: 'Eve' },
        dayShortcut: 24,
      },
    ],
  },
  {
    id: '3-days',
    label: { ro: '3 zile rămase', hu: '3 nap van hátra', en: '3 days left' },
    badge: { ro: 'Sprint final', hu: 'Finis', en: 'Final sprint' },
    description: {
      ro: 'Suntem la 72 de ore de sărbătoare. Respiră adânc. Urmează doar acești pași clari.',
      hu: 'Mindössze 72 óra választ el az ünneptől. Vegyél egy mély levegőt, és haladj ezekkel a lépésekkel.',
      en: '72 hours to go. Take a deep breath. Focus solely on these clear, high-impact tasks.',
    },
    tasks: [
      {
        id: 'em-3-1',
        text: { ro: 'Fă marea aprovizionare cu alimente proaspete (dimineața devreme pentru a evita aglomerația)', hu: 'Intézd el a friss élelmiszerek nagybevásárlását (kora reggel a tömeg elkerülésére)', en: 'Do fresh grocery shopping (early morning to beat supermarket crowds)' },
        category: { ro: 'Cumpărături', hu: 'Bevásárlás', en: 'Groceries' },
        urgent: true,
      },
      {
        id: 'em-3-2',
        text: { ro: 'Împachetează toate cadourile rămase și atașează etichetele cu nume', hu: 'Csomagold be az összes még hiányzó ajándékot és írd rá a neveket', en: 'Wrap all remaining gifts and attach name tags' },
        category: { ro: 'Cadouri', hu: 'Ajándékok', en: 'Gifts' },
        urgent: true,
      },
      {
        id: 'em-3-3',
        text: { ro: 'Pregătește în avans ce se poate găti devreme (aluaturi, creme, fripturi marinate)', hu: 'Készítsd el előre, ami eláll (tészták, krémek, pácolt húsok)', en: 'Prep foods that store well (doughs, fillings, marinated meats)' },
        category: { ro: 'Bucătărie', hu: 'Konyha', en: 'Kitchen' },
        dayShortcut: 22,
      },
      {
        id: 'em-3-4',
        text: { ro: 'Verifică fețele de masă festive, șervețelele și vesela', hu: 'Nézd át az ünnepi terítőt, szalvétákat és tányérokat', en: 'Check holiday tablecloth, napkins and dinnerware' },
        category: { ro: 'Masa', hu: 'Terítés', en: 'Table' },
      },
      {
        id: 'em-3-5',
        text: { ro: 'Treci prin checklistul „Oare am uitat ceva?” (baterii, lumânări, încărcătoare)', hu: 'Fuss át a „Nem felejtettem el semmit?” ellenőrzőlistán (elemek, gyertyák, töltők)', en: 'Run through "Did I forget anything?" checklist (batteries, candles)' },
        category: { ro: 'Verificare', hu: 'Ellenőrzés', en: 'Check' },
        dayShortcut: 23,
      },
    ],
  },
  {
    id: 'tomorrow',
    label: { ro: 'Crăciunul este MÂINE!', hu: 'Holnap Karácsony!', en: 'Christmas is tomorrow!' },
    badge: { ro: 'Salvare de Urgență', hu: 'Vészmentés', en: 'Emergency Save' },
    description: {
      ro: 'Fără panică. Oprește cumpărăturile inutile. Familia are nevoie de tine calmă, nu de perfecțiune.',
      hu: 'Nincs pánik! Felejtsd el a felesleges stresszt. A családodnak nyugodt jelenlétre van szüksége, nem tökéletességre.',
      en: 'No panic. Drop any pending non-essentials. Your family needs your peaceful presence, not perfection.',
    },
    tasks: [
      {
        id: 'em-tom-1',
        text: { ro: 'Oprește complet goana după cadouri — un voucher sau o scrisoare din inimă este perfectă', hu: 'Felejtsd el a boltokba rohangálást — egy szívből jövő levél vagy élményutalvány tökéletes', en: 'Stop rushing to stores — a heartfelt letter or experience voucher is wonderful' },
        category: { ro: 'Prioritate', hu: 'Prioritás', en: 'Priority' },
        urgent: true,
      },
      {
        id: 'em-tom-2',
        text: { ro: 'Finalizează preparatele culinare cheie și pune băuturile la rece', hu: 'Fejezd be a legfontosabb ételeket és hűtsd be az italokat', en: 'Finish essential holiday dishes and chill the beverages' },
        category: { ro: 'Masa', hu: 'Konyha', en: 'Kitchen' },
      },
      {
        id: 'em-tom-3',
        text: { ro: 'Așază cadourile sub brad și pune etichetele la vedere', hu: 'Tedd a fa alá az ajándékokat a névkártyákkal', en: 'Place gifts under the tree with name tags visible' },
        category: { ro: 'Brad', hu: 'Karácsonyfa', en: 'Tree' },
      },
      {
        id: 'em-tom-4',
        text: { ro: 'Fă un duș cald, îmbracă haine confortabile festive și pornește colindele', hu: 'Vegyen egy meleg fürdőt, öltözz fel kényelmesen és indítsd el a karácsonyi zenét', en: 'Take a warm shower, dress comfortably and start festive music' },
        category: { ro: 'Tihnă', hu: 'Nyugalom', en: 'Calm' },
        dayShortcut: 24,
      },
      {
        id: 'em-tom-5',
        text: { ro: 'Pune telefonul deoparte și bucură-te cu adevărat de seara de Ajun', hu: 'Tedd le a telefont és éld meg a szenteste varázsát a szeretteiddel', en: 'Put the phone away and genuinely enjoy Christmas Eve' },
        category: { ro: 'Prezență', hu: 'Jelenlét', en: 'Presence' },
        dayShortcut: 24,
        urgent: true,
      },
    ],
  },
];

export const EmergencyMode: React.FC<EmergencyModeProps> = ({
  language,
  userProgress,
  onToggleTask,
  onOpenDayModal,
  onNavigateToCalendar,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<EmergencyTimeframe>('7-days');
  const plan = EMERGENCY_PLANS.find((p) => p.id === selectedTimeframe) || EMERGENCY_PLANS[2];
  const langKey = language === 'hu' ? 'hu' : language === 'en' ? 'en' : 'ro';

  const completedCount = plan.tasks.filter(
    (t) => userProgress.emergencyCompletedTasks?.[t.id]
  ).length;
  const progressPercent = Math.round((completedCount / plan.tasks.length) * 100);

  const handlePrint = () => {
    trackEvent('emergency_mode_printed', { timeframe: selectedTimeframe });
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#621927]/10 text-[#621927] border border-[#621927]/20 text-xs font-semibold uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 text-[#C29B48]" />
          <span>
            {language === 'hu' ? 'Prémium Eszköz' : language === 'en' ? 'Premium Emergency Tool' : 'Instrument Special de Criză'}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C0B12]">
          {language === 'hu'
            ? 'Karácsonyi Vészhelyzet Mód'
            : language === 'en'
            ? 'Christmas Emergency Mode'
            : 'Modul de Urgență de Crăciun'}
        </h1>

        <p className="text-base sm:text-lg text-[#6B645B] leading-relaxed">
          {language === 'hu'
            ? 'Késésben vagy? Válaszd ki, pontosan mennyi időd maradt, és kövesd a priorizált, stresszmentes mentőtervet.'
            : language === 'en'
            ? 'Behind schedule? Select exactly how much time you have left and follow the prioritized action plan.'
            : 'Ești în criză de timp? Selectează câte zile mai ai la dispoziție și primești un plan ultra-prioritizat pentru a salva Crăciunul.'}
        </p>
      </div>

      {/* Timeframe Selector Pills */}
      <div className="bg-white p-2 sm:p-2.5 rounded-2xl border border-[#EAE3D5] shadow-xs flex flex-wrap gap-2 items-center justify-center no-print">
        {EMERGENCY_PLANS.map((item) => {
          const isSelected = item.id === selectedTimeframe;
          return (
            <button
              key={item.id}
              onClick={() => {
                setSelectedTimeframe(item.id);
                trackEvent('emergency_timeframe_selected', { timeframe: item.id });
              }}
              className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? 'bg-[#621927] text-white shadow-md border border-[#C29B48]/50'
                  : 'bg-[#FAF7F2] text-[#4A453E] hover:bg-[#F1E9DB] border border-transparent'
              }`}
            >
              <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D8B76E]' : 'text-[#7E7468]'}`} />
              <span>{item.label[langKey]}</span>
            </button>
          );
        })}
      </div>

      {/* Plan Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#EAE3D5] shadow-sm space-y-8">
        {/* Top Info Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F1E9DB]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C29B48]">
                {plan.badge[langKey]}
              </span>
              <span className="text-xs text-[#A8A096]">•</span>
              <span className="text-xs font-semibold text-[#2E5844]">
                {completedCount} / {plan.tasks.length}{' '}
                {language === 'hu' ? 'teljesítve' : language === 'en' ? 'completed' : 'bifate'}
              </span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#2C0B12]">
              {plan.label[langKey]}
            </h2>
            <p className="text-sm text-[#7E7468] mt-1 max-w-2xl">
              {plan.description[langKey]}
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="self-start sm:self-center px-4 py-2.5 rounded-xl border border-[#2E5844] text-[#2E5844] hover:bg-[#E6EFEA] text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer no-print"
          >
            <Printer className="w-4 h-4" />
            <span>
              {language === 'hu' ? 'Lista nyomtatása' : language === 'en' ? 'Print plan' : 'Imprimă planul'}
            </span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 no-print">
          <div className="flex justify-between text-xs font-medium text-[#7E7468]">
            <span>{language === 'hu' ? 'Haladás' : language === 'en' ? 'Progress' : 'Progresul planului'}</span>
            <span className="font-bold text-[#2C0B12]">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#FAF7F2] h-2.5 rounded-full overflow-hidden border border-[#EAE3D5]">
            <div
              className="bg-[#2E5844] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Action Tasks Checklist */}
        <div className="space-y-3">
          {plan.tasks.map((task, idx) => {
            const isCompleted = !!userProgress.emergencyCompletedTasks?.[task.id];
            return (
              <div
                key={task.id}
                onClick={() => onToggleTask(task.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                  isCompleted
                    ? 'bg-[#FAF7F2]/60 border-[#EAE3D5] opacity-75'
                    : task.urgent
                    ? 'bg-[#FFF8F8] border-[#E8C7CD] hover:border-[#621927]'
                    : 'bg-[#FCFAF7] border-[#EAE3D5] hover:border-[#C29B48]'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    type="button"
                    aria-label="Toggle task"
                    className="mt-0.5 text-[#2E5844] hover:scale-110 transition-transform shrink-0 cursor-pointer"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 fill-[#2E5844] text-white" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#C29B48]" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-white border border-[#EAE3D5] text-[#7E7468]">
                        {task.category[langKey]}
                      </span>
                      {task.urgent && (
                        <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-[#621927] text-white">
                          {language === 'hu' ? 'Sürgős' : language === 'en' ? 'Urgent' : 'Urgent'}
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-sm sm:text-base font-medium leading-snug ${
                        isCompleted ? 'line-through text-[#8E867B]' : 'text-[#2C0B12]'
                      }`}
                    >
                      {task.text[langKey]}
                    </p>
                  </div>
                </div>

                {/* Optional Shortcut to Calendar Day Tool */}
                {task.dayShortcut && onOpenDayModal && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDayModal(task.dayShortcut!);
                    }}
                    className="shrink-0 p-2 rounded-xl text-xs font-semibold bg-white border border-[#EAE3D5] text-[#621927] hover:bg-[#FAF7F2] hover:border-[#C29B48] flex items-center gap-1 cursor-pointer transition-colors no-print"
                    title={`Deschide Ziua ${task.dayShortcut}`}
                  >
                    <span>Ziua {task.dayShortcut}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C29B48]" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Calming Reassurance Footer */}
        <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#C29B48]/30 flex items-center gap-3.5 text-xs sm:text-sm text-[#6B645B]">
          <ShieldCheck className="w-6 h-6 text-[#2E5844] shrink-0" />
          <div>
            <span className="font-bold text-[#2C0B12] block">
              {language === 'hu'
                ? 'Aranyérvényű szabály:'
                : language === 'en'
                ? 'Golden Christmas rule:'
                : 'Regula de aur a Crăciunului:'}
            </span>
            <span>
              {language === 'hu'
                ? 'Senki nem fog emlékezni arra, hogy a szegélylécek le lettek-e törölve. Mindenki arra fog emlékezni, hogy békés volt-e a hangulatod.'
                : language === 'en'
                ? 'Nobody remembers if the baseboards were dusted. Everyone remembers if you were happy, rested and smiling.'
                : 'Nimeni nu-și va aminti dacă ai șters plintele. Toți își vor aminti dacă ai fost relaxată, zâmbitoare și prezentă.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
