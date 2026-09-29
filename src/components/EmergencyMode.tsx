import React, { useState } from 'react';
import { Clock, AlertTriangle, CheckCircle2, Circle, Sparkles, Printer, ArrowRight, ShieldCheck, Calendar, Gift, ShoppingBag, Utensils, Heart, Lock, Crown } from 'lucide-react';
import { SupportedLanguage, EmergencyTimeframe, UserProgress, PricingTier } from '../types';
import { trackEvent } from '../utils/analytics';
import { printA4, type PrintOrientation } from '../utils/printA4';

interface EmergencyModeProps {
  language: SupportedLanguage;
  userProgress: UserProgress;
  onToggleTask: (taskId: string) => void;
  onOpenDayModal?: (dayId: number) => void;
  onNavigateToCalendar?: () => void;
  onOpenPaywall?: () => void;
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
        text: { ro: 'Pregătește hârtia de împachetat, foarfecele și benzile adezive la îndemână', hu: 'Készítsd ki a csomagolópapírokat, masnikat és szalagokat egy helyre', en: 'Gather gift wraps, ribbons and scissors in one designated spot' },
        category: { ro: 'Cadouri', hu: 'Csomagolás', en: 'Gifts' },
      },
    ],
  },
  {
    id: '7-days',
    label: { ro: '7 zile rămase', hu: '7 nap van hátra', en: '7 days left' },
    badge: { ro: 'Săptămâna decisivă', hu: 'Döntő hét', en: 'Final week' },
    description: {
      ro: 'O săptămână până la Crăciun. Elimină tot ce nu este esențial și concentrează-te pe ceea ce contează cu adevărat.',
      hu: 'Egy hét karácsonyig. Húzz ki mindent, ami nem létfontosságú, és fókuszálj az igazi meghittségre.',
      en: 'One week left. Ruthlessly eliminate non-essentials and focus purely on meaningful moments.',
    },
    tasks: [
      {
        id: 'em-7-1',
        text: { ro: 'Cumpără toate alimentele neperisabile, băuturile și conservele', hu: 'Vedd meg az összes tartós élelmiszert, lisztet, vajat, italokat', en: 'Buy all pantry essentials, beverages and dry baking items' },
        category: { ro: 'Cumpărături', hu: 'Bevásárlás', en: 'Groceries' },
        urgent: true,
      },
      {
        id: 'em-7-2',
        text: { ro: 'Verifică lista de cadouri: bifează ce e cumpărat și ce mai trebuie achiziționat local', hu: 'Ellenőrizd az ajándéklistát: mi van meg, és miért kell még leugrani a boltba', en: 'Check gift list: what is purchased vs what needs local pickup' },
        category: { ro: 'Cadouri', hu: 'Ajándékok', en: 'Gifts' },
        dayShortcut: 2,
      },
      {
        id: 'em-7-3',
        text: { ro: 'Fă o sesiune plăcută de împachetare cadouri cu muzică de Crăciun', hu: 'Tarts egy hangulatos csomagolós délutánt forró teával és karácsonyi zenével', en: 'Do a relaxing gift wrapping session with cozy Christmas music' },
        category: { ro: 'Cadouri', hu: 'Csomagolás', en: 'Gifts' },
        dayShortcut: 10,
      },
      {
        id: 'em-7-4',
        text: { ro: 'Stabilește cine aduce ce dacă aveți oaspeți de Crăciun', hu: 'Egyeztesd a családdal: ki mit hoz a közös karácsonyi vacsorára', en: 'Coordinate who brings what dish if family is visiting' },
        category: { ro: 'Planificare', hu: 'Egyeztetés', en: 'Coordination' },
      },
    ],
  },
  {
    id: '3-days',
    label: { ro: '3 zile rămase', hu: '3 nap van hátra', en: '3 days left' },
    badge: { ro: 'Sprint final', hu: 'Véghajrá', en: 'Final sprint' },
    description: {
      ro: 'Doar 72 de ore până la sărbătoare. Respiră adânc. Fă doar ce e esențial pe lista de mai jos.',
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
        text: { ro: 'Fă o baie caldă, ascultă colinde și respiră. Misiunea ta este să fii fericită!', hu: 'Vegyel egy forró fürdőt, kapcsolj halk zenét és dőlj hátra. A karácsony öröm, nem vizsga!', en: 'Take a warm bath, put on Christmas music and relax. You made it!' },
        category: { ro: 'Mindset', hu: 'Nyugalom', en: 'Mindset' },
        dayShortcut: 24,
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
  onOpenPaywall,
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<EmergencyTimeframe>('30-days');
  const [printOrientation, setPrintOrientation] = useState<PrintOrientation>('landscape');
  const langKey = language === 'hu' ? 'hu' : language === 'en' ? 'en' : 'ro';
  const isHu = language === 'hu';

  const userTier: PricingTier = userProgress.selectedTier || (userProgress.hasPurchased ? 'premium' : 'free');

  // Check if current timeframe is locked by tier
  const isTimeframeLocked = (tf: EmergencyTimeframe) => {
    if (userProgress.isPreviewMode) return false;
    if (userTier === 'premium') return false;
    if (userTier === 'standard') {
      return tf === '7-days' || tf === '3-days' || tf === 'tomorrow';
    }
    // Free tier: only 30-days is previewable
    return tf !== '30-days';
  };

  const currentLocked = isTimeframeLocked(selectedTimeframe);
  const plan = EMERGENCY_PLANS.find((p) => p.id === selectedTimeframe) || EMERGENCY_PLANS[0];

  const handlePrint = () => {
    trackEvent('emergency_mode_printed', { timeframe: selectedTimeframe });
    printA4(printOrientation);
  };

  const completedCount = plan.tasks.filter((t) => !!userProgress.emergencyCompletedTasks?.[t.id]).length;
  const progressPercent = Math.round((completedCount / plan.tasks.length) * 100);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF5F5] border border-[#E8C7CD] text-xs font-semibold text-[#621927] mb-3 shadow-xs">
          <AlertTriangle className="w-3.5 h-3.5 text-[#621927]" />
          <span>
            {isHu ? 'Karácsonyi Vészhelyzet Mód • Stresszmentes mentőöv' : 'Christmas Emergency Mode'}
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C0B12] mb-3">
          {isHu ? 'Késésben vagy? Semmi baj.' : 'Running late? We have your back.'}
        </h1>
        <p className="text-sm sm:text-base text-[#6B645B]">
          {isHu
            ? 'Válaszd ki, hány napod maradt szentestéig, és kövesd a lényegre törő, felesleges köröktől mentes mentőtervet.'
            : 'Select how much time you have left to access a prioritized panic-free action plan.'}
        </p>
      </div>

      {/* Timeframe Selector Tabs - Edge-to-edge smooth touch scrolling */}
      <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
        {EMERGENCY_PLANS.map((item) => {
          const isSelected = item.id === selectedTimeframe;
          const locked = isTimeframeLocked(item.id);

          return (
            <button
              key={item.id}
              onClick={() => {
                setSelectedTimeframe(item.id);
                trackEvent('emergency_timeframe_selected', { timeframe: item.id });
              }}
              className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 min-h-[44px] shrink-0 ${
                isSelected
                  ? 'bg-[#621927] text-white shadow-md border border-[#C29B48]/50'
                  : 'bg-[#FAF7F2] text-[#4A453E] hover:bg-[#F1E9DB] border border-transparent'
              }`}
            >
              {locked ? (
                <Lock className="w-3.5 h-3.5 text-[#C29B48]" />
              ) : (
                <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D8B76E]' : 'text-[#7E7468]'}`} />
              )}
              <span>{item.label[langKey]}</span>
            </button>
          );
        })}
      </div>

      {/* Plan Card */}
      <div id="emergency-print-sheet" className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 border border-[#EAE3D5] shadow-sm space-y-6 sm:space-y-8 relative overflow-hidden">
        {currentLocked ? (
          /* Locked Upsell Screen */
          <div className="py-12 px-4 text-center max-w-md mx-auto space-y-5 animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border-2 border-[#C29B48] text-[#621927] mx-auto flex items-center justify-center shadow-md">
              <Lock className="w-8 h-8 text-[#C29B48]" />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C29B48] block mb-1">
                {isHu ? 'PRÉMIUM FUNKCIÓ' : 'PREMIUM FEATURE'}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C0B12]">
                {plan.label[langKey]}
              </h2>
              <p className="text-xs sm:text-sm text-[#7E7468] mt-2 leading-relaxed">
                {isHu
                  ? 'A 7 napos, 3 napos és a szenteste mentőakció a Prémium csomag része. Nyisd fel a teljes mentőcsomagot azonnal, és érkezz meg békében a fa alá!'
                  : 'This emergency timeframe is part of the Premium package. Unlock the full lifesaver plan now!'}
              </p>
            </div>

            <button
              onClick={onOpenPaywall}
              className="w-full bg-[#621927] hover:bg-[#46121C] text-white py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-[#C29B48]/50"
            >
              <Sparkles className="w-4 h-4 text-[#D8B76E]" />
              <span>{isHu ? 'Prémium Csomag feloldása (€14.90)' : 'Unlock Premium Access'}</span>
              <ArrowRight className="w-4 h-4 text-[#D8B76E]" />
            </button>

            <p className="text-[11px] text-[#7E7468]">
              {isHu ? '✓ Tartalmazza mind a 24 napot, az összes nyomtatható sablont és örökös licencet' : '✓ Includes all 24 days and all printables'}
            </p>
          </div>
        ) : (
          <>
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

              <div className="no-print flex flex-col items-start sm:items-end gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2.5 rounded-xl border border-[#2E5844] text-[#2E5844] hover:bg-[#E6EFEA] text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>
                    {language === 'hu' ? 'Lista nyomtatása' : language === 'en' ? 'Print plan' : 'Imprimă planul'}
                  </span>
                </button>
                <div className="inline-flex items-center gap-1 rounded-lg border border-[#EAE3D5] bg-[#FAF7F2] p-1" role="group" aria-label={language === 'hu' ? 'Nyomtatási tájolás' : language === 'en' ? 'Print orientation' : 'Orientarea imprimării'}>
                  {(['portrait', 'landscape'] as const).map((orientation) => (
                    <button
                      key={orientation}
                      type="button"
                      aria-pressed={printOrientation === orientation}
                      onClick={() => setPrintOrientation(orientation)}
                      className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${printOrientation === orientation ? 'bg-[#2E5844] text-white' : 'text-[#534343] hover:bg-white'}`}
                    >
                      {orientation === 'portrait'
                        ? (language === 'hu' ? 'Álló' : language === 'en' ? 'Portrait' : 'Portret')
                        : (language === 'hu' ? 'Fekvő' : language === 'en' ? 'Landscape' : 'Peisaj')}
                    </button>
                  ))}
                </div>
              </div>
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
              {plan.tasks.map((task) => {
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
                              {language === 'hu' ? 'Sürgős' : 'Urgent'}
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

                    {task.dayShortcut && onOpenDayModal && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenDayModal(task.dayShortcut!);
                        }}
                        className="shrink-0 p-2 rounded-xl text-xs font-semibold bg-white border border-[#EAE3D5] text-[#621927] hover:bg-[#FAF7F2] hover:border-[#C29B48] flex items-center gap-1 cursor-pointer transition-colors no-print"
                      >
                        <span>{isHu ? `${task.dayShortcut}. Nap` : `Day ${task.dayShortcut}`}</span>
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
                  {isHu ? 'Aranyérvényű szabály:' : 'Golden Christmas rule:'}
                </span>
                <span>
                  {isHu
                    ? 'Senki nem fog emlékezni arra, hogy a szegélylécek le lettek-e törölve. Mindenki arra fog emlékezni, hogy békés volt-e a hangulatod.'
                    : 'Nobody remembers if the baseboards were dusted. Everyone remembers if you were happy, rested and smiling.'}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
