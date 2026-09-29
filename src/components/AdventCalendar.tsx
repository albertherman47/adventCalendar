import React, { useState } from 'react';
import { Sparkles, Calendar, Award, CheckCircle2, Lock, Unlock, Eye, Filter, ArrowLeft, Clock, RefreshCw, CalendarDays, Compass, Star, Crown, ArrowRight } from 'lucide-react';
import { SupportedLanguage, DayData, PhaseId, UserProgress, PricingTier } from '../types';
import { getTranslations } from '../data/translations';
import { AdventDoor } from './AdventDoor';
import { trackEvent } from '../utils/analytics';
import { getCalendarDateInfo } from '../utils/calendarDate';
import { checkFeatureAccess } from '../lib/subscriptionService';

interface AdventCalendarProps {
  language: SupportedLanguage;
  days: DayData[];
  userProgress: UserProgress;
  onOpenDayModal: (day: DayData) => void;
  onBackToLanding: () => void;
  onUpdateStartDate?: (newStartDate: string) => void;
  onOpenPaywall?: (day?: DayData) => void;
}

export const AdventCalendar: React.FC<AdventCalendarProps> = ({
  language,
  days,
  userProgress,
  onOpenDayModal,
  onBackToLanding,
  onUpdateStartDate,
  onOpenPaywall,
}) => {
  const t = getTranslations(language);
  const [selectedPhase, setSelectedPhase] = useState<PhaseId | 0>(0);
  const isHu = language === 'hu';

  const userTier: PricingTier = userProgress.selectedTier || (userProgress.hasPurchased ? 'premium' : 'free');

  // Date calculation based on actual start date and today's date
  const dateInfo = getCalendarDateInfo(userProgress.startDate, language);
  const completedCount = userProgress.completedDays.length;
  const progressPercent = Math.round((completedCount / 24) * 100);

  // Active milestone calculation
  const getActiveMilestone = () => {
    const milestones = t.gamification.milestones;
    if (completedCount >= 24) return milestones[4];
    if (completedCount >= 18) return milestones[3];
    if (completedCount >= 12) return milestones[2];
    if (completedCount >= 7) return milestones[1];
    if (completedCount >= 3) return milestones[0];
    return null;
  };

  const currentMilestone = getActiveMilestone();

  // Tier gating logic:
  // If user is on Free (and not preview mode), days other than 1 and 4 are tier-locked!
  const isDoorTierLocked = (dayId: number) => {
    if (userProgress.isPreviewMode) return false;
    if (userTier === 'premium' || userTier === 'standard') return false;
    const access = checkFeatureAccess('day', userTier, dayId);
    return !access.allowed;
  };

  const isDayUnlocked = (dayId: number) => {
    if (userProgress.isPreviewMode) return true;
    if (userProgress.hasPurchased || userTier === 'standard' || userTier === 'premium') {
      return userProgress.unlockedDays.includes(dayId) || dayId <= dateInfo.currentDayNumber;
    }
    return dayId === 1 || dayId === 4;
  };

  const filteredDays = selectedPhase === 0
    ? days
    : days.filter((d) => d.phase === selectedPhase);

  const handleDoorClick = (day: DayData) => {
    if (isDoorTierLocked(day.id)) {
      if (onOpenPaywall) {
        onOpenPaywall(day);
      }
      return;
    }

    trackEvent('advent_day_open', { dayId: day.id, title: day.title });
    onOpenDayModal(day);
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Breadcrumb & User Tier Status Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#7E7468] hover:text-[#621927] transition-colors cursor-pointer min-h-[40px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.nav.backToHome}</span>
        </button>

        {/* Start Date */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#EAE3D5] text-xs text-[#5E574D] shadow-xs">
            <CalendarDays className="w-3.5 h-3.5 text-[#C29B48]" />
            <span className="text-[#8E867B]">{isHu ? "Kezdés:" : "Start:"}</span>
            <span className="font-semibold text-[#2C0B12]">{dateInfo.startDateFormatted}</span>
          </div>

        </div>
      </div>

      {/* Customer Tier Notification Bar */}
      <div className="mb-8">
        {userTier === 'free' && !userProgress.isPreviewMode && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FAF7F2] via-white to-[#F7EAEF] border border-[#C29B48]/50 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#621927] text-[#D8B76E] flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-[#2C0B12] text-sm">
                  {isHu ? 'Ingyenes Csomag: 1. és 4. nap megnyitva próbaként' : 'Free Preview: Day 1 & 4 available'}
                </p>
                <p className="text-[#7E7468]">
                  {isHu 
                    ? 'A 24 nap teljes élményéhez és a nyomtatható tervezőkhöz válaszd a Standard vagy Prémium csomagot!' 
                    : 'Unlock all 24 days and printable planners with Standard or Premium!'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenPaywall && onOpenPaywall()}
              className="bg-[#621927] hover:bg-[#46121C] text-white px-4 py-2 rounded-xl font-bold tracking-wide transition-all shadow-sm flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D8B76E]" />
              <span>{isHu ? 'Csomag feloldása (€9.90-től)' : 'Unlock Full Access'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D8B76E]" />
            </button>
          </div>
        )}

        {userTier === 'standard' && (
          <div className="p-3.5 rounded-2xl bg-[#E6EFEA] border border-[#2E5844]/30 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#2E5844]">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#2E5844] shrink-0" />
              <span className="font-semibold text-sm">
                {isHu ? 'Standard csomag aktív ✓ Mind a 24 nap elérhető!' : 'Standard Plan Active ✓ All 24 days unlocked!'}
              </span>
            </div>

            <button
              onClick={() => onOpenPaywall && onOpenPaywall()}
              className="text-xs font-bold text-[#621927] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{isHu ? 'Bővíts Prémiumra a Vészhelyzet Módhoz (+€5)' : 'Upgrade to Premium for Emergency Mode (+€5)'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}

        {userTier === 'premium' && (
          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#C29B48]/50 shadow-xs flex items-center justify-between text-xs text-[#621927]">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#C29B48]" />
              <span className="font-bold">
                {isHu ? 'Prémium Licenc Aktív ★ Minden funkció és letöltés korlátlanul elérhető' : 'Premium Lifetime Active ★ All features & downloads unlocked'}
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#621927] text-[#D8B76E] text-[10px] font-bold uppercase tracking-wider">
              VIP ELÉRÉS
            </span>
          </div>
        )}
      </div>

      {/* Calendar Header & Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F2] border border-[#C29B48]/40 text-xs font-semibold text-[#621927] mb-3 shadow-xs">
          <Calendar className="w-3.5 h-3.5 text-[#C29B48]" />
          <span>
            {isHu ? `Kezdve: ${dateInfo.startDateFormatted} • Ma a(z) ${dateInfo.currentDayNumber}. nap aktív` : `Started: ${dateInfo.startDateFormatted}`}
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C0B12] mb-3">
          {t.calendar.title}
        </h1>
        <p className="text-sm sm:text-base text-[#6B645B] max-w-xl mx-auto">
          {t.calendar.subtitle}
        </p>
      </div>

      {/* Progress & Gamification Panel */}
      <div className="mb-10 max-w-4xl mx-auto bg-white rounded-2xl p-5 sm:p-7 border border-[#EAE3D5] shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C29B48]" />
              <span className="font-serif text-lg font-semibold text-[#2C0B12]">
                {t.gamification.title}
              </span>
            </div>
            <p className="text-xs text-[#7E7468] mt-0.5">
              {isHu ? `Napra pontos haladás a kezdés óta • ${dateInfo.daysRemainingToChristmas} nap van még Szentestéig.` : `${dateInfo.daysRemainingToChristmas} days until Christmas.`}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#621927]">
              {completedCount}
            </span>
            <span className="text-sm font-medium text-[#7E7468] ml-1">
              / 24 {t.gamification.completedLabel} ({progressPercent}%)
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-[#FAF7F2] h-3 rounded-full overflow-hidden border border-[#EAE3D5] p-0.5 mb-3">
          <div
            className="bg-gradient-to-r from-[#C29B48] via-[#7E2232] to-[#2E5844] h-full rounded-full transition-all duration-500 shadow-xs"
            style={{ width: `${Math.max(progressPercent, 4)}%` }}
          />
        </div>

        {/* Milestone Message */}
        {currentMilestone ? (
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#F1E9DB] text-xs">
            <div className="flex items-center gap-2 text-[#2E5844] font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#2E5844] shrink-0" />
              <span>{currentMilestone.message}</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#C29B48]/40 text-[#C29B48] font-semibold text-[11px] shrink-0">
              {currentMilestone.badge}
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#F1E9DB] text-xs text-[#7E7468]">
            <span>
              {isHu ? "Nyisd ki a mai ablakot a napi lépéshez és a lelki nyugalomhoz." : "Open today's door for your ritual."}
            </span>
            <span className="text-[11px] text-[#C29B48] font-medium">
              {isHu ? `Mai fókusz: ${dateInfo.currentDayNumber}. nap` : `Focus: Day ${dateInfo.currentDayNumber}`}
            </span>
          </div>
        )}
      </div>

      {/* Phase Filter Tabs - Edge-to-edge smooth touch scrolling */}
      <div className="flex items-center justify-start sm:justify-center gap-1 sm:gap-2 mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
        <button
          onClick={() => setSelectedPhase(0)}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer min-h-[44px] flex items-center justify-center ${
            selectedPhase === 0
              ? 'bg-[#621927] text-white shadow-xs'
              : 'bg-white text-[#5E574D] border border-[#EAE3D5] hover:bg-[#FAF7F2]'
          }`}
        >
          {t.calendar.filterAll}
        </button>
        <button
          onClick={() => setSelectedPhase(1)}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer min-h-[44px] flex items-center justify-center ${
            selectedPhase === 1
              ? 'bg-[#621927] text-white shadow-xs'
              : 'bg-white text-[#5E574D] border border-[#EAE3D5] hover:bg-[#FAF7F2]'
          }`}
        >
          {t.calendar.filterPhase1}
        </button>
        <button
          onClick={() => setSelectedPhase(2)}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer min-h-[44px] flex items-center justify-center ${
            selectedPhase === 2
              ? 'bg-[#2E5844] text-white shadow-xs'
              : 'bg-white text-[#5E574D] border border-[#EAE3D5] hover:bg-[#FAF7F2]'
          }`}
        >
          {t.calendar.filterPhase2}
        </button>
        <button
          onClick={() => setSelectedPhase(3)}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer min-h-[44px] flex items-center justify-center ${
            selectedPhase === 3
              ? 'bg-[#C29B48] text-[#2C0B12] font-semibold shadow-xs'
              : 'bg-white text-[#5E574D] border border-[#EAE3D5] hover:bg-[#FAF7F2]'
          }`}
        >
          {t.calendar.filterPhase3}
        </button>
        <button
          onClick={() => setSelectedPhase(4)}
          className={`px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer min-h-[44px] flex items-center justify-center ${
            selectedPhase === 4
              ? 'bg-[#7E2232] text-white shadow-xs'
              : 'bg-white text-[#5E574D] border border-[#EAE3D5] hover:bg-[#FAF7F2]'
          }`}
        >
          {t.calendar.filterPhase4}
        </button>
      </div>

      {/* 24 Doors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {filteredDays.map((day) => {
          const tierLocked = isDoorTierLocked(day.id);
          const unlocked = isDayUnlocked(day.id);
          const completed = userProgress.completedDays.includes(day.id);
          const isToday = day.id === dateInfo.currentDayNumber;

          return (
            <AdventDoor
              key={day.id}
              day={day}
              language={language}
              isUnlocked={unlocked}
              isCompleted={completed}
              isToday={isToday}
              isTierLocked={tierLocked}
              onClick={() => handleDoorClick(day)}
              onOpenPaywall={() => onOpenPaywall && onOpenPaywall(day)}
            />
          );
        })}
      </div>

      {/* Quick Helper Notice */}
      <div className="mt-12 text-center text-xs text-[#7E7468] max-w-xl mx-auto space-y-2">
        <p>
          💡 <strong>{isHu ? "Napi rituálé tipp:" : "Tip:"}</strong>{" "}
          {isHu 
            ? "Minden nap egyetlen apró lépést tegyél meg. Nem kell sietned: a rendszer automatikusan szinkronizálja és menti a haladásod a felhőbeli adatbázisban." 
            : "Take one step each day for a peaceful Christmas."}
        </p>
      </div>
    </div>
  );
};
