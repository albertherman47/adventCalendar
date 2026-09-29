import React, { useState } from 'react';
import { Download, Printer, ArrowLeft, Sparkles, Eye, X, Check, Heart, Film, Utensils, Gift, DollarSign, ShoppingCart, Clock, ShieldCheck, Mail, HelpCircle, TreePine, Snowflake } from 'lucide-react';
import { SupportedLanguage, PricingTier } from '../types';
import { getTranslations } from '../data/translations';
import { trackEvent } from '../utils/analytics';
import { PRINTABLE_RESOURCES, PrintableResourceData, getLocalizedText } from '../data/printableResources';
import { printA4, type PrintOrientation } from '../utils/printA4';

const holidayPhotos = Object.entries(import.meta.glob<string>(
  '../assets/christmas-images/*.{avif,gif,jpg,jpeg,png,webp}',
  { eager: true, query: '?url', import: 'default' },
)).sort(([a], [b]) => a.localeCompare(b)).map(([, imageUrl]) => imageUrl);

const christmasSvgFiles = Object.values(import.meta.glob<string>(
  '../assets/christmas-svgs/*.svg',
  { eager: true, query: '?url', import: 'default' },
));
const selectedChristmasSvgs = new Map<string, string>();

const getRandomChristmasSvg = (slot: string) => {
  if (christmasSvgFiles.length === 0) return undefined;
  if (!selectedChristmasSvgs.has(slot)) {
    const randomIndex = Math.floor(Math.random() * christmasSvgFiles.length);
    selectedChristmasSvgs.set(slot, christmasSvgFiles[randomIndex]);
  }
  return selectedChristmasSvgs.get(slot);
};

interface PrintableResourcesViewProps {
  language: SupportedLanguage;
  onBackToHome: () => void;
  selectedResourceId?: string | null;
  userTier?: PricingTier;
  isPreviewMode?: boolean;
  onOpenPaywall?: () => void;
}

