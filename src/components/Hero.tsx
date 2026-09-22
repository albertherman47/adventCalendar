import React from 'react';
import { Sparkles, ArrowRight, Calendar, CheckCircle2, ShieldCheck, Heart, Clock } from 'lucide-react';
import { SupportedLanguage, DayData } from '../types';
import { getTranslations } from '../data/translations';
import { trackEvent } from '../utils/analytics';

interface HeroProps {
  language: SupportedLanguage;
  onStartClick: () => void;
  onExploreCalendarClick: () => void;
  previewDays: DayData[];
  onOpenDayModal: (day: DayData) => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onStartClick,
  onExploreCalendarClick,
  previewDays,
  onOpenDayModal,
}) => {
  const t = getTranslations(language);

  const handlePrimaryCta = () => {
    trackEvent('cta_click', { placement: 'hero_primary', label: t.hero.primaryCta });
    onStartClick();
  };

  const handleSecondaryCta = () => {
    trackEvent('cta_click', { placement: 'hero_secondary', label: t.hero.secondaryCta });
    onExploreCalendarClick();
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 paper-pattern border-b border-[#EAE3D5]">
      {/* Delicate decorative background lights */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#F2E4C6]/40 via-[#F7EAEF]/30 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#C29B48]/40 shadow-xs mb-6 text-xs sm:text-sm font-medium text-[#7E2232]">
            <Sparkles className="w-3.5 h-3.5 text-[#C29B48]" />
            <span>Christmas Reset 2026 • 1–24 Decembrie</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#2C0B12] leading-[1.12] mb-6">
            {t.hero.headline}
          </h1>

          {/* Refined Subheadline */}
          <p className="text-base sm:text-lg text-[#5E574D] font-normal leading-relaxed mb-8 max-w-2xl mx-auto">
            {t.hero.subheadline}
          </p>

          {/* Conversion CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
            <button
              onClick={handlePrimaryCta}
              className="w-full sm:w-auto bg-[#621927] hover:bg-[#46121C] text-[#FDFBF7] px-8 py-3.5 rounded-xl font-medium text-base tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer border border-[#C29B48]/50 group"
            >
              <span>{t.hero.primaryCta}</span>
              <ArrowRight className="w-4 h-4 text-[#D8B76E] transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={handleSecondaryCta}
              className="w-full sm:w-auto bg-white/80 hover:bg-white text-[#2C0B12] hover:text-[#621927] px-7 py-3.5 rounded-xl font-medium text-base tracking-wide transition-all border border-[#EAE3D5] shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#7E2232]" />
              <span>{t.hero.secondaryCta}</span>
            </button>
          </div>

          {/* Genuine Trust Factors */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-[#7E7468]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2E5844]" />
              <span>{t.hero.badges.digitalOnly}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#2E5844]" />
              <span>{t.hero.badges.noStress}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2E5844]" />
              <span>{t.hero.badges.instantAccess}</span>
            </div>
          </div>
        </div>

        {/* Hero Visual: Interactive Advent Calendar Mockup */}
        <div className="relative max-w-5xl mx-auto">
          {/* Decorative frame */}
          <div className="p-3 sm:p-5 rounded-2xl bg-gradient-to-b from-[#F2E4C6]/40 via-[#FAF7F2] to-[#EAE3D5]/40 border border-[#D8B76E]/40 shadow-xl backdrop-blur-xs">
            <div className="flex items-center justify-between px-3 py-2.5 mb-3 border-b border-[#EAE3D5] bg-white/70 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#621927]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#C29B48]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#2E5844]" />
                <span className="text-xs font-serif italic text-[#6B645B] ml-2">
                  {t.hero.calendarPreviewTitle}
                </span>
              </div>
              <button
                onClick={handleSecondaryCta}
                className="text-xs text-[#621927] hover:underline font-medium flex items-center gap-1"
              >
                <span>Deschide întregul calendar (24 zile)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Micro 12-door sample preview */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 sm:gap-3">
              {previewDays.slice(0, 12).map((day) => (
                <div
                  key={day.id}
                  onClick={() => onOpenDayModal(day)}
                  className="group relative cursor-pointer aspect-square rounded-xl p-2.5 sm:p-3 bg-white/90 hover:bg-white border border-[#EAE3D5] hover:border-[#C29B48] shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg sm:text-xl font-bold text-[#621927] group-hover:text-[#2C0B12]">
                      {day.id}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-[#7E7468] tracking-widest">
                      Dec
                    </span>
                  </div>

                  <div className="my-auto text-left">
                    <p className="text-[11px] font-medium text-[#2C0B12] line-clamp-2 leading-tight group-hover:text-[#621927] transition-colors">
                      {day.title}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[#F1E9DB] text-[9px] text-[#A8A096]">
                    <span>{day.timeEstimate}</span>
                    <span className="text-[#C29B48] group-hover:translate-x-0.5 transition-transform">→</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 text-center">
              <p className="text-xs text-[#7E7468]">
                Apasă pe oricare dintre uși pentru a explora experiența interactivă • Zilele 1–24 te ghidează pas cu pas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
