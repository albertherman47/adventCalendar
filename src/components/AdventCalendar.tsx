import React, { useState } from 'react';
import { Sparkles, Calendar, Award, CheckCircle2, Lock, Unlock, Eye, Filter, ArrowLeft } from 'lucide-react';
import { SupportedLanguage, DayData, PhaseId, UserProgress } from '../types';
import { getTranslations } from '../data/translations';
import { AdventDoor } from './AdventDoor';
import { trackEvent } from '../utils/analytics';

interface AdventCalendarProps {
  language: SupportedLanguage;
  days: DayData[];
  userProgress: UserProgress;
  onOpenDayModal: (day: DayData) => void;
  onTogglePreviewMode: () => void;
  onBackToLanding: () => void;
}

export const AdventCalendar: React.FC<AdventCalendarProps> = ({
  language,
  days,
  userProgress,
  onOpenDayModal,
  onTogglePreviewMode,
  onBackToLanding,
}) => {
  const t = getTranslations(language);
  const [selectedPhase, setSelectedPhase] = useState<PhaseId | 0>(0);

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

  // Determine which doors are unlocked:
  // In preview mode: ALL 24 days are unlocked.
  // In normal mode: check unlockedDays array or day.id <= simulated day
  const isDayUnlocked = (dayId: number) => {
    if (userProgress.isPreviewMode) return true;
    if (userProgress.hasPurchased) {
      // In purchased mode, if user opened days or today is in December
      return userProgress.unlockedDays.includes(dayId) || dayId <= 1; // At least Day 1 is always ready
    }
    return userProgress.unlockedDays.includes(dayId) || dayId === 1;
  };

  const filteredDays = selectedPhase === 0
    ? days
    : days.filter((d) => d.phase === selectedPhase);

  const handleDoorClick = (day: DayData) => {
    trackEvent('advent_day_open', { dayId: day.id, title: day.title });
    onOpenDayModal(day);
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Breadcrumb / Return */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#7E7468] hover:text-[#621927] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.nav.backToHome}</span>
        </button>

        {/* Creator Preview Mode Banner & Toggle */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#EAE3D5] text-xs text-[#5E574D] shadow-xs">
            <span className={`w-2 h-2 rounded-full ${userProgress.isPreviewMode ? 'bg-[#2E5844]' : 'bg-[#A8A096]'}`} />
            <span className="font-medium">
              {userProgress.isPreviewMode ? "Mod Creator: Toate 24 de uși deblocate" : "Mod Calendar: Deblocare zilnică"}
            </span>
          </div>

          <button
            onClick={onTogglePreviewMode}
            className={`text-xs px-3 py-1.5 rounded-xl border font-semibold transition-all cursor-pointer ${
              userProgress.isPreviewMode
                ? 'bg-[#2E5844] text-white border-[#2E5844]'
                : 'bg-[#621927] text-white border-[#621927] hover:bg-[#46121C]'
            }`}
          >
            {userProgress.isPreviewMode ? "Comută la modul normal" : "Deblochează toate cele 24 zile"}
          </button>
        </div>
      </div>

      {/* Calendar Header & Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F2] border border-[#C29B48]/40 text-xs font-semibold text-[#621927] mb-3">
          <Calendar className="w-3.5 h-3.5 text-[#C29B48]" />
          <span>Christmas Reset 2026 • 1–24 Decembrie</span>
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
              Fiecare zi bifată aduce mai multă liniște în casa ta.
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#621927]">
              {completedCount}
            </span>
            <span className="text-sm font-medium text-[#7E7468] ml-1">
              / 24 {t.gamification.completedLabel}
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-[#FAF7F2] h-3 rounded-full overflow-hidden border border-[#EAE3D5] p-0.5 mb-3">
          <div
            className="bg-gradient-to-r from-[#C29B48] via-[#7E2232] to-[#2E5844] h-full rounded-full transition-all duration-500"
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
            <span>Deschide Ușa 1 pentru a începe călătoria ta de 24 de zile.</span>
            <span className="text-[11px] text-[#C29B48] font-medium">Primul pas: Bugetul</span>
          </div>
        )}
      </div>

      {/* Phase Filter Tabs */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setSelectedPhase(0)}
          className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
            selectedPhase === 0
              ? 'bg-[#621927] text-white shadow-xs'
              : 'bg-white text-[#5E574D] border border-[#EAE3D5] hover:bg-[#FAF7F2]'
          }`}
        >
          {t.calendar.filterAll}
        </button>
        <button
          onClick={() => setSelectedPhase(1)}
          className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
            selectedPhase === 1
              ? 'bg-[#621927] text-white shadow-xs'
              : 'bg-white text-[#5E574D] border border-[#EAE3D5] hover:bg-[#FAF7F2]'
          }`}
        >
          {t.calendar.filterPhase1}
        </button>
        <button
          onClick={() => setSelectedPhase(2)}
          className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
            selectedPhase === 2
              ? 'bg-[#2E5844] text-white shadow-xs'
              : 'bg-white text-[#5E574D] border border-[#EAE3D5] hover:bg-[#FAF7F2]'
          }`}
        >
          {t.calendar.filterPhase2}
        </button>
        <button
          onClick={() => setSelectedPhase(3)}
          className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
            selectedPhase === 3
              ? 'bg-[#C29B48] text-[#2C0B12] font-semibold shadow-xs'
              : 'bg-white text-[#5E574D] border border-[#EAE3D5] hover:bg-[#FAF7F2]'
          }`}
        >
          {t.calendar.filterPhase3}
        </button>
        <button
          onClick={() => setSelectedPhase(4)}
          className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
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
          const unlocked = isDayUnlocked(day.id);
          const completed = userProgress.completedDays.includes(day.id);
          const isToday = day.id === 1; // Default to Day 1 as active today focus

          return (
            <AdventDoor
              key={day.id}
              day={day}
              language={language}
              isUnlocked={unlocked}
              isCompleted={completed}
              isToday={isToday}
              onClick={() => handleDoorClick(day)}
            />
          );
        })}
      </div>

      {/* Quick Helper Notice */}
      <div className="mt-12 text-center text-xs text-[#7E7468] max-w-xl mx-auto space-y-2">
        <p>
          💡 <strong>{language === 'hu' ? "Napi rituálé tipp:" : "Sfat de ritual:"}</strong>{" "}
          {language === 'hu'
            ? "Válassz ki egy fix időpontot minden nap (például a reggeli kávé mellett vagy este lefekvés előtt) a napi adventi ablak kinyitására."
            : "Păstrează aceeași oră în fiecare zi (de exemplu, dimineața la cafea sau seara înainte de culcare) pentru a deschide ușa din calendar."}
        </p>
        <p>
          {language === 'hu'
            ? "A haladásod automatikusan mentődik ezen a készüléken. Nem veszítesz el egyetlen listát vagy feljegyzést sem."
            : "Progresul tău este memorat automat pe acest dispozitiv. Nu vei pierde nicio listă sau bifă."}
        </p>
      </div>
    </div>
  );
};
