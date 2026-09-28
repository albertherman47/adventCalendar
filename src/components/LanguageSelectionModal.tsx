import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Globe, Sparkles, X, Heart, Star } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { getTranslations } from '../data/translations';

interface LanguageSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
  isFirstVisit?: boolean;
}

interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  subtitle: string;
  region: string;
}

const AVAILABLE_LANGUAGES: LanguageOption[] = [
  {
    code: 'hu',
    name: 'Hungarian',
    nativeName: 'Magyar',
    flag: '🇭🇺',
    subtitle: 'Teljes adventi kalendárium és tervezők magyarul',
    region: 'Magyarország & Kárpát-medence',
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    subtitle: 'International English edition & all printables',
    region: 'International / Worldwide',
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    subtitle: 'Vollständige deutsche Ausgabe & Vorlagen',
    region: 'Deutschland, Österreich, Schweiz',
  },
  {
    code: 'ro',
    name: 'Romanian',
    nativeName: 'Română',
    flag: '🇷🇴',
    subtitle: 'Calendar complet de advent și ghiduri practice',
    region: 'România & Moldova',
  },
  {
    code: 'pl',
    name: 'Polish',
    nativeName: 'Polski',
    flag: '🇵🇱',
    subtitle: 'Polska edycja świątecznego kalendarza',
    region: 'Polska',
  },
  {
    code: 'cz',
    name: 'Czech',
    nativeName: 'Čeština',
    flag: '🇨🇿',
    subtitle: 'Česká edice vánočního adventního kalendáře',
    region: 'Česká republika',
  },
  {
    code: 'sk',
    name: 'Slovak',
    nativeName: 'Slovenčina',
    flag: '🇸🇰',
    subtitle: 'Slovenská edícia adventného sprievodcu',
    region: 'Slovensko',
  },
];

export const LanguageSelectionModal: React.FC<LanguageSelectionModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage,
  isFirstVisit = false,
}) => {
  const t = getTranslations(currentLanguage);

  if (!isOpen) return null;

  const handleLanguageClick = (langCode: SupportedLanguage) => {
    onSelectLanguage(langCode);
  };

  const handleConfirm = () => {
    try {
      localStorage.setItem('christmas_reset_lang_selected_2026', 'true');
    } catch {
      // safe fallback
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 no-print">
        {/* Festive Background Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-[#BA1A2C]/20 via-[#C29B48]/15 to-transparent blur-3xl rounded-full" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl border-2 border-[#D8B76E]/60 shadow-[0_20px_60px_rgba(46,2,8,0.35)] overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Top Festive Header */}
          <div className="relative bg-gradient-to-r from-[#4A151B] via-[#621927] to-[#2E5844] p-6 sm:p-8 text-white text-center shrink-0">
            {/* Close button if not forced first visit */}
            {!isFirstVisit && (
              <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Sparkle Ornament Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 border border-[#D8B76E]/40 text-[#FDE047] text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-xs">
              <Globe className="w-3.5 h-3.5 text-[#FDE047]" />
              <span>{t.languageModal.welcomeHeadline}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#FFF8F6]">
              {t.languageModal.title}
            </h2>

            <p className="text-xs sm:text-sm text-[#FDE8E9]/90 max-w-md mx-auto mt-2 leading-relaxed">
              {t.languageModal.prompt}
            </p>
          </div>

          {/* Languages Grid */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AVAILABLE_LANGUAGES.map((lang) => {
                const isSelected = currentLanguage === lang.code;

                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleLanguageClick(lang.code)}
                    className={`relative p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-3.5 select-none ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#FFF9EE] to-[#FFF4E0] border-[#D8B76E] ring-2 ring-[#D8B76E]/40 shadow-md -translate-y-0.5'
                        : 'bg-white border-[#EAE3D5] hover:bg-[#FAF7F2] hover:border-[#D8B76E]/40 shadow-xs'
                    }`}
                  >
                    {/* Big Flag */}
                    <span className="text-3xl sm:text-4xl shrink-0 drop-shadow-xs" role="img" aria-label={lang.name}>
                      {lang.flag}
                    </span>

                    {/* Language Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-base sm:text-lg font-bold text-[#2C0B12] leading-tight">
                          {lang.nativeName}
                        </span>
                        <span className="text-[11px] font-sans text-[#7E7468] uppercase font-bold px-1.5 py-0.5 rounded bg-[#FAF7F2] border border-[#EAE3D5]">
                          {lang.code.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B645B] truncate mt-0.5 font-normal">
                        {lang.subtitle}
                      </p>
                      <span className="text-[10px] text-[#A89E90] block truncate">
                        {lang.region}
                      </span>
                    </div>

                    {/* Selection Indicator */}
                    <div className="shrink-0">
                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-[#2E5844] text-white flex items-center justify-center shadow-xs">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-[#D8B76E]/30 bg-[#FAF7F2]" />
                      )}
                    </div>

                    {/* Gold highlight bar on active */}
                    {isSelected && (
                      <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#C29B48] rounded-l-2xl" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Confirmation Footer */}
          <div className="p-4 sm:p-6 bg-[#FAF7F2] border-t border-[#EAE3D5] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <span className="text-xs text-[#7E7468] text-center sm:text-left flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C29B48]" />
              <span>{t.languageModal.quickSwitchNotice}</span>
            </span>

            <button
              type="button"
              onClick={handleConfirm}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-[#4A151B] to-[#7E2232] hover:from-[#2E0208] hover:to-[#621927] text-white font-serif font-bold text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{t.languageModal.enterButton}</span>
              <span className="text-[#FDE047]">✦</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
