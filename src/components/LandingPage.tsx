import React, { useState } from 'react';
import { SupportedLanguage, DayData, PricingTier, UserProgress } from '../types';

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
  onToggleChecklist?: (key: string, value: boolean) => void;
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
  onToggleChecklist,
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

  const completedDoorsCount = userProgress?.completedDays?.length || 7;
  const isDayCompleted = (id: number) => {
    if (userProgress?.completedDays) {
      return userProgress.completedDays.includes(id);
    }
    return id <= 7;
  };

  const getDayByNumber = (num: number) => {
    return days.find((d) => d.id === num) || days[0];
  };

  // Door titles from the exact template
  const doorTitles: Record<number, string> = {
    1: "Intenția Lunii",
    2: "Sortare & Spațiu",
    3: "Setare Buget",
    4: "Inventar Podoabe",
    5: "Lista de Cadouri",
    6: "Ritualul de Seară",
    7: "Comenzi Online",
    8: "Meniu & Rețete",
    9: "Cumpărături",
    10: "Cadouri DIY",
    11: "Felicitări",
    12: "Playlist Festiv",
    13: "Împachetare",
    14: "Masa Festivă",
    15: "Verificare Buget",
    16: "Mirosuri Calde",
    17: "Ordine Dulapuri",
    18: "Congelare Preparate",
    19: "Seară de Film",
    20: "Lumina Bradului",
    21: "Lenjerii & Oaspeți",
    22: "Ultimele Proaspete",
    23: "Așezarea Mesei",
    24: "Ajunul Liniștit",
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Subtle Botanical Border Band */}
      <div className="w-full bg-surface-container-high py-1.5 px-6 flex items-center justify-between text-on-surface-variant font-label-md text-label-md">
        <span className="tracking-widest uppercase flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          Ediție Limitată de Iarnă • 2026 Atelier
        </span>
        <span className="hidden md:inline italic font-headline-sm text-[13px] tracking-normal text-on-surface-variant">
          Liniște, cadență și rafinament pentru serile de decembrie
        </span>
        <span className="font-label-uppercase text-label-uppercase text-primary">Decembrie 1 — 24</span>
      </div>

      {/* SECTION 1: HERO & ADVENT CALENDAR GRID */}
      <section className="w-full px-6 lg:px-12 py-12 lg:py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Editorial Pitch */}
          <div className="lg:col-span-6 flex flex-col justify-center pt-2">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded bg-surface-container-high text-primary font-label-uppercase text-label-uppercase mb-6 shadow-xs">
              <span className="material-symbols-outlined text-[14px]">nest_eco_leaf</span>
              CHRISTMAS RESET 2026 • EDIȚIA EDITORIALĂ
            </div>
            <h1 className="font-display text-display text-primary tracking-tight leading-[1.08] mb-6 font-serif">
              24 de zile către un Crăciun mai calm și mai organizat.
            </h1>
            <p className="font-headline-sm text-headline-sm italic font-normal text-on-surface-variant mb-6 leading-relaxed">
              Deschide o ușă în fiecare zi. Fă un singur lucru mărunt. Bucură-te cu adevărat de sărbători.
            </p>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-xl">
              Fără maratoane epuizante în magazine, fără liste interminabile lăsate pe 23 decembrie. O metodă ritmică creată pentru a-ți reda bucuria primară a iernii, într-un format digital conceput ca o piesă de papetărie nobilă.
            </p>

            {/* CTA Cluster */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <button
                onClick={() => onSelectTier('standard')}
                className="px-7 py-3.5 rounded bg-primary-container text-on-primary font-label-lg text-label-lg hover:bg-primary transition-all duration-200 shadow-md text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Începe Resetul de Crăciun</span>
                <span className="text-tertiary-fixed font-normal text-body-sm">(de la 9,90 €)</span>
              </button>
              <a
                href="#calendar-preview"
                className="px-6 py-3.5 rounded bg-surface-container text-primary font-label-lg text-label-lg hover:bg-surface-container-high transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Vezi ce conține calendarul</span>
                <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
              </a>
            </div>

            {/* Social Proof Metrics */}
            <div className="pt-6 border-t border-surface-container-highest grid grid-cols-3 gap-4">
              <div>
                <span className="block font-headline-md text-headline-md text-primary font-serif">15 min</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Ritual zilnic concentrat</span>
              </div>
              <div>
                <span className="block font-headline-md text-headline-md text-primary font-serif">9 Ghiduri</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Printabile & Ledgere</span>
              </div>
              <div>
                <span className="block font-headline-md text-headline-md text-secondary font-serif">100%</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Fără grabă & vinovăție</span>
              </div>
            </div>
          </div>

          {/* Right: Tactile 24-Door Advent Calendar Grid */}
          <div className="lg:col-span-6 bg-surface-container-low p-6 lg:p-8 rounded-xl shadow-xs relative" id="calendar-preview">
            {/* Paper Texture simulation & calendar heading */}
            <div className="flex items-center justify-between pb-5 mb-5 border-b border-surface-container-highest">
              <div>
                <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block">ATELIERUL DE CRĂCIUN</span>
                <span className="font-headline-sm text-headline-sm text-primary font-serif">Calendarul celor 24 de Uși</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 font-label-md text-label-md text-secondary bg-secondary-container/50 px-2.5 py-1 rounded">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span> {completedDoorsCount} Finalizate
                </span>
                <span className="inline-flex items-center gap-1 font-label-md text-label-md text-primary-container bg-primary-fixed/60 px-2.5 py-1 rounded font-semibold">
                  Ziua 8: Activă
                </span>
              </div>
            </div>

            {/* 24 Doors Asymmetrical / Uniform Matrix */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 sm:gap-3">
              {Array.from({ length: 24 }, (_, i) => i + 1).map((dayNum) => {
                const isCompleted = isDayCompleted(dayNum);
                const isActive = dayNum === 8;
                const title = doorTitles[dayNum] || `Ziua ${dayNum}`;
                const dayData = getDayByNumber(dayNum);

                if (isActive) {
                  return (
                    <div
                      key={dayNum}
                      onClick={() => onSelectDay(dayData)}
                      className="aspect-square bg-surface-container-lowest rounded p-2.5 flex flex-col justify-between shadow-md relative group cursor-pointer transition-transform hover:-translate-y-0.5"
                      style={{ boxShadow: '0 0 0 2px #4a151b' }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-headline-sm text-headline-sm text-primary-container font-serif font-bold">
                          {dayNum < 10 ? `0${dayNum}` : dayNum}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                      </div>
                      <div className="mt-auto">
                        <span className="block font-label-uppercase text-[9px] text-tertiary-container bg-tertiary-fixed px-1 py-0.5 rounded font-bold uppercase tracking-wider text-center">
                          AZI • DESCHIDE
                        </span>
                        <span className="block font-body-sm text-[10px] text-primary font-semibold mt-1 truncate">
                          {title}
                        </span>
                      </div>
                    </div>
                  );
                }

                if (isCompleted) {
                  return (
                    <div
                      key={dayNum}
                      onClick={() => onSelectDay(dayData)}
                      className="aspect-square bg-surface-container-high rounded p-2 flex flex-col justify-between group cursor-pointer transition-all hover:bg-surface-container-highest"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-label-uppercase text-label-uppercase text-secondary font-bold">
                          {dayNum < 10 ? `0${dayNum}` : dayNum}
                        </span>
                        <span className="material-symbols-outlined text-secondary text-[14px]">check</span>
                      </div>
                      <span className="font-body-sm text-[10px] text-on-surface-variant leading-tight truncate">
                        {title}
                      </span>
                    </div>
                  );
                }

                if (dayNum === 24) {
                  return (
                    <div
                      key={dayNum}
                      onClick={() => onSelectDay(dayData)}
                      className="aspect-square bg-surface-container-high rounded p-2 flex flex-col justify-between opacity-90 border border-primary/20 cursor-pointer hover:bg-surface-container-highest transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-headline-sm text-headline-sm text-primary font-serif font-bold">24</span>
                        <span className="material-symbols-outlined text-primary text-[14px]">star</span>
                      </div>
                      <span className="font-body-sm text-[10px] text-primary font-semibold truncate">
                        {title}
                      </span>
                    </div>
                  );
                }

                // Locked / upcoming doors (9 to 23)
                return (
                  <div
                    key={dayNum}
                    onClick={() => onSelectDay(dayData)}
                    className="aspect-square bg-surface-container rounded p-2 flex flex-col justify-between opacity-80 cursor-pointer hover:opacity-100 hover:bg-surface-container-high transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-label-uppercase text-label-uppercase text-on-surface-variant font-medium">
                        {dayNum < 10 ? `0${dayNum}` : dayNum}
                      </span>
                      <span className="material-symbols-outlined text-outline text-[13px]">lock</span>
                    </div>
                    <span className="font-body-sm text-[10px] text-on-surface-variant/70 truncate">
                      {title}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between pt-4 border-t border-surface-container-highest text-on-surface-variant font-body-sm text-body-sm">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                Format interactiv optimizat pentru telefon, tabletă & print
              </span>
              <a className="text-primary hover:underline font-label-md text-label-md uppercase tracking-wider cursor-pointer" href="#cum-functioneaza">
                Cum se deschid ușile →
              </a>
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
                Filosofia Resetului: Fără grabă, fără stres, pas cu pas.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                Un sistem practic de organizare a sărbătorilor pentru zile aglomerate de decembrie. În loc să condensezi totul într-un weekend copleșitor, rezolvi câte un singur detaliu în fiecare dimineață.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="px-4 py-2 rounded bg-surface-container-highest text-primary font-label-uppercase text-label-uppercase tracking-wider">
              METODA 15-MINUTE ATELIER
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE 5 BOTTLENECKS & TACTILE SOLUTIONS */}
      <section className="w-full bg-surface-container-low py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2">DIAGNOSTIC & REZOLVARE</span>
            <h2 className="font-headline-lg text-headline-lg text-primary font-serif leading-tight mb-4">
              Crăciunul ar trebui să fie o bucurie. Nu încă un proiect epuizant.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Am identificat cele 5 puncte nevralgice care fură farmecul sărbătorilor și am construit instrumente simple, elegante și concrete pentru fiecare.
            </p>
          </div>

          {/* 5 Cards Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {/* Card 1 */}
            <div
              onClick={() => {
                if (onNavigateGifts) onNavigateGifts();
                else onSelectDay(getDayByNumber(2));
              }}
              className="bg-surface p-6 rounded-xl shadow-xs flex flex-col justify-between transition-all hover:shadow-md cursor-pointer"
            >
              <div>
                <div className="w-9 h-9 rounded bg-surface-container flex items-center justify-center text-primary-container mb-4">
                  <span className="material-symbols-outlined text-[20px]">featured_seasonal_and_gifts</span>
                </div>
                <span className="font-label-md text-label-md text-error tracking-wide uppercase block mb-1">Obstacol 01</span>
                <h3 className="font-title-lg text-title-lg text-primary mb-2">Prea multe cadouri de cumpărat?</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  Haosul listelor pe foițe rătăcite și teama că ai uitat pe cineva drag.
                </p>
              </div>
              <div className="pt-4 border-t border-surface-container-high">
                <span className="font-label-uppercase text-[10px] text-secondary tracking-widest block mb-1">Soluția Atelier</span>
                <span className="font-headline-sm text-[17px] text-primary font-serif block">Planificator Cadouri</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-1 block">Status livrare, mărimi & buget individual.</span>
              </div>
            </div>

            {/* Card 2 */}
            <div
              onClick={() => onSelectDay(getDayByNumber(1))}
              className="bg-surface p-6 rounded-xl shadow-xs flex flex-col justify-between transition-all hover:shadow-md cursor-pointer"
            >
              <div>
                <div className="w-9 h-9 rounded bg-surface-container flex items-center justify-center text-secondary mb-4">
                  <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                </div>
                <span className="font-label-md text-label-md text-error tracking-wide uppercase block mb-1">Obstacol 02</span>
                <h3 className="font-title-lg text-title-lg text-primary mb-2">Nesigură cât va costa totul?</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  Cheltuieli mărunte care se adună pe nesimțite și creează anxietate financiară.
                </p>
              </div>
              <div className="pt-4 border-t border-surface-container-high">
                <span className="font-label-uppercase text-[10px] text-secondary tracking-widest block mb-1">Soluția Atelier</span>
                <span className="font-headline-sm text-[17px] text-primary font-serif block">Bugetul de Crăciun</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-1 block">Plafoane pe categorii & balanță automată.</span>
              </div>
            </div>

            {/* Card 3 */}
            <div
              onClick={() => onSelectDay(getDayByNumber(8))}
              className="bg-surface p-6 rounded-xl shadow-xs flex flex-col justify-between transition-all hover:shadow-md cursor-pointer"
            >
              <div>
                <div className="w-9 h-9 rounded bg-surface-container flex items-center justify-center text-primary-container mb-4">
                  <span className="material-symbols-outlined text-[20px]">timer</span>
                </div>
                <span className="font-label-md text-label-md text-error tracking-wide uppercase block mb-1">Obstacol 03</span>
                <h3 className="font-title-lg text-title-lg text-primary mb-2">Prea multe sarcini rămase?</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  Senzația de paralizie când lista are peste 40 de rânduri neterminate.
                </p>
              </div>
              <div className="pt-4 border-t border-surface-container-high">
                <span className="font-label-uppercase text-[10px] text-secondary tracking-widest block mb-1">Soluția Atelier</span>
                <span className="font-headline-sm text-[17px] text-primary font-serif block">Resetul Zilnic (15 min)</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-1 block">O singură micro-acțiune pe zi, fără presiune.</span>
              </div>
            </div>

            {/* Card 4 */}
            <div
              onClick={() => onSelectDay(getDayByNumber(8))}
              className="bg-surface p-6 rounded-xl shadow-xs flex flex-col justify-between transition-all hover:shadow-md cursor-pointer"
            >
              <div>
                <div className="w-9 h-9 rounded bg-surface-container flex items-center justify-center text-tertiary-container mb-4">
                  <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
                </div>
                <span className="font-label-md text-label-md text-error tracking-wide uppercase block mb-1">Obstacol 04</span>
                <h3 className="font-title-lg text-title-lg text-primary mb-2">Meniul devine complicat?</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  Gătit excesiv, risipă alimentară și ore întregi petrecute singură în bucătărie.
                </p>
              </div>
              <div className="pt-4 border-t border-surface-container-high">
                <span className="font-label-uppercase text-[10px] text-secondary tracking-widest block mb-1">Soluția Atelier</span>
                <span className="font-headline-sm text-[17px] text-primary font-serif block">Meniu & Rețete</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-1 block">Planificator feluri principale & lista pe raioane.</span>
              </div>
            </div>

            {/* Card 5 */}
            <div
              onClick={() => {
                if (onNavigateEmergency) onNavigateEmergency();
                else onSelectDay(getDayByNumber(23));
              }}
              className="bg-surface p-6 rounded-xl shadow-xs flex flex-col justify-between transition-all hover:shadow-md cursor-pointer"
            >
              <div>
                <div className="w-9 h-9 rounded bg-surface-container flex items-center justify-center text-primary mb-4">
                  <span className="material-symbols-outlined text-[20px]">warning_amber</span>
                </div>
                <span className="font-label-md text-label-md text-error tracking-wide uppercase block mb-1">Obstacol 05</span>
                <h3 className="font-title-lg text-title-lg text-primary mb-2">Sărbătorile sunt prea aproape?</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  Ai început târziu și timpul pare să se scurgă mult prea repede.
                </p>
              </div>
              <div className="pt-4 border-t border-surface-container-high">
                <span className="font-label-uppercase text-[10px] text-secondary tracking-widest block mb-1">Soluția Atelier</span>
                <span className="font-headline-sm text-[17px] text-primary font-serif block">Mod de Urgență</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-1 block">Plan condensat de 48h axat doar pe esențial.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS (CUM FUNCȚIONEAZĂ) */}
      <section className="w-full py-16 lg:py-24 px-6 lg:px-12 max-w-7xl mx-auto" id="cum-functioneaza">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2">METODA ATELIER</span>
          <h2 className="font-headline-lg text-headline-lg text-primary font-serif">Cum funcționează experiența</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
            Trei pași simpli pentru a transforma o lună adesea tensionată într-o călătorie caldă de contemplare și ordine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 01 */}
          <div className="p-8 rounded-xl bg-surface-container-low flex flex-col justify-between shadow-xs relative overflow-hidden">
            <span className="font-display text-[72px] leading-none font-serif text-outline-variant/40 absolute -right-2 -top-2 select-none">
              01
            </span>
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary-container mb-6 shadow-xs">
                <span className="material-symbols-outlined text-[20px]">meeting_room</span>
              </div>
              <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2">PASUL 01</span>
              <h3 className="font-headline-sm text-headline-sm text-primary font-serif mb-3">Deschide o ușă</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Descoperă sarcina, ghidul sau fișa practică a zilei în fiecare dimineață de decembrie, direct de pe telefon sau laptop.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-surface-container-highest text-on-surface-variant font-body-sm text-body-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-secondary">notifications_none</span>
              Fără spam. Doar o scânteie de claritate.
            </div>
          </div>

          {/* Step 02 */}
          <div className="p-8 rounded-xl bg-surface-container-low flex flex-col justify-between shadow-xs relative overflow-hidden">
            <span className="font-display text-[72px] leading-none font-serif text-outline-variant/40 absolute -right-2 -top-2 select-none">
              02
            </span>
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-secondary mb-6 shadow-xs">
                <span className="material-symbols-outlined text-[20px]">hourglass_empty</span>
              </div>
              <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2">PASUL 02</span>
              <h3 className="font-headline-sm text-headline-sm text-primary font-serif mb-3">Fă un lucru mărunt</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Alocă între 5 și 20 de minute. Fără liste copleșitoare, fără presiune absurdă. Bifează sarcina și continuă-ți ziua relaxată.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-surface-container-highest text-on-surface-variant font-body-sm text-body-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-secondary">done_all</span>
              Micro-succese constante în 24 de pași.
            </div>
          </div>

          {/* Step 03 */}
          <div className="p-8 rounded-xl bg-surface-container-low flex flex-col justify-between shadow-xs relative overflow-hidden">
            <span className="font-display text-[72px] leading-none font-serif text-outline-variant/40 absolute -right-2 -top-2 select-none">
              03
            </span>
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary-container mb-6 shadow-xs">
                <span className="material-symbols-outlined text-[20px]">night_shelter</span>
              </div>
              <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2">PASUL 03</span>
              <h3 className="font-headline-sm text-headline-sm text-primary font-serif mb-3">Simte-te pregătită</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Când vine 24 Decembrie, casa este așezată, cadourile sunt ambalate, meniul este sub control, iar tu ești odihnită și prezentă.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-surface-container-highest text-on-surface-variant font-body-sm text-body-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-secondary">favorite</span>
              Bucură-te de oameni, nu doar de sarcini.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: REALISTIC APP PREVIEW & INTERACTIVE DASHBOARD */}
      <section className="w-full bg-surface-container-low py-16 lg:py-24 px-6 lg:px-12" id="dashboard-preview">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2">EXPERIENȚA DIN INTERIOR</span>
              <h2 className="font-headline-lg text-headline-lg text-primary font-serif">Panoul Tău Zilnic • 8 Decembrie</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Previzualizare activă cont utilizator</span>
              <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
            </div>
          </div>

          {/* App Shell Simulation Mockup */}
          <div className="bg-surface rounded-xl shadow-md p-6 lg:p-10">
            {/* App Top Progress Bar & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-surface-container-high gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary-container font-serif text-headline-sm">
                  08
                </div>
                <div>
                  <span className="font-title-lg text-title-lg text-primary block">Ești la zi cu resetul tău</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">8 din 24 de zile finalizate (33%) • Cadență excelentă</span>
                </div>
              </div>
              {/* Linear progress bar */}
              <div className="w-full sm:w-64">
                <div className="flex items-center justify-between font-label-md text-label-md text-on-surface-variant mb-1.5">
                  <span>PROGRES ADVENT</span>
                  <span className="font-bold text-secondary">33%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '33%' }}></div>
                </div>
              </div>
            </div>

            {/* Main Daily Focus Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
              {/* Left: Current Day Action Card */}
              <div className="lg:col-span-7 bg-surface-container-low p-6 sm:p-8 rounded-xl relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary font-label-uppercase text-label-uppercase">
                    <span className="material-symbols-outlined text-[13px]">lightbulb</span> Sarcina Zilei de Azi
                  </span>
                  <span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">schedule</span> 15 minute
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary font-serif mb-3">
                  Ziua 8: Meniul de Crăciun & Rețetele Esențiale
                </h3>
                <div className="p-4 rounded bg-surface border-l-2 border-primary-container mb-6 italic font-serif text-on-surface text-body-lg">
                  „Planifică mesele înainte de a scrie lista de cumpărături. Gătește ceea ce iubești, nu ceea ce simți că 'ar trebui' să gătești.”
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  Azi stabilim cele 3 mese cheie pentru 24, 25 și 26 Decembrie. Vom alege cel mult două deserturi și vom descărca ghidul de proporții pentru oaspeți pentru a evita complet risipa alimentară.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectDay(getDayByNumber(8))}
                    className="px-6 py-3 rounded bg-primary-container text-on-primary font-label-lg text-label-lg hover:bg-primary transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">play_circle</span>
                    <span>Deschide resetul de azi (15 min)</span>
                  </button>
                  <button
                    onClick={() => {
                      if (onOpenPrintable) onOpenPrintable('printable-menu');
                      else onSelectDay(getDayByNumber(8));
                    }}
                    className="px-5 py-3 rounded bg-surface text-primary font-label-lg text-label-lg hover:bg-surface-container-high transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    <span>Ghid Meniu PDF</span>
                  </button>
                </div>
              </div>

              {/* Right: Daily Checklist Micro-Tool */}
              <div className="lg:col-span-5 bg-surface-container-high/60 p-6 sm:p-8 rounded-xl">
                <h4 className="font-title-md text-title-md text-primary mb-4 flex items-center justify-between">
                  <span>Checklistul Zilei 8</span>
                  <span className="font-label-md text-label-md text-secondary uppercase tracking-widest font-semibold">
                    {Object.values(previewChecklist).filter(Boolean).length} / 3 Gata
                  </span>
                </h4>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-3 rounded bg-surface cursor-pointer select-none">
                    <input
                      checked={previewChecklist.step1}
                      onChange={() => handleChecklistToggle('step1')}
                      className="mt-1 accent-primary-container w-4 h-4 rounded cursor-pointer"
                      type="checkbox"
                    />
                    <span className={`font-body-md text-body-md ${previewChecklist.step1 ? 'text-on-surface-variant line-through' : 'text-primary'}`}>
                      Alege felul principal pentru Ajun (recomandare lejeră)
                    </span>
                  </label>
                  <label className="flex items-start gap-3 p-3 rounded bg-surface cursor-pointer select-none">
                    <input
                      checked={previewChecklist.step2}
                      onChange={() => handleChecklistToggle('step2')}
                      className="mt-1 accent-primary-container w-4 h-4 rounded cursor-pointer"
                      type="checkbox"
                    />
                    <span className={`font-body-md text-body-md ${previewChecklist.step2 ? 'text-on-surface-variant line-through' : 'text-primary font-medium'}`}>
                      Numără oaspeții confirmați pentru masa de Crăciun
                    </span>
                  </label>
                  <label className="flex items-start gap-3 p-3 rounded bg-surface cursor-pointer select-none">
                    <input
                      checked={previewChecklist.step3}
                      onChange={() => handleChecklistToggle('step3')}
                      className="mt-1 accent-primary-container w-4 h-4 rounded cursor-pointer"
                      type="checkbox"
                    />
                    <span className={`font-body-md text-body-md ${previewChecklist.step3 ? 'text-on-surface-variant line-through' : 'text-primary'}`}>
                      Notează cele 5 ingrediente de bază ce pot fi cumpărate din timp
                    </span>
                  </label>
                </div>
                <div className="mt-6 p-3 rounded bg-secondary-container/40 flex items-center gap-3 text-secondary">
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                  <span className="font-body-sm text-body-sm">
                    Sfatul zilei: Dacă cineva se oferă să aducă un desert, acceptă cu drag.
                  </span>
                </div>
              </div>
            </div>

            {/* Upcoming Days Strip */}
            <div>
              <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider block mb-3">ZILELE URMĂTOARE ÎN CALENDAR</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  onClick={() => onSelectDay(getDayByNumber(9))}
                  className="p-4 rounded-lg bg-surface-container flex items-center gap-4 cursor-pointer hover:bg-surface-container-high transition-colors"
                >
                  <div className="w-10 h-10 rounded bg-surface flex items-center justify-center font-serif text-headline-sm text-on-surface-variant font-semibold flex-shrink-0">
                    09
                  </div>
                  <div className="min-w-0">
                    <span className="font-label-uppercase text-[10px] text-on-surface-variant block">MÂINE</span>
                    <span className="font-title-md text-title-md text-primary truncate block">Lista de cumpărături esențială</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Împărțită pe raioane & piețe</span>
                  </div>
                </div>
                <div
                  onClick={() => onSelectDay(getDayByNumber(10))}
                  className="p-4 rounded-lg bg-surface-container flex items-center gap-4 cursor-pointer hover:bg-surface-container-high transition-colors"
                >
                  <div className="w-10 h-10 rounded bg-surface flex items-center justify-center font-serif text-headline-sm text-on-surface-variant font-semibold flex-shrink-0">
                    10
                  </div>
                  <div className="min-w-0">
                    <span className="font-label-uppercase text-[10px] text-on-surface-variant block">POIMÂINE</span>
                    <span className="font-title-md text-title-md text-primary truncate block">Idei cadouri DIY & atenții mici</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Biscuiți, ceaiuri & ambalaje eco</span>
                  </div>
                </div>
                <div
                  onClick={() => onSelectDay(getDayByNumber(11))}
                  className="p-4 rounded-lg bg-surface-container flex items-center gap-4 cursor-pointer hover:bg-surface-container-high transition-colors"
                >
                  <div className="w-10 h-10 rounded bg-surface flex items-center justify-center font-serif text-headline-sm text-on-surface-variant font-semibold flex-shrink-0">
                    11
                  </div>
                  <div className="min-w-0">
                    <span className="font-label-uppercase text-[10px] text-on-surface-variant block">VINERI</span>
                    <span className="font-title-md text-title-md text-primary truncate block">Felicitări scrise de mână</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Texte calde & formulări sincere</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: DIGITAL RESOURCE LIBRARY & LUXURY PRINTABLES PREVIEW */}
      <section className="w-full py-16 lg:py-24 px-6 lg:px-12 max-w-7xl mx-auto" id="resurse-preview">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2">PAPETĂRIE DIGITALĂ & PRINT</span>
            <h2 className="font-headline-lg text-headline-lg text-primary font-serif">Biblioteca de Resurse Exclusive</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
              Concepute cu aceeași grijă tipografică ca o carte de artă. Poți să le completezi direct pe ecran sau să le imprimi pe hârtie texturată acasă.
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
          {/* Resource 1 */}
          <div className="bg-surface-container-low rounded-xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-surface text-secondary">PDF & Excel</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-tertiary-fixed text-tertiary-container">PREMIUM</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-serif mb-2">Planificator de Buget de Sărbători</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                Calculator inteligent cu formule automate pentru cadouri, decorațiuni, alimente și fond de neprevăzute.
              </p>
            </div>
            <div className="pt-4 border-t border-surface-container-highest flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant">3 Pagini de lucru</span>
              <button
                onClick={() => {
                  if (onOpenPrintable) onOpenPrintable('printable-budget');
                  else onSelectDay(getDayByNumber(1));
                }}
                className="text-primary hover:text-primary-container font-label-lg text-label-lg flex items-center gap-1 cursor-pointer"
              >
                Previzualizează <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Resource 2 */}
          <div className="bg-surface-container-low rounded-xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-surface text-secondary">PDF Interactiv</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-surface-container-highest text-primary">INCLUS</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-serif mb-2">Ghid & Tracker Cadouri</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                Urmărește statusul de la idee, achiziție, împachetare până la livrare pentru fiecare persoană din cercul tău.
              </p>
            </div>
            <div className="pt-4 border-t border-surface-container-highest flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant">Matrice 25 persoane</span>
              <button
                onClick={() => {
                  if (onOpenPrintable) onOpenPrintable('printable-gifts');
                  else onSelectDay(getDayByNumber(2));
                }}
                className="text-primary hover:text-primary-container font-label-lg text-label-lg flex items-center gap-1 cursor-pointer"
              >
                Previzualizează <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Resource 3 */}
          <div className="bg-surface-container-low rounded-xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-surface text-secondary">Printabil A4</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-surface-container-highest text-primary">INCLUS</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-serif mb-2">Lista de Cumpărături pe Categorii</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                Grupare logică pentru supermarket și piață (produse proaspete, băuturi, conserve, decor) ca să termini în jumătate de timp.
              </p>
            </div>
            <div className="pt-4 border-t border-surface-container-highest flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant">Format optimizat buzunar</span>
              <button
                onClick={() => {
                  if (onOpenPrintable) onOpenPrintable('printable-groceries');
                  else onSelectDay(getDayByNumber(9));
                }}
                className="text-primary hover:text-primary-container font-label-lg text-label-lg flex items-center gap-1 cursor-pointer"
              >
                Previzualizează <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Resource 4 */}
          <div className="bg-surface-container-low rounded-xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-surface text-secondary">PDF & Canva</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-tertiary-fixed text-tertiary-container">PREMIUM</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-serif mb-2">Planificator Meniu Festiv & Cronologie</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                Orarul cuptorului pentru 24 și 25 Decembrie: ce se gătește cu 2 zile înainte și ce se încălzește cu 30 minute înainte de masă.
              </p>
            </div>
            <div className="pt-4 border-t border-surface-container-highest flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant">Cronologie orară</span>
              <button
                onClick={() => {
                  if (onOpenPrintable) onOpenPrintable('printable-menu');
                  else onSelectDay(getDayByNumber(8));
                }}
                className="text-primary hover:text-primary-container font-label-lg text-label-lg flex items-center gap-1 cursor-pointer"
              >
                Previzualizează <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Resource 5 */}
          <div className="bg-surface-container-low rounded-xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-surface text-secondary">Printabil Vectorial</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-tertiary-fixed text-tertiary-container">PREMIUM</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-serif mb-2">Etichete Elegante de Cadou (Printable)</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                24 de modele de etichete cu tipografie nobilă în stil minimalist scandinav, gata de tăiat și perforat pentru panglici de in.
              </p>
            </div>
            <div className="pt-4 border-t border-surface-container-highest flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant">24 etichete unice</span>
              <button
                onClick={() => {
                  if (onOpenPrintable) onOpenPrintable('printable-tags');
                  else onSelectDay(getDayByNumber(13));
                }}
                className="text-primary hover:text-primary-container font-label-lg text-label-lg flex items-center gap-1 cursor-pointer"
              >
                Previzualizează <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Resource 6 */}
          <div className="bg-surface-container-low rounded-xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-surface text-secondary">Printabil Pliat</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-tertiary-fixed text-tertiary-container">PREMIUM</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-serif mb-2">Felicitări cu Tipografie Minimalistă</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                Șabloane curate cu mesaje atemporale scrise în limba română, ideale pentru imprimare pe carton 300g.
              </p>
            </div>
            <div className="pt-4 border-t border-surface-container-highest flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant">6 Modele de felicitare</span>
              <button
                onClick={() => {
                  if (onOpenPrintable) onOpenPrintable('printable-cards');
                  else onSelectDay(getDayByNumber(11));
                }}
                className="text-primary hover:text-primary-container font-label-lg text-label-lg flex items-center gap-1 cursor-pointer"
              >
                Previzualizează <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Resource 7 */}
          <div className="bg-surface-container-low rounded-xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-surface text-secondary">Cartonașe Joc</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-tertiary-fixed text-tertiary-container">PREMIUM</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-serif mb-2">Joc de Familie pentru Seara de Ajun</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                50 de întrebări calde și conversaționale pentru masa de sărbători. Fără ecrane, doar povești și reconectare sinceră.
              </p>
            </div>
            <div className="pt-4 border-t border-surface-container-highest flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant">50 Cartonașe tăiabile</span>
              <button
                onClick={() => {
                  if (onOpenPrintable) onOpenPrintable('printable-trivia');
                  else onSelectDay(getDayByNumber(19));
                }}
                className="text-primary hover:text-primary-container font-label-lg text-label-lg flex items-center gap-1 cursor-pointer"
              >
                Previzualizează <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Resource 8 */}
          <div className="bg-surface-container-low rounded-xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-surface text-secondary">Checklist Rapid</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-surface-container-highest text-primary">INCLUS</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-serif mb-2">Checklist Dimineața de Crăciun</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                Pentru o dimineață senină: cafea caldă, forfecă pentru desfacerea cadourilor, sac discret pentru ambalaje și muzică discretă.
              </p>
            </div>
            <div className="pt-4 border-t border-surface-container-highest flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant">1 Pagină esențială</span>
              <button
                onClick={() => {
                  if (onOpenPrintable) onOpenPrintable('printable-morning');
                  else onSelectDay(getDayByNumber(24));
                }}
                className="text-primary hover:text-primary-container font-label-lg text-label-lg flex items-center gap-1 cursor-pointer"
              >
                Previzualizează <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Resource 9 */}
          <div className="bg-surface-container-low rounded-xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-surface text-secondary">Ghid de Criză</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-surface-container-highest text-primary">INCLUS</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-serif mb-2">Checklist Final: Ultimele 24h</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-6">
                Filtru strict pentru 23 Decembrie: ce merită făcut și ce este complet sigur de eliminat din plan fără să observe nimeni.
              </p>
            </div>
            <div className="pt-4 border-t border-surface-container-highest flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant">Filtru de priorități</span>
              <button
                onClick={() => {
                  if (onOpenPrintable) onOpenPrintable('printable-emergency');
                  else onSelectDay(getDayByNumber(23));
                }}
                className="text-primary hover:text-primary-container font-label-lg text-label-lg flex items-center gap-1 cursor-pointer"
              >
                Previzualizează <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: TRANSPARENT ETHICAL PRICING */}
      <section className="w-full bg-surface-container-low py-16 lg:py-24 px-6 lg:px-12" id="planuri-acces">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2">INVESTIȚIE ÎN LINIȘTE</span>
            <h2 className="font-headline-lg text-headline-lg text-primary font-serif">Alege nivelul tău de resetare</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
              Prețuri transparente și o singură plată. Fără abonamente lunare, fără reînnoiri automate ascunse.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* TIER 1: GRATUIT */}
            <div className="bg-surface rounded-xl p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-headline-sm text-headline-sm text-primary font-serif">Explorator</span>
                  <span className="font-label-uppercase text-label-uppercase text-on-surface-variant bg-surface-container px-2 py-1 rounded">PROBĂ</span>
                </div>
                <div className="mb-6">
                  <span className="font-display text-display text-primary font-serif leading-none">0 €</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block mt-1">Gratuit pentru totdeauna</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  O introducere delicată pentru a testa ritmul celor 15 minute zilnice înainte de a te decide.
                </p>
                <ul className="space-y-3 font-body-sm text-body-sm text-on-surface mb-8">
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check</span>
                    Acces la primele 3 uși ale calendarului
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check</span>
                    Checklist introductiv de prioritizare
                  </li>
                  <li className="flex items-center gap-2.5 text-on-surface-variant/70">
                    <span className="material-symbols-outlined text-outline text-[18px]">close</span>
                    Restul de 21 de zile zilnice blocate
                  </li>
                  <li className="flex items-center gap-2.5 text-on-surface-variant/70">
                    <span className="material-symbols-outlined text-outline text-[18px]">close</span>
                    Fără pachetul de resurse printabile
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onSelectTier('free')}
                className="w-full py-3 rounded bg-surface-container text-primary font-label-lg text-label-lg hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                Încearcă gratuit (Zilele 1–3)
              </button>
            </div>

            {/* TIER 2: STANDARD */}
            <div className="bg-surface rounded-xl p-8 shadow-xs flex flex-col justify-between relative">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-headline-sm text-headline-sm text-primary font-serif">Standard</span>
                  <span className="font-label-uppercase text-label-uppercase text-secondary bg-secondary-container/50 px-2 py-1 rounded">POPULAR</span>
                </div>
                <div className="mb-6">
                  <span className="font-display text-display text-primary font-serif leading-none">9,90 €</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block mt-1">Plată unică • Acces sezonier 2026</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  Experiența completă a celor 24 de zile pentru o persoană care își dorește structură și calm.
                </p>
                <ul className="space-y-3 font-body-sm text-body-sm text-on-surface mb-8">
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check</span>
                    Acces la toate cele 24 de uși zilnice
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check</span>
                    Ghidul zilnic de 15 minute (text & acțiuni)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check</span>
                    Cele 4 șabloane esențiale în PDF
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px]">check</span>
                    Modul de Urgență (48h Express)
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onSelectTier('standard')}
                className="w-full py-3.5 rounded bg-surface-container-highest text-primary font-label-lg text-label-lg hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
              >
                Alege Pachetul Standard
              </button>
            </div>

            {/* TIER 3: PREMIUM VIP (HIGHLIGHTED) */}
            <div
              className="bg-primary-container text-on-primary rounded-xl p-8 shadow-lg flex flex-col justify-between relative transform lg:-translate-y-2"
              style={{ boxShadow: '0 12px 30px -8px rgba(74, 21, 27, 0.25)' }}
            >
              {/* Top Badge */}
              <div className="absolute -top-3.5 left-8 px-3 py-1 rounded-full bg-tertiary-fixed text-tertiary-container font-label-uppercase text-[10px] font-bold tracking-widest">
                EXPERIENȚA COMPLETĂ ATELIER
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-headline-sm text-headline-sm text-inverse-primary font-serif">Atelier VIP</span>
                  <span className="material-symbols-outlined text-tertiary-fixed text-[22px]">auto_awesome</span>
                </div>
                <div className="mb-6">
                  <span className="font-display text-display text-on-primary font-serif leading-none">14,90 €</span>
                  <span className="font-body-sm text-body-sm text-on-primary-container block mt-1">Plată unică • Acces permanent & actualizări</span>
                </div>
                <p className="font-body-md text-body-md text-on-primary-container mb-6">
                  Sanctuarul complet: calendarul integral, suita completă de papetărie printabilă și modulul audio de calm.
                </p>
                <ul className="space-y-3 font-body-sm text-body-sm text-on-primary mb-8">
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">check_circle</span>
                    Tot ce conține pachetul Standard
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">check_circle</span>
                    Toate cele 9 resurse printabile & fișiere Excel
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">check_circle</span>
                    24 de meditații audio ghidate (2-3 min fiecare)
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">check_circle</span>
                    Jocul de conversație pentru masa de Ajun
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">check_circle</span>
                    Acces pe viață la actualizările din 2027
                  </li>
                </ul>
              </div>
              <button
                onClick={() => onSelectTier('premium')}
                className="w-full py-4 rounded bg-tertiary-fixed text-tertiary-container font-label-lg text-label-lg hover:bg-tertiary-fixed-dim transition-colors font-bold shadow-md cursor-pointer"
              >
                Începe cu Acces Complet VIP
              </button>
            </div>
          </div>

          {/* Ethical Note */}
          <div className="mt-12 text-center text-on-surface-variant font-body-sm text-body-sm flex items-center justify-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-secondary">lock</span>
              Plată 100% securizată prin Stripe
            </span>
            <span className="text-outline-variant">•</span>
            <span>Garanție returnare 14 zile fără întrebări</span>
            <span className="text-outline-variant">•</span>
            <span>Fără costuri recurente mascate</span>
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQ ACCORDION */}
      <section className="w-full py-16 lg:py-24 px-6 lg:px-12 max-w-4xl mx-auto" id="faq-section">
        <div className="text-center mb-12">
          <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest block mb-2">CLARITATE & RĂSPUNSURI</span>
          <h2 className="font-headline-lg text-headline-lg text-primary font-serif">Întrebări Frecvente</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Tot ce vrei să știi despre experiența Christmas Reset înainte de a porni.
          </p>
        </div>

        <div className="space-y-4">
          {/* FAQ 1 */}
          <details className="group bg-surface-container-low p-6 rounded-xl transition-all open:bg-surface-container">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="font-headline-sm text-[18px] text-primary font-serif">Este un produs fizic trimis prin curier?</span>
              <span className="material-symbols-outlined text-on-surface-variant group-open:rotate-180 transition-transform">expand_more</span>
            </summary>
            <p className="font-body-md text-body-md text-on-surface-variant mt-4 leading-relaxed">
              Nu. Christmas Reset 2026 este o platformă digitală minimalistă, creată pentru a fi accesibilă instantaneu fără să aștepți livrarea vreunui colet. Dacă preferi tangibilitatea hârtiei, toate ghidurile, listele și cartonașele sunt formatate profesionist pentru a fi imprimate pe orice imprimantă de acasă.
            </p>
          </details>

          {/* FAQ 2 */}
          <details className="group bg-surface-container-low p-6 rounded-xl transition-all open:bg-surface-container">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="font-headline-sm text-[18px] text-primary font-serif">Când pot începe efectiv resetul?</span>
              <span className="material-symbols-outlined text-on-surface-variant group-open:rotate-180 transition-transform">expand_more</span>
            </summary>
            <p className="font-body-md text-body-md text-on-surface-variant mt-4 leading-relaxed">
              Primești acces instantaneu la cont imediat după confirmarea plății. Poți explora modul introductiv de pe acum, iar ușile zilnice se deblochează automat în ritmul lunii decembrie (sau poți parcurge în avans dacă dorești să te organizezi mai devreme).
            </p>
          </details>

          {/* FAQ 3 */}
          <details className="group bg-surface-container-low p-6 rounded-xl transition-all open:bg-surface-container">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="font-headline-sm text-[18px] text-primary font-serif">Am nevoie să instalez o aplicație din App Store?</span>
              <span className="material-symbols-outlined text-on-surface-variant group-open:rotate-180 transition-transform">expand_more</span>
            </summary>
            <p className="font-body-md text-body-md text-on-surface-variant mt-4 leading-relaxed">
              Nu ai nevoie de descărcat nimic din App Store sau Google Play. Aplicația rulează impecabil direct în browserul telefonului tău (Safari, Chrome etc.) și poate fi salvată cu o singură atingere pe ecranul principal („Add to Home Screen”) la fel ca o aplicație nativă.
            </p>
          </details>

          {/* FAQ 4 */}
          <details className="group bg-surface-container-low p-6 rounded-xl transition-all open:bg-surface-container">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="font-headline-sm text-[18px] text-primary font-serif">Ce se întâmplă dacă sar peste 2-3 zile din calendar?</span>
              <span className="material-symbols-outlined text-on-surface-variant group-open:rotate-180 transition-transform">expand_more</span>
            </summary>
            <p className="font-body-md text-body-md text-on-surface-variant mt-4 leading-relaxed">
              Ușile anterioare rămân deschise pentru totdeauna. Nu există noțiunea de eșec sau penalizare. Dacă ai o săptămână aglomerată, poți consulta oricând rezumatul rapid de weekend sau poți comuta pe „Modul de Urgență” care condensează prioritățile.
            </p>
          </details>

          {/* FAQ 5 */}
          <details className="group bg-surface-container-low p-6 rounded-xl transition-all open:bg-surface-container">
            <summary className="flex items-center justify-between cursor-pointer list-none">
              <span className="font-headline-sm text-[18px] text-primary font-serif">Pot primi factură fiscală pe firmă?</span>
              <span className="material-symbols-outlined text-on-surface-variant group-open:rotate-180 transition-transform">expand_more</span>
            </summary>
            <p className="font-body-md text-body-md text-on-surface-variant mt-4 leading-relaxed">
              Da. În procesul securizat de finalizare a comenzii poți bifa căsuța „Achiziție pe persoană juridică” și introduce datele fiscale (CUI, denumire) pentru emiterea automată a facturii.
            </p>
          </details>
        </div>
      </section>

      {/* SECTION 8: FINAL EDITORIAL CALL TO ACTION */}
      <section className="w-full bg-primary-container text-on-primary py-20 px-6 lg:px-12 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="w-12 h-12 rounded-full bg-surface/10 flex items-center justify-center mx-auto text-tertiary-fixed mb-6">
            <span className="material-symbols-outlined text-[24px]">favorite</span>
          </span>
          <h2 className="font-display text-display font-serif text-inverse-primary leading-tight mb-6">
            Fă din decembrie o amintire caldă, nu o cursă contra cronometru.
          </h2>
          <p className="font-body-lg text-body-lg text-on-primary-container mb-8 leading-relaxed max-w-xl mx-auto">
            Alătură-te celor care au ales să înlocuiască haosul cu ritualuri clare, liniște interioară și un sentiment nobil de împlinire.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onSelectTier('standard')}
              className="px-8 py-4 rounded bg-tertiary-fixed text-tertiary-container font-label-lg text-label-lg hover:bg-tertiary-fixed-dim transition-all shadow-lg font-bold cursor-pointer"
            >
              Începe Astăzi Resetul (9,90 €)
            </button>
            <a
              href="#calendar-preview"
              className="px-6 py-4 rounded bg-surface/10 text-on-primary font-label-lg text-label-lg hover:bg-surface/20 transition-all cursor-pointer"
            >
              Explorează Calendarul
            </a>
          </div>
          <span className="font-label-md text-label-md text-on-primary-container/80 block mt-8">
            Ediția 2026 • Creat cu dragoste pentru case liniștite
          </span>
        </div>
      </section>
    </div>
  );
};
