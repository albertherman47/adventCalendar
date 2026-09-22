import { SupportedLanguage } from '../types';

export interface TranslationDictionary {
  brandName: string;
  tagline: string;
  supportingLine: string;
  nav: {
    calendar: string;
    concept: string;
    phases: string;
    pricing: string;
    faq: string;
    printables: string;
    emergency: string;
    giftHelper: string;
    creatorMode: string;
    startCta: string;
    openCalendar: string;
    backToHome: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    badges: {
      digitalOnly: string;
      noStress: string;
      instantAccess: string;
    };
    calendarPreviewTitle: string;
    calendarPreviewSubtitle: string;
  };
  problem: {
    heading: string;
    subheading: string;
    withoutPlanTitle: string;
    withoutPlanSubtitle: string;
    withoutPlanItems: string[];
    withPlanTitle: string;
    withPlanSubtitle: string;
    withPlanItems: string[];
  };
  howItWorks: {
    heading: string;
    subheading: string;
    steps: {
      number: string;
      title: string;
      description: string;
    }[];
    digitalDisclaimer: string;
  };
  phasesSection: {
    heading: string;
    subheading: string;
    phases: {
      id: number;
      name: string;
      dateRange: string;
      description: string;
    }[];
  };
  gamification: {
    title: string;
    progressLabel: string;
    completedLabel: string;
    milestones: {
      days: number;
      message: string;
      badge: string;
    }[];
  };
  pricing: {
    heading: string;
    subheading: string;
    currency: string;
    guarantee: string;
    digitalNotice: string;
    tiers: {
      id: string;
      name: string;
      price: string;
      period: string;
      description: string;
      badge?: string;
      features: string[];
      cta: string;
    }[];
  };
  faq: {
    heading: string;
    subheading: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  emailReminder: {
    heading: string;
    subheading: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    cta: string;
    disclaimer: string;
    successMessage: string;
  };
  footer: {
    rights: string;
    digitalNotice: string;
    disclaimer: string;
    languages: string;
  };
  calendar: {
    title: string;
    subtitle: string;
    filterAll: string;
    filterPhase1: string;
    filterPhase2: string;
    filterPhase3: string;
    filterPhase4: string;
    previewModeNotice: string;
    previewModeToggle: string;
    doorLockedTooltip: string;
    doorCompletedTooltip: string;
    markCompleted: string;
    completedStatus: string;
    openTodayDoor: string;
  };
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  ro: {
    brandName: "Christmas Reset 2026",
    tagline: "24 de zile către un Crăciun mai calm și mai organizat.",
    supportingLine: "Deschide o ușă în fiecare zi. Fă un singur lucru mărunt. Bucură-te cu adevărat de Crăciun.",
    nav: {
      calendar: "Calendarul Advent",
      concept: "De ce Reset?",
      phases: "Cele 4 Etape",
      pricing: "Pachete",
      faq: "Întrebări Frecvente",
      printables: "Ghiduri Imprimabile",
      emergency: "Mod Urgență",
      giftHelper: "Ghid Cadouri",
      creatorMode: "Mod Previzualizare (Creator)",
      startCta: "Începe Resetul de Crăciun",
      openCalendar: "Deschide Calendarul",
      backToHome: "Înapoi la Prezentare",
    },
    hero: {
      headline: "Fă ca acest Crăciun să fie din nou magic.",
      subheadline: "24 de mici ritualuri zilnice, instrumente utile de planificare și surprize festive concepute pentru a te ajuta să organizezi sărbătorile fără stresul copleșitor din decembrie.",
      primaryCta: "Începe Resetul de Crăciun",
      secondaryCta: "Vezi ce conține calendarul",
      badges: {
        digitalOnly: "100% Digital • Fără colete fizice",
        noStress: "5-15 min pe zi • Fără presiune",
        instantAccess: "Acces instantaneu pe telefon & laptop",
      },
      calendarPreviewTitle: "Calendarul tău digital de Advent",
      calendarPreviewSubtitle: "O experiență caldă de la 1 la 24 Decembrie",
    },
    problem: {
      heading: "Crăciunul este menit să aducă bucurie și liniște...",
      subheading: "Dar de prea multe ori, luna decembrie se transformă într-o listă interminabilă de obligații epuizante.",
      withoutPlanTitle: "Decembrie fără un plan clar",
      withoutPlanSubtitle: "Stresul pe care îl cunoaștem prea bine:",
      withoutPlanItems: [
        "Cadouri căutate în grabă pe ultima sută de metri",
        "Bugete depășite fără să știi exact pe ce s-au dus banii",
        "Aglomerat în magazine, cozi infernale și nervi întinși",
        "O listă de sarcini haotică care pare că nu se mai termină",
        "Oboseală acumulată chiar în noaptea de Ajun",
        "Niciun moment de tihnă sinceră pentru tine și cei dragi",
      ],
      withPlanTitle: "Crăciunul tău cu Christmas Reset",
      withPlanSubtitle: "Ritualul zilnic de 10 minute care schimbă totul:",
      withPlanItems: [
        "Cadouri alese cu grijă și împachetate din timp, fără grabă",
        "Cheltuieli planificate inteligent, fără surprize financiare",
        "Un singur pas simplu și plăcut în fiecare zi din calendar",
        "Ritualuri calde de seară: muzică de sezon, ceai aromat, tihnă",
        "Timp calitativ alături de familie, partener și prieteni",
        "O stare de prezență și bucurie curată în Ajunul Crăciunului",
      ],
    },
    howItWorks: {
      heading: "Cum funcționează? Simplu, în 3 pași.",
      subheading: "Fără instalări complicate, fără conturi greoaie. Deschizi pe orice telefon sau laptop.",
      steps: [
        {
          number: "01",
          title: "Achiziționezi accesul tău",
          description: "Primești instantaneu acces complet la calendarul digital și la toate fișele practice pentru tot sezonul 2026.",
        },
        {
          number: "02",
          title: "Deschizi o singură ușă pe zi",
          description: "În fiecare dimineață de la 1 la 24 Decembrie, te așteaptă o nouă experiență: un instrument interactiv, o listă sau un moment festiv.",
        },
        {
          number: "03",
          title: "Trăiești un mic moment magic",
          description: "În doar 5–15 minute, bifezi un pas concret de organizare sau te bucuri de un ritual cald care îți aduce zâmbetul pe buze.",
        },
      ],
      digitalDisclaimer: "Acesta este un produs 100% digital. Nu există livrare prin curier sau colete fizice.",
    },
    phasesSection: {
      heading: "Cele 24 de zile, împărțite în 4 etape clare",
      subheading: "Fiecare etapă are un rol specific, ducându-te pas cu pas de la claritate la relaxare totală.",
      phases: [
        {
          id: 1,
          name: "ETAPA 1 — ORGANIZEAZĂ",
          dateRange: "1–6 Decembrie",
          description: "Punem bazele liniștite: bugetul clar, lista de cadouri, calendarul evenimentelor și decluttering-ul primitor al casei.",
        },
        {
          id: 2,
          name: "ETAPA 2 — PREGĂTEȘTE",
          dateRange: "7–12 Decembrie",
          description: "Planificăm meniurile, lista de cumpărături, ideile de cadouri făcute în casă și atmosfera muzicală festivă.",
        },
        {
          id: 3,
          name: "ETAPA 3 — EXPERIMENTEAZĂ",
          dateRange: "13–18 Decembrie",
          description: "Conectare sinceră: provocarea pentru cuplu, jocuri de familie, seara de filme de Crăciun și mici tradiții cu suflet.",
        },
        {
          id: 4,
          name: "ETAPA 4 — FINALIZEAZĂ",
          dateRange: "19–24 Decembrie",
          description: "Ultimele detalii fără stres: verificarea salvatoare, planul dimineții de Crăciun și un Ajun trăit în tihnă desăvârșită.",
        },
      ],
    },
    gamification: {
      title: "Progresul tău de Crăciun",
      progressLabel: "Zile completate",
      completedLabel: "din 24 finalizate",
      milestones: [
        { days: 3, message: "Start minunat! Ai făcut deja primii pași spre organizare.", badge: "Scânteia de început" },
        { days: 7, message: "Ești organizată! Casa și planurile încep să capete armonie.", badge: "Armonie de iarnă" },
        { days: 12, message: "Ești la jumătatea drumului! Magia Crăciunului prinde contur.", badge: "Echilibru festiv" },
        { days: 18, message: "Crăciunul este aproape. Ești cu mult înaintea oricărui termen!", badge: "Tihnă garantată" },
        { days: 24, message: "Ai reușit! Ai creat cel mai calm și frumos Crăciun din viața ta.", badge: "Crăciun Resetat" },
      ],
    },
    pricing: {
      heading: "Alege pachetul potrivit pentru Crăciunul tău",
      subheading: "O singură plată mică pentru o lună întreagă de liniște, organizare și momente festive.",
      currency: "€",
      guarantee: "Garanție de claritate: acces digital imediat după achiziție.",
      digitalNotice: "Produs digital • Fără taxe de transport • Acces pe viață la ediția 2026",
      tiers: [
        {
          id: "free",
          name: "FREE",
          price: "0",
          period: "gratuit",
          description: "Descoperă experiența Christmas Reset cu instrumentele esențiale introductive.",
          features: [
            "Experiență de calendar sample",
            "Previzualizare completă Ziua 1 (Buget)",
            "Checklist de bază pentru Crăciun",
            "Selecție de conținut gratuit",
            "Înscriere pentru memento pe email",
          ],
          cta: "Încearcă gratuit",
        },
        {
          id: "standard",
          name: "STANDARD",
          price: "9.90",
          period: "plată unică",
          description: "Esențialul complet pentru o lună decembrie organizată și fără grabă.",
          features: [
            "Acces complet la toate cele 24 de uși Advent",
            "Toate instrumentele și planificatoarele interactive",
            "Calculatorul interactiv de Buget de Crăciun",
            "Planificatorul interactiv pentru Lista de Cadouri",
            "Checklist-uri complete de organizare a casei",
            "Ghidul de recomandări cadouri (Gift Helper)",
            "Urmărirea progresului salvată automat",
            "Selecție de resurse imprimabile",
          ],
          cta: "Alege Christmas Reset",
        },
        {
          id: "premium",
          name: "PREMIUM",
          price: "14.90",
          period: "plată unică",
          description: "Tot ce include Standard, plus pachetul complet imprimabil și uneltele speciale de criză.",
          badge: "Recomandat",
          features: [
            "Tot ce include pachetul Standard",
            "Pachetul complet de resurse imprimabile (PDF A4)",
            "Modul Special de Urgență de Crăciun (Emergency Mode)",
            "Generatorul avansat de idei de cadouri (Gift Helper)",
            "Sistemul de planificare a meniului & cumpărăturilor",
            "Colecția de felicitări de Crăciun & etichete cadou",
            "Pachetul de jocuri festive de familie & Trivia",
            "Activități festive bonus și kit de seară de filme",
          ],
          cta: "Alege Premium",
        },
      ],
    },
    faq: {
      heading: "Întrebări Frecvente",
      subheading: "Tot ce vrei să știi despre experiența Christmas Reset 2026.",
      items: [
        {
          question: "Ce cumpăr mai exact?",
          answer: "Cumperi accesul complet la o aplicație web interactivă de tip Calendar de Advent digital. Conține 24 de experiențe zilnice concepute pas cu pas: instrumente interactive de calculat bugetul și cadourile, liste practice de cumpărături, rețete, jocuri de familie, provocări calde și fișe de lucru elegante pe care le poți imprima dacă dorești.",
        },
        {
          question: "Este un produs fizic? Îmi va sosi vreun colet prin curier?",
          answer: "Nu, produsul este 100% digital. Nu ai de așteptat după curier și nu plătești taxe de livrare. Ai acces instant, oricând și de pe orice dispozitiv conectat la internet (telefon, tabletă, laptop).",
        },
        {
          question: "Când pot începe să folosesc calendarul?",
          answer: "Calendarul este conceput pentru perioada 1–24 Decembrie, deschizând câte o nouă ușă în fiecare zi. Totuși, imediat după achiziție poți explora introducerea și pregătirile, iar dacă dorești să planifici în avans, modul de previzualizare îți permite să consulți structura oricând.",
        },
        {
          question: "Îl pot folosi de pe telefon?",
          answer: "Da, experiența a fost construită 'mobile-first'. Se folosește excepțional cu o singură mână pe iPhone sau Android, având butoane aerisite, text ușor de citit și tranziții cursive.",
        },
        {
          question: "Pot imprima fișele și listele pe hârtie?",
          answer: "Absolut! Pentru zilele care conțin planificatoare (buget, cadouri, meniu, lista de cumpărături, felicitări), am inclus opțiunea de tipărire curată și elegantă direct din browser, perfect formatată pentru coli A4.",
        },
        {
          question: "Pot oferi acest produs cadou unei prietene sau surori?",
          answer: "Da! Pachetul Cuplu & Familie sau Premium include fluxul ideal de trimitere cadou, permițându-ți să oferi acces direct persoanei dragi, ca un gest de atenție și grijă.",
        },
      ],
    },
    emailReminder: {
      heading: "Vrei să primești o notificare când începe numărătoarea inversă?",
      subheading: "Lasă-ne adresa ta de email și îți vom trimite un memento cald la 1 Decembrie, alături de o mică fișă gratuită de organizare.",
      namePlaceholder: "Prenumele tău",
      emailPlaceholder: "Adresa ta de email",
      cta: "Amintește-mi pe 1 Decembrie",
      disclaimer: "Fără spam. Te poți dezabona oricând cu un singur clic. Datele tale sunt în siguranță.",
      successMessage: "Mulțumim! Te-am notat cu drag. Te vom anunța exact la timp pentru un Crăciun de neuitat.",
    },
    footer: {
      rights: "Toate drepturile rezervate.",
      digitalNotice: "Christmas Reset 2026 este un produs digital original.",
      disclaimer: "Creat cu grijă pentru ca sărbătorile de iarnă să redevină un prilej de bucurie pură și liniște interioară.",
      languages: "Limbă:",
    },
    calendar: {
      title: "Calendarul tău de Advent",
      subtitle: "Deschide ușa zilei, fă un pas simplu și simte cum se așterne liniștea.",
      filterAll: "Toate cele 24 de zile",
      filterPhase1: "1–6 Dec: Organizează",
      filterPhase2: "7–12 Dec: Pregătește",
      filterPhase3: "13–18 Dec: Trăiește",
      filterPhase4: "19–24 Dec: Finalizează",
      previewModeNotice: "Mod Previzualizare Activ: Toate cele 24 de uși sunt deblocate pentru testare și navigare.",
      previewModeToggle: "Deblochează toate zilele (Mod Previzualizare)",
      doorLockedTooltip: "Această ușă se deblochează pe data de",
      doorCompletedTooltip: "Completat cu drag",
      markCompleted: "Marchează ziua ca finalizată",
      completedStatus: "Completată cu succes!",
      openTodayDoor: "Deschide ușa de astăzi",
    },
  },
  en: {
    brandName: "Christmas Reset 2026",
    tagline: "24 days to a calmer, more organized Christmas.",
    supportingLine: "Open one door every day. Do one small thing. Enjoy Christmas more.",
    nav: {
      calendar: "Advent Calendar",
      concept: "Why Reset?",
      phases: "The 4 Phases",
      pricing: "Pricing",
      faq: "FAQ",
      printables: "Printables",
      emergency: "Emergency Mode",
      giftHelper: "Gift Helper",
      creatorMode: "Preview Mode",
      startCta: "Start Christmas Reset",
      openCalendar: "Open Calendar",
      backToHome: "Back to Home",
    },
    hero: {
      headline: "Make Christmas feel magical again.",
      subheadline: "24 tiny rituals, useful tools and festive surprises to help you organize Christmas without the usual December stress.",
      primaryCta: "Start Your Christmas Reset",
      secondaryCta: "See what's inside",
      badges: {
        digitalOnly: "100% Digital • No physical shipping",
        noStress: "5-15 min a day • Zero pressure",
        instantAccess: "Instant access on phone & laptop",
      },
      calendarPreviewTitle: "Your digital Advent Calendar",
      calendarPreviewSubtitle: "A warm daily experience from Dec 1 to 24",
    },
    problem: {
      heading: "Christmas is supposed to feel like this...",
      subheading: "Yet too often, December turns into an endless list of exhausting chores.",
      withoutPlanTitle: "December without a plan",
      withoutPlanSubtitle: "The chaos we know too well:",
      withoutPlanItems: [
        "Forgotten gifts and last-minute panic shopping",
        "Overspending without tracking where money goes",
        "Crowded malls, frantic queues and frayed nerves",
        "An overwhelming to-do list that never ends",
        "Total exhaustion arriving right on Christmas Eve",
        "No real moments of quiet joy with loved ones",
      ],
      withPlanTitle: "Your Christmas Reset",
      withPlanSubtitle: "A 10-minute daily ritual that changes everything:",
      withPlanItems: [
        "Thoughtful gifts wrapped well ahead of time",
        "Budget clearly planned with zero financial surprises",
        "One calm, joyful task each morning",
        "Cozy evening rituals: warm cider, playlists, soft lights",
        "Meaningful quality time with family and partner",
        "True presence and peace on Christmas Eve",
      ],
    },
    howItWorks: {
      heading: "How It Works: 3 Simple Steps",
      subheading: "No clunky apps to install. Open smoothly on any phone, tablet, or browser.",
      steps: [
        {
          number: "01",
          title: "Get your digital access",
          description: "Gain instant, lifetime access to the 2026 digital calendar and all printable planners.",
        },
        {
          number: "02",
          title: "Open one door every day",
          description: "From December 1 to 24, unlock a fresh interactive tool, checklist, or festive moment.",
        },
        {
          number: "03",
          title: "Enjoy a small festive moment",
          description: "In just 5-15 minutes, cross off a real preparation step or savor a relaxing holiday ritual.",
        },
      ],
      digitalDisclaimer: "This is a 100% digital product. No physical items will be shipped.",
    },
    phasesSection: {
      heading: "24 Days in 4 Guided Phases",
      subheading: "Every phase has a clear purpose, gently moving you from clarity to pure celebration.",
      phases: [
        {
          id: 1,
          name: "PHASE 1 — ORGANIZE",
          dateRange: "December 1–6",
          description: "Setting peaceful foundations: budget, gift tracking, master calendar, and a 20-minute home reset.",
        },
        {
          id: 2,
          name: "PHASE 2 — PREPARE",
          dateRange: "December 7–12",
          description: "Planning menus, smart groceries, heartfelt DIY touches, and festive musical ambiance.",
        },
        {
          id: 3,
          name: "PHASE 3 — EXPERIENCE",
          dateRange: "December 13–18",
          description: "Heartfelt connection: couple prompts, family games, festive movie night, and winter craft.",
        },
        {
          id: 4,
          name: "PHASE 4 — FINISH",
          dateRange: "December 19–24",
          description: "Zero-stress final touches: the safety checklist, Christmas morning timeline, and peaceful Eve ritual.",
        },
      ],
    },
    gamification: {
      title: "Your Christmas Progress",
      progressLabel: "Days completed",
      completedLabel: "of 24 completed",
      milestones: [
        { days: 3, message: "Your Christmas Reset has begun.", badge: "Spark of Calm" },
        { days: 7, message: "You're getting organized.", badge: "Winter Harmony" },
        { days: 12, message: "Halfway to Christmas.", badge: "Holiday Balance" },
        { days: 18, message: "Christmas is getting close.", badge: "Peaceful Ahead" },
        { days: 24, message: "You made it! A truly peaceful Christmas.", badge: "Christmas Reset" },
      ],
    },
    pricing: {
      heading: "Choose Your Christmas Reset",
      subheading: "One small investment for a whole month of calm and festive joy.",
      currency: "€",
      guarantee: "Instant digital access immediately upon purchase.",
      digitalNotice: "Digital Product • Instant Access • No shipping fees",
      tiers: [
        {
          id: "free",
          name: "FREE",
          price: "0",
          period: "free",
          description: "Sample the Christmas Reset experience with essential introductory tools.",
          features: [
            "Sample calendar experience",
            "Full Day 1 preview (Christmas Budget)",
            "Basic Christmas preparation checklist",
            "Selected free holiday content",
            "Timely email reminder signup",
          ],
          cta: "Try it free",
        },
        {
          id: "standard",
          name: "STANDARD",
          price: "9.90",
          period: "one-time",
          description: "The core essentials for an organized and serene December.",
          features: [
            "Full access to all 24 Advent doors",
            "All interactive planners & calculators",
            "Interactive Christmas Budget Planner",
            "Interactive Gift Planner with budget tracking",
            "Room-by-room home reset checklists",
            "Core Gift Helper recommendation tool",
            "Automatic local progress tracking",
            "Selected printable resources",
          ],
          cta: "Get Christmas Reset",
        },
        {
          id: "premium",
          name: "PREMIUM",
          price: "14.90",
          period: "one-time",
          description: "Our complete tier: includes all interactive calculators, emergency mode and full printable bundle.",
          badge: "Most Popular",
          features: [
            "Everything in Standard tier",
            "Complete printable workbook pack (A4 PDF)",
            "Christmas Emergency Mode (30d / 14d / 7d / 3d / eve)",
            "Advanced Gift Helper with smart suggestions",
            "Interactive Holiday Menu & Grocery Planner",
            "Printable Christmas Cards & Gift Tags collection",
            "Interactive Family Games & Holiday Trivia",
            "Additional holiday activities & bonus resources",
          ],
          cta: "Get Premium",
        },
      ],
    },
    faq: {
      heading: "Frequently Asked Questions",
      subheading: "Everything you need to know about Christmas Reset 2026.",
      items: [
        {
          question: "What exactly am I buying?",
          answer: "A digital Christmas Advent experience containing 24 interactive daily activities, planning tools, checklists, and printable resources designed to remove December stress.",
        },
        {
          question: "Is this a physical product?",
          answer: "No. Everything is digital. No shipping fees, no waiting for couriers. Instant access anywhere.",
        },
        {
          question: "When can I start?",
          answer: "The calendar is designed for December 1–24, but you can explore preview tools immediately.",
        },
        {
          question: "Can I use it on my phone?",
          answer: "Yes. The entire experience is mobile-first, designed for seamless one-handed use.",
        },
        {
          question: "Can I print the resources?",
          answer: "Yes! Dedicated print styling allows clean A4 printing for planners and checklists.",
        },
        {
          question: "Can I give it as a gift?",
          answer: "Yes, our Couple & Family bundle includes gifting support.",
        },
      ],
    },
    emailReminder: {
      heading: "Want a reminder when the Christmas Reset opens?",
      subheading: "Leave your email to receive a timely notification on December 1st plus a free holiday starter sheet.",
      namePlaceholder: "Your first name",
      emailPlaceholder: "Your email address",
      cta: "Remind Me on Dec 1",
      disclaimer: "No spam. Unsubscribe anytime in one click. We respect your privacy.",
      successMessage: "Thank you! You're on the list. We'll send your reminder just in time.",
    },
    footer: {
      rights: "All rights reserved.",
      digitalNotice: "Christmas Reset 2026 is an original digital product.",
      disclaimer: "Crafted with love to bring back peaceful joy and calm to the winter holidays.",
      languages: "Language:",
    },
    calendar: {
      title: "Your Advent Calendar",
      subtitle: "Open today's door, take one small step, and feel the holiday calm set in.",
      filterAll: "All 24 Days",
      filterPhase1: "Dec 1–6: Organize",
      filterPhase2: "Dec 7–12: Prepare",
      filterPhase3: "Dec 13–18: Experience",
      filterPhase4: "Dec 19–24: Finish",
      previewModeNotice: "Creator Preview Mode Active: All 24 days are unlocked for testing.",
      previewModeToggle: "Unlock all days (Creator Mode)",
      doorLockedTooltip: "This door unlocks on",
      doorCompletedTooltip: "Completed with care",
      markCompleted: "Mark day as complete",
      completedStatus: "Day Completed!",
      openTodayDoor: "Open today's door",
    },
  },
  hu: {
    brandName: "Christmas Reset 2026",
    tagline: "24 nap a nyugodtabb, szervezettebb karácsonyért.",
    supportingLine: "Nyiss ki minden nap egy ajtót. Tegyél meg egyetlen apróságot. Éld át a karácsony igazi varázsát.",
    nav: {
      calendar: "Adventi Naptár",
      concept: "Miért Reset?",
      phases: "A 4 Fázis",
      pricing: "Csomagok",
      faq: "Gyakori Kérdések",
      printables: "Nyomtatható Anyagok",
      emergency: "Vészhelyzet Mód",
      giftHelper: "Ajándék-Tanácsadó",
      creatorMode: "Előnézeti Mód",
      startCta: "Karácsonyi Reset Indítása",
      openCalendar: "Naptár Megnyitása",
      backToHome: "Vissza a Főoldalra",
    },
    hero: {
      headline: "Varázsoljuk újra meghitté és békéssé a karácsonyt.",
      subheadline: "24 apró napi rituálé, okos tervezőeszközök és ünnepi inspirációk, amelyek segítenek megszervezni az ünnepeket a decemberi kapkodás és stressz nélkül.",
      primaryCta: "Kezdd el a Karácsonyi Reset-et",
      secondaryCta: "Nézd meg, mit tartalmaz a naptár",
      badges: {
        digitalOnly: "100% Digitális • Nincs fizikai szállítás",
        noStress: "Napi 5–15 perc • Zéró nyomás",
        instantAccess: "Azonnali elérés telefonon és gépen",
      },
      calendarPreviewTitle: "A te digitális adventi naptárad",
      calendarPreviewSubtitle: "Meghitt napi élmény december 1-től 24-ig",
    },
    problem: {
      heading: "A karácsonynak a békéről és a boldogságról kellene szólnia...",
      subheading: "Ám december túl gyakran válik kimerítő kötelességek, elintéznivalók és rohanás végtelen sorává.",
      withoutPlanTitle: "December világos terv nélkül",
      withoutPlanSubtitle: "A stressz, amit mindannyian túl jól ismerünk:",
      withoutPlanItems: [
        "Elfelejtett ajándékok és pánikszerű vásárlás az utolsó pillanatban",
        "Túllépett költségkeretek, miközben nem tudod, hová ment a pénz",
        "Tömött plázák, idegőrlő sorban állás és feszült pillanatok",
        "Egy soha véget nem érő, nyomasztó teendőlista",
        "Mély kimerültség, ami pontosan szentestére tetőzik",
        "Semmi valódi, meghitt pillanat a szeretteiddel és önmagaddal",
      ],
      withPlanTitle: "A te karácsonyod a Christmas Reset-tel",
      withPlanSubtitle: "A napi 10 perces rituálé, ami mindent megváltoztat:",
      withPlanItems: [
        "Gondosan megválasztott, időben és szépen becsomagolt ajándékok",
        "Előre megtervezett költések, kellemetlen anyagi meglepetések nélkül",
        "Minden reggel csak egyetlen egyszerű, örömteli lépés a naptárból",
        "Meghitt esti rituálék: forró fűszeres tea, finom dallamok, halk fények",
        "Értékes, minőségi idő a családdal, pároddal és barátaiddal",
        "Valódi jelenlét, nyugalom és tiszta hála szenteste napján",
      ],
    },
    howItWorks: {
      heading: "Hogyan működik? Egyszerűen, 3 lépésben.",
      subheading: "Nincs bonyolult alkalmazástelepítés vagy nehézkes regisztráció. Bármilyen telefonon vagy gépen zökkenőmentesen megnyitható.",
      steps: [
        {
          number: "01",
          title: "Válaszd ki a hozzáférésed",
          description: "Azonnali, örökös hozzáférést kapsz a 2026-os digitális naptárhoz és az összes letölthető tervezőlaphoz.",
        },
        {
          number: "02",
          title: "Nyiss ki naponta egyetlen ajtót",
          description: "December 1-től 24-ig minden reggel egy friss interaktív eszköz, lista vagy lélekmelengető pillanat vár.",
        },
        {
          number: "03",
          title: "Élj át egy apró varázslatos pillanatot",
          description: "Mindössze 5–15 perc alatt elintézel egy konkrét teendőt, vagy átadod magad egy megnyugtató ünnepi rituálénak.",
        },
      ],
      digitalDisclaimer: "Ez egy 100%-ban digitális élmény. Nincs futárszolgálat vagy postai csomagküldés.",
    },
    phasesSection: {
      heading: "A 24 nap 4 világos fázisra bontva",
      subheading: "Minden fázisnak meghatározott küldetése van: lépésről lépésre vezet a tiszta átláthatóságtól a teljes elcsendesedésig.",
      phases: [
        {
          id: 1,
          name: "1. FÁZIS — RENDSZEREZÉS",
          dateRange: "December 1–6.",
          description: "Lefektetjük a békés alapokat: átlátható költségvetés, ajándéklista, eseménynaptár és egy 20 perces otthon-rendezés.",
        },
        {
          id: 2,
          name: "2. FÁZIS — ELŐKÉSZÜLET",
          dateRange: "December 7–12.",
          description: "Megtervezzük az ünnepi menüt, az okos bevásárlólistát, a házi készítésű finomságokat és az ünnepi zenei hangulatot.",
        },
        {
          id: 3,
          name: "3. FÁZIS — MEGÉLÉS",
          dateRange: "December 13–18.",
          description: "Őszinte kapcsolódás: mély kérdések a pároddal, vidám családi játékok, karácsonyi mozieste és lélekemelő téli hagyományok.",
        },
        {
          id: 4,
          name: "4. FÁZIS — BEFEJEZÉS",
          dateRange: "December 19–24.",
          description: "Stresszmentes utolsó simítások: a megmentő biztonsági lista, karácsony reggeli menetrend és egy igazán békés szenteste.",
        },
      ],
    },
    gamification: {
      title: "A te karácsonyi haladásod",
      progressLabel: "Teljesített napok",
      completedLabel: "a 24-ből befejezve",
      milestones: [
        { days: 3, message: "Csodás kezdet! Megtetted az első fontos lépéseket a rendezettség felé.", badge: "Kezdő szikra" },
        { days: 7, message: "Remekül haladsz! Az otthon és a tervek kezdenek harmonikus egységgé válni.", badge: "Téli harmónia" },
        { days: 12, message: "Félúton vagy! A karácsony valódi meghittsége kezd kibontakozni.", badge: "Ünnepi egyensúly" },
        { days: 18, message: "Már nagyon közel az ünnep! Messze a határidők előtt jársz.", badge: "Békés előrelátás" },
        { days: 24, message: "Megcsináltad! Megteremtetted életed legnyugodtabb és legszebb karácsonyát.", badge: "Karácsonyi Reset" },
      ],
    },
    pricing: {
      heading: "Válaszd ki a számodra tökéletes csomagot",
      subheading: "Egyetlen jelképes összeg egy egész hónapnyi nyugalomért, rendszerezettségért és ünnepi élményért.",
      currency: "€",
      guarantee: "Nyugalom-garancia: azonnali digitális hozzáférés a vásárlás után.",
      digitalNotice: "Digitális termék • Nincs szállítási díj • Örökös hozzáférés a 2026-os kiadáshoz",
      tiers: [
        {
          id: "free",
          name: "INGYENES",
          price: "0",
          period: "ingyenes",
          description: "Próbáld ki a Christmas Reset élményt a bevezető eszközökkel.",
          features: [
            "Adventi kalendárium mintaélmény",
            "1. Nap teljes előnézete (Költségvetés)",
            "Alapvető ünnepi ellenőrzőlista",
            "Válogatott ingyenes ünnepi tartalmak",
            "Email emlékeztető feliratkozás",
          ],
          cta: "Kipróbálom ingyen",
        },
        {
          id: "standard",
          name: "STANDARD",
          price: "9.90",
          period: "egyszeri díj",
          description: "A legfontosabb alapok a rendezett és kapkodásmentes decemberhez.",
          features: [
            "Teljes hozzáférés mind a 24 adventi ajtóhoz",
            "Minden interaktív tervező és kalkulátor",
            "Interaktív Karácsonyi Költségvetés-Kalkulátor",
            "Interaktív Ajándéktervező költségkövetéssel",
            "Helyiségenkénti otthoni felkészítő listák",
            "Alapvető Ajándék-Tanácsadó eszköz (Gift Helper)",
            "Haladás automatikus mentése a készülékeden",
            "Válogatott nyomtatható segédanyagok",
          ],
          cta: "Standard csomag választása",
        },
        {
          id: "premium",
          name: "PRÉMIUM",
          price: "14.90",
          period: "egyszeri díj",
          description: "A teljes élmény: tartalmazza az összes interaktív eszközt, a Vészhelyzet Módot és a teljes nyomtatható csomagot.",
          badge: "Ajánlott",
          features: [
            "Minden, amit a Standard csomag tartalmaz",
            "Teljes nyomtatható munkalap-csomag (A4 PDF)",
            "Karácsonyi Vészhelyzet Mód (30 / 14 / 7 / 3 nap & szenteste)",
            "Speciális Ajándék-Tanácsadó (Gift Helper)",
            "Ünnepi Menütervező és intelligens bevásárlólista",
            "Nyomtatható képeslapok és ajándékkísérő címkék",
            "Ünnepi családi játékcsomag és kvíz",
            "Bónusz karácsonyi élmények és moziest-készlet",
          ],
          cta: "Prémium csomag választása",
        },
      ],
    },
    faq: {
      heading: "Gyakori Kérdések",
      subheading: "Minden, amit a Christmas Reset 2026 élményről tudni érdemes.",
      items: [
        {
          question: "Mit kapok pontosan a vásárlással?",
          answer: "Teljes körű hozzáférést egy modern, interaktív digitális adventi naptárhoz. 24 napi, lépésről lépésre felépített élményt tartalmaz: interaktív költségvetés- és ajándéktervezőt, bevásárlólistákat, recepteket, családi játékokat, beszélgetésindítókat és elegáns munkalapokat, amelyeket ki is nyomtathatsz, ha szeretnéd.",
        },
        {
          question: "Ez egy fizikai termék? Érkezik csomag a futártól?",
          answer: "Nem, a termék 100%-ban digitális. Nem kell futárra várnod, és nincs szállítási költség sem. A vásárlás után azonnal megnyithatod bármilyen internethez csatlakozó eszközön (telefon, tablet, laptop).",
        },
        {
          question: "Mikor kezdhetem el használni a naptárat?",
          answer: "A naptár december 1–24. közötti időszakra épül, minden nap egy új ajtót megnyitva. Ugyanakkor már a vásárlás pillanatában felfedezheted az előkészületeket, és az előnézeti módban bármikor előre megtekintheted a teljes felépítést.",
        },
        {
          question: "Használhatom mobiltelefonról?",
          answer: "Igen, a felület 'mobile-first' szemlélettel készült. Kifejezetten kényelmes egy kézzel használni iPhone-on vagy Androidon: szellős gombokkal, tiszta betűtípusokkal és lágy átmenetekkel rendelkezik.",
        },
        {
          question: "Kinyomtathatom a munkalapokat és listákat papírra?",
          answer: "Természetesen! Azokhoz a napokhoz, amelyek tervezőt tartalmaznak (költségvetés, ajándékok, menü, bevásárlólista, képeslapok), beépítettünk egy tiszta, elegáns nyomtatási funkciót, amely tökéletesen illeszkedik szabványos A4-es lapokra.",
        },
        {
          question: "Átadhatom ajándékba ezt az élményt egy barátnőmnek vagy családtagomnak?",
          answer: "Igen! A Pár & Család csomag tartalmazza az ajándékozási funkciót, amellyel közvetlenül hozzáférést biztosíthatsz egy számodra fontos személynek, szeretetteljes meglepetésként.",
        },
      ],
    },
    emailReminder: {
      heading: "Szeretnél értesítést kapni a visszaszámlálás indulásakor?",
      subheading: "Add meg az email címedet, és december 1-jén egy meleg hangvételű emlékeztetőt küldünk, egy ingyenes ünnepi tervezőlappal kiegészítve.",
      namePlaceholder: "Keresztneved",
      emailPlaceholder: "Email címed",
      cta: "Emlékeztess december 1-jén",
      disclaimer: "Semmi spam. Bármikor leiratkozhatsz egyetlen kattintással. Adataidat tiszteletben tartjuk és biztonságban őrizzük.",
      successMessage: "Köszönjük! Szeretettel felírtunk a listára. Pontosan időben értesítünk egy felejthetetlen karácsonyért.",
    },
    footer: {
      rights: "Minden jog fenntartva.",
      digitalNotice: "A Christmas Reset 2026 egy eredeti digitális termék.",
      disclaimer: "Gondos odafigyeléssel megalkotva, hogy a téli ünnepek újra a tiszta örömről és a belső békéről szóljanak.",
      languages: "Nyelv:",
    },
    calendar: {
      title: "A te Adventi Naptárad",
      subtitle: "Nyisd ki a mai nap ajtaját, tegyél meg egy egyszerű lépést, és érezd, ahogy beköltözik a nyugalom.",
      filterAll: "Mind a 24 nap",
      filterPhase1: "Dec. 1–6: Rendszerezés",
      filterPhase2: "Dec. 7–12: Előkészület",
      filterPhase3: "Dec. 13–18: Megélés",
      filterPhase4: "Dec. 19–24: Befejezés",
      previewModeNotice: "Előnézeti Mód Aktív: Mind a 24 ajtó nyitva áll a megtekintéshez és teszteléshez.",
      previewModeToggle: "Összes nap feloldása (Előnézeti Mód)",
      doorLockedTooltip: "Ez az ajtó ezen a napon nyílik meg:",
      doorCompletedTooltip: "Szeretettel teljesítve",
      markCompleted: "Nap megjelölése készként",
      completedStatus: "Sikeresen teljesítve!",
      openTodayDoor: "Mai ajtó kinyitása",
    },
  },
  // Placeholders for additional Central & Eastern European languages:
  pl: {} as unknown as TranslationDictionary,
  cz: {} as unknown as TranslationDictionary,
  sk: {} as unknown as TranslationDictionary,
  hr: {} as unknown as TranslationDictionary,
};

// Fallback logic so any missing language effortlessly falls back to Romanian or English
export function getTranslations(lang: SupportedLanguage): TranslationDictionary {
  if (translations[lang] && Object.keys(translations[lang]).length > 0) {
    return translations[lang];
  }
  return translations.ro;
}