export const PrintableResourcesView: React.FC<PrintableResourcesViewProps> = ({
  language,
  onBackToHome,
  selectedResourceId,
  userTier = 'free',
  isPreviewMode = true,
  onOpenPaywall,
}) => {
  const t = getTranslations(language);
  const resources = PRINTABLE_RESOURCES;

  const [activeItem, setActiveItem] = useState<PrintableResourceData | null>(() => {
    if (selectedResourceId) {
      return resources.find((item) => item.id === selectedResourceId) || null;
    }
    return null;
  });
  const [printOrientation, setPrintOrientation] = useState<PrintOrientation>('landscape');

  const handlePrint = (item: PrintableResourceData) => {
    setActiveItem(item);
  };

  const handlePrintActive = () => {
    if (!activeItem) return;
    trackEvent('download_resource', { resourceId: activeItem.id, title: getLocalizedText(activeItem.title, language) });
    printA4(printOrientation);
  };

  const getCardIcon = (styleType: string) => {
    switch (styleType) {
      case 'burgundy-gold':
        return <DollarSign className="w-5 h-5 text-amber-300" />;
      case 'pine-ribbon':
        return <Gift className="w-5 h-5 text-emerald-300" />;
      case 'cinnamon-apothecary':
        return <ShoppingCart className="w-5 h-5 text-[#C07044]" />;
      case 'bistro-menu':
        return <Utensils className="w-5 h-5 text-[#8A6A24]" />;
      case 'vintage-airmail':
        return <Mail className="w-5 h-5 text-[#B93845]" />;
      case 'candy-game':
        return <HelpCircle className="w-5 h-5 text-white" />;
      case 'midnight-cinema':
        return <Film className="w-5 h-5 text-amber-300" />;
      case 'hygge-cashmere':
        return <Clock className="w-5 h-5 text-[#395A4A]" />;
      case 'heraldic-shield':
        return <ShieldCheck className="w-5 h-5 text-amber-300" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8 no-print">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'hu' ? "Vissza a főoldalra" : language === 'en' ? "Back to Home" : t.nav.backToHome}</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 sm:px-4 py-1.5 rounded-full bg-[#E6EFEA] text-[#1E4D36] border border-[#1E4D36]/25 shadow-xs">
          <Sparkles className="w-4 h-4 text-[#2E5844] shrink-0" />
          <span className="font-christmas text-xs sm:text-sm tracking-wide">
            {language === 'hu'
              ? "A4 Nyomtatásra & PDF Mentésre Kész"
              : language === 'en'
              ? "Ready for A4 Print & PDF Download"
              : "Formatat pentru Print A4 & Salvare PDF"}
          </span>
        </div>
      </div>

      {/* Christmas editorial hero */}
      <section className="printables-hero no-print mb-12 sm:mb-16 overflow-hidden rounded-[2rem] border border-[#d8c7a4] shadow-[0_18px_55px_rgba(55,22,22,0.16)]">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] min-h-[350px]">
          <div className="relative z-10 flex flex-col justify-center px-7 py-10 sm:px-12 sm:py-14 text-[#fffaf0]">
            <div className="flex items-center gap-2 text-[#e5c781] text-xs font-bold uppercase tracking-[0.2em] mb-5">
              <Snowflake className="w-4 h-4" />
              <span>{language === 'hu' ? 'Karácsonyi műhely • 2026' : language === 'en' ? 'Christmas Atelier • 2026' : 'Atelier de Crăciun • 2026'}</span>
            </div>
            <h1 className="max-w-2xl font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.06] tracking-tight">
              {language === 'hu' ? 'Az ünnep apró örömei, papírra rendezve' : language === 'en' ? 'Little holiday joys, made tangible' : 'Bucurii de sărbători, așternute pe hârtie'}
            </h1>
            <p className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-[#f3e7d7]">
              {language === 'hu' ? 'Tervezők, listák és családi játékok a nyugodtabb készülődéshez. Válassz egy lapot, nézd át, majd nyomtasd ki vagy mentsd PDF-ként.' : language === 'en' ? 'Planners, lists and family games for a calmer season. Choose a page, preview it, then print or save it as a PDF.' : 'Planificatoare, liste și jocuri de familie pentru pregătiri mai liniștite. Alege o fișă, previzualizeaz-o și apoi imprim-o sau salveaz-o ca PDF.'}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#f3e7d7]">
              <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2">A4 • PDF</span>
              <span>{language === 'hu' ? '9 ünnepi segédanyag' : language === 'en' ? '9 festive printables' : '9 fișe festive'}</span>
            </div>
          </div>
          <div className="printables-hero-art relative min-h-[250px] lg:min-h-full flex items-center justify-center overflow-hidden">
            {holidayPhotos.length > 0 ? (
              <img src={holidayPhotos[0]} alt={language === 'hu' ? 'Karácsonyi hangulatkép' : 'Christmas scene'} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="relative flex flex-col items-center text-[#f2d89a]">
                <div className="absolute -top-12 -right-24 text-white/10"><Snowflake className="w-52 h-52" strokeWidth={0.6} /></div>
                <div className="relative rounded-full border border-[#e5c781]/40 bg-[#fffaf0]/5 p-7 shadow-[0_0_80px_rgba(229,199,129,0.12)]">
                  <TreePine className="w-36 h-36 sm:w-44 sm:h-44" strokeWidth={1.1} />
                  <span className="absolute top-5 left-1/2 w-2.5 h-2.5 rounded-full bg-[#e5c781] shadow-[0_0_14px_#e5c781]" />
                  <span className="absolute top-1/2 left-7 w-2 h-2 rounded-full bg-[#b8514b]" />
                  <span className="absolute bottom-8 right-8 w-2.5 h-2.5 rounded-full bg-[#b8514b]" />
                </div>
                <span className="mt-5 font-christmas text-2xl">Christmas Reset</span>
              </div>
            )}
            {holidayPhotos.length > 0 && <div className="absolute inset-0 bg-gradient-to-r from-[#35151b]/45 via-transparent to-[#35151b]/10" />}
            <div className="absolute bottom-5 right-5 rounded-full border border-white/30 bg-[#35151b]/70 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
              {language === 'hu' ? 'Készülj ráérősen' : language === 'en' ? 'Make room for joy' : 'Bucură-te de pregătiri'}
            </div>
          </div>
        </div>
      </section>

      <div className="no-print mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="font-christmas text-lg text-[#8e6b38]">{language === 'hu' ? 'Gondosan összeállítva az ünnepekre' : language === 'en' ? 'Made for the season' : 'Pregătite pentru sărbători'}</p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#42151b]">{language === 'hu' ? 'Válassz egy nyomtatható lapot' : language === 'en' ? 'Choose a printable' : 'Alege o fișă de imprimat'}</h2>
        </div>
        <span className="hidden sm:inline-flex items-center gap-2 text-xs text-[#6b5a4b]"><Printer className="w-4 h-4" />{language === 'hu' ? 'Előnézet minden nyomtatás előtt' : language === 'en' ? 'Preview before printing' : 'Previzualizare înainte de imprimare'}</span>
      </div>

      {/* 9 Cards Grid - Each with a completely unique design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 no-print">
        {resources.map((item, index) => {
          const isGold = item.visualTheme.styleType === 'burgundy-gold';
          const isPine = item.visualTheme.styleType === 'pine-ribbon';
          const isCinnamon = item.visualTheme.styleType === 'cinnamon-apothecary';
          const isBistro = item.visualTheme.styleType === 'bistro-menu';
          const isAirmail = item.visualTheme.styleType === 'vintage-airmail';
          const isCandy = item.visualTheme.styleType === 'candy-game';
          const isCinema = item.visualTheme.styleType === 'midnight-cinema';
          const isHygge = item.visualTheme.styleType === 'hygge-cashmere';
          const isShield = item.visualTheme.styleType === 'heraldic-shield';

          const isLocked = !isPreviewMode && (
            userTier === 'free' ? index >= 2 : userTier === 'standard' ? index >= 4 : false
          );

          return (
            <div
              key={item.id}
              className={`rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1.5 cursor-pointer ${item.visualTheme.containerClass}`}
              onClick={() => {
                if (isLocked) {
                  onOpenPaywall?.();
                } else {
                  setActiveItem(item);
                }
              }}
            >
              {holidayPhotos.length > 0 && (
                <div className="-mx-6 -mt-6 mb-5 h-36 overflow-hidden rounded-t-2xl border-b border-white/20">
                  <img src={holidayPhotos[index % holidayPhotos.length]} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              )}
              {/* Distinctive Decorative Corner / Top Element per card */}
              {isLocked && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#D8B76E] border border-[#D8B76E]/40 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 z-10">
                  <span className="w-2 h-2 rounded-full bg-[#D8B76E] animate-pulse" />
                  <span>{userTier === 'standard' ? 'Prémium' : 'Előfizetői'}</span>
                </div>
              )}
              {isGold && !isLocked && (
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden pointer-events-none rounded-tr-2xl">
                  <div className="bg-[#D4AF37] text-[#24050A] text-[9px] font-bold py-1 text-center rotate-45 transform translate-x-6 translate-y-3 shadow-xs uppercase tracking-wider">
                    2026
                  </div>
                </div>
              )}

              {isPine && (
                <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-[#E53935] text-white text-[11px] font-christmas shadow-sm flex items-center gap-1 border border-white/40">
                  <span>🎀</span>
                  <span>{language === 'hu' ? 'Ünnepi szalag' : language === 'en' ? 'Holiday Ribbon' : 'Panglică Festivă'}</span>
                </div>
              )}

              {isCinnamon && (
                <div className="w-16 h-3 bg-[#8C5332] rounded-full mx-auto -mt-3 mb-4 shadow-inner opacity-70 border border-[#5C3218]"></div>
              )}

              {isBistro && (
                <div className="text-center text-[#C49E52] text-xs tracking-widest uppercase mb-2 font-serif">
                  — ✦ Atelier Gastronomique ✦ —
                </div>
              )}

              {isAirmail && (
                <div className="absolute top-3 right-3 w-12 h-14 border-2 border-dashed border-[#B93845] bg-[#FFF2F4] rounded-sm p-1 flex flex-col items-center justify-center text-[#B93845] shadow-xs rotate-3">
                  <span className="text-[8px] font-bold uppercase tracking-wider">AIRMAIL</span>
                  <span className="text-xs">🎄</span>
                  <span className="text-[7px] font-mono">2026</span>
                </div>
              )}

              {isCandy && (
                <div className="absolute top-2 right-4 text-2xl animate-pulse select-none">
                  ❄
                </div>
              )}

              {isCinema && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono text-[10px] tracking-widest border border-amber-400/40">
                  ADM. 01
                </div>
              )}

              {isHygge && (
                <div className="absolute top-3 right-4 text-xl select-none opacity-80">
                  ☕
                </div>
              )}

              {isShield && (
                <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-[#E5A93C] text-[#360810] font-black text-[10px] uppercase tracking-wider shadow-md">
                  ★ {language === 'hu' ? 'Nyugalom Garancia' : language === 'en' ? 'Zero Stress' : 'Liniște Garantată'}
                </div>
              )}

              {/* Card Body */}
              <div className="mt-1">
                {/* Badge & Page Meta */}
                <div className="flex items-center justify-between mb-3 gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="p-1.5 rounded-lg bg-black/10 backdrop-blur-xs">
                      {getCardIcon(item.visualTheme.styleType)}
                    </div>
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${item.visualTheme.badgeClass}`}>
                      {getLocalizedText(item.badge, language)}
                    </span>
                  </div>

                  <span className="text-xs font-medium opacity-80">
                    {getLocalizedText(item.pageCount, language)}
                  </span>
                </div>

                {/* Card Number / Theme Accent */}
                <div className="font-christmas text-sm tracking-wide opacity-75 mb-1">
                  N° 0{index + 1} • {getLocalizedText(item.category, language)}
                </div>

                {/* Card Main Title */}
                <h3 className={`font-serif text-xl sm:text-2xl font-bold leading-snug mb-1.5 ${item.visualTheme.headerAccentClass}`}>
                  {getLocalizedText(item.title, language)}
                </h3>

                {/* Subtitle in Christmas Font */}
                <p className="font-christmas text-base sm:text-lg mb-3 opacity-90 leading-tight">
                  {getLocalizedText(item.subtitle, language)}
                </p>

                {/* Description */}
                <p className="text-xs leading-relaxed opacity-85 mb-6">
                  {getLocalizedText(item.description, language)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-current/15 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isLocked) {
                      onOpenPaywall?.();
                    } else {
                      setActiveItem(item);
                    }
                  }}
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 bg-black/10 hover:bg-black/20 transition-colors backdrop-blur-xs cursor-pointer border border-current/20"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isLocked ? (language === 'hu' ? 'Feloldás' : 'Unlock') : (language === 'hu' ? "Nagyítás & Lapozás" : "Inspect & Preview")}</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isLocked) {
                      onOpenPaywall?.();
                    } else {
                      handlePrint(item);
                    }
                  }}
                  className="py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-white text-primary hover:bg-amber-100 transition-colors shadow-sm cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                    <span>{language === 'hu' ? "Előnézet" : language === 'en' ? "Preview" : "Previzualizare"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Modal Sheet Preview for the active item */}
      {activeItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4" onClick={(event) => { if (event.target === event.currentTarget) setActiveItem(null); }}>
          <div className="relative w-full max-w-3xl bg-surface rounded-2xl shadow-2xl p-4 sm:p-8 space-y-5 sm:space-y-6 max-h-[92vh] overflow-y-auto border border-surface-container-high">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high no-print">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-secondary px-2 py-0.5 rounded bg-secondary-container/40">
                    {getLocalizedText(activeItem.category, language)} • Format A4
                  </span>
                  <span className="font-christmas text-base text-primary">
                    Christmas Reset 2026
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-3xl font-bold text-primary mt-1">
                  {getLocalizedText(activeItem.title, language)}
                </h3>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="p-2.5 text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="no-print flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#D8C9B6] bg-[#F8F4EE] px-4 py-3 text-xs text-[#534343]" aria-label={language === 'hu' ? 'Nyomtatási beállítások előnézete' : 'Print settings preview'}>
              <span className="font-semibold text-[#4A151B]">
                {language === 'hu' ? 'Nyomtatási előnézet' : language === 'en' ? 'Print preview' : 'Previzualizare print'}
              </span>
              <div className="inline-flex items-center gap-1 rounded-lg border border-[#D8C9B6] bg-white p-1" role="group" aria-label={language === 'hu' ? 'Lap tájolása' : 'Page orientation'}>
                {(['portrait', 'landscape'] as const).map((orientation) => (
                  <button
                    key={orientation}
                    type="button"
                    aria-pressed={printOrientation === orientation}
                    onClick={() => setPrintOrientation(orientation)}
                    className={`rounded-md px-2.5 py-1.5 font-semibold transition-colors ${printOrientation === orientation ? 'bg-[#4A151B] text-white' : 'text-[#534343] hover:bg-[#F3ECE2]'}`}
                  >
                    {orientation === 'portrait'
                      ? (language === 'hu' ? 'Álló' : language === 'en' ? 'Portrait' : 'Portret')
                      : (language === 'hu' ? 'Fekvő' : language === 'en' ? 'Landscape' : 'Peisaj')}
                  </button>
                ))}
              </div>
              <span>{getLocalizedText(activeItem.pageCount, language)}</span>
            </div>

            {/* The Actual Printable Sheet Paper Presentation */}
            <div id="print-sheet" className="print-page bg-white rounded-xl p-4 sm:p-10 border border-surface-container shadow-md space-y-5 sm:space-y-6 text-[#1E1B1A]">
              {/* Sheet Decorative Header */}
              <div className="text-center pb-5 border-b-2 border-primary/20 space-y-1.5 relative">
                {getRandomChristmasSvg(`sheet-${activeItem.id}`) && (
                  <img src={getRandomChristmasSvg(`sheet-${activeItem.id}`)} alt="" aria-hidden="true" className="printable-page-art mx-auto h-14 sm:h-16 w-full max-w-[300px] object-contain" />
                )}
                <div className="text-xs uppercase tracking-widest text-secondary font-bold flex items-center justify-center gap-2">
                  <span>✦</span>
                  <span className="font-christmas text-base tracking-wider">Christmas Reset Atelier 2026</span>
                  <span>✦</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold text-primary">
                  {getLocalizedText(activeItem.title, language)}
                </h2>
                <p className="font-christmas text-lg sm:text-xl text-primary-container italic">
                  {getLocalizedText(activeItem.subtitle, language)}
                </p>
              </div>

              {/* SHEET SPECIFIC RICH CONTENT */}
              {activeItem.id === 'printable-budget' && (
                <div className="space-y-5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#FBF8F5] rounded-xl border border-[#E8DFC8]">
                    <div className="font-serif text-sm">
                      <span className="text-secondary font-bold block mb-1">
                        {language === 'hu' ? "Teljes Költségkeret:" : language === 'en' ? "Hard Budget Cap:" : "Plafon Buget Total Maxim:"}
                      </span>
                      <span className="text-base font-bold text-primary">____________________ {language === 'ro' ? 'Lei' : language === 'hu' ? 'Ft' : 'EUR'}</span>
                    </div>
                    <div className="font-serif text-sm sm:text-right">
                      <span className="text-secondary font-bold block mb-1">
                        {language === 'hu' ? "Dátum & Állapot:" : language === 'en' ? "Date & Status:" : "Data & Status:"}
                      </span>
                      <span className="text-base text-on-surface-variant font-medium">_____ / 12 / 2026 • Confirmat</span>
                    </div>
                  </div>

                  <table className="w-full border-collapse border border-[#E8DFC8] text-left text-xs">
                    <thead>
                      <tr className="bg-[#F5EDE1] text-primary font-bold">
                        <th className="border border-[#E8DFC8] p-2.5">
                          {language === 'hu' ? "Kiadási Kategória" : language === 'en' ? "Spending Category" : "Categorie Cheltuială"}
                        </th>
                        <th className="border border-[#E8DFC8] p-2.5">
                          {language === 'hu' ? "Tervezett Keret" : language === 'en' ? "Planned Cap" : "Buget Alocat"}
                        </th>
                        <th className="border border-[#E8DFC8] p-2.5">
                          {language === 'hu' ? "Valós Összeg" : language === 'en' ? "Actual Spent" : "Cheltuială Reală"}
                        </th>
                        <th className="border border-[#E8DFC8] p-2.5">
                          {language === 'hu' ? "Eltérés (+/-)" : language === 'en' ? "Variance" : "Diferență"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(language === 'hu'
                        ? ['Közeli Család & Gyerekek Ajándékai', 'Barátok, Rokonok & Kollégák', 'Ünnepi Asztal, Ételek & Italok', 'Karácsonyfa, Díszek & Hangulat', 'Ünnepi Ruházat & Megjelenés', 'Váratlan Kiadások & Tartalék']
                        : language === 'en'
                        ? ['Partner & Children Gifts', 'Extended Family & Friends', 'Holiday Feast, Groceries & Wines', 'Christmas Tree, Lights & Decor', 'Festive Outfits & Grooming', 'Emergency Peace Buffer']
                        : ['Cadouri Partener & Copii', 'Cadouri Prieteni & Colegi', 'Masa de Crăciun, Băcănie & Vin', 'Brad, Luminițe & Decorațiuni', 'Ținute Festive & Îngrijire', 'Rezervă de Liniște / Urgențe']
                      ).map((cat, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#FAF7F2]'}>
                          <td className="border border-[#E8DFC8] p-2.5 font-semibold text-primary">{cat}</td>
                          <td className="border border-[#E8DFC8] p-2.5 text-center text-on-surface-variant font-mono">_________</td>
                          <td className="border border-[#E8DFC8] p-2.5 text-center text-on-surface-variant font-mono">_________</td>
                          <td className="border border-[#E8DFC8] p-2.5 text-center text-on-surface-variant font-mono">_________</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="p-3 bg-[#FAF2ED] rounded-lg border border-[#DEC7B5] text-[11px] text-[#7A3311] italic">
                    💡 {language === 'hu'
                      ? "Arany szabály: Ha az egyik kategóriában kevesebbet költesz, ne találj ki új kiadást! Tedd el a megmaradt összeget januári nyugalmi tartaléknak."
                      : language === 'en'
                      ? "Golden Reset Rule: If you spend less in one category, do not invent new expenses. Keep the surplus as your January peace buffer."
                      : "Regula Resetului: Dacă economisești într-o categorie, nu inventa cheltuieli noi! Păstrează surplusul pentru fondul tău de liniște în ianuarie."}
                  </div>
                </div>
              )}

              {activeItem.id === 'printable-gifts' && (
                <div className="space-y-4 text-xs">
                  <table className="w-full border-collapse border border-[#D5E5DC] text-left">
                    <thead>
                      <tr className="bg-[#EBF4F0] text-[#163828] font-bold text-xs">
                        <th className="border border-[#D5E5DC] p-2">
                          {language === 'hu' ? "Címzett Neve" : language === 'en' ? "Recipient" : "Destinatar"}
                        </th>
                        <th className="border border-[#D5E5DC] p-2">
                          {language === 'hu' ? "Ajándékötlet" : language === 'en' ? "Gift Concept" : "Idee Cadou"}
                        </th>
                        <th className="border border-[#D5E5DC] p-2">
                          {language === 'hu' ? "Keret" : language === 'en' ? "Budget" : "Buget"}
                        </th>
                        <th className="border border-[#D5E5DC] p-2 text-center">
                          {language === 'hu' ? "Megvéve" : language === 'en' ? "Bought" : "Cumpărat"}
                        </th>
                        <th className="border border-[#D5E5DC] p-2 text-center">
                          {language === 'hu' ? "Becsomagolva" : language === 'en' ? "Wrapped" : "Împachetat"}
                        </th>
                        <th className="border border-[#D5E5DC] p-2 text-center">
                          {language === 'hu' ? "Kísérőkártya" : language === 'en' ? "Card Note" : "Felicitare"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 8 }).map((_, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F9FCFA]'}>
                          <td className="border border-[#D5E5DC] p-2 text-primary font-medium">________________</td>
                          <td className="border border-[#D5E5DC] p-2 text-on-surface-variant">________________</td>
                          <td className="border border-[#D5E5DC] p-2 text-on-surface-variant font-mono">______</td>
                          <td className="border border-[#D5E5DC] p-2 text-center text-secondary font-bold">[  ]</td>
                          <td className="border border-[#D5E5DC] p-2 text-center text-secondary font-bold">[  ]</td>
                          <td className="border border-[#D5E5DC] p-2 text-center text-secondary font-bold">[  ]</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="p-3 bg-[#F0F7F4] rounded-lg border border-[#C5E0D4] text-[11px] text-[#1E4D36]">
                    🎁 {language === 'hu'
                      ? "Jó tanács: Csomagold be az ajándékot aznap, amikor megérkezik vagy megveszed. Soha ne hagyd szenteste éjjelére a csomagolást!"
                      : language === 'en'
                      ? "Pro Tip: Wrap each gift the day it arrives or is bought. Never postpone wrapping to late Christmas Eve!"
                      : "Sfat de atelier: Împachetează cadourile în seara în care le cumperi sau sosesc. Nu lăsa niciodată ambalarea pentru noaptea de 24 Decembrie!"}
                  </div>
                </div>
              )}

              {activeItem.id === 'printable-grocery' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-[#FAF4ED] rounded-xl border border-[#E5D2C2] space-y-2">
                    <h4 className="font-serif font-bold text-[#8C461F] text-sm flex items-center gap-1.5 border-b border-[#E5D2C2] pb-1">
                      <span>🌾</span> {language === 'hu' ? "1. Kamra & Tartós Élelmiszer" : language === 'en' ? "1. Pantry & Baking Essentials" : "1. Băcănie & Cămară Uscată"}
                    </h4>
                    <p className="text-[11px] text-on-surface-variant italic">
                      [ ] {language === 'hu' ? "Fényes liszt, porcukor, vaníliás cukor" : language === 'en' ? "Flour, powdered sugar, vanilla extract" : "Făină, zahăr pudră, extract de vanilie"}
                    </p>
                    <p className="text-[11px] text-on-surface-variant italic">
                      [ ] {language === 'hu' ? "Darált dió, mák, étcsokoládé pasztillák" : language === 'en' ? "Walnuts, poppy seeds, dark chocolate" : "Nucă măcinată, ciocolată neagră, stafide"}
                    </p>
                    <p className="text-[11px] text-on-surface-variant italic">[ ] _________________________________</p>
                    <p className="text-[11px] text-on-surface-variant italic">[ ] _________________________________</p>
                  </div>

                  <div className="p-3.5 bg-[#F4F8F6] rounded-xl border border-[#CDE3D8] space-y-2">
                    <h4 className="font-serif font-bold text-[#2A5C43] text-sm flex items-center gap-1.5 border-b border-[#CDE3D8] pb-1">
                      <span>🥛</span> {language === 'hu' ? "2. Hűtő & Tejtermékek" : language === 'en' ? "2. Dairy & Refrigerated" : "2. Lactate & Proaspete"}
                    </h4>
                    <p className="text-[11px] text-on-surface-variant italic">
                      [ ] {language === 'hu' ? "Magas zsírtartalmú vaj (82%), habtejszín" : language === 'en' ? "High fat butter (82%), heavy cream" : "Unt gras (82%), smântână pentru frișcă"}
                    </p>
                    <p className="text-[11px] text-on-surface-variant italic">
                      [ ] {language === 'hu' ? "Friss tej, sajtválogatás, tanyasi tojás" : language === 'en' ? "Farm eggs, artisanal cheeses, fresh milk" : "Ouă proaspete, brânzeturi maturate"}
                    </p>
                    <p className="text-[11px] text-on-surface-variant italic">[ ] _________________________________</p>
                    <p className="text-[11px] text-on-surface-variant italic">[ ] _________________________________</p>
                  </div>

                  <div className="p-3.5 bg-[#FDF7F5] rounded-xl border border-[#E9CEC7] space-y-2">
                    <h4 className="font-serif font-bold text-[#963728] text-sm flex items-center gap-1.5 border-b border-[#E9CEC7] pb-1">
                      <span>🥩</span> {language === 'hu' ? "3. Húsok, Halak & Főfogás" : language === 'en' ? "3. Meats, Fish & Mains" : "3. Carne, Pește & Fripturi"}
                    </h4>
                    <p className="text-[11px] text-on-surface-variant italic">
                      [ ] {language === 'hu' ? "Előrendelt ünnepi hús / lazac / pulyka" : language === 'en' ? "Pre-ordered roast / salmon / turkey" : "Carne comandată / somon / curcan"}
                    </p>
                    <p className="text-[11px] text-on-surface-variant italic">
                      [ ] {language === 'hu' ? "Füstölt húsok, kolbászok a hidegtálhoz" : language === 'en' ? "Charcuterie and cured sausages" : "Afumături tradiționale pentru aperitiv"}
                    </p>
                    <p className="text-[11px] text-on-surface-variant italic">[ ] _________________________________</p>
                    <p className="text-[11px] text-on-surface-variant italic">[ ] _________________________________</p>
                  </div>

                  <div className="p-3.5 bg-[#FAF6EE] rounded-xl border border-[#E5DBC7] space-y-2">
                    <h4 className="font-serif font-bold text-[#7E6523] text-sm flex items-center gap-1.5 border-b border-[#E5DBC7] pb-1">
                      <span>🍊</span> {language === 'hu' ? "4. Zöldség, Gyümölcs & Italok" : language === 'en' ? "4. Fresh Produce & Spirits" : "4. Fructe, Mirodenii & Băuturi"}
                    </h4>
                    <p className="text-[11px] text-on-surface-variant italic">
                      [ ] {language === 'hu' ? "Narancs, citrom, fahéjrúd, rozmaring" : language === 'en' ? "Oranges, lemons, cinnamon sticks, fresh rosemary" : "Portocale, lămâi, scorțișoară, rozmarin proaspăt"}
                    </p>
                    <p className="text-[11px] text-on-surface-variant italic">
                      [ ] {language === 'hu' ? "Forralt bor fűszer, pezsgő, ásványvíz" : language === 'en' ? "Sparkling wine, mineral water, festive tea" : "Vin fiert, șampanie, apă minerală carbogazoasă"}
                    </p>
                    <p className="text-[11px] text-on-surface-variant italic">[ ] _________________________________</p>
                    <p className="text-[11px] text-on-surface-variant italic">[ ] _________________________________</p>
                  </div>
                </div>
              )}

              {activeItem.id === 'printable-menu' && (
                <div className="p-6 bg-[#FCFAF5] rounded-xl border-2 border-double border-[#C49E52] space-y-4 text-center">
                  <div className="font-christmas text-2xl text-[#8A6A24]">
                    Menu de Noël 2026
                  </div>
                  <div className="space-y-3 text-xs max-w-md mx-auto">
                    <div className="border-b border-[#C49E52]/30 pb-2">
                      <span className="text-[10px] uppercase tracking-widest text-[#8A6A24] font-bold block mb-1">
                        {language === 'hu' ? "I. Előétel & Koccintás" : language === 'en' ? "I. Hors d’œuvres & Toast" : "I. Aperitive Calde & Toast"}
                      </span>
                      <p className="font-serif text-sm font-semibold text-primary">___________________________________________________</p>
                    </div>

                    <div className="border-b border-[#C49E52]/30 pb-2">
                      <span className="text-[10px] uppercase tracking-widest text-[#8A6A24] font-bold block mb-1">
                        {language === 'hu' ? "II. Ünnepi Leves vagy Fogás" : language === 'en' ? "II. The Warm Starter" : "II. Supă Festivă sau Antreu"}
                      </span>
                      <p className="font-serif text-sm font-semibold text-primary">___________________________________________________</p>
                    </div>

                    <div className="border-b border-[#C49E52]/30 pb-2">
                      <span className="text-[10px] uppercase tracking-widest text-[#8A6A24] font-bold block mb-1">
                        {language === 'hu' ? "III. A Főfogás & Pazar Köretek" : language === 'en' ? "III. The Grand Roast & Sides" : "III. Friptura Principală & Garnituri"}
                      </span>
                      <p className="font-serif text-sm font-semibold text-primary">___________________________________________________</p>
                    </div>

                    <div className="border-b border-[#C49E52]/30 pb-2">
                      <span className="text-[10px] uppercase tracking-widest text-[#8A6A24] font-bold block mb-1">
                        {language === 'hu' ? "IV. A Karácsonyi Desszert" : language === 'en' ? "IV. Holiday Confections" : "IV. Desertul de Gală"}
                      </span>
                      <p className="font-serif text-sm font-semibold text-primary">___________________________________________________</p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#8A6A24] font-bold block mb-1">
                        {language === 'hu' ? "V. Kávé & Válogatott Borok" : language === 'en' ? "V. Wine Pairing & Digestif" : "V. Băuturi Asortate & Cafea"}
                      </span>
                      <p className="font-serif text-sm font-semibold text-primary">___________________________________________________</p>
                    </div>
                  </div>
                </div>
              )}

              {activeItem.id === 'printable-cards' && (
                <div className="print-greeting-grid grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {[
                    {
                      no: 1,
                      title: language === 'hu' ? "Béke & Szelíd Fények" : language === 'en' ? "Peace & Gentle Light" : "Pace & Luminițe Blânde",
                      text: language === 'hu' ? "Kívánom, hogy a karácsony csendje hozzon mély megnyugvást, melegséget és békét a szívedbe." : language === 'en' ? "May the gentle stillness of Christmas fill your home with lasting warmth, peace and light." : "Fie ca liniștea blândă a Crăciunului să aducă pace profundă și căldură în căminul tău.",
                    },
                    {
                      no: 2,
                      title: language === 'hu' ? "A Legmelegebb Gondolatok" : language === 'en' ? "Warmest Hearth Wishes" : "Gânduri Calde de Sărbători",
                      text: language === 'hu' ? "Köszönöm, hogy ebben az évben is támaszom és örömöm voltál. Boldog, meghitt karácsonyt!" : language === 'en' ? "Grateful for your warmth and friendship throughout this year. Wishing you cozy holiday moments!" : "Mulțumesc pentru sprijinul și zâmbetul tău de-a lungul anului. Sărbători magice!",
                    },
                    {
                      no: 3,
                      title: language === 'hu' ? "Téli Csillagok Alatt" : language === 'en' ? "Under Winter Stars" : "Sub Stele de Iarnă",
                      text: language === 'hu' ? "Álljon meg az idő egy pillanatra, hogy megélhessük a legfontosabbat: az együttlét örömét." : language === 'en' ? "Let time slow down so we may cherish what truly matters: being together." : "Să lăsăm timpul în loc pentru câteva clipe, bucurându-ne de cel mai frumos dar: prezența celor dragi.",
                    },
                    {
                      no: 4,
                      title: language === 'hu' ? "Új Remények 2027" : language === 'en' ? "New Horizons 2027" : "Speranță & Lumină 2027",
                      text: language === 'hu' ? "Világos, bátor és szeretettel teli új esztendőt kívánok sok szép közös pillanattal!" : language === 'en' ? "Wishing you a bright, healthy, joyful New Year filled with renewed vitality and peace!" : "Un an nou plin de claritate, sănătate și noi capitole scrise cu bucurie!",
                    },
                  ].map((card) => (
                    <div key={card.no} className={`print-greeting-card print-greeting-card-${card.no} relative overflow-hidden rounded-xl border p-4 sm:p-5`}>
                      {holidayPhotos.length > 0 && (
                        <div className="greeting-photo-band -mx-5 -mt-5 mb-4 h-20 overflow-hidden">
                          <img src={holidayPhotos[(card.no - 1) % holidayPhotos.length]} alt="" className="h-full w-full object-cover" />
                        </div>
                      )}
                      {getRandomChristmasSvg(`greeting-${activeItem.id}-${card.no}`) && (
                        <img src={getRandomChristmasSvg(`greeting-${activeItem.id}-${card.no}`)} alt="" aria-hidden="true" className="greeting-card-art" />
                      )}
                      <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em]">
                        <span>{language === 'hu' ? 'Ünnepi üdvözlet' : language === 'en' ? 'Holiday greeting' : 'Urări de sărbători'}</span>
                        <span>№ 0{card.no} · 2026</span>
                      </div>
                      <div className="my-3 h-px bg-current opacity-25" />
                      <h5 className="font-serif text-lg sm:text-xl font-bold leading-tight">{card.title}</h5>
                      <p className="mt-2 font-serif italic text-xs sm:text-sm leading-relaxed">“{card.text}”</p>
                      <div className="mt-4 flex items-center justify-between border-t border-current/20 pt-2 text-[9px] font-semibold uppercase tracking-wider">
                        <span>Christmas Reset · Atelier</span>
                        <span>{language === 'hu' ? 'Szeretettel' : language === 'en' ? 'With warmth' : 'Cu drag'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeItem.id === 'printable-family-game' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    language === 'hu' ? "Ki a családból az, aki legelőször kibontana egy ajándékot szenteste előtt?" : language === 'en' ? "Who in the family is most likely to peek at a present before Christmas Eve?" : "Cine din familie are cele mai mari șanse să desfacă pe furiș un cadou înainte de Ajun?",
                    language === 'hu' ? "Mi volt a legviccesebb vagy legszebb közös karácsonyi emlékünk 5 évvel ezelőtt?" : language === 'en' ? "What is your fondest or funniest shared Christmas memory from childhood?" : "Care este cea mai amuzantă amintire comună pe care o avem de la un Crăciun din trecut?",
                    language === 'hu' ? "Melyik illat vagy sütemény juttatja eszedbe azonnal a karácsonyt?" : language === 'en' ? "What specific winter aroma instantly brings back holiday nostalgia for you?" : "Ce aromă specifică îți aduce aminte instantaneu de sărbătorile de iarnă?",
                    language === 'hu' ? "Énekelj el két sort a kedvenc karácsonyi dalodból, vagy mutass be egy hóember táncot!" : language === 'en' ? "Sing 2 lines of your favorite carol or do your best impression of a dancing penguin!" : "Cântă două versuri din colindul tău preferat sau fă o mică mișcare de dans pe zăpadă!",
                    language === 'hu' ? "Mi az az egyetlen dolog, amiért a leginkább hálás vagy a családnak ebben az évben?" : language === 'en' ? "What is one thing about our family that you are deeply grateful for this year?" : "Pentru ce lucru legat de familia noastră ești cel mai recunoscător în acest an?",
                    language === 'hu' ? "Ha a családunk egy karácsonyi film lenne, mi lenne a címe és a műfaja?" : language === 'en' ? "If our holiday together were a holiday movie title, what would it be named?" : "Dacă sărbătorile noastre împreună ar fi titlul unui film de Crăciun, cum s-ar numi?",
                  ].map((q, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-lg border-2 border-dashed border-[#C92A41]/40 flex items-start gap-2 shadow-xs">
                      <span className="font-christmas text-lg text-[#C92A41] font-bold">#{idx + 1}</span>
                      <p className="font-serif text-xs text-primary font-medium leading-relaxed">{q}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeItem.id === 'printable-movie-kit' && (
                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-[#0F1B2F] text-white rounded-xl space-y-2 border border-amber-400/40">
                    <div className="flex justify-between items-center border-b border-white/20 pb-2">
                      <span className="font-christmas text-amber-300 text-lg">✦ Holiday Cinema Club 2026 ✦</span>
                      <span className="text-[10px] font-mono text-amber-200">ADMIT ALL</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                      <div>[ ] Singur Acasă / Home Alone (1 & 2)</div>
                      <div>[ ] Klaus (2019)</div>
                      <div>[ ] It's a Wonderful Life (1946)</div>
                      <div>[ ] The Holiday (2006)</div>
                      <div>[ ] Polar Express (2004)</div>
                      <div>[ ] Miracle on 34th Street (1947)</div>
                    </div>
                  </div>
                  <div className="p-3 bg-[#FAF4ED] rounded-xl border border-[#DEC7B5] text-[11px] text-[#7A3311]">
                    🍿 <strong>{language === 'hu' ? "Karamellás Popcorn Recept:" : language === 'en' ? "Caramel Popcorn Secret:" : "Rețetă Popcorn Caramelizat:"}</strong>{" "}
                    {language === 'hu'
                      ? "Olvassz 50g vajat 3 evőkanál barna cukorral és csipet fahéjjal, forgasd a friss pattogatott kukoricához, és szórd meg egy leheletnyi tengeri sóval."
                      : language === 'en'
                      ? "Melt 50g butter with 3 tbsp brown sugar and a pinch of cinnamon, toss with hot popcorn, and dust with flaky sea salt."
                      : "Topește 50g unt cu 3 linguri zahăr brun și un praf de scorțișoară, toarnă peste floricele calde și presară fulgi de sare marină."}
                  </div>
                </div>
              )}

              {activeItem.id === 'printable-morning' && (
                <div className="space-y-3 text-xs">
                  {[
                    { time: "08:00 – 08:45", title: language === 'hu' ? "Lassú Ébredés & Kávéillat" : language === 'en' ? "Slow Awakening & Fresh Coffee" : "Trezire Lentă & Aromă de Cafea", desc: language === 'hu' ? "Gyújts meg egy gyertyát, indítsd el a halk karácsonyi zenét, és élvezd az első csésze forró italt csendben." : language === 'en' ? "Light your first candle, start the soft acoustic holiday carols, and savor hot brew in peaceful silence." : "Aprinde o lumânare, pornește muzica blândă și savurează prima cafea sau ceai în liniște deplină." },
                    { time: "08:45 – 09:45", title: language === 'hu' ? "Pizsamás Reggeli Kényelemben" : language === 'en' ? "Cozy Pajama Breakfast" : "Micul Dejun în Pijamale Calde", desc: language === 'hu' ? "Meleg kalács, vaj, lekvár vagy pirítós. Nincs kapkodás, nincs telefonozás." : language === 'en' ? "Warm brioche, butter, fruit preserves. No hurried rushing, no phone checking." : "Cozonac proaspăt feliat, unt, gem sau brioșe calde. Fără telefoane, fără grabă." },
                    { time: "09:45 – 11:00", title: language === 'hu' ? "Kényelmes Ajándékbontás" : language === 'en' ? "Unrushed Gift Unwrapping" : "Desfacerea Cadourilor pe Îndelete", desc: language === 'hu' ? "Egyenként, egymásra figyelve, felolvasva a kísérőkártyákat és megköszönve a figyelmességet." : language === 'en' ? "One by one, cherishing each other's smiles, reading cards aloud without paper-ripping frenzy." : "Pe rând, citind felicitările cu voce tare, bucurându-ne de reacții și de prezență." },
                    { time: "11:00 – 12:00", title: language === 'hu' ? "Téli Séta vagy Pihentető Csend" : language === 'en' ? "Winter Fresh Air Stroll" : "Plimbare la Aer Curat sau Lectură", desc: language === 'hu' ? "Egy rövid séta a friss téli levegőn, vagy kényelmes olvasás a kanapén a vendégek érkezése előtt." : language === 'en' ? "A leisurely breath of winter air outside or cozy reading before afternoon hosting." : "Câteva respirații de aer curat de iarnă sau lectură pe canapea înainte de masa de prânz." },
                  ].map((step, idx) => (
                    <div key={idx} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DFD6C7] flex items-start gap-3">
                      <span className="font-mono text-[11px] font-bold text-secondary px-2 py-1 rounded bg-[#EAE2D3]">{step.time}</span>
                      <div>
                        <h5 className="font-serif font-bold text-primary text-sm">{step.title}</h5>
                        <p className="text-on-surface-variant text-[11px]">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeItem.id === 'printable-final-check' && (
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-[#FFF3F4] rounded-lg border border-[#F5C2C7] text-[#842029] font-serif text-sm font-semibold mb-3">
                    🛡️ {language === 'hu' ? "A 10 Pont, ami garantálja a szenteste békéjét:" : language === 'en' ? "The 10 Peace-of-Mind Points for Christmas Eve:" : "Cele 10 Puncte Salvatoare înainte de noaptea de 24 Decembrie:"}
                  </div>
                  {[
                    language === 'hu' ? "Elemek a játékokba (AA / AAA) tesztelve és tartalék elrakva" : language === 'en' ? "Toy batteries (AA/AAA) tested & spare packs stored nearby" : "Baterii pentru jucăriile copiilor (AA/AAA) verificate și rezerve puse deoparte",
                    language === 'hu' ? "Csomagoló ragasztószalag és olló egy kijelölt kosárban kéznél" : language === 'en' ? "Extra wrapping tape and scissors in one designated basket" : "Bandă adezivă (scotch) și foarfece puse într-un coș dedicat",
                    language === 'hu' ? "Gyufa vagy mécsesgyújtó biztonságos, ismert helyre készítve" : language === 'en' ? "Lighter or matches kept in a safe, known location for candles" : "Chibrituri sau brichetă așezate la îndemână pentru lumânări",
                    language === 'hu' ? "Ünnepi ruhák kivasalva és felakasztva a szekrénybe előre" : language === 'en' ? "Holiday outfits pressed and hung in the wardrobe ahead of time" : "Ținutele festive călcate și așezate pe umeraș din timp",
                    language === 'hu' ? "Telefonok, fényképezőgépek és hangszórók 100%-ra feltöltve" : language === 'en' ? "Phones, cameras and portable speakers fully charged" : "Telefoanele, aparatul foto și boxa audio încărcate complet",
                    language === 'hu' ? "Kuka- és papírgyűjtő zacskó diszkréten a fa közelébe rejtve" : language === 'en' ? "Recycling bag discreetly placed near the tree for wrapping paper" : "Un sac discret pentru hârtia de împachetat plasat lângă brad",
                    language === 'hu' ? "Jégkockák lefagyasztva és ásványvizek behűtve a kamrában" : language === 'en' ? "Ice cubes frozen and mineral water / drinks chilled" : "Gheață pregătită la congelator și apele minerale puse la rece",
                    language === 'hu' ? "Tartalék tej, kávébab és kenyér ellenőrizve (ha zárva a boltok)" : language === 'en' ? "Backup milk, coffee beans and fresh bread in the pantry" : "Lapte de rezervă și boabe de cafea verificate în cămară",
                    language === 'hu' ? "Ünnepi lejátszási lista bekészítve halk háttérzenének" : language === 'en' ? "Acoustic holiday playlist cued up for ambient atmosphere" : "Playlistul de colinde acustice gata pregătit",
                    language === 'hu' ? "Mély levegő: Ami december 24-én 18:00-ig nem lett kész, az nem is volt fontos!" : language === 'en' ? "Deep breath: Whatever isn't finished by 6:00 PM on Dec 24 does not matter!" : "Respirație adâncă: Ce nu e gata până la ora 18:00 pe 24 Decembrie nu mai contează deloc!",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 bg-[#FAF7F2] rounded-lg border border-[#EAE3D5]">
                      <span className="w-5 h-5 rounded-md border-2 border-primary/40 flex items-center justify-center font-bold text-[10px] text-primary">✓</span>
                      <span className="text-primary font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Sheet Footer Signature */}
              <div className={`print-sheet-footer pt-4 border-t border-surface-container flex items-center justify-between text-[11px] text-on-surface-variant ${activeItem.id === 'printable-cards' ? 'justify-center' : ''}`}>
                <span className="font-christmas text-sm text-primary">Christmas Reset 2026 • 24 Days to a Calmer Christmas</span>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex justify-end gap-3 no-print pt-2">
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="px-4 py-2.5 rounded-xl border border-surface-container-high text-xs font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              >
                {language === 'hu' ? "Bezárás" : language === 'en' ? "Close" : "Închide"}
              </button>
              <button
                type="button"
                onClick={handlePrintActive}
                className="bg-primary-container hover:bg-primary text-white px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>{language === 'hu' ? "Nyomtatás / PDF Mentés (A4)" : language === 'en' ? "Print / Save as PDF (A4)" : "Tipărește / Salvează PDF (A4)"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
