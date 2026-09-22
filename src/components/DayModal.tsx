import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, CheckCircle2, Clock, Sparkles, Printer, Download, 
  Play, Pause, RotateCcw, Plus, Trash2, Heart, Gift, 
  Send, Music, Check, Share2, AlertCircle, BookmarkCheck
} from 'lucide-react';
import { DayData, UserProgress, BudgetItem, GiftItem, SupportedLanguage } from '../types';
import { trackEvent } from '../utils/analytics';
import { toggleFireplaceAudio } from '../utils/audio';

interface DayModalProps {
  day: DayData | null;
  isOpen: boolean;
  onClose: () => void;
  userProgress: UserProgress;
  language?: SupportedLanguage;
  onToggleCompleteDay: (dayId: number) => void;
  onUpdateBudget: (budgetData: UserProgress['budgetData']) => void;
  onUpdateGiftList: (giftList: GiftItem[]) => void;
  onUpdateChecklist: (key: string, value: boolean) => void;
  onUpdateUserNote: (dayId: number, note: string) => void;
  onOpenPrintable: (resourceId: string) => void;
}

export const DayModal: React.FC<DayModalProps> = ({
  day,
  isOpen,
  onClose,
  userProgress,
  language = 'ro',
  onToggleCompleteDay,
  onUpdateBudget,
  onUpdateGiftList,
  onUpdateChecklist,
  onUpdateUserNote,
  onOpenPrintable,
}) => {
  if (!isOpen || !day) return null;

  const isHu = language === 'hu';
  const isEn = language === 'en';
  const isCompleted = userProgress.completedDays.includes(day.id);
  const currentNote = userProgress.userNotes[day.id] || '';

  // Timer state for Day 4 (20-minute reset)
  const [timerSeconds, setTimerSeconds] = useState(20 * 60);
  const [timerActive, setTimerActive] = useState(false);

  // Day 1: Budget local state
  const [totalBudgetInput, setTotalBudgetInput] = useState<number>(userProgress.budgetData.totalBudget || 2000);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(userProgress.budgetData.items);

  // Day 2: Gift List state
  const [newRecipient, setNewRecipient] = useState('');
  const [newIdea, setNewIdea] = useState('');
  const [newBudget, setNewBudget] = useState(150);

  // Day 5: Gift Idea filter state
  const [giftCategory, setGiftCategory] = useState<'partner' | 'parent' | 'friend' | 'colleague' | 'child'>('partner');

  // Day 11: Card Generator state
  const [cardTemplate, setCardTemplate] = useState<number>(1);
  const [cardRecipient, setCardRecipient] = useState('Mama și Tata');
  const [cardMessage, setCardMessage] = useState(
    'Vă mulțumesc pentru toată căldura pe care o aduceți mereu în sufletul meu. Crăciun binecuvântat și plin de pace!'
  );

  // Day 13 & 17: Interactive Card Index for prompts / trivia
  const [promptIndex, setPromptIndex] = useState(0);

  // Confetti overlay & celebratory state
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Auto-dismiss celebratory banner after 3.8 seconds
  useEffect(() => {
    if (showCelebration) {
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 3800);
      return () => clearTimeout(timer);
    }
  }, [showCelebration]);

  // Reset celebration overlay when day changes or modal opens/closes
  useEffect(() => {
    setShowCelebration(false);
  }, [day?.id, isOpen]);

  // Handle timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerActive) {
      setTimerActive(false);
      setShowCelebration(true);
      triggerSubtleConfetti();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timerSeconds]);

  const triggerSubtleConfetti = () => {
    try {
      if (confettiCanvasRef.current) {
        const modalConfetti = confetti.create(confettiCanvasRef.current, {
          resize: true,
          useWorker: true,
        });

        // 1. Gentle central fountain rising within the modal card
        modalConfetti({
          particleCount: 48,
          spread: 75,
          origin: { x: 0.5, y: 0.8 },
          colors: ['#C29B48', '#D8B76E', '#2E5844', '#621927', '#F2E4C6', '#8B263E', '#FAF7F2'],
          gravity: 0.8,
          ticks: 240,
          scalar: 0.88,
          disableForReducedMotion: true,
        });

        // 2. Soft celebratory cross-sprays from left and right corners
        setTimeout(() => {
          modalConfetti({
            particleCount: 26,
            angle: 55,
            spread: 48,
            origin: { x: 0.08, y: 0.72 },
            colors: ['#D8B76E', '#C29B48', '#FAF7F2', '#2E5844'],
            gravity: 0.85,
            ticks: 200,
            scalar: 0.8,
            disableForReducedMotion: true,
          });
          modalConfetti({
            particleCount: 26,
            angle: 125,
            spread: 48,
            origin: { x: 0.92, y: 0.72 },
            colors: ['#621927', '#D8B76E', '#C29B48', '#F2E4C6'],
            gravity: 0.85,
            ticks: 200,
            scalar: 0.8,
            disableForReducedMotion: true,
          });
        }, 150);
      } else {
        // Fallback to global window confetti if modal canvas is not ready
        confetti({
          particleCount: 55,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#621927', '#C29B48', '#2E5844', '#D8B76E', '#F2E4C6'],
          disableForReducedMotion: true,
        });
      }
    } catch {
      // safe fallback
    }
  };

  const handleCompleteClick = () => {
    if (!isCompleted) {
      setShowCelebration(true);
      triggerSubtleConfetti();
      trackEvent('advent_day_complete', { dayId: day.id, title: day.title });
    } else {
      setShowCelebration(false);
    }
    onToggleCompleteDay(day.id);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Day 1 Budget Calculation
  const totalAllocated = budgetItems.reduce((sum, item) => sum + (Number(item.allocated) || 0), 0);
  const remainingBudget = totalBudgetInput - totalAllocated;

  const handleBudgetItemChange = (index: number, val: number) => {
    const updated = [...budgetItems];
    updated[index].allocated = val;
    setBudgetItems(updated);
    onUpdateBudget({ totalBudget: totalBudgetInput, items: updated });
  };

  const handleAddGift = () => {
    if (!newRecipient.trim()) return;
    const newItem: GiftItem = {
      id: Date.now().toString(),
      recipient: newRecipient.trim(),
      category: 'friend',
      idea: newIdea.trim() || 'Atenție festivă',
      budget: Number(newBudget) || 100,
      purchased: false,
      wrapped: false,
    };
    const updated = [...userProgress.giftList, newItem];
    onUpdateGiftList(updated);
    setNewRecipient('');
    setNewIdea('');
  };

  const handleToggleGiftPurchased = (id: string) => {
    const updated = userProgress.giftList.map((g) =>
      g.id === id ? { ...g, purchased: !g.purchased } : g
    );
    onUpdateGiftList(updated);
  };

  const handleToggleGiftWrapped = (id: string) => {
    const updated = userProgress.giftList.map((g) =>
      g.id === id ? { ...g, wrapped: !g.wrapped } : g
    );
    onUpdateGiftList(updated);
  };

  const handleDeleteGift = (id: string) => {
    const updated = userProgress.giftList.filter((g) => g.id !== id);
    onUpdateGiftList(updated);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 no-print">
      <div className={`relative w-full max-w-3xl bg-[#FCFAF7] rounded-2xl sm:rounded-3xl border transition-all duration-500 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ${
        showCelebration
          ? 'border-[#C29B48] ring-4 ring-[#C29B48]/30 shadow-[0_0_50px_rgba(194,155,72,0.35)]'
          : 'border-[#D8B76E]/40'
      }`}>
        {/* Subtle Confetti Canvas Overlay Scoped to DayModal */}
        <canvas
          ref={confettiCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-40 rounded-2xl sm:rounded-3xl"
        />

        {/* Celebratory Achievement Banner Overlay */}
        {showCelebration && (
          <div className="absolute top-16 sm:top-18 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 transform translate-y-0 opacity-100 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#172F24]/95 text-white shadow-2xl border border-[#D8B76E]/80 backdrop-blur-md flex items-center gap-2.5 animate-bounce">
            <div className="w-5 h-5 rounded-full bg-[#2E5844] flex items-center justify-center text-[#D8B76E] shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <p className="font-serif text-xs sm:text-sm font-semibold text-[#FDFBF7] flex items-center gap-2 whitespace-nowrap">
              <span>
                {isHu
                  ? `Gratulálunk! A(z) ${day.id}. nap teljesítve!`
                  : isEn
                  ? `Congratulations! Day ${day.id} completed!`
                  : `Felicitări! Ziua ${day.id} marcată ca finalizată!`}
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-white/15 text-[10px] font-sans text-[#FAF7F2] uppercase tracking-wider font-bold">
                {isHu ? "✦ +1 Lépés a Nyugalom felé" : isEn ? "✦ +1 Step to Peace" : "✦ +1 Pas spre Tihnă"}
              </span>
            </p>
          </div>
        )}

        {/* Modal Top Navigation Bar */}
        <div className="px-5 sm:px-8 py-4 bg-white border-b border-[#EAE3D5] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#621927]">
              {isHu ? `${day.id}. Nap` : isEn ? `Day ${day.id}` : `Ziua ${day.id}`}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#7E2232] border border-[#EAE3D5]">
              {day.phaseName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {day.printableResource && (
              <button
                onClick={() => onOpenPrintable(day.printableResource!.id)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-[#2E5844] bg-[#E6EFEA] hover:bg-[#2E5844] hover:text-white transition-colors cursor-pointer"
                title={isHu ? "Nyomtatható munkalap megnyitása" : "Deschide fișa imprimabilă"}
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{isHu ? "Nyomtatás" : isEn ? "Print Sheet" : "Tipărește Fișa"}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 text-[#7E7468] hover:text-[#2C0B12] hover:bg-[#F1E9DB] rounded-full transition-colors"
              aria-label={isHu ? "Ablak bezárása" : "Închide fereastra"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-[#2D2A26]">
          {/* Header Title & Intro */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C29B48] uppercase tracking-wider mb-1">
              <span>{day.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#7E7468]">
                <Clock className="w-3.5 h-3.5" />
                {day.timeEstimate}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2C0B12] mb-3">
              {day.title}
            </h2>
            <p className="text-base text-[#5E574D] font-normal leading-relaxed">
              {day.shortIntro}
            </p>
          </div>

          {/* Editorial Card: Headline & Description */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EAE3D5] shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#2C0B12]">
              {day.content.headline}
            </h3>
            <p className="text-sm text-[#5E574D] leading-relaxed">
              {day.content.description}
            </p>

            {day.content.ritualTip && (
              <div className="p-4 rounded-xl bg-[#FAF7F2] border-l-3 border-[#C29B48] text-xs sm:text-sm text-[#6B645B] italic">
                <strong>{isHu ? "A nap tippje:" : isEn ? "Daily tip:" : "Sfatul zilei:"}</strong> {day.content.ritualTip}
              </div>
            )}
          </div>

          {/* ================= DYNAMIC INTERACTIVE TOOLS ================= */}

          {/* DAY 1: CHRISTMAS BUDGET CALCULATOR */}
          {day.toolType === 'budget' && (
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EAE3D5] shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1E9DB]">
                <h4 className="font-serif text-lg font-semibold text-[#2C0B12]">
                  {isHu ? "Költségvetés-Kalkulátor" : isEn ? "Budget Calculator" : "Calculatorul tău de Buget"}
                </h4>
                <span className="text-xs text-[#7E7468]">
                  {isHu ? "Összegek Ft-ban vagy EUR-ban" : isEn ? "Values in EUR / local currency" : "Valori în Lei (RON) sau EUR"}
                </span>
              </div>

              {/* Total Budget Input */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#FAF7F2] border border-[#EAE3D5]">
                <div>
                  <label className="text-xs font-semibold text-[#7E7468] block mb-1">
                    {isHu ? "Teljes Tervezett Keretösszeg:" : isEn ? "Total Allocated Budget:" : "Buget Total Alocat:"}
                  </label>
                  <input
                    type="number"
                    value={totalBudgetInput}
                    onChange={(e) => {
                      const val = Number(e.target.value) || 0;
                      setTotalBudgetInput(val);
                      onUpdateBudget({ totalBudget: val, items: budgetItems });
                    }}
                    className="w-full bg-white border border-[#D8B76E] rounded-lg px-3 py-1.5 text-base font-bold text-[#621927]"
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#7E7468] block mb-1">
                    {isHu ? "Eddig Kiosztva:" : isEn ? "Total Distributed:" : "Total Repartizat:"}
                  </span>
                  <span className="text-base font-bold text-[#2C0B12] block py-1.5">
                    {totalAllocated}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#7E7468] block mb-1">
                    {isHu ? "Fennmaradó Keret:" : isEn ? "Remaining Budget:" : "Buget Rămas:"}
                  </span>
                  <span className={`text-base font-bold block py-1.5 ${remainingBudget >= 0 ? 'text-[#2E5844]' : 'text-[#B83D54]'}`}>
                    {remainingBudget} {remainingBudget < 0 ? (isHu ? "(Túllépés!)" : isEn ? "(Over budget!)" : "(Depășire!)") : (isHu ? "szabad" : isEn ? "left" : "rămași")}
                  </span>
                </div>
              </div>

              {/* Category Breakdown Inputs */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-[#4A453E] uppercase tracking-wider block">
                  {isHu ? "Kategóriák szerinti felosztás:" : isEn ? "Category breakdown:" : "Repartizare pe categorii:"}
                </span>
                {budgetItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-[#5E574D] font-medium flex-1">
                      {item.label}:
                    </span>
                    <input
                      type="number"
                      value={item.allocated}
                      onChange={(e) => handleBudgetItemChange(idx, Number(e.target.value) || 0)}
                      className="w-28 bg-white border border-[#EAE3D5] rounded-lg px-3 py-1 text-sm font-semibold text-right text-[#2C0B12] focus:border-[#C29B48] outline-hidden"
                    />
                  </div>
                ))}
              </div>

              <div className="pt-2 text-xs text-[#7E7468] italic">
                {isHu ? "* A beírt összegek automatikusan mentődnek a profilodban." : "* Cifrele introduse se salvează automat și rămân disponibile în profilul tău."}
              </div>
            </div>
          )}

          {/* DAY 2: GIFT LIST PLANNER */}
          {day.toolType === 'gifts' && (
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EAE3D5] shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1E9DB]">
                <h4 className="font-serif text-lg font-semibold text-[#2C0B12]">
                  {isHu ? "Szeretteim Listája & Ajándékok" : isEn ? "Gift Planner & Loved Ones" : "Lista Persoanelor Dragi & Cadouri"}
                </h4>
                <span className="text-xs text-[#2E5844] font-medium">
                  {isHu
                    ? `${userProgress.giftList.filter((g) => g.purchased).length} / ${userProgress.giftList.length} megvásárolva`
                    : `${userProgress.giftList.filter((g) => g.purchased).length} / ${userProgress.giftList.length} cumpărate`}
                </span>
              </div>

              {/* Add New Recipient Form */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE3D5]">
                <input
                  type="text"
                  placeholder={isHu ? "Címzett neve..." : isEn ? "Recipient..." : "Nume destinatar..."}
                  value={newRecipient}
                  onChange={(e) => setNewRecipient(e.target.value)}
                  className="bg-white border border-[#EAE3D5] rounded-lg px-3 py-1.5 text-xs text-[#2C0B12]"
                />
                <input
                  type="text"
                  placeholder={isHu ? "Ajándékötlet..." : isEn ? "Gift idea..." : "Idee cadou..."}
                  value={newIdea}
                  onChange={(e) => setNewIdea(e.target.value)}
                  className="bg-white border border-[#EAE3D5] rounded-lg px-3 py-1.5 text-xs text-[#2C0B12]"
                />
                <input
                  type="number"
                  placeholder={isHu ? "Becsült keret" : isEn ? "Budget" : "Buget estimat"}
                  value={newBudget}
                  onChange={(e) => setNewBudget(Number(e.target.value))}
                  className="bg-white border border-[#EAE3D5] rounded-lg px-3 py-1.5 text-xs text-[#2C0B12]"
                />
                <button
                  onClick={handleAddGift}
                  className="bg-[#621927] hover:bg-[#46121C] text-white rounded-lg px-3 py-1.5 text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isHu ? "Hozzáadás" : isEn ? "Add" : "Adaugă"}</span>
                </button>
              </div>

              {/* Gift Items Table/List */}
              <div className="space-y-2">
                {userProgress.giftList.length === 0 ? (
                  <p className="text-xs text-[#7E7468] text-center py-4">
                    {isHu
                      ? "Még nem adtál hozzá senkit. Töltsd ki a fenti űrlapot a kezdéshez!"
                      : "Nu ai adăugat încă nicio persoană. Completează formularul de mai sus!"}
                  </p>
                ) : (
                  userProgress.giftList.map((gift) => (
                    <div
                      key={gift.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#EAE3D5] text-xs gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <span className="font-semibold text-[#2C0B12] block truncate">
                          {gift.recipient}
                        </span>
                        <span className="text-[#7E7468] block truncate">
                          {gift.idea} • {gift.budget} {isHu ? "Ft / valuta" : "lei"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1.5 cursor-pointer text-[#4A453E]">
                          <input
                            type="checkbox"
                            checked={gift.purchased}
                            onChange={() => handleToggleGiftPurchased(gift.id)}
                            className="rounded text-[#2E5844] focus:ring-[#2E5844]"
                          />
                          <span>{isHu ? "Megvéve" : isEn ? "Bought" : "Cumpărat"}</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer text-[#4A453E]">
                          <input
                            type="checkbox"
                            checked={gift.wrapped}
                            onChange={() => handleToggleGiftWrapped(gift.id)}
                            className="rounded text-[#C29B48] focus:ring-[#C29B48]"
                          />
                          <span>{isHu ? "Csomagolva" : isEn ? "Wrapped" : "Împachetat"}</span>
                        </label>
                        <button
                          onClick={() => handleDeleteGift(gift.id)}
                          className="text-[#A8A096] hover:text-[#B83D54] p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* DAY 4: 20-MINUTE HOME RESET WITH TIMER */}
          {day.id === 4 && (
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EAE3D5] shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1E9DB]">
                <h4 className="font-serif text-lg font-semibold text-[#2C0B12]">
                  {isHu ? "20 Perces Időzítő" : isEn ? "20-Minute Timer" : "Cronometrul tău de 20 de Minute"}
                </h4>
                <div className="font-mono text-2xl font-bold text-[#621927]">
                  {formatTimer(timerSeconds)}
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setTimerActive(!timerActive)}
                  className={`px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                    timerActive
                      ? 'bg-[#B83D54] text-white'
                      : 'bg-[#2E5844] text-white hover:bg-[#172F24]'
                  }`}
                >
                  {timerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{timerActive ? (isHu ? "Szünet" : "Pauză") : (isHu ? "Időzítő indítása" : "Pornește Cronometrul")}</span>
                </button>
                <button
                  onClick={() => {
                    setTimerActive(false);
                    setTimerSeconds(20 * 60);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-[#7E7468] hover:bg-[#F1E9DB] border border-[#EAE3D5] flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isHu ? "Alaphelyzet" : "Resetează"}</span>
                </button>
              </div>

              {/* Step by step checklist */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-[#7E7468] uppercase tracking-wider block">
                  Pașii rapizi de resetare:
                </span>
                {day.content.actionSteps.map((step, idx) => {
                  const checkKey = `day4_step_${idx}`;
                  const isChecked = !!userProgress.checklistStates[checkKey];
                  return (
                    <div
                      key={idx}
                      onClick={() => onUpdateChecklist(checkKey, !isChecked)}
                      className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer text-xs sm:text-sm transition-colors ${
                        isChecked
                          ? 'bg-[#F4F8F6] border-[#2E5844]/40 text-[#172F24]'
                          : 'bg-[#FAF7F2] border-[#EAE3D5] text-[#4A453E] hover:bg-white'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                        isChecked ? 'bg-[#2E5844] border-[#2E5844] text-white' : 'border-[#A8A096]'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className={isChecked ? 'line-through text-[#7E7468]' : ''}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* DAY 5: GIFT IDEA GENERATOR */}
          {day.id === 5 && (
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EAE3D5] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1E9DB]">
                <h4 className="font-serif text-lg font-semibold text-[#2C0B12]">
                  Generatorul de Idei de Cadouri
                </h4>
                <span className="text-xs text-[#7E7468]">Alege destinatarul</span>
              </div>

              {/* Recipient Category Selector */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'partner', label: 'Partener' },
                  { id: 'parent', label: 'Părinți' },
                  { id: 'friend', label: 'Prietenă' },
                  { id: 'colleague', label: 'Coleg' },
                  { id: 'child', label: 'Copil' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setGiftCategory(cat.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      giftCategory === cat.id
                        ? 'bg-[#621927] text-white'
                        : 'bg-[#FAF7F2] text-[#4A453E] border border-[#EAE3D5] hover:bg-[#F1E9DB]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Ideas Cards depending on selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {giftCategory === 'partner' && [
                  { title: "Seară de SPA & Masaj Acasă", budget: "50-100 lei", desc: "Ulei de migdale presat la rece, lumânare din ceară de soia și o listă cu muzică relaxantă." },
                  { title: "Bilete la un Concert / Piesă de Teatru", budget: "150-300 lei", desc: "O experiență în doi programată pentru luna ianuarie pentru a alunga nostalgia de după sărbători." },
                  { title: "Pulover din Lână Merinos sau Cașmir", budget: "200-400 lei", desc: "Un articol vestimentar călduros, durabil și de o eleganță atemporală." },
                  { title: "Album Foto 'Cele mai frumoase momente'", budget: "60-120 lei", desc: "Selectează 20 de fotografii din călătoriile voastre din 2026 într-o copertă de pânză." },
                ].map((idea, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EAE3D5] text-xs space-y-1.5">
                    <div className="flex items-center justify-between font-semibold text-[#2C0B12]">
                      <span>{idea.title}</span>
                      <span className="text-[10px] text-[#C29B48] font-bold">{idea.budget}</span>
                    </div>
                    <p className="text-[#6B645B] leading-relaxed">{idea.desc}</p>
                  </div>
                ))}

                {giftCategory === 'parent' && [
                  { title: "Coș cu Delicatese Tradiționale Premium", budget: "150-250 lei", desc: "Miere de salcâm pură, nuci caramelizate, ceaiuri bio și brânzeturi maturate românești." },
                  { title: "Pătură Călduroasă cu Textură de Lână", budget: "100-180 lei", desc: "Perfectă pentru serile lungi de iarnă la televizor sau citind o carte dragă." },
                  { title: "Ramă Foto Digitală Pre-încărcată", budget: "250-400 lei", desc: "Include poze recente cu nepoții și familia, gata de pornit dintr-o singură atingere." },
                  { title: "Abonament la Cafenea / Teatru", budget: "100-200 lei", desc: "Un pretext minunat pentru ieșiri tihnite în oraș." },
                ].map((idea, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EAE3D5] text-xs space-y-1.5">
                    <div className="flex items-center justify-between font-semibold text-[#2C0B12]">
                      <span>{idea.title}</span>
                      <span className="text-[10px] text-[#C29B48] font-bold">{idea.budget}</span>
                    </div>
                    <p className="text-[#6B645B] leading-relaxed">{idea.desc}</p>
                  </div>
                ))}

                {giftCategory === 'friend' && [
                  { title: "Cană din Ceramică Artizanală", budget: "50-90 lei", desc: "Lucrată manual de un ceramist local, unică și plină de personalitate." },
                  { title: "O Carte Aleasă cu Inima + Semn de Pagină", budget: "40-70 lei", desc: "O lectură care te-a inspirat profund, cu o dedicație caldă pe prima pagină." },
                  { title: "Lumânare Parfumată cu Note de Pin & Chihlimbar", budget: "60-110 lei", desc: "Ceară naturală cu fitil din lemn care trosnește discret." },
                  { title: "Set de Măști & Răsfăț Facial", budget: "70-130 lei", desc: "Pentru o duminică dedicată exclusiv relaxării." },
                ].map((idea, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EAE3D5] text-xs space-y-1.5">
                    <div className="flex items-center justify-between font-semibold text-[#2C0B12]">
                      <span>{idea.title}</span>
                      <span className="text-[10px] text-[#C29B48] font-bold">{idea.budget}</span>
                    </div>
                    <p className="text-[#6B645B] leading-relaxed">{idea.desc}</p>
                  </div>
                ))}

                {giftCategory === 'colleague' && [
                  { title: "Cutie de Cafea de Specialitate", budget: "45-75 lei", desc: "Boabe proaspăt prăjite cu note festive de ciocolată și scorțișoară." },
                  { title: "Agendă Datată 2027 cu Copertă Textilă", budget: "40-80 lei", desc: "Un început curat și organizat pentru noul an de muncă." },
                  { title: "Borcan cu Ciocolată Caldă & Bezele", budget: "25-45 lei", desc: "Gătit de tine acasă, decorat festiv cu crenguță de brad." },
                  { title: "Cremă de Mâini Nutritivă cu Unt de Shea", budget: "35-65 lei", desc: "Extrem de utilă în lunile geroase de iarnă la birou." },
                ].map((idea, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EAE3D5] text-xs space-y-1.5">
                    <div className="flex items-center justify-between font-semibold text-[#2C0B12]">
                      <span>{idea.title}</span>
                      <span className="text-[10px] text-[#C29B48] font-bold">{idea.budget}</span>
                    </div>
                    <p className="text-[#6B645B] leading-relaxed">{idea.desc}</p>
                  </div>
                ))}

                {giftCategory === 'child' && [
                  { title: "Set de Acuarele & Bloc de Pictură Groasă", budget: "45-90 lei", desc: "Încurajează creativitatea liberă și ore întregi departe de ecrane." },
                  { title: "Povești Clasice de Iarnă Ilustrate", budget: "40-85 lei", desc: "O carte mare de citit împreună sub pătură în fiecare seară." },
                  { title: "Puzzle de Lemn cu Peisaj de Pădure", budget: "50-100 lei", desc: "Piese mari, plăcute la atingere, rezistente în timp." },
                  { title: "Pijamale Festive din Bumbac Organic", budget: "60-120 lei", desc: "Moi, confortabile și ideale pentru dimineața de 25 Decembrie." },
                ].map((idea, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EAE3D5] text-xs space-y-1.5">
                    <div className="flex items-center justify-between font-semibold text-[#2C0B12]">
                      <span>{idea.title}</span>
                      <span className="text-[10px] text-[#C29B48] font-bold">{idea.budget}</span>
                    </div>
                    <p className="text-[#6B645B] leading-relaxed">{idea.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DAY 11: PRINTABLE CHRISTMAS CARDS STUDIO */}
          {day.id === 11 && (
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EAE3D5] shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1E9DB]">
                <h4 className="font-serif text-lg font-semibold text-[#2C0B12]">
                  Studio de Felicitări Elegante
                </h4>
                <span className="text-xs text-[#2E5844] font-medium">Gata de descărcat & tipărit</span>
              </div>

              {/* Template selector */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 1, name: "Brad Nordic" },
                  { id: 2, name: "Lumânare Caldă" },
                  { id: 3, name: "Coroniță Iută" },
                  { id: 4, name: "Stea de Aur" },
                ].map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => setCardTemplate(tmpl.id)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                      cardTemplate === tmpl.id
                        ? 'bg-[#621927] text-white border-[#621927] shadow-xs'
                        : 'bg-[#FAF7F2] text-[#5E574D] border-[#EAE3D5] hover:bg-[#F1E9DB]'
                    }`}
                  >
                    {tmpl.name}
                  </button>
                ))}
              </div>

              {/* Interactive Card Live Preview */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-[#FCFAF7] to-[#FAF7F2] border-2 border-[#D8B76E]/60 text-center space-y-3 shadow-inner">
                <span className="text-[10px] uppercase tracking-widest text-[#C29B48] font-bold">
                  Christmas Reset 2026 • Felicitare Festivă
                </span>
                <div className="font-serif text-2xl font-bold text-[#621927]">
                  Crăciun Luminos & Liniștit
                </div>
                <div className="max-w-md mx-auto py-2 border-y border-[#D8B76E]/30 text-sm font-serif italic text-[#4A453E]">
                  „{cardMessage}”
                </div>
                <div className="text-xs font-medium text-[#7E7468]">
                  Pentru: <strong className="text-[#2C0B12]">{cardRecipient}</strong>
                </div>
              </div>

              {/* Edit Controls */}
              <div className="space-y-2">
                <input
                  type="text"
                  value={cardRecipient}
                  onChange={(e) => setCardRecipient(e.target.value)}
                  placeholder="Numele destinatarului..."
                  className="w-full bg-[#FAF7F2] border border-[#EAE3D5] rounded-xl px-3.5 py-2 text-xs text-[#2C0B12]"
                />
                <textarea
                  rows={2}
                  value={cardMessage}
                  onChange={(e) => setCardMessage(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#EAE3D5] rounded-xl p-3 text-xs text-[#2C0B12]"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="bg-[#2E5844] hover:bg-[#172F24] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Tipărește această felicitare</span>
                </button>
              </div>
            </div>
          )}

          {/* DAY 12: CHRISTMAS PLAYLIST & AMBIENT FIREPLACE */}
          {day.id === 12 && (
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EAE3D5] shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1E9DB]">
                <h4 className="font-serif text-lg font-semibold text-[#2C0B12]">
                  Playlist-ul & Ambianța Sonoră
                </h4>
                <button
                  onClick={() => toggleFireplaceAudio(0.25)}
                  className="px-3 py-1.5 rounded-xl bg-[#621927] hover:bg-[#46121C] text-[#FDFBF7] text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Music className="w-3.5 h-3.5 text-[#D8B76E]" />
                  <span>Comută Sunetul de Șemineu</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {[
                  { title: "Winter Hearthside Jazz", artist: "Vibrație caldă de club newyorkez la lumina focului", duration: "48 min", tag: "Calm & Elegant" },
                  { title: "Acoustic Pine Carols", artist: "Chitară acustică și colinde calde instrumentale", duration: "54 min", tag: "Confort" },
                  { title: "Nocturnă la Pian de Sărbători", artist: "Pian clasic și liniște profundă de iarnă", duration: "62 min", tag: "Tihnă" },
                  { title: "Colinde Străvechi Românești Reinterpretate", artist: "Armonii corale blânde de mănăstire și sat", duration: "40 min", tag: "Tradiție" },
                ].map((track, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE3D5] flex items-center justify-between text-xs hover:bg-[#FDFBF7] transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="font-serif font-bold text-[#621927]">{i + 1}</span>
                      <div>
                        <span className="font-semibold text-[#2C0B12] block">{track.title}</span>
                        <span className="text-[#7E7468] text-[11px]">{track.artist}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded-full bg-white border border-[#EAE3D5] text-[10px] text-[#2E5844] font-semibold">
                        {track.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DAY 13: COUPLE CONVERSATION PROMPTS */}
          {day.id === 13 && (
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EAE3D5] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1E9DB]">
                <h4 className="font-serif text-lg font-semibold text-[#2C0B12]">
                  10 Întrebări Calde de Cuplu
                </h4>
                <span className="text-xs text-[#C29B48] font-bold">
                  Cardul {promptIndex + 1} din 10
                </span>
              </div>

              {/* Active Prompt Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF7F2] border border-[#D8B76E]/50 text-center space-y-3 min-h-[160px] flex flex-col justify-center">
                <Heart className="w-5 h-5 text-[#621927] mx-auto animate-pulse" />
                <p className="font-serif text-lg sm:text-xl font-medium text-[#2C0B12] leading-relaxed">
                  {[
                    "Care este cel mai frumos moment trăit împreună în acest an care tocmai trece?",
                    "Ce gest mărunt din partea mea te face să te simți cel mai iubit(ă)?",
                    "Dacă am putea pleca într-un weekend de iarnă doar noi doi în ianuarie, unde am merge?",
                    "Care este o tradiție nouă de Crăciun pe care ai dori să o începem anul acesta?",
                    "Pentru ce ești cel mai recunoscător(are) în relația noastră în prezent?",
                    "Care a fost o zi grea din acest an în care te-ai simțit sprijinit(ă) de mine?",
                    "Ce amintire din copilăria ta de sărbători ai vrea să o recreăm la noi acasă?",
                    "Ce vis sau proiect personal vrei să îl îmbrățișăm împreună în 2027?",
                    "Dacă ai alege o singură calitate a mea pe care o admiri cel mai mult, care ar fi?",
                    "Cum putem face ca zilele de Crăciun să fie 100% despre tihnă și bucurie între noi?",
                  ][promptIndex]}
                </p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setPromptIndex((prev) => (prev > 0 ? prev - 1 : 9))}
                  className="text-xs text-[#7E7468] hover:text-[#2C0B12] px-3 py-1.5 rounded-lg border border-[#EAE3D5]"
                >
                  ← Întrebarea anterioară
                </button>
                <button
                  onClick={() => setPromptIndex((prev) => (prev < 9 ? prev + 1 : 0))}
                  className="text-xs font-semibold text-[#621927] hover:bg-[#F7EAEF] px-4 py-1.5 rounded-lg border border-[#621927]/30"
                >
                  Următoarea întrebare →
                </button>
              </div>
            </div>
          )}

          {/* DAY 17: FAMILY GAMES & TRIVIA */}
          {day.id === 17 && (
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EAE3D5] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F1E9DB]">
                <h4 className="font-serif text-lg font-semibold text-[#2C0B12]">
                  Jocul Interactiv de Familie
                </h4>
                <span className="text-xs text-[#2E5844] font-medium">Cardul {promptIndex + 1} din 8</span>
              </div>

              <div className="p-6 rounded-2xl bg-[#F3F8F5] border border-[#2E5844]/30 text-center space-y-3 min-h-[150px] flex flex-col justify-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#2E5844]">
                  Cine din familie ar fi cel mai probabil să...
                </span>
                <p className="font-serif text-lg sm:text-xl font-semibold text-[#172F24]">
                  {[
                    "...mănânce jumătate din cozonac înainte să înceapă masa de Crăciun?",
                    "...adoarmă pe canapea în timp ce rulează filmul festiv de seară?",
                    "...împacheteze cadoul cu trei metri de bandă adezivă imposibil de desfăcut?",
                    "...înceapă să cânte colinde încă din luna noiembrie?",
                    "...găsească cel mai trăsnit și amuzant cadou secret?",
                    "...uite unde a ascuns cadourile cumpărate încă din octombrie?",
                    "...bea trei căni de ciocolată caldă una după alta?",
                    "...facă cel mai frumos om de zăpadă dacă ar ninge afară?",
                  ][promptIndex % 8]}
                </p>
                <span className="text-xs text-[#7E7468] italic">
                  La 3, 2, 1... toată lumea arată cu degetul spre persoana aleasă!
                </span>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setPromptIndex((prev) => (prev + 1) % 8)}
                  className="bg-[#2E5844] hover:bg-[#172F24] text-white px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Următoarea provocare →
                </button>
              </div>
            </div>
          )}

          {/* GENERAL CHECKLIST / ACTION STEPS FOR ALL DAYS */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EAE3D5] shadow-xs space-y-3">
            <h4 className="font-serif text-base font-semibold text-[#2C0B12]">
              {isHu ? "Gyakorlati lépések mára:" : isEn ? "Action steps for today:" : "Pașii concreți pentru astăzi:"}
            </h4>
            <div className="space-y-2">
              {day.content.actionSteps.map((step, idx) => {
                const checkKey = `day_${day.id}_step_${idx}`;
                const isChecked = !!userProgress.checklistStates[checkKey];
                return (
                  <div
                    key={idx}
                    onClick={() => onUpdateChecklist(checkKey, !isChecked)}
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer text-xs sm:text-sm transition-colors ${
                      isChecked
                        ? 'bg-[#F4F8F6] border-[#2E5844]/40 text-[#172F24]'
                        : 'bg-[#FAF7F2] border-[#EAE3D5] text-[#4A453E] hover:bg-white'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-md border shrink-0 mt-0.5 flex items-center justify-center ${
                      isChecked ? 'bg-[#2E5844] border-[#2E5844] text-white' : 'border-[#A8A096]'
                    }`}>
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className={isChecked ? 'line-through text-[#7E7468]' : ''}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reflection Question */}
          {day.content.reflectionQuestion && (
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#C29B48]/30 space-y-2">
              <span className="text-xs font-semibold text-[#C29B48] uppercase tracking-wider block">
                {isHu ? "Napi elcsendesedés & kérdés:" : isEn ? "Daily reflection question:" : "Întrebare de reflecție:"}
              </span>
              <p className="font-serif text-base font-medium text-[#2C0B12] italic">
                „{day.content.reflectionQuestion}”
              </p>
              <textarea
                rows={2}
                placeholder={
                  isHu
                    ? "Jegyezd fel a gondolatodat ide (automatikusan mentődik)..."
                    : isEn
                    ? "Write your thoughts here (auto-saved)..."
                    : "Notează-ți gândul aici (se salvează automat)..."
                }
                value={currentNote}
                onChange={(e) => onUpdateUserNote(day.id, e.target.value)}
                className="w-full bg-white border border-[#EAE3D5] rounded-xl p-3 text-xs text-[#2C0B12] focus:border-[#C29B48] outline-hidden"
              />
            </div>
          )}
        </div>

        {/* Modal Footer: Mark as Complete & Print Trigger */}
        <div className="px-5 sm:px-8 py-4 bg-white border-t border-[#EAE3D5] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#7E7468]">
            {isCompleted ? (
              <span className="text-[#2E5844] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                {isHu
                  ? "Ezt a napot sikeresen teljesítetted!"
                  : isEn
                  ? "This day has been marked as complete!"
                  : "Această zi a fost marcată ca finalizată!"}
              </span>
            ) : (
              <span>
                {isHu
                  ? "Tedd meg a mai lépést, és pipáld ki a napot a haladáshoz."
                  : isEn
                  ? "Complete today's action and check the day to advance."
                  : "Finalizează acțiunea și bifează ziua pentru a avansa în calendar."}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {day.printableResource && (
              <button
                onClick={() => onOpenPrintable(day.printableResource!.id)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#2E5844] text-[#2E5844] hover:bg-[#E6EFEA] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isHu ? "Munkalap letöltése (PDF)" : isEn ? "Download Sheet (PDF)" : "Descarcă Fișa (PDF)"}</span>
              </button>
            )}

            <button
              onClick={handleCompleteClick}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                isCompleted
                  ? 'bg-[#2E5844] text-white hover:bg-[#172F24]'
                  : 'bg-[#621927] hover:bg-[#46121C] text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-[#D8B76E]" />
              <span>
                {isCompleted
                  ? isHu
                    ? "Befejezve!"
                    : isEn
                    ? "Completed"
                    : "Completat cu succes"
                  : isHu
                  ? "Megjelölés készként"
                  : isEn
                  ? "Mark as complete"
                  : "Marchează ca finalizat"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
