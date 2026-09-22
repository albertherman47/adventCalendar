import React from 'react';
import { SupportedLanguage } from '../types';

interface FooterProps {
  language: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  onNavigateHome: () => void;
  onNavigateCalendar: () => void;
  onNavigatePrintables: () => void;
  onNavigateEmergency?: () => void;
  onNavigateGifts?: () => void;
  onNavigatePricing?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onLanguageChange,
  onNavigateHome,
  onNavigateCalendar,
  onNavigatePrintables,
  onNavigateEmergency,
  onNavigateGifts,
  onNavigatePricing,
}) => {
  const getLanguageLabel = () => {
    switch (language) {
      case 'hu': return 'Magyar (HU)';
      case 'en': return 'English (EN)';
      default: return 'Română (RO)';
    }
  };

  const getLanguageEdition = () => {
    switch (language) {
      case 'hu': return 'Magyar Kiadás';
      case 'en': return 'English Edition';
      default: return 'Ediție Românească';
    }
  };

  return (
    <footer className="w-full bg-primary-container text-on-primary no-print">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Logo & Manifesto */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                alt="Christmas Reset 2026 Monogram Logo"
                className="h-9 w-auto object-contain brightness-0 invert"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaHwmXotQIinOY_9Njw3blFS8ggtm8cX707c0Fhr887qTmDZ6E0YgWrA1AmgDnMTz2HlWI9M8kChL7pRbO2EGaG88iDQupgmjqeCsZ0EvORGTc-3nJskJtMbBWJnJAS8rbBjqP5Xiv59xelDWT9lFXyr0o3pwCL0IZRct8ovnb0UMGAag-1NHiOAVQlhBRKIWXM5TMdTx9iczEvx5u1r87F3qzx8NpBBThczhVP5oAm4-UyrNdZwmS0Q"
              />
              <span className="font-headline-md text-headline-md font-serif text-inverse-primary tracking-tight">
                Christmas Reset <span className="italic font-normal">2026</span>
              </span>
            </div>
            <p className="font-body-lg text-body-lg text-on-primary-container max-w-sm leading-relaxed">
              24 de zile către un Crăciun mai calm și organizat. Un sanctuar digital dedicat clarității, planificării ritmice și ritualurilor atemporale de iarnă.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">language</span>
              <span className="font-label-md text-label-md text-on-primary-container uppercase tracking-wider">
                {getLanguageEdition()}
              </span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-label-uppercase text-label-uppercase text-tertiary-fixed tracking-widest uppercase mb-1">
              Navigare
            </h4>
            <button
              onClick={onNavigateCalendar}
              className="text-left font-body-md text-body-md text-on-primary-container hover:text-on-primary transition-colors cursor-pointer"
            >
              Calendar Advent
            </button>
            <button
              onClick={onNavigateEmergency}
              className="text-left font-body-md text-body-md text-on-primary-container hover:text-on-primary transition-colors cursor-pointer"
            >
              Instrumente Festive
            </button>
            <button
              onClick={onNavigatePrintables}
              className="text-left font-body-md text-body-md text-on-primary-container hover:text-on-primary transition-colors cursor-pointer"
            >
              Resurse & Ghiduri
            </button>
            <button
              onClick={onNavigatePricing}
              className="text-left font-body-md text-body-md text-on-primary-container hover:text-on-primary transition-colors cursor-pointer"
            >
              Planuri & Abonamente
            </button>
            <a
              href="#faq-section"
              className="font-body-md text-body-md text-on-primary-container hover:text-on-primary transition-colors"
            >
              Întrebări Frecvente (FAQ)
            </a>
          </div>

          {/* Tools Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-label-uppercase text-label-uppercase text-tertiary-fixed tracking-widest uppercase mb-1">
              Instrumente
            </h4>
            <button
              onClick={onNavigateCalendar}
              className="text-left font-body-md text-body-md text-on-primary-container hover:text-on-primary transition-colors cursor-pointer"
            >
              Buget de Sărbători
            </button>
            <button
              onClick={onNavigateGifts}
              className="text-left font-body-md text-body-md text-on-primary-container hover:text-on-primary transition-colors cursor-pointer"
            >
              Registru Cadouri
            </button>
            <button
              onClick={onNavigateCalendar}
              className="text-left font-body-md text-body-md text-on-primary-container hover:text-on-primary transition-colors cursor-pointer"
            >
              Meniu Festiv
            </button>
            <button
              onClick={onNavigateEmergency}
              className="text-left font-body-md text-body-md text-on-primary-container hover:text-on-primary transition-colors cursor-pointer"
            >
              Mod Urgență
            </button>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-label-uppercase text-label-uppercase text-tertiary-fixed tracking-widest uppercase mb-1">
              Legal & Respect
            </h4>
            <a className="font-body-md text-body-md text-on-primary-container hover:text-on-primary transition-colors cursor-pointer" href="#planuri-acces">
              Confidențialitate
            </a>
            <a className="font-body-md text-body-md text-on-primary-container hover:text-on-primary transition-colors cursor-pointer" href="#planuri-acces">
              Termeni & Condiții
            </a>
            <a className="font-body-md text-body-md text-on-primary-container hover:text-on-primary transition-colors cursor-pointer" href="#planuri-acces">
              Politică de Retur (14 Zile)
            </a>
            <div className="mt-4 pt-3 border-t border-primary/40">
              <span className="font-label-sm text-on-primary-container block mb-1">Limbă selectată</span>
              <span className="font-body-sm text-body-sm text-tertiary-fixed-dim font-medium">
                {getLanguageLabel()}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body-sm text-body-sm text-on-primary-container">
            © 2026 Christmas Reset Atelier. Toate drepturile rezervate.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-body-sm text-body-sm text-on-primary-container italic font-serif">
              Creat cu grijă pentru un decembrie liniștit.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
