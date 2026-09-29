import React from 'react';
import { SupportedLanguage } from '../types';
import { getTranslations } from '../data/translations';
import { Globe, Database } from 'lucide-react';

interface FooterProps {
  language: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  onOpenLanguageModal?: () => void;
  onOpenDatabaseStatus?: () => void;
  onNavigateHome: () => void;
  onNavigateCalendar: () => void;
  onNavigatePrintables: () => void;
  onNavigateEmergency?: () => void;
  onNavigateGifts?: () => void;
  onNavigatePricing?: () => void;
}

const LANG_DETAILS: Record<SupportedLanguage, { label: string; flag: string }> = {
  hu: { label: 'Magyar (HU)', flag: '🇭🇺' },
  en: { label: 'English (EN)', flag: '🇬🇧' },
  de: { label: 'Deutsch (DE)', flag: '🇩🇪' },
  ro: { label: 'Română (RO)', flag: '🇷🇴' },
  pl: { label: 'Polski (PL)', flag: '🇵🇱' },
  cz: { label: 'Čeština (CZ)', flag: '🇨🇿' },
  sk: { label: 'Slovenčina (SK)', flag: '🇸🇰' },
};

export const Footer: React.FC<FooterProps> = ({
  language,
  onLanguageChange,
  onOpenLanguageModal,
  onOpenDatabaseStatus,
  onNavigateHome,
  onNavigateCalendar,
  onNavigatePrintables,
  onNavigateEmergency,
  onNavigateGifts,
  onNavigatePricing,
}) => {
  const t = getTranslations(language);

  return (
    <footer className="w-full bg-[#380e14] text-[#fff8f6] no-print border-t border-[#d8b76e]/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-28 sm:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Logo & Manifesto */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                alt="Christmas Reset 2026 Monogram Logo"
                className="h-9 w-auto object-contain brightness-0 invert"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaHwmXotQIinOY_9Njw3blFS8ggtm8cX707c0Fhr887qTmDZ6E0YgWrA1AmgDnMTz2HlWI9M8kChL7pRbO2EGaG88iDQupgmjqeCsZ0EvORGTc-3nJskJtMbBWJnJAS8rbBjqP5Xiv59xelDWT9lFXyr0o3pwCL0IZRct8ovnb0UMGAag-1NHiOAVQlhBRKIWXM5TMdTx9iczEvx5u1r87F3qzx8NpBBThczhVP5oAm4-UyrNdZwmS0Q"
              />
              <span className="font-serif text-2xl font-bold tracking-tight text-[#fff8f6]">
                Christmas Reset <span className="italic font-normal text-[#eedcb2]">2026</span>
              </span>
            </div>
            <p className="text-sm text-[#eedcb2]/90 max-w-sm leading-relaxed font-sans">
              {t.tagline} {t.supportingLine}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="material-symbols-outlined text-[16px] text-[#fde047]">language</span>
              <span className="text-xs uppercase tracking-wider text-[#eedcb2] font-semibold">
                {t.footer.editionLabel}
              </span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#fde047] tracking-widest uppercase mb-1 font-sans">
              {language === 'hu' ? 'Navigáció' : language === 'de' ? 'Navigation' : 'Navigation'}
            </h4>
            <button
              onClick={onNavigateCalendar}
              className="text-left text-sm text-[#eedcb2]/80 hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.calendar}
            </button>
            <button
              onClick={onNavigateEmergency}
              className="text-left text-sm text-[#eedcb2]/80 hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.emergency}
            </button>
            <button
              onClick={onNavigatePrintables}
              className="text-left text-sm text-[#eedcb2]/80 hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.printables}
            </button>
            <button
              onClick={onNavigatePricing}
              className="text-left text-sm text-[#eedcb2]/80 hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.pricing}
            </button>
            <a
              href="#faq-section"
              className="text-left text-sm text-[#eedcb2]/80 hover:text-white transition-colors"
            >
              {t.nav.faq}
            </a>
          </div>

          {/* Tools Column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#fde047] tracking-widest uppercase mb-1 font-sans">
              {language === 'hu' ? 'Eszközök' : language === 'de' ? 'Werkzeuge' : 'Tools'}
            </h4>
            <button
              onClick={onNavigateCalendar}
              className="text-left text-sm text-[#eedcb2]/80 hover:text-white transition-colors cursor-pointer"
            >
              {language === 'hu' ? 'Költségvetés-Kalkulátor' : language === 'de' ? 'Budget-Rechner' : 'Holiday Budget Planner'}
            </button>
            <button
              onClick={onNavigateGifts}
              className="text-left text-sm text-[#eedcb2]/80 hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.giftHelper}
            </button>
            <button
              onClick={onNavigateCalendar}
              className="text-left text-sm text-[#eedcb2]/80 hover:text-white transition-colors cursor-pointer"
            >
              {language === 'hu' ? 'Ünnepi Menütervező' : language === 'de' ? 'Festmenü-Planer' : 'Holiday Menu Planner'}
            </button>
            <button
              onClick={onNavigateEmergency}
              className="text-left text-sm text-[#eedcb2]/80 hover:text-white transition-colors cursor-pointer"
            >
              {t.nav.emergency}
            </button>
          </div>

          {/* Language & Legal Column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[#fde047] tracking-widest uppercase mb-1 font-sans">
              {t.footer.languages}
            </h4>

            {/* Language Selector Button */}
            <button
              onClick={onOpenLanguageModal}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-[#d8b76e]/40 text-left transition-colors cursor-pointer w-fit"
            >
              <span className="text-lg">{LANG_DETAILS[language]?.flag || '🌍'}</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white leading-tight">
                  {LANG_DETAILS[language]?.label || language}
                </span>
                <span className="text-[10px] text-[#fde047] flex items-center gap-1">
                  <Globe className="w-2.5 h-2.5" />
                  <span>{t.nav.changeLanguage}</span>
                </span>
              </div>
            </button>

            {/* Supabase Database Status / Test Button */}
            {onOpenDatabaseStatus && (
              <button
                onClick={onOpenDatabaseStatus}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#541820] hover:bg-[#68232a] border border-[#d8b76e]/40 text-left transition-colors cursor-pointer w-fit group"
              >
                <Database className="w-4 h-4 text-[#fde047] group-hover:scale-110 transition-transform" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#fff8f6] leading-tight flex items-center gap-1.5">
                    <span>Supabase DB</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </span>
                  <span className="text-[10px] text-[#eedcb2]">
                    {language === 'hu' ? 'Állapot & Élő Teszt' : 'Status & Live Test'}
                  </span>
                </div>
              </button>
            )}

            <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
              <span className="text-xs text-[#eedcb2]/60">
                100% {language === 'hu' ? 'Digitális termék' : 'Digital Product'}
              </span>
              <span className="text-xs text-[#eedcb2]/60">
                {language === 'hu' ? 'Online fizetés hamarosan' : 'Online payments coming later'}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#eedcb2]/70 font-sans text-center md:text-left">
            © 2026 Christmas Reset. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-[#eedcb2]/90 italic font-serif text-center md:text-right">
              {t.footer.disclaimer}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
