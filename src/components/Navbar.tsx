import React, { useState } from 'react';
import { Menu, X, Snowflake, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '../types';

export type NavTab = 'landing' | 'calendar' | 'downloads' | 'printables' | 'emergency' | 'gift-helper' | 'progresul-meu' | 'instrumente' | 'planuri';

interface NavbarProps {
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
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
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
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
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const completed = Math.min(24, Math.max(1, completedCount));
  const progressPercent = Math.round((completed / 24) * 100);

  const scrollToAnchor = (id: string) => {
    setMobileMenuOpen(false);
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(74,21,27,0.04)] no-print">
      <div className="h-20 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <img
            alt="Christmas Reset 2026 Monogram Logo"
            className="h-8 w-auto object-contain cursor-pointer"
            onClick={() => onTabChange('landing')}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaHwmXotQIinOY_9Njw3blFS8ggtm8cX707c0Fhr887qTmDZ6E0YgWrA1AmgDnMTz2HlWI9M8kChL7pRbO2EGaG88iDQupgmjqeCsZ0EvORGTc-3nJskJtMbBWJnJAS8rbBjqP5Xiv59xelDWT9lFXyr0o3pwCL0IZRct8ovnb0UMGAag-1NHiOAVQlhBRKIWXM5TMdTx9iczEvx5u1r87F3qzx8NpBBThczhVP5oAm4-UyrNdZwmS0Q"
          />
          <button
            onClick={() => onTabChange('landing')}
            className="font-headline-sm text-headline-sm text-primary tracking-tight font-serif hover:opacity-90 transition-opacity text-left cursor-pointer"
          >
            Christmas Reset <span className="font-normal text-on-surface-variant text-base italic font-serif">2026</span>
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-8" data-active-classes="text-primary font-semibold border-b-2 border-primary-container pb-0.5">
          <button
            onClick={() => scrollToAnchor('calendar-preview')}
            className={`transition-colors font-serif text-[17px] cursor-pointer pb-0.5 ${
              activeTab === 'calendar' || activeTab === 'landing'
                ? 'text-primary font-semibold border-b-2 border-primary-container'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Calendar
          </button>
          <button
            onClick={() => scrollToAnchor('dashboard-preview')}
            className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            Progresul Meu
          </button>
          <button
            onClick={() => onTabChange('emergency')}
            className={`font-label-lg text-label-lg transition-colors cursor-pointer ${
              activeTab === 'emergency' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Instrumente
          </button>
          <button
            onClick={() => onTabChange('printables')}
            className={`font-label-lg text-label-lg transition-colors cursor-pointer ${
              activeTab === 'printables' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Resurse
          </button>
          <button
            onClick={() => scrollToAnchor('planuri-acces')}
            className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            Planuri
          </button>
        </nav>

        {/* Right Controls & CTAs */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Progress Pill */}
          <div
            onClick={() => scrollToAnchor('calendar-preview')}
            className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-full bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors"
          >
            <div className="flex flex-col text-right">
              <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider">
                Ziua {completed} / 24
              </span>
              <span className="font-body-sm text-body-sm font-semibold text-secondary">
                {progressPercent}% finalizat
              </span>
            </div>
            <div className="w-12 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>

          {/* Discreet Audio & Snow Toggles */}
          <div className="hidden sm:flex items-center gap-1 text-on-surface-variant">
            <button
              onClick={onToggleAudio}
              title={audioPlaying ? "Oprește ambianța audio" : "Pornește ambianța sonoră caldă"}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                audioPlaying ? 'bg-primary-container text-white' : 'hover:bg-surface-container-low text-on-surface-variant'
              }`}
            >
              {audioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-70" />}
            </button>
            <button
              onClick={onToggleSnow}
              title={snowEnabled ? "Oprește ninsoarea" : "Pornește ninsoarea"}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                snowEnabled ? 'text-secondary bg-surface-container-low' : 'opacity-40 hover:opacity-80'
              }`}
            >
              <Snowflake className="w-4 h-4" />
            </button>
          </div>

          {/* Language Switcher Pill (RO / EN / HU) */}
          <div className="flex items-center bg-surface-container-low rounded-lg p-1 text-on-surface-variant font-label-md text-label-md">
            <button
              onClick={() => onLanguageChange('ro')}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                language === 'ro'
                  ? 'bg-surface text-primary font-semibold shadow-[0_1px_3px_rgba(74,21,27,0.06)]'
                  : 'hover:text-on-surface'
              }`}
            >
              RO
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-surface text-primary font-semibold shadow-[0_1px_3px_rgba(74,21,27,0.06)]'
                  : 'hover:text-on-surface'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('hu')}
              className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                language === 'hu'
                  ? 'bg-surface text-primary font-semibold shadow-[0_1px_3px_rgba(74,21,27,0.06)]'
                  : 'hover:text-on-surface'
              }`}
            >
              HU
            </button>
          </div>

          {/* Primary CTA Button */}
          <button
            onClick={onOpenCheckout}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg hover:bg-primary transition-all duration-200 shadow-[0_2px_8px_-1px_rgba(74,21,27,0.2)] cursor-pointer"
          >
            Începe Resetul
          </button>

          {/* Profile / Preview mode icon */}
          <button
            onClick={onTogglePreviewMode}
            title={isPreviewMode ? "Mod Creator Activ (Toate zilele accesibile)" : "Mod Utilizator"}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-primary rounded-lg hover:bg-surface-container transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface border-b border-surface-container-high px-6 py-4 space-y-3">
          <button
            onClick={() => scrollToAnchor('calendar-preview')}
            className="w-full text-left font-serif text-lg text-primary py-2 border-b border-surface-container"
          >
            Calendarul Advent (24 Zile)
          </button>
          <button
            onClick={() => scrollToAnchor('dashboard-preview')}
            className="w-full text-left font-label-lg text-on-surface py-2 border-b border-surface-container"
          >
            Progresul Meu
          </button>
          <button
            onClick={() => { onTabChange('emergency'); setMobileMenuOpen(false); }}
            className="w-full text-left font-label-lg text-on-surface py-2 border-b border-surface-container flex items-center justify-between"
          >
            <span>Instrumente (Mod Urgență & Ghid Cadouri)</span>
            <span className="text-[10px] bg-tertiary-fixed text-tertiary-container px-2 py-0.5 rounded font-bold">NOU</span>
          </button>
          <button
            onClick={() => { onTabChange('printables'); setMobileMenuOpen(false); }}
            className="w-full text-left font-label-lg text-on-surface py-2 border-b border-surface-container"
          >
            Biblioteca de Resurse Printabile (9 Ghiduri)
          </button>
          <button
            onClick={() => scrollToAnchor('planuri-acces')}
            className="w-full text-left font-label-lg text-on-surface py-2 border-b border-surface-container"
          >
            Planuri & Prețuri
          </button>
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-on-surface-variant">Limbă</span>
            <div className="flex gap-2">
              <button onClick={() => onLanguageChange('ro')} className={`px-2 py-1 text-xs rounded ${language === 'ro' ? 'bg-primary text-white' : 'bg-surface-container'}`}>RO</button>
              <button onClick={() => onLanguageChange('en')} className={`px-2 py-1 text-xs rounded ${language === 'en' ? 'bg-primary text-white' : 'bg-surface-container'}`}>EN</button>
              <button onClick={() => onLanguageChange('hu')} className={`px-2 py-1 text-xs rounded ${language === 'hu' ? 'bg-primary text-white' : 'bg-surface-container'}`}>HU</button>
            </div>
          </div>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenCheckout(); }}
            className="w-full mt-3 py-3 rounded-lg bg-primary-container text-on-primary font-label-lg text-center"
          >
            Începe Resetul de Crăciun
          </button>
        </div>
      )}
    </header>
  );
};
