import React, { useState, useEffect } from 'react';
import { Menu, X, Snowflake, Volume2, VolumeX, Globe, Home, Calendar, AlertTriangle, FileText, Sparkles, Gift, Wand2, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SupportedLanguage, PricingTier } from '../types';

export type NavTab = 'landing' | 'calendar' | 'downloads' | 'printables' | 'emergency' | 'gift-helper' | 'progresul-meu' | 'instrumente' | 'planuri' | 'ai-card';

interface NavbarProps {
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenLanguageModal?: () => void;
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isPreviewMode: boolean;
  onTogglePreviewMode: () => void;
  hasPurchased: boolean;
  onOpenCheckout: () => void;
  snowEnabled: boolean;
  onToggleSnow: () => void;
  audioPlaying: boolean;
  onToggleAudio: () => void;
  completedCount?: number;
  userTier?: PricingTier;
  onOpenRestoreModal?: () => void;
}

// 3D Festive Christmas Bauble / Holiday Sphere Ornament with Gold Cap & Specular Shine
const ChristmasBauble: React.FC = () => (
  <motion.div
    className="relative flex items-center justify-center shrink-0 -ml-1 mr-1"
    initial={{ scale: 0, rotate: -25, opacity: 0 }}
    animate={{
      scale: [0, 1.2, 1],
      rotate: [0, -18, 14, -8, 4, 0],
      opacity: 1,
    }}
    exit={{ scale: 0, opacity: 0 }}
    transition={{
      scale: { duration: 0.35, ease: 'easeOut' },
      rotate: { duration: 1.1, ease: 'easeOut' },
      opacity: { duration: 0.2 },
    }}
    style={{ transformOrigin: 'top center' }}
  >
    <div className="relative w-5 h-5 flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]">
        {/* Golden hanging wire loop */}
        <circle cx="12" cy="2.8" r="1.8" fill="none" stroke="#FDE047" strokeWidth="1.2" />
        {/* Golden ornate cap */}
        <rect x="9.5" y="4.2" width="5" height="2" rx="0.5" fill="#EAB308" stroke="#CA8A04" strokeWidth="0.5" />
        {/* Radial sphere gradients */}
        <defs>
          <radialGradient id="navBaubleSphereGrad" cx="32%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#FFA4AC" />
            <stop offset="25%" stopColor="#EF4444" />
            <stop offset="65%" stopColor="#991122" />
            <stop offset="100%" stopColor="#4A050D" />
          </radialGradient>
          <linearGradient id="navBaubleGoldSparkle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4B8" />
            <stop offset="50%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
        </defs>
        {/* Main bauble sphere body */}
        <circle cx="12" cy="13.5" r="7.8" fill="url(#navBaubleSphereGrad)" stroke="#7F1D1D" strokeWidth="0.5" />
        {/* Golden holiday star filigree ornament on front */}
        <path d="M12 9.2 L12 17.8 M7.7 13.5 L16.3 13.5 M9 10.5 L15 16.5 M9 16.5 L15 10.5" stroke="url(#navBaubleGoldSparkle)" strokeWidth="0.8" strokeLinecap="round" opacity="0.85" />
        <circle cx="12" cy="13.5" r="1.1" fill="#FEF08A" />
        {/* Specular high-gloss gleam */}
        <ellipse cx="9.2" cy="9.8" rx="2.2" ry="1.2" fill="#FFFFFF" opacity="0.85" transform="rotate(-30 9.2 9.8)" />
        <circle cx="9.4" cy="9.5" r="0.6" fill="#FFFFFF" />
      </svg>
    </div>
  </motion.div>
);

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  onOpenLanguageModal,
  activeTab,
  onTabChange,
  isPreviewMode,
  onTogglePreviewMode,
  hasPurchased,
  onOpenCheckout,
  snowEnabled,
  onToggleSnow,
  audioPlaying,
  onToggleAudio,
  completedCount = 8,
  userTier = 'free',
  onOpenRestoreModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Derive initial active navigation section
  const getSectionFromTab = (tab: NavTab): string => {
    if (tab === 'ai-card') return 'ai-card';
    if (tab === 'emergency' || tab === 'gift-helper') return 'emergency';
    if (tab === 'printables' || tab === 'downloads') return 'printables';
    if (tab === 'calendar') return 'calendar';
    return 'calendar';
  };

  const [activeSection, setActiveSection] = useState<string>(() => getSectionFromTab(activeTab));

  useEffect(() => {
    if (activeTab === 'ai-card') {
      setActiveSection('ai-card');
    } else if (activeTab === 'emergency' || activeTab === 'gift-helper') {
      setActiveSection('emergency');
    } else if (activeTab === 'printables' || activeTab === 'downloads') {
      setActiveSection('printables');
    } else if (activeTab === 'calendar') {
      setActiveSection('calendar');
    }
  }, [activeTab]);

  const completed = Math.min(24, Math.max(1, completedCount));
  const progressPercent = Math.round((completed / 24) * 100);

  const scrollToAnchor = (id: string, sectionKey: string) => {
    setMobileMenuOpen(false);
    setActiveSection(sectionKey);
    if (activeTab !== 'landing') {
      onTabChange('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const LANG_FLAGS: Record<SupportedLanguage, { flag: string; label: string }> = {
    hu: { flag: '🇭🇺', label: 'Magyar' },
    en: { flag: '🇬🇧', label: 'English' },
    de: { flag: '🇩🇪', label: 'Deutsch' },
    ro: { flag: '🇷🇴', label: 'Română' },
    pl: { flag: '🇵🇱', label: 'Polski' },
    cz: { flag: '🇨🇿', label: 'Čeština' },
    sk: { flag: '🇸🇰', label: 'Slovenčina' },
  };

  const desktopNavItems = [
    {
      id: 'calendar',
      labels: { hu: 'Kalendárium', en: 'Calendar', de: 'Kalender', ro: 'Calendar', pl: 'Kalendarz', cz: 'Kalendář', sk: 'Kalendár' },
      onClick: () => scrollToAnchor('calendar-preview', 'calendar'),
    },
    {
      id: 'ai-card',
      labels: { hu: 'AI Képeslap', en: 'AI Card', de: 'KI-Karte', ro: 'Felicitare AI', pl: 'Karta AI', cz: 'AI Přání', sk: 'AI Pohľadnica' },
      onClick: () => {
        setActiveSection('ai-card');
        onTabChange('ai-card');
      },
    },
    {
      id: 'emergency',
      labels: { hu: 'Eszközök', en: 'Tools', de: 'Werkzeuge', ro: 'Instrumente', pl: 'Narzędzia', cz: 'Nástroje', sk: 'Nástroje' },
      onClick: () => {
        setActiveSection('emergency');
        onTabChange('emergency');
      },
    },
    {
      id: 'printables',
      labels: { hu: 'Nyomtatók', en: 'Printables', de: 'Vorlagen', ro: 'Resurse', pl: 'Materiały', cz: 'K tisku', sk: 'Na tlač' },
      onClick: () => {
        setActiveSection('printables');
        onTabChange('printables');
      },
    },
    {
      id: 'planuri',
      labels: { hu: 'Csomagok', en: 'Plans', de: 'Pakete', ro: 'Planuri', pl: 'Pakiety', cz: 'Balíčky', sk: 'Balíky' },
      onClick: () => scrollToAnchor('planuri-acces', 'planuri'),
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#fff8f6]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(74,21,27,0.06)] no-print h-14 sm:h-20 border-b border-[#eee7e4]">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Brand Logo & Name - Responsive to prevent squeezing on mobile */}
        <div className="w-auto max-w-[160px] sm:max-w-none sm:w-[225px] shrink-0 flex items-center gap-2 sm:gap-3">
          <img
            alt="Christmas Reset 2026 Monogram Logo"
            className="h-7 sm:h-8 w-auto object-contain cursor-pointer transition-transform hover:scale-105"
            onClick={() => {
              setActiveSection('calendar');
              onTabChange('landing');
            }}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaHwmXotQIinOY_9Njw3blFS8ggtm8cX707c0Fhr887qTmDZ6E0YgWrA1AmgDnMTz2HlWI9M8kChL7pRbO2EGaG88iDQupgmjqeCsZ0EvORGTc-3nJskJtMbBWJnJAS8rbBjqP5Xiv59xelDWT9lFXyr0o3pwCL0IZRct8ovnb0UMGAag-1NHiOAVQlhBRKIWXM5TMdTx9iczEvx5u1r87F3qzx8NpBBThczhVP5oAm4-UyrNdZwmS0Q"
          />
          <button
            onClick={() => {
              setActiveSection('calendar');
              onTabChange('landing');
            }}
            className="text-[#2e0208] tracking-tight font-bold text-sm sm:text-lg hover:opacity-90 transition-opacity text-left cursor-pointer truncate"
          >
            Christmas Reset <span className="font-normal text-[#534343] text-xs sm:text-sm italic">2026</span>
          </button>
        </div>

        {/* Desktop Nav Links - Fixed Slot Widths (114px each) & Smooth Red Sliding Background with Bauble */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-[#f4ecea] border border-[#eee7e4] shadow-inner shrink-0">
          {desktopNavItems.map((item) => {
            const isActive = activeSection === item.id;
            const labelText =
              (item.labels as Record<string, string>)[language] || item.labels.en || item.labels.ro;

            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className="relative w-[114px] h-9.5 shrink-0 flex items-center justify-center rounded-full cursor-pointer select-none px-2 transition-colors isolate overflow-hidden"
              >
                {/* Active Red Capsule Sliding & Left-to-Right Fill Animation */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavRedPill"
                    className="absolute inset-0 bg-[#BA1A2C] rounded-full shadow-[0_2px_12px_rgba(186,26,44,0.45)] z-0 overflow-hidden"
                    transition={{
                      type: 'spring',
                      stiffness: 440,
                      damping: 32,
                    }}
                  >
                    {/* Sweeping red wave filling from left to right */}
                    <motion.div
                      key={`red-fill-${item.id}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      style={{ originX: 0 }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 bg-gradient-to-r from-[#901323] via-[#BA1A2C] to-[#E62E40]"
                    />
                    {/* Brilliant light sheen sweeping across from left to right */}
                    <motion.div
                      key={`sheen-${item.id}`}
                      initial={{ x: '-100%' }}
                      animate={{ x: '180%' }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
                    />
                  </motion.div>
                )}

                {/* Button Content - Always on top with z-10 */}
                <div
                  className={`relative z-10 flex items-center justify-center gap-1.5 w-full transition-colors duration-150 ${
                    isActive
                      ? 'text-white font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]'
                      : 'text-[#534343] hover:text-[#2E0208] hover:bg-black/5 font-semibold'
                  }`}
                >
                  {/* Left Christmas Bauble / Gömb Animation on Active Item */}
                  <AnimatePresence mode="wait">
                    {isActive && <ChristmasBauble key={`bauble-${item.id}`} />}
                  </AnimatePresence>

                  <span className="truncate tracking-tight text-[12px]">{labelText}</span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Right Controls & CTAs - Rigid Dimensions to Guarantee Zero Layout Shift */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Progress Pill - Stable Locked Width (165px) */}
          <div
            onClick={() => scrollToAnchor('calendar-preview', 'calendar')}
            className="hidden xl:flex items-center justify-between w-[165px] shrink-0 px-3 py-1.5 rounded-full bg-[#f4ecea] cursor-pointer hover:bg-[#eee7e4] transition-colors border border-[#eee7e4]"
          >
            <div className="w-[88px] shrink-0 flex flex-col text-right">
              <span className="text-[10px] font-bold text-[#534343] tracking-wider truncate">
                {language === 'hu'
                  ? `${completed}. nap / 24`
                  : language === 'en'
                  ? `Day ${completed} / 24`
                  : `Ziua ${completed} / 24`}
              </span>
              <span className="text-[11px] font-bold text-[#4c6359] truncate">
                {progressPercent}% {language === 'hu' ? 'kész' : language === 'en' ? 'done' : 'finalizat'}
              </span>
            </div>
            <div className="w-11 h-1.5 shrink-0 bg-[#e8e1df] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#4c6359] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Discreet Audio & Snow Toggles - Stable Locked Width (68px) */}
          <div className="hidden sm:flex items-center justify-end w-[68px] shrink-0 gap-1 text-[#534343]">
            <button
              onClick={onToggleAudio}
              title={
                audioPlaying
                  ? language === 'hu'
                    ? 'Ünnepi zene némítása'
                    : language === 'en'
                    ? 'Mute Christmas music'
                    : 'Oprește muzica de Crăciun'
                  : language === 'hu'
                  ? 'Karácsonyi zene bekapcsolása'
                  : language === 'en'
                  ? 'Play Christmas music'
                  : 'Pornește muzica de Crăciun'
              }
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                audioPlaying ? 'bg-[#4a151b] text-white shadow-xs' : 'hover:bg-[#f4ecea] text-[#534343]'
              }`}
            >
              {audioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-70" />}
            </button>
            <button
              onClick={onToggleSnow}
              title={
                snowEnabled
                  ? language === 'hu'
                    ? 'Hóesés kikapcsolása'
                    : language === 'en'
                    ? 'Turn off snowfall'
                    : 'Oprește ninsoarea'
                  : language === 'hu'
                  ? 'Hóesés bekapcsolása'
                  : language === 'en'
                  ? 'Turn on snowfall'
                  : 'Pornește ninsoarea'
              }
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                snowEnabled ? 'text-[#4c6359] bg-[#f4ecea]' : 'opacity-40 hover:opacity-80'
              }`}
            >
              <Snowflake className="w-4 h-4" />
            </button>
          </div>

          {/* Language Switcher Pill - Click opens full modal with all 7 languages */}
          <button
            onClick={() => onOpenLanguageModal ? onOpenLanguageModal() : onLanguageChange(language === 'hu' ? 'en' : 'hu')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f4ecea] hover:bg-[#eee7e4] text-[#2e0208] text-xs font-bold border border-[#eee7e4] transition-all cursor-pointer shadow-2xs group"
            title={language === 'hu' ? 'Nyelv választása' : 'Change language'}
          >
            <span className="text-sm drop-shadow-xs">{LANG_FLAGS[language]?.flag || '🌍'}</span>
            <span className="font-bold text-[11px] uppercase tracking-wider">{language}</span>
            <Globe className="w-3.5 h-3.5 text-[#C29B48] group-hover:rotate-45 transition-transform" />
          </button>

          {/* Restore / Cloud Account button */}
          {onOpenRestoreModal && (
            <button
              onClick={onOpenRestoreModal}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#F1E9DB] text-[#621927] text-xs font-semibold border border-[#EAE3D5] transition-all cursor-pointer shadow-2xs"
              title={language === 'hu' ? 'Előfizetés visszaállítása adatbázisból' : 'Restore subscription from database'}
            >
              <span className="text-xs">🔑</span>
              <span className="hidden xl:inline">{language === 'hu' ? 'Visszaállítás' : 'Restore'}</span>
            </button>
          )}

          {/* User Tier Status Badge & CTA */}
          {userTier === 'premium' ? (
            <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#621927] text-[#D8B76E] border border-[#C29B48]/50 text-xs font-bold shadow-xs">
              <span className="text-xs">👑</span>
              <span>PRÉMIUM</span>
            </div>
          ) : userTier === 'standard' ? (
            <div className="flex items-center gap-1.5">
              <div className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#E6EFEA] text-[#2E5844] border border-[#2E5844]/30 text-xs font-bold">
                <span>✓</span>
                <span>STANDARD</span>
              </div>
              <button
                onClick={onOpenCheckout}
                className="hidden md:inline-flex items-center justify-center px-3 h-9 rounded-lg bg-[#621927] text-white font-bold text-xs tracking-wide hover:bg-[#46121C] transition-all shadow-xs cursor-pointer"
              >
                {language === 'hu' ? 'Prémiumra váltás (+€5)' : 'Upgrade to Premium'}
              </button>
            </div>
          ) : (
            /* Free Tier CTA */
            <button
              onClick={onOpenCheckout}
              className="hidden md:inline-flex items-center justify-center w-[132px] shrink-0 h-9 px-2.5 rounded-lg bg-[#4a151b] text-white font-bold text-xs tracking-wide hover:bg-[#2e0208] transition-all duration-200 shadow-[0_2px_8px_-1px_rgba(74,21,27,0.25)] cursor-pointer whitespace-nowrap"
            >
              {language === 'hu' ? 'Reset indítása' : language === 'de' ? 'Reset starten' : language === 'en' ? 'Start Reset' : 'Începe Resetul'}
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#2e0208] rounded-lg hover:bg-[#f4ecea] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fff8f6] border-b border-[#eee7e4] px-5 py-4 space-y-3 shadow-xl max-h-[85vh] overflow-y-auto">
          {/* User Tier Status Badge on Mobile */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#EAE3D5]">
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {userTier === 'premium' ? '👑' : userTier === 'standard' ? '✨' : '⭐️'}
              </span>
              <span className="text-xs font-bold text-[#2C0B12]">
                {userTier === 'premium' 
                  ? 'Prémium Örökös Licenc' 
                  : userTier === 'standard' 
                  ? 'Standard Csomag' 
                  : 'Ingyenes Csomag'}
              </span>
            </div>

            {onOpenRestoreModal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRestoreModal();
                }}
                className="text-[11px] font-semibold text-[#621927] underline flex items-center gap-1 cursor-pointer"
              >
                <span>🔑</span>
                <span>{language === 'hu' ? 'Visszaállítás' : 'Restore'}</span>
              </button>
            )}
          </div>

          {/* Mobile Navigation List - Comprehensive coverage for all pages */}
          <div className="space-y-1.5">
            {[
              {
                id: 'landing',
                label: language === 'hu' ? 'Főoldal' : language === 'de' ? 'Startseite' : language === 'en' ? 'Home' : 'Acasă',
                icon: Home,
                action: () => {
                  setActiveSection('calendar');
                  onTabChange('landing');
                },
                isActive: activeTab === 'landing' && activeSection !== 'calendar',
              },
              {
                id: 'calendar',
                label: language === 'hu' ? '24 Napos Kalendárium' : language === 'de' ? '24-Tage-Kalender' : language === 'en' ? '24-Day Calendar' : 'Calendarul de 24 Zile',
                icon: Calendar,
                action: () => {
                  setActiveSection('calendar');
                  onTabChange('calendar');
                },
                isActive: activeTab === 'calendar',
              },
              {
                id: 'emergency',
                label: language === 'hu' ? 'Vészhelyzet Mód & Mentőterv' : language === 'de' ? 'Notfall-Modus' : language === 'en' ? 'Emergency Lifesaver' : 'Modul de Urgență',
                icon: AlertTriangle,
                badge: language === 'hu' ? 'ÚJ' : 'NEW',
                action: () => {
                  setActiveSection('emergency');
                  onTabChange('emergency');
                },
                isActive: activeTab === 'emergency',
              },
              {
                id: 'printables',
                label: language === 'hu' ? 'Nyomtatható Segédanyagok (9 db)' : language === 'de' ? 'Druckvorlagen (9 Stk)' : language === 'en' ? 'Printable Planners (9)' : 'Fișe Imprimabile (9)',
                icon: FileText,
                action: () => {
                  setActiveSection('printables');
                  onTabChange('printables');
                },
                isActive: activeTab === 'printables' || activeTab === 'downloads',
              },
              {
                id: 'ai-card',
                label: language === 'hu' ? 'AI Képeslap Műhely' : language === 'de' ? 'KI-Weihnachtskarten' : language === 'en' ? 'AI Christmas Card Studio' : 'Atelier Felicitare AI',
                icon: Wand2,
                badge: 'AI',
                action: () => {
                  setActiveSection('ai-card');
                  onTabChange('ai-card');
                },
                isActive: activeTab === 'ai-card',
              },
              {
                id: 'gift-helper',
                label: language === 'hu' ? 'Ajándéksegéd & Kalkulátor' : language === 'de' ? 'Geschenk-Finder' : language === 'en' ? 'Gift Helper & Budget' : 'Ghidul de Cadouri',
                icon: Gift,
                action: () => {
                  setActiveSection('gift-helper');
                  onTabChange('gift-helper');
                },
                isActive: activeTab === 'gift-helper',
              },
              {
                id: 'planuri',
                label: language === 'hu' ? 'Előfizetési Csomagok & Árak' : language === 'de' ? 'Pakete & Preise' : language === 'en' ? 'Pricing & Packages' : 'Planuri & Prețuri',
                icon: CreditCard,
                action: () => {
                  scrollToAnchor('planuri-acces', 'planuri');
                },
                isActive: false,
              },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = item.isActive;

              return (
                <button
                  key={`mobile-${item.id}`}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    item.action();
                  }}
                  className={`relative w-full text-left py-3 px-3.5 rounded-xl transition-all flex items-center justify-between overflow-hidden isolate cursor-pointer min-h-[46px] ${
                    isActive
                      ? 'text-white font-bold shadow-md bg-[#BA1A2C]'
                      : 'text-[#1e1b1a] hover:bg-[#f4ecea] bg-white border border-[#eee7e4]/80'
                  }`}
                >
                  <div className="relative z-10 flex items-center gap-3">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#fde047]' : 'text-[#621927]'}`} />
                    <span className="text-sm font-semibold">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`relative z-10 text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-white/25 text-white' : 'bg-[#621927] text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Ambient Controls for Mobile */}
          <div className="flex items-center justify-between pt-2 border-t border-[#eee7e4] text-xs text-[#534343]">
            <span className="font-medium">{language === 'hu' ? 'Ünnepi hangulat:' : 'Holiday atmosphere:'}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleAudio}
                className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors cursor-pointer min-h-[36px] ${
                  audioPlaying ? 'bg-[#4a151b] text-white border-[#4a151b]' : 'bg-white text-[#534343] border-[#eee7e4]'
                }`}
              >
                {audioPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{audioPlaying ? (language === 'hu' ? 'Zene: Be' : 'Music: On') : (language === 'hu' ? 'Zene: Ki' : 'Music: Off')}</span>
              </button>

              <button
                onClick={onToggleSnow}
                className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-colors cursor-pointer min-h-[36px] ${
                  snowEnabled ? 'bg-[#4c6359] text-white border-[#4c6359]' : 'bg-white text-[#534343] border-[#eee7e4]'
                }`}
              >
                <Snowflake className="w-3.5 h-3.5" />
                <span>{snowEnabled ? (language === 'hu' ? 'Hó: Be' : 'Snow: On') : (language === 'hu' ? 'Hó: Ki' : 'Snow: Off')}</span>
              </button>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="pt-2 border-t border-[#eee7e4] flex items-center justify-between">
            <span className="text-xs font-medium text-[#534343] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#C29B48]" />
              <span>{language === 'hu' ? 'Nyelv választása' : language === 'de' ? 'Sprache wählen' : 'Language'}</span>
            </span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenLanguageModal) onOpenLanguageModal();
              }}
              className="px-3 py-1.5 text-xs rounded-lg font-bold bg-[#f4ecea] text-[#2e0208] border border-[#eee7e4] flex items-center gap-1.5 cursor-pointer shadow-2xs hover:bg-[#eee7e4] min-h-[40px]"
            >
              <span>{LANG_FLAGS[language]?.flag}</span>
              <span className="uppercase">{language}</span>
              <span className="text-[#C29B48] text-[10px]">▼</span>
            </button>
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCheckout();
            }}
            className="w-full mt-2 py-3.5 rounded-xl bg-[#4a151b] text-white font-bold text-sm text-center cursor-pointer shadow-md hover:bg-[#2e0208] transition-colors min-h-[44px]"
          >
            {userTier === 'premium'
              ? (language === 'hu' ? 'Kalendárium Megnyitása' : 'Open Calendar')
              : (language === 'hu' ? 'Prémium Hozzáférés Feloldása' : 'Unlock Lifetime Access')}
          </button>
        </div>
      )}
    </header>
  );
};
