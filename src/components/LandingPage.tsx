import React, { useState } from 'react';
import { SupportedLanguage, DayData, PricingTier, UserProgress } from '../types';
import { getCalendarDateInfo } from '../utils/calendarDate';
import { getTranslations } from '../data/translations';
import { getObstaclesData, getPhilosophyData, getFinalCtaData } from '../data/landingSections';
import { PRINTABLE_RESOURCES, getLocalizedText } from '../data/printableResources';
import { Lock, Sparkles, Check, Clock, Calendar, Star, Compass } from 'lucide-react';

interface LandingPageProps {
  language: SupportedLanguage;
  days: DayData[];
  userProgress?: UserProgress;
  onStartClick: () => void;
  onExploreCalendarClick: () => void;
  onSelectDay: (day: DayData) => void;
  onSelectTier: (tier: PricingTier) => void;
  onOpenStarterPack?: () => void;
  onOpenPrintable?: (resourceId: string) => void;
  onNavigateEmergency?: () => void;
  onNavigateGifts?: () => void;
  onNavigateCardStudio?: () => void;
  onToggleChecklist?: (key: string, value: boolean) => void;
  onOpenRestoreModal?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  language,
  days,
  userProgress,
  onStartClick,
  onExploreCalendarClick,
  onSelectDay,
  onSelectTier,
  onOpenStarterPack,
  onOpenPrintable,
  onNavigateEmergency,
  onNavigateGifts,
  onNavigateCardStudio,
  onToggleChecklist,
  onOpenRestoreModal,
}) => {
  // Local state for interactive preview checklist
  const [previewChecklist, setPreviewChecklist] = useState<Record<string, boolean>>({
    step1: true,
    step2: false,
    step3: false,
  });

  const handleChecklistToggle = (key: string) => {
    const nextVal = !previewChecklist[key];
    setPreviewChecklist((prev) => ({
      ...prev,
      [key]: nextVal,
    }));
    if (onToggleChecklist) {
      onToggleChecklist(key, nextVal);
    }
  };

  // Calculate day accurate information
  const t = getTranslations(language);
  const dateInfo = getCalendarDateInfo(userProgress?.startDate, language);
  const isHu = language === 'hu';
  const isEn = language === 'en';

  const completedDoorsCount = userProgress?.completedDays?.length ?? 1;
  const isDayCompleted = (id: number) => {
    if (userProgress?.completedDays) {
      return userProgress.completedDays.includes(id);
    }
    return id === 1;
  };

  const getDayByNumber = (num: number) => {
    return days.find((d) => d.id === num) || days[0];
  };

  const getDoorTitle = (dayNum: number): string => {
    return t.doorTitles[dayNum] || days.find((d) => d.id === dayNum)?.title || `${dayNum}. nap`;
  };

  const activeDayData = getDayByNumber(dateInfo.currentDayNumber);
  const philosophy = getPhilosophyData(language);
  const obstacles = getObstaclesData(language);
  const finalCta = getFinalCtaData(language);

  return (
    <div className="flex flex-col w-full">
      {/* Top Subtle Botanical Border Band */}
      <div className="w-full bg-surface-container-high py-1.5 px-6 flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
        <span className="tracking-widest uppercase flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          {t.landing.editionBand}
        </span>
        <span className="hidden md:inline italic font-headline-sm text-[13px] tracking-normal text-on-surface-variant">
          {t.landing.subtlePoem}
        </span>
        <span className="font-label-uppercase text-label-uppercase text-primary">{t.landing.dateRange}</span>
      </div>

      {/* SECTION 1: HERO & ADVENT CALENDAR GRID */}
      <section className="w-full px-6 lg:px-12 py-12 lg:py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Editorial Pitch */}
          <div className="lg:col-span-6 flex flex-col justify-center pt-2">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded bg-surface-container-high text-primary font-label-uppercase text-label-uppercase mb-6 shadow-xs">
              <span className="material-symbols-outlined text-[14px]">nest_eco_leaf</span>
              {t.landing.heroBadge}
            </div>
            <h1 className="font-display text-display text-primary tracking-tight leading-[1.08] mb-6 font-serif">
              {t.hero.headline}
            </h1>
            <p className="font-headline-sm text-headline-sm italic font-normal text-on-surface-variant mb-6 leading-relaxed">
              {t.tagline}
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-xl">
              {t.landing.heroPitch}
            </p>

            {/* CTA Cluster */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <button
                onClick={() => onSelectTier('standard')}
                className="px-7 py-3.5 rounded bg-primary-container text-on-primary font-label-lg text-label-lg hover:bg-primary transition-all duration-200 shadow-md text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.hero.primaryCta}</span>
                <span className="text-tertiary-fixed font-normal text-body-sm">(9,90 €)</span>
              </button>
              <a
                href="#calendar-preview"
                className="px-6 py-3.5 rounded bg-surface-container text-primary font-label-lg text-label-lg hover:bg-surface-container-high transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.hero.secondaryCta}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
              </a>
            </div>

            {/* Social Proof Metrics */}
            <div className="pt-6 border-t border-surface-container-highest grid grid-cols-3 gap-4">
              <div>
                <span className="block font-headline-md text-headline-md text-primary font-serif">{t.landing.metric1Value}</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">{t.landing.metric1Label}</span>
              </div>
              <div>
                <span className="block font-headline-md text-headline-md text-primary font-serif">{t.landing.metric2Value}</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">{t.landing.metric2Label}</span>
              </div>
              <div>
                <span className="block font-headline-md text-headline-md text-secondary font-serif">{t.landing.metric3Value}</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">{t.landing.metric3Label}</span>
              </div>
            </div>
          </div>

          {/* Right: Tactile 24-Door Advent Calendar Grid with Physical Mysterious Doors */}
          <div className="lg:col-span-6 bg-[#201518] p-6 lg:p-8 rounded-2xl shadow-xl border border-[#D8B76E]/20 relative overflow-hidden" id="calendar-preview">
            {/* Subtle vintage parchment / star grain background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D8B76E_1px,transparent_1px)] [background-size:14px_14px]" />

            {/* Calendar header with exact start date indicator */}
            <div className="relative z-10 flex flex-wrap items-center justify-between pb-5 mb-5 border-b border-[#D8B76E]/20 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D8B76E]">
                    {t.landing.adventAtelier}
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#D8B76E]/15 border border-[#D8B76E]/30 text-[#EEDCB2] font-mono">
                    {t.landing.startedOn} {dateInfo.startDateFormatted}
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FDF8F0] mt-0.5">
                  {t.landing.doorsTitle}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-[#E6F3EC] bg-[#2E5844]/80 border border-[#2E5844] px-2.5 py-1 rounded-full font-medium shadow-xs">
                  <Check className="w-3.5 h-3.5 text-[#86E3B8]" />
                  <span>{completedDoorsCount}/24 {t.landing.completed}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-[#2E0A10] bg-gradient-to-r from-[#F4E1B5] to-[#D8B76E] px-2.5 py-1 rounded-full font-bold shadow-xs">
                  <Clock className="w-3 h-3 text-[#2E0A10]" />
                  <span>{dateInfo.currentDayNumber}. {t.landing.todayActive}</span>
                </span>
              </div>
            </div>

            {/* 24 Physical Advent Doors Matrix */}
            <div className="relative z-10 grid grid-cols-4 sm:grid-cols-6 gap-2.5 sm:gap-3">
              {Array.from({ length: 24 }, (_, i) => i + 1).map((dayNum) => {
                const isCompleted = isDayCompleted(dayNum);
                const isActive = dayNum === dateInfo.currentDayNumber;
                const isUnlocked = isCompleted || isActive || (userProgress?.unlockedDays?.includes(dayNum)) || (userProgress?.isPreviewMode);
                const title = getDoorTitle(dayNum);
                const dayData = getDayByNumber(dayNum);

                // 1. ACTIVE TODAY'S DOOR (Golden glow, physical embossed frame)
                if (isActive) {
                  return (
                    <div
                      key={dayNum}
                      onClick={() => onSelectDay(dayData)}
                      className="aspect-square bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F2E8D2] rounded-xl p-2 sm:p-2.5 flex flex-col justify-between shadow-xl relative group cursor-pointer transition-all duration-300 hover:-translate-y-1 animate-glow-active border-2 border-[#D8B76E]"
                      title={`${dayNum}. ${t.landing.todayOpen}`}
                    >
                      {/* Wax Seal effect indicator */}
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-lg sm:text-xl font-bold text-[#4A151B]">
                          {dayNum < 10 ? `0${dayNum}` : dayNum}
                        </span>
                        <div className="w-4 h-4 rounded-full bg-[#D8B76E] flex items-center justify-center shadow-xs">
                          <Sparkles className="w-2.5 h-2.5 text-[#2E0A10] animate-pulse" />
                        </div>
                      </div>
                      <div className="mt-auto">
                        <span className="block text-[8px] font-bold text-[#2E0A10] bg-[#D8B76E] px-1 py-0.5 rounded uppercase tracking-wider text-center shadow-xs">
                          {t.landing.todayOpen}
                        </span>
                        <span className="block text-[10px] font-serif text-[#2E0A10] font-bold mt-1 truncate">
                          {title}
                        </span>
                      </div>
                    </div>
                  );
                }

                // 2. COMPLETED DOOR (Warm celebratory green & gold seal)
                if (isCompleted) {
                  return (
                    <div
                      key={dayNum}
                      onClick={() => onSelectDay(dayData)}
                      className="aspect-square bg-gradient-to-b from-[#2E5844] to-[#1E3B2D] rounded-xl p-2 sm:p-2.5 flex flex-col justify-between shadow-md group cursor-pointer transition-all duration-300 hover:scale-105 border border-[#86E3B8]/30 relative overflow-hidden"
                      title={`${dayNum}. ${t.landing.completed}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-base sm:text-lg font-bold text-[#EEDCB2]">
                          {dayNum < 10 ? `0${dayNum}` : dayNum}
                        </span>
                        <div className="w-4 h-4 rounded-full bg-[#86E3B8] text-[#1E3B2D] flex items-center justify-center shadow-inner">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      </div>
                      <div className="mt-auto">
                        <span className="block text-[8px] text-[#A2D5BE] uppercase font-semibold tracking-wider truncate">
                          {t.landing.completed}
                        </span>
                        <span className="block text-[9px] text-[#FFFFFF] font-medium truncate">
                          {title}
                        </span>
                      </div>
                      {/* Subtle completed ribbon */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D8B76E]" />
                    </div>
                  );
                }

                // 3. CHRISTMAS EVE - DAY 24 (Grand golden climax door)
                if (dayNum === 24) {
                  return (
                    <div
                      key={dayNum}
                      onClick={() => onSelectDay(dayData)}
                      className="aspect-square bg-gradient-to-br from-[#4A151B] via-[#330C12] to-[#1A0508] rounded-xl p-2 sm:p-2.5 flex flex-col justify-between border border-[#D8B76E]/60 shadow-lg cursor-pointer hover:border-[#D8B76E] hover:scale-105 transition-all relative group"
                      title={`24. ${t.landing.eveClimax}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-lg font-bold text-[#D8B76E] group-hover:text-[#FFF8E7] transition-colors">
                          24
                        </span>
                        <Star className="w-3.5 h-3.5 text-[#D8B76E] animate-pulse" />
                      </div>
                      <div className="mt-auto">
                        <span className="block text-[8px] text-[#D8B76E] font-bold uppercase tracking-widest text-center bg-white/5 py-0.5 rounded">
                          {t.landing.eveClimax}
                        </span>
                        <span className="block text-[9px] text-[#FFF8E7] font-serif font-semibold truncate mt-0.5">
                          {title}
                        </span>
                      </div>
                    </div>
                  );
                }

                // 4. UNLOCKED BUT NOT YET COMPLETED DOORS (Open parchment style)
                if (isUnlocked) {
                  return (
                    <div
                      key={dayNum}
                      onClick={() => onSelectDay(dayData)}
                      className="aspect-square bg-[#FAF6EE] rounded-xl p-2 sm:p-2.5 flex flex-col justify-between border border-[#E4D9C5] shadow-sm cursor-pointer hover:border-[#D8B76E] hover:-translate-y-0.5 transition-all group"
                      title={`${dayNum}. ${title}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-base font-bold text-[#621927]">
                          {dayNum < 10 ? `0${dayNum}` : dayNum}
                        </span>
                        <Sparkles className="w-3 h-3 text-[#C29B48] opacity-70 group-hover:opacity-100" />
                      </div>
                      <span className="block text-[9px] text-[#554C42] font-medium truncate mt-auto">
                        {title}
                      </span>
                    </div>
                  );
                }

                // 5. MYSTERIOUS LOCKED PHYSICAL DOORS (Atmospheric wax seal, starry constellation, dark textured wood)
                return (
                  <div
                    key={dayNum}
                    onClick={() => onSelectDay(dayData)}
                    className="aspect-square rounded-xl p-2 sm:p-2.5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-105 border border-[#D8B76E]/20 hover:border-[#D8B76E]/60 relative overflow-hidden group bg-gradient-to-br from-[#2D1B20] via-[#1F1215] to-[#150B0D] shadow-inner"
                    title={`Dec. ${dayNum}.`}
                  >
                    {/* Simulated door hinge seam on the left */}
                    <div className="absolute left-1 top-2 bottom-2 w-[1.5px] bg-[#D8B76E]/15 rounded-full" />

                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base sm:text-lg font-bold text-[#D8B76E]/60 group-hover:text-[#EEDCB2] transition-colors">
                        {dayNum < 10 ? `0${dayNum}` : dayNum}
                      </span>
                      {/* Physical miniature vintage lock */}
                      <div className="w-4 h-4 rounded-full bg-white/5 border border-[#D8B76E]/30 flex items-center justify-center group-hover:bg-[#D8B76E]/20 transition-colors">
                        <Lock className="w-2.5 h-2.5 text-[#D8B76E]/60 group-hover:text-[#EEDCB2]" />
                      </div>
                    </div>

                    {/* Mystery center whisper */}
                    <div className="my-auto text-center">
                      <span className="block text-[8px] italic font-serif text-[#D8B76E]/70 group-hover:text-[#EEDCB2] transition-colors">
                        ✦ {language === 'hu' ? 'Titok...' : language === 'de' ? 'Geheimnis...' : language === 'ro' ? 'Mister...' : 'Mystery...'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[8px] text-[#D8B76E]/40 group-hover:text-[#D8B76E]/70">
                      <span>Dec.</span>
                      <span className="font-mono">{dayNum}.</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer info bar with physical calendar reassurance */}
            <div className="relative z-10 mt-5 flex flex-wrap items-center justify-between pt-4 border-t border-[#D8B76E]/20 text-[#D8B76E]/80 text-xs gap-3">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D8B76E]" />
                <span>
                  {language === 'hu'
                    ? "Valódi fizikai naptárak mintájára: a zárt ablakok titkot rejtenek, az elért napok aranylón felragyognak."
                    : language === 'de'
                    ? "Wie ein echter Adventskalender: Geschlossene Türchen hüten ein Geheimnis, vollendete Tage erstrahlen golden."
                    : language === 'ro'
                    ? "Creat după modelul fizic: ușile nedeschise păstrează misterul, iar cele completate strălucesc cald."
                    : "Modeled after classic tactile calendars: sealed doors hold mystery, while completed days glow warmly."}
                </span>
              </span>
              <button
                onClick={onExploreCalendarClick}
                className="text-[#EEDCB2] hover:text-white font-semibold uppercase tracking-wider text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>{t.nav.openCalendar} →</span>
              </button>
            </div>
          </div>
        </div>

        {/* Philosophy Banner */}
        <div className="mt-14 w-full p-6 sm:p-8 rounded-xl bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0 text-secondary mt-1">
              <span className="material-symbols-outlined text-[20px]">spa</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-primary font-serif mb-1">
                {philosophy.title}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                {philosophy.description}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="px-4 py-2 rounded bg-surface-container-highest text-primary font-label-uppercase text-label-uppercase tracking-wider">
              {philosophy.badge}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 5 BOTTLENECKS & TACTILE SOLUTIONS */}
      <section className="w-full bg-surface-container-low py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2">{obstacles.badge}</span>
            <h2 className="font-headline-lg text-headline-lg text-primary font-serif leading-tight mb-4">
              {obstacles.heading}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              {obstacles.description}
            </p>
          </div>

          {/* 5 Cards Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {obstacles.cards.map((card) => (
              <div
                key={card.id}
                onClick={() => {
                  if (card.navigateAction === 'gifts' && onNavigateGifts) onNavigateGifts();
                  else if (card.navigateAction === 'emergency' && onNavigateEmergency) onNavigateEmergency();
                  else onSelectDay(getDayByNumber(card.targetDay));
                }}
                className="bg-surface p-6 rounded-xl shadow-xs flex flex-col justify-between transition-all hover:shadow-md cursor-pointer hover:-translate-y-1"
              >
                <div>
                  <div className="w-9 h-9 rounded bg-surface-container flex items-center justify-center text-primary-container mb-4">
                    <span className="material-symbols-outlined text-[20px]">{card.icon}</span>
                  </div>
                  <span className="font-label-md text-label-md text-error tracking-wide uppercase block mb-1">{card.obstacleNumber}</span>
                  <h3 className="font-title-lg text-title-lg text-primary mb-2 font-serif">{card.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                    {card.problemText}
                  </p>
                </div>
                <div className="pt-4 border-t border-surface-container-high">
                  <span className="font-label-uppercase text-[10px] text-secondary tracking-widest block mb-1">{card.solutionBadge}</span>
                  <span className="font-headline-sm text-[17px] text-primary font-serif block">{card.solutionTitle}</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-1 block">{card.solutionDescription}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS */}
      <section className="w-full py-16 lg:py-24 px-6 lg:px-12 max-w-7xl mx-auto" id="cum-functioneaza">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2">{t.nav.concept.toUpperCase()}</span>
          <h2 className="font-headline-lg text-headline-lg text-primary font-serif">{t.howItWorks.heading}</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
            {t.howItWorks.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.howItWorks.steps.map((step, idx) => {
            const icons = ['meeting_room', 'hourglass_empty', 'night_shelter'];
            return (
              <div key={idx} className="p-8 rounded-xl bg-surface-container-low flex flex-col justify-between shadow-xs relative overflow-hidden">
                <span className="font-display text-[72px] leading-none font-serif text-outline-variant/40 absolute -right-2 -top-2 select-none">
                  {step.number}
                </span>
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary-container mb-6 shadow-xs">
                    <span className="material-symbols-outlined text-[20px]">{icons[idx] || 'star'}</span>
                  </div>
                  <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2">{step.number}. {language === 'hu' ? 'LÉPÉS' : language === 'de' ? 'SCHRITT' : language === 'ro' ? 'PASUL' : 'STEP'}</span>
                  <h3 className="font-headline-sm text-headline-sm text-primary font-serif mb-3">{step.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-surface-container-highest text-on-surface-variant font-body-sm text-body-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-secondary">check</span>
                  <span>{t.howItWorks.digitalDisclaimer}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: REALISTIC APP PREVIEW & INTERACTIVE DASHBOARD */}
      <section className="w-full bg-surface-container-low py-16 lg:py-24 px-6 lg:px-12" id="dashboard-preview">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2">
                {language === 'hu' ? "BELSŐ ÉLMÉNY" : language === 'de' ? "EINBLICK" : language === 'ro' ? "EXPERIENȚA DIN INTERIOR" : "INSIDE THE EXPERIENCE"}
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary font-serif">
                {language === 'hu'
                  ? `Napi Irányítópult • Dec. ${dateInfo.currentDayNumber}.`
                  : language === 'de'
                  ? `Tages-Dashboard • ${dateInfo.currentDayNumber}. Dez.`
                  : language === 'ro'
                  ? `Panoul Tău Zilnic • ${dateInfo.currentDayNumber} Decembrie`
                  : `Daily Dashboard • Dec ${dateInfo.currentDayNumber}`}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {language === 'hu'
                  ? `Kezdés: ${dateInfo.startDateFormatted} óta aktív`
                  : language === 'de'
                  ? `Aktiv seit: ${dateInfo.startDateFormatted}`
                  : language === 'ro'
                  ? `Activ de la: ${dateInfo.startDateFormatted}`
                  : `Active since: ${dateInfo.startDateFormatted}`}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
            </div>
          </div>

          {/* App Shell Simulation Mockup */}
          <div className="bg-surface rounded-xl shadow-md p-6 lg:p-10">
            {/* App Top Progress Bar & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-surface-container-high gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#4A151B] text-[#FDF8F0] flex items-center justify-center font-serif text-headline-sm font-bold shadow-md">
                  {dateInfo.currentDayNumber < 10 ? `0${dateInfo.currentDayNumber}` : dateInfo.currentDayNumber}
                </div>
                <div>
                  <span className="font-title-lg text-title-lg text-primary block">
                    {language === 'hu'
                      ? "Naprakész vagy a reseteddel"
                      : language === 'de'
                      ? "Sie sind perfekt im Plan"
                      : language === 'ro'
                      ? "Ești la zi cu resetul tău"
                      : "You are on track with your reset"}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {language === 'hu'
                      ? `${completedDoorsCount} / 24 nap teljesítve (${Math.round((completedDoorsCount / 24) * 100)}%) • Még ${dateInfo.daysRemainingToChristmas} nap Szentestéig`
                      : language === 'de'
                      ? `${completedDoorsCount} von 24 Tagen abgeschlossen (${Math.round((completedDoorsCount / 24) * 100)}%) • Noch ${dateInfo.daysRemainingToChristmas} Tage bis Heiligabend`
                      : language === 'ro'
                      ? `${completedDoorsCount} din 24 de zile finalizate (${Math.round((completedDoorsCount / 24) * 100)}%) • Încă ${dateInfo.daysRemainingToChristmas} zile până la Ajun`
                      : `${completedDoorsCount} of 24 days completed (${Math.round((completedDoorsCount / 24) * 100)}%) • ${dateInfo.daysRemainingToChristmas} days until Christmas Eve`}
                  </span>
                </div>
              </div>
              {/* Linear progress bar */}
              <div className="w-full sm:w-64">
                <div className="flex items-center justify-between font-label-md text-label-md text-on-surface-variant mb-1.5">
                  <span>{language === 'hu' ? "ADVENTI HALADÁS" : language === 'de' ? "ADVENT-FORTSCHRITT" : language === 'ro' ? "PROGRES ADVENT" : "ADVENT PROGRESS"}</span>
                  <span className="font-bold text-secondary">{Math.round((completedDoorsCount / 24) * 100)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#C29B48] to-[#2E5844] rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(Math.round((completedDoorsCount / 24) * 100), 5)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Main Daily Focus Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
              {/* Left: Current Day Action Card */}
              <div className="lg:col-span-7 bg-surface-container-low p-6 sm:p-8 rounded-xl relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary font-label-uppercase text-label-uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-[#D8B76E]" />
                    <span>{language === 'hu' ? "Mai Teendő Fókusz" : language === 'de' ? "Heutiger Fokus" : language === 'ro' ? "Sarcina Zilei de Azi" : "Today's Focus"}</span>
                  </span>
                  <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{activeDayData.timeEstimate}</span>
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary font-serif mb-3">
                  {language === 'hu'
                    ? `${activeDayData.id}. nap: ${activeDayData.title}`
                    : language === 'de'
                    ? `Tag ${activeDayData.id}: ${activeDayData.title}`
                    : language === 'ro'
                    ? `Ziua ${activeDayData.id}: ${activeDayData.title}`
                    : `Day ${activeDayData.id}: ${activeDayData.title}`}
                </h3>
                <div className="p-4 rounded bg-surface border-l-2 border-primary-container mb-6 italic font-serif text-on-surface text-body-lg">
                  „{activeDayData.content.ritualTip || activeDayData.shortIntro || (language === 'hu' ? "Nyugodt lépések, tiszta gondolatok, meghitt készülődés." : "Calm steps, clear thoughts, mindful holiday preparation.")}”
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  {activeDayData.content.description || activeDayData.shortIntro}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectDay(activeDayData)}
                    className="px-6 py-3 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg hover:bg-primary transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#D8B76E]" />
                    <span>{t.nav.openCalendar} ({activeDayData.timeEstimate})</span>
                  </button>
                  <button
                    onClick={() => {
                      if (onOpenPrintable) onOpenPrintable('printable-menu');
                      else onSelectDay(activeDayData);
                    }}
                    className="px-5 py-3 rounded-xl bg-surface text-primary font-label-lg text-label-lg hover:bg-surface-container-high transition-colors flex items-center gap-2 cursor-pointer border border-surface-container-high"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    <span>{language === 'hu' ? "Napi Segédlet PDF" : language === 'de' ? "Tagesleitfaden PDF" : language === 'ro' ? "Ghid PDF" : "Guide PDF"}</span>
                  </button>
                </div>
              </div>

              {/* Right: Daily Checklist Micro-Tool */}
              <div className="lg:col-span-5 bg-surface-container-high/60 p-6 sm:p-8 rounded-xl">
                <h4 className="font-title-md text-title-md text-primary mb-4 flex items-center justify-between">
                  <span>{activeDayData.id}. {language === 'hu' ? 'napi lépések' : language === 'de' ? 'Tages-Schritte' : language === 'ro' ? 'pași ai zilei' : 'daily steps'}</span>
                  <span className="font-label-md text-label-md text-secondary uppercase tracking-widest font-semibold">
                    {Object.values(previewChecklist).filter(Boolean).length} / 3 {language === 'hu' ? "Kész" : language === 'de' ? "Erledigt" : language === 'ro' ? "Gata" : "Done"}
                  </span>
                </h4>
                <div className="space-y-3">
                  {(activeDayData.content.actionSteps || []).slice(0, 3).map((step: string, idx: number) => {
                    const stepKey = `step${idx + 1}`;
                    const isChecked = Boolean(previewChecklist[stepKey]);
                    return (
                      <label key={idx} className="flex items-start gap-3 p-3 rounded bg-surface cursor-pointer select-none border border-surface-container-low hover:border-[#D8B76E]/40 transition-colors">
                        <input
                          checked={isChecked}
                          onChange={() => handleChecklistToggle(stepKey)}
                          className="mt-1 accent-primary-container w-4 h-4 rounded cursor-pointer"
                          type="checkbox"
                        />
                        <span className={`font-body-md text-body-md ${isChecked ? 'text-on-surface-variant line-through' : 'text-primary'}`}>
                          {step}
                        </span>
                      </label>
                    );
                  })}
                </div>
                <div className="mt-6 p-3 rounded bg-secondary-container/40 flex items-center gap-3 text-secondary">
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                  <span className="font-body-sm text-body-sm">
                    {language === 'hu'
                      ? "Napi rituálé: Minden pipa egy lépéssel közelebb visz a stresszmentes Szentestéhez."
                      : language === 'de'
                      ? "Tages-Ritual: Jeder Haken bringt Sie Heiligabend einen Schritt näher in Ruhe."
                      : language === 'ro'
                      ? "Sfatul zilei: Dacă cineva se oferă să ajute, acceptă cu drag."
                      : "Daily ritual: Each checkmark brings you closer to a calm, mindful holiday."}
                  </span>
                </div>
              </div>
            </div>

            {/* Upcoming Days Strip */}
            <div>
              <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider block mb-3">
                {language === 'hu' ? "KÖVETKEZŐ TITOKZATOS NAPOK A KALENDÁRIUMBAN" : language === 'de' ? "KOMMENDE TAGE IM KALENDER" : language === 'ro' ? "ZILELE URMĂTOARE ÎN CALENDAR" : "UPCOMING DAYS IN CALENDAR"}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[dateInfo.currentDayNumber + 1, dateInfo.currentDayNumber + 2, dateInfo.currentDayNumber + 3].map((nextDayNum, i) => {
                  const boundedDay = nextDayNum > 24 ? 24 : nextDayNum;
                  const nextDayData = getDayByNumber(boundedDay);
                  const isLocked = !isDayCompleted(boundedDay);
                  const labels = [
                    language === 'hu' ? "HOLNAP" : language === 'de' ? "MORGEN" : language === 'ro' ? "MÂINE" : "TOMORROW",
                    language === 'hu' ? "HOLNAPUTÁN" : language === 'de' ? "ÜBERMORGEN" : language === 'ro' ? "POIMÂINE" : "IN 2 DAYS",
                    language === 'hu' ? "HÉTVÉGE" : language === 'de' ? "WOCHENENDE" : language === 'ro' ? "WEEKEND" : "WEEKEND",
                  ];

                  return (
                    <div
                      key={nextDayNum}
                      onClick={() => onSelectDay(nextDayData)}
                      className={`p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all duration-300 border ${
                        isLocked
                          ? 'bg-[#25171A] text-[#FDF8F0] border-[#D8B76E]/20 hover:border-[#D8B76E]/60 hover:scale-[1.02]'
                          : 'bg-surface-container text-primary border-surface-container-high hover:bg-surface-container-high'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-serif text-headline-sm font-semibold flex-shrink-0 ${
                        isLocked ? 'bg-[#361E23] text-[#D8B76E]' : 'bg-surface text-on-surface-variant'
                      }`}>
                        {boundedDay < 10 ? `0${boundedDay}` : boundedDay}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] uppercase font-bold tracking-wider ${isLocked ? 'text-[#D8B76E]' : 'text-on-surface-variant'}`}>
                            {labels[i]}
                          </span>
                          {isLocked && <Lock className="w-2.5 h-2.5 text-[#D8B76E]/70" />}
                        </div>
                        <span className={`font-title-md text-title-md truncate block ${isLocked ? 'text-[#FDF8F0]' : 'text-primary'}`}>
                          {nextDayData.title}
                        </span>
                        <span className={`font-body-sm text-body-sm truncate block ${isLocked ? 'text-[#D8B76E]/60' : 'text-on-surface-variant'}`}>
                          {isLocked
                            ? (language === 'hu' ? "✦ Titokzatos meglepetés" : language === 'de' ? "✦ Geheimnisvolle Überraschung" : language === 'ro' ? "✦ Surpriză misterioasă" : "✦ Mysterious surprise")
                            : nextDayData.category}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: DIGITAL RESOURCE LIBRARY & LUXURY PRINTABLES PREVIEW */}
      <section className="w-full py-16 lg:py-24 px-6 lg:px-12 max-w-7xl mx-auto" id="resurse-preview">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2">{t.nav.printables.toUpperCase()}</span>
            <h2 className="font-headline-lg text-headline-lg text-primary font-serif">{t.nav.printables}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
              {language === 'hu'
                ? "Gondosan tervezett, prémium nyomtatható és digitális sablonok az ünnepi rendszerezéshez. A4 és Letter méretben."
                : language === 'de'
                ? "Sorgfältig gestaltete, druckbare und digitale Vorlagen für Ihre Festtagsplanung. Im A4- und US-Letter-Format."
                : language === 'ro'
                ? "Concepute cu aceeași grijă tipografică ca o carte de artă. Poți să le completezi direct pe ecran sau să le imprimi acasă."
                : "Meticulously crafted printable and digital stationery worksheets for stress-free holiday planning."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded bg-surface-container text-primary font-label-md text-label-md font-semibold">
              Format A4 & US Letter
            </span>
            <span className="px-3 py-1.5 rounded bg-surface-container text-primary font-label-md text-label-md font-semibold">
              PDF & Excel
            </span>
          </div>
        </div>

        {/* 9 Luxury Printable Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRINTABLE_RESOURCES.slice(0, 9).map((resource) => {
            const title = getLocalizedText(resource.title, language);
            const desc = getLocalizedText(resource.description, language);
            const badge = getLocalizedText(resource.badge, language);
            const pageCount = getLocalizedText(resource.pageCount, language);

            return (
              <div key={resource.id} className="bg-surface-container-low rounded-xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-surface text-secondary">PDF & Print</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-tertiary-fixed text-tertiary-container">{badge}</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-primary font-serif mb-2">{title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                    {desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-surface-container-highest flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface-variant">{pageCount}</span>
                  <button
                    onClick={() => {
                      if (onOpenPrintable) onOpenPrintable(resource.id);
                      else onStartClick();
                    }}
                    className="text-primary hover:text-primary-container font-label-lg text-label-lg flex items-center gap-1 cursor-pointer"
                  >
                    <span>{language === 'hu' ? 'Megnyitás' : language === 'de' ? 'Vorschau' : language === 'ro' ? 'Previzualizează' : 'Preview'}</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner: AI Christmas Card Studio */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#4a151b] via-[#380e14] to-[#25070a] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden border border-[#ca8a04]/40">
          <div className="space-y-2 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <span>✨ {language === 'hu' ? 'KREATÍV ATELIER' : language === 'de' ? 'KREATIV-ATELIER' : language === 'ro' ? 'NOU • ATELIER' : 'CREATIVE ATELIER'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#fff8f6]">
              {language === 'hu'
                ? 'Karácsonyi Képeslap Műhely & Nyomtatás'
                : language === 'de'
                ? 'Weihnachtskarten-Studio & Druck'
                : language === 'ro'
                ? 'Atelier de Felicitări de Crăciun cu AI'
                : 'Christmas Card Studio & Print'}
            </h3>
            <p className="text-sm text-amber-100/80 max-w-xl leading-relaxed">
              {language === 'hu'
                ? 'Készíts személyre szabott, megható karácsonyi képeslapokat szeretteidnek, majd nyomtasd ki összehajtható A4/A5 formátumban!'
                : language === 'de'
                ? 'Gestalten Sie persönliche, herzliche Weihnachtskarten und drucken Sie diese druckfertig auf A4 oder A5 aus!'
                : language === 'ro'
                ? 'Creează felicitări poetice și călduroase cu ajutorul AI-ului sau personalizează-le manual, apoi printează-le direct pe hârtie A4!'
                : 'Create personalized, heartfelt Christmas greeting cards and print them ready to fold on A4 paper!'}
            </p>
          </div>
          <button
            onClick={() => {
              if (onNavigateCardStudio) onNavigateCardStudio();
            }}
            className="shrink-0 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#2e0208] font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer z-10"
          >
            <span>{language === 'hu' ? 'Képeslap Készítése' : language === 'de' ? 'Karten erstellen' : language === 'ro' ? 'Deschide Atelierul' : 'Create Card Now'}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* SECTION 6: TRANSPARENT ETHICAL PRICING */}
      <section className="w-full bg-surface-container-low py-16 lg:py-24 px-6 lg:px-12" id="planuri-acces">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2">{t.nav.pricing.toUpperCase()}</span>
            <h2 className="font-headline-lg text-headline-lg text-primary font-serif">{t.pricing.heading}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
              {t.pricing.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {t.pricing.tiers.map((tier) => {
              const isPremium = tier.id === 'premium';
              const isStandard = tier.id === 'standard';

              if (isPremium) {
                return (
                  <div
                    key={tier.id}
                    className="bg-primary-container text-on-primary rounded-xl p-8 shadow-lg flex flex-col justify-between relative transform lg:-translate-y-2 border-2 border-[#D8B76E]/50"
                    style={{ boxShadow: '0 12px 30px -8px rgba(74, 21, 27, 0.25)' }}
                  >
                    <div className="absolute -top-3.5 left-8 px-3 py-1 rounded-full bg-tertiary-fixed text-tertiary-container font-label-uppercase text-[10px] font-bold tracking-widest">
                      {tier.badge || (language === 'hu' ? 'LEGNÉPSZERŰBB' : 'VIP ATELIER')}
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-headline-sm text-headline-sm text-inverse-primary font-serif">{tier.name}</span>
                        <span className="material-symbols-outlined text-tertiary-fixed text-[22px]">auto_awesome</span>
                      </div>
                      <div className="mb-6">
                        <span className="font-display text-display text-on-primary font-serif leading-none">{tier.price} €</span>
                        <span className="font-body-sm text-body-sm text-on-primary-container block mt-1">{tier.period}</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-primary-container mb-6">
                        {tier.description}
                      </p>
                      <ul className="space-y-3 font-body-sm text-body-sm text-on-primary mb-8">
                        {tier.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2.5">
                            <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">check_circle</span>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => onSelectTier(tier.id as PricingTier)}
                      className="w-full py-4 rounded bg-tertiary-fixed text-tertiary-container font-label-lg text-label-lg hover:bg-tertiary-fixed-dim transition-colors font-bold shadow-md cursor-pointer"
                    >
                      {tier.cta}
                    </button>
                  </div>
                );
              }

              return (
                <div key={tier.id} className="bg-surface rounded-xl p-8 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-headline-sm text-headline-sm text-primary font-serif">{tier.name}</span>
                      {tier.badge && (
                        <span className="font-label-uppercase text-label-uppercase text-secondary bg-secondary-container/50 px-2 py-1 rounded">{tier.badge}</span>
                      )}
                    </div>
                    <div className="mb-6">
                      <span className="font-display text-display text-primary font-serif leading-none">{tier.price} €</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant block mt-1">{tier.period}</span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                      {tier.description}
                    </p>
                    <ul className="space-y-3 font-body-sm text-body-sm text-on-surface mb-8">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-secondary text-[18px]">check</span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => onSelectTier(tier.id as PricingTier)}
                    className={`w-full py-3.5 rounded font-label-lg text-label-lg transition-colors cursor-pointer ${
                      isStandard
                        ? 'bg-surface-container-highest text-primary hover:bg-primary hover:text-on-primary'
                        : 'bg-surface-container text-primary hover:bg-surface-container-high'
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Ethical Note & Restore Button */}
          <div className="mt-12 text-center text-on-surface-variant font-body-sm text-body-sm flex flex-col items-center justify-center gap-3">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-secondary">lock</span>
                <span>100% {language === 'hu' ? 'Biztonságos fizetés' : 'Secure payment'}</span>
              </span>
              <span className="text-outline-variant">•</span>
              <span>{t.pricing.guarantee}</span>
              <span className="text-outline-variant">•</span>
              <span>{t.pricing.digitalNotice}</span>
            </div>

            {onOpenRestoreModal && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenRestoreModal}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px] text-tertiary">key</span>
                  <span>{language === 'hu' ? 'Már fizettél? Kattints ide a hozzáférésed visszaállításához!' : 'Already purchased? Restore your access here'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQ ACCORDION */}
      <section className="w-full py-16 lg:py-24 px-6 lg:px-12 max-w-4xl mx-auto" id="faq-section">
        <div className="text-center mb-12">
          <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2">{t.nav.faq.toUpperCase()}</span>
          <h2 className="font-headline-lg text-headline-lg text-primary font-serif">{t.faq.heading}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            {t.faq.subheading}
          </p>
        </div>

        <div className="space-y-4">
          {t.faq.items.map((item, idx) => (
            <details key={idx} className="group bg-surface-container-low p-6 rounded-xl transition-all open:bg-surface-container">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-headline-sm text-[18px] text-primary font-serif">{item.question}</span>
                <span className="material-symbols-outlined text-on-surface-variant group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="font-body-md text-body-md text-on-surface-variant mt-4 leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* SECTION 8: FINAL EDITORIAL CALL TO ACTION */}
      <section className="w-full bg-primary-container text-on-primary py-20 px-6 lg:px-12 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="w-12 h-12 rounded-full bg-surface/10 flex items-center justify-center mx-auto text-tertiary-fixed mb-6">
            <span className="material-symbols-outlined text-[24px]">favorite</span>
          </span>
          <h2 className="font-display text-display font-serif text-inverse-primary leading-tight mb-6">
            {finalCta.headline}
          </h2>
          <p className="font-body-lg text-body-lg text-on-primary-container mb-8 leading-relaxed max-w-xl mx-auto">
            {finalCta.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onSelectTier('standard')}
              className="px-8 py-4 rounded bg-tertiary-fixed text-tertiary-container font-label-lg text-label-lg hover:bg-tertiary-fixed-dim transition-all shadow-lg font-bold cursor-pointer"
            >
              {finalCta.buttonText}
            </button>
            <a
              href="#calendar-preview"
              className="px-6 py-4 rounded bg-surface/10 text-on-primary font-label-lg text-label-lg hover:bg-surface/20 transition-all cursor-pointer"
            >
              {finalCta.exploreText}
            </a>
          </div>
          <span className="font-label-md text-label-md text-on-primary-container/80 block mt-8">
            {finalCta.editionNote}
          </span>
        </div>
      </section>
    </div>
  );
};
