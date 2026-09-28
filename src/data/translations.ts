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
    aiCard: string;
    creatorMode: string;
    startCta: string;
    openCalendar: string;
    backToHome: string;
    changeLanguage: string;
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
  landing: {
    editionBand: string;
    subtlePoem: string;
    dateRange: string;
    heroBadge: string;
    heroPitch: string;
    metric1Value: string;
    metric1Label: string;
    metric2Value: string;
    metric2Label: string;
    metric3Value: string;
    metric3Label: string;
    adventAtelier: string;
    doorsTitle: string;
    todayActive: string;
    todayOpen: string;
    completed: string;
    eveClimax: string;
    startedOn: string;
  };
  doorTitles: Record<number, string>;
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
    editionLabel: string;
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
    startDateLabel: string;
    allDoorsUnlocked: string;
    dailyUnlock: string;
    unlockAll: string;
    normalMode: string;
  };
  checkout: {
    title: string;
    subtitle: string;
    tierLabel: string;
    firstNameLabel: string;
    firstNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    giftOption: string;
    giftRecipientLabel: string;
    giftRecipientPlaceholder: string;
    submitButton: string;
    processing: string;
    instantNotice: string;
    guarantee: string;
  };
  languageModal: {
    title: string;
    subtitle: string;
    welcomeHeadline: string;
    prompt: string;
    enterButton: string;
    selectedBadge: string;
    quickSwitchNotice: string;
  };
}

// ---------------- HUNGARIAN (HU) ----------------
const huTranslations: TranslationDictionary = {
  brandName: "Christmas Reset 2026",
  tagline: "24 nap a nyugodtabb, szervezettebb karácsonyért.",
  supportingLine: "Nyiss ki minden nap egy ajtót. Tegyél meg egyetlen apróságot. Éld át a karácsony igazi varázsát.",
  nav: {
    calendar: "Adventi Kalendárium",
    concept: "Miért Reset?",
    phases: "A 4 Fázis",
    pricing: "Csomagok",
    faq: "Gyakori Kérdések",
    printables: "Nyomtatható Anyagok",
    emergency: "Vészhelyzet Mód",
    giftHelper: "Ajándék-Tanácsadó",
    aiCard: "AI Képeslap",
    creatorMode: "Előnézeti Mód",
    startCta: "Karácsonyi Reset Indítása",
    openCalendar: "Naptár Megnyitása",
    backToHome: "Vissza a Főoldalra",
    changeLanguage: "Nyelv váltása",
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
  landing: {
    editionBand: "Limitált Téli Kiadás • 2026 Atelier",
    subtlePoem: "Béke, ritmus és meghittség a decemberi estékre",
    dateRange: "December 1 — 24",
    heroBadge: "CHRISTMAS RESET 2026 • ÜNNEPI KIADÁS",
    heroPitch: "Nincs több kimerítő pláza-maraton és utolsó pillanatos stressz. Egy ritmikus napi módszer, amely visszaadja a tél valódi meghittségét.",
    metric1Value: "15 perc",
    metric1Label: "Fókuszált napi rituálé",
    metric2Value: "9 Segédlet",
    metric2Label: "Nyomtatható tervezők",
    metric3Value: "100%",
    metric3Label: "Kapkodásmentes béke",
    adventAtelier: "ADVENTI ATELIER",
    doorsTitle: "A 24 Ablakos Adventi Kalendárium",
    todayActive: "MA AKTÍV",
    todayOpen: "MA • NYISD KI",
    completed: "Teljesítve ✓",
    eveClimax: "SZENTESTE",
    startedOn: "Kezdve:",
  },
  doorTitles: {
    1: "Költségvetés",
    2: "Ajándéklista",
    3: "Decemberi Terv",
    4: "20 Perc Otthon",
    5: "Ajándékötletek",
    6: "Digitális Detox",
    7: "Ünnepi Menü",
    8: "Bevásárlólista",
    9: "Kézműves Finomságok",
    10: "Karácsonyi Dallamok",
    11: "Képeslapok",
    12: "Félúti Megállás",
    13: "Páros Kapcsolódás",
    14: "Családi Kvíz",
    15: "Karácsonyi Moziest",
    16: "Ünnepi Illatok",
    17: "Téli Séta",
    18: "Csomagoló Atelier",
    19: "Biztonsági Ellenőrzés",
    20: "Karácsonyfa Fényei",
    21: "Vendégváró Frissítés",
    22: "Friss Piac",
    23: "Ünnepi Terítés",
    24: "Szenteste Békéje",
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
        answer: "Igen! A fizetésnél bejelölheted az 'Ajándékba küldöm' opciót, így a hozzáférés közvetlenül a megajándékozott email címére érkezik szeretetteljes meglepetésként.",
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
    editionLabel: "Magyar Kiadás",
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
    startDateLabel: "Kezdés dátuma:",
    allDoorsUnlocked: "Minden 24 ablak nyitva",
    dailyUnlock: "Napról napra nyíló kalendárium",
    unlockAll: "Összes nap feloldása",
    normalMode: "Vissza normál adventi nézetre",
  },
  checkout: {
    title: "Hozzáférési Csomag Kiválasztása",
    subtitle: "Azonnali digitális aktiválás • 2026-os Ünnepi Kiadás",
    tierLabel: "Kiválasztott Csomag:",
    firstNameLabel: "Keresztneved:",
    firstNamePlaceholder: "Pl. Anna",
    emailLabel: "Email címed (ide érkezik a hozzáférés):",
    emailPlaceholder: "pl. anna@pelda.hu",
    giftOption: "Ajándékba vásárolom egy szerettemnek",
    giftRecipientLabel: "Megajándékozott email címe:",
    giftRecipientPlaceholder: "szerettem@pelda.hu",
    submitButton: "Azonnali Hozzáférés Feloldása",
    processing: "Aktiválás folyamatban...",
    instantNotice: "Azonnali elérés • Nincs rejtett díj • Élethosszig tartó hozzáférés a 2026-os kiadáshoz",
    guarantee: "100% Elégedettségi & Nyugalom-garancia",
  },
  languageModal: {
    title: "Válassz Nyelvet / Select Language",
    subtitle: "Kérlek, válaszd ki a számodra legkényelmesebb nyelvet az induláshoz.",
    welcomeHeadline: "Üdvözlünk a Christmas Reset 2026-ban!",
    prompt: "A teljes felület, az adventi ajtók, a feladatok és a tervezők a választott nyelven fognak megjelenni.",
    enterButton: "Belépés a Christmas Reset-be",
    selectedBadge: "Kiválasztva",
    quickSwitchNotice: "A nyelvet később bármikor módosíthatod a menüből.",
  },
};

// ---------------- ENGLISH (EN) ----------------
const enTranslations: TranslationDictionary = {
  brandName: "Christmas Reset 2026",
  tagline: "24 days to a calmer, more organized Christmas.",
  supportingLine: "Open one door every day. Do one small thing. Truly enjoy the festive season.",
  nav: {
    calendar: "Advent Calendar",
    concept: "Why Reset?",
    phases: "The 4 Phases",
    pricing: "Pricing",
    faq: "FAQ",
    printables: "Printables",
    emergency: "Emergency Mode",
    giftHelper: "Gift Helper",
    aiCard: "AI Card Studio",
    creatorMode: "Preview Mode",
    startCta: "Start Christmas Reset",
    openCalendar: "Open Calendar",
    backToHome: "Back to Home",
    changeLanguage: "Change Language",
  },
  hero: {
    headline: "Make Christmas feel truly magical again.",
    subheadline: "24 small daily rituals, smart planning tools, and holiday inspirations designed to help you organize Christmas without the overwhelming December rush.",
    primaryCta: "Start Your Christmas Reset",
    secondaryCta: "See what's inside",
    badges: {
      digitalOnly: "100% Digital • No physical shipping",
      noStress: "5–15 min a day • Zero pressure",
      instantAccess: "Instant access on phone & laptop",
    },
    calendarPreviewTitle: "Your digital Advent Calendar",
    calendarPreviewSubtitle: "A warm daily experience from Dec 1 to 24",
  },
  landing: {
    editionBand: "Winter Limited Edition • 2026 Atelier",
    subtlePoem: "Peace, cadence, and quiet warmth for December evenings",
    dateRange: "December 1 — 24",
    heroBadge: "CHRISTMAS RESET 2026 • EDITORIAL EDITION",
    heroPitch: "No more exhausting mall marathons and last-minute scrambles. A rhythmic daily method created to restore the original wonder of winter.",
    metric1Value: "15 min",
    metric1Label: "Focused daily ritual",
    metric2Value: "9 Guides",
    metric2Label: "Printable planners",
    metric3Value: "100%",
    metric3Label: "Rush-free serenity",
    adventAtelier: "ADVENT ATELIER",
    doorsTitle: "The 24-Door Advent Calendar",
    todayActive: "ACTIVE TODAY",
    todayOpen: "TODAY • OPEN",
    completed: "Completed ✓",
    eveClimax: "CHRISTMAS EVE",
    startedOn: "Started:",
  },
  doorTitles: {
    1: "Budget Plan",
    2: "Gift List",
    3: "December Master Plan",
    4: "20-Min Home Reset",
    5: "Gift Ideas",
    6: "Digital Detox",
    7: "Holiday Menu",
    8: "Smart Groceries",
    9: "Handmade Treats",
    10: "Festive Sounds",
    11: "Christmas Cards",
    12: "Midway Checkpoint",
    13: "Connection Prompts",
    14: "Family Games & Trivia",
    15: "Cozy Movie Night",
    16: "Winter Aromas",
    17: "Evening Walk",
    18: "Wrapping Atelier",
    19: "Safety Checklist",
    20: "Tree Lighting",
    21: "Bedding Refresh",
    22: "Fresh Market Run",
    23: "Table Setup",
    24: "Christmas Eve Peace",
  },
  problem: {
    heading: "Christmas is meant to bring joy and stillness...",
    subheading: "Yet too often, December turns into an exhausting blur of chores and panic shopping.",
    withoutPlanTitle: "December without a clear plan",
    withoutPlanSubtitle: "The stress we know too well:",
    withoutPlanItems: [
      "Forgotten gifts and last-minute panic shopping on Christmas Eve",
      "Overspending without tracking where all the money went",
      "Crowded malls, frantic queues, and frayed nerves",
      "An overwhelming to-do list that never seems to end",
      "Total exhaustion arriving right on Christmas Eve night",
      "No real, peaceful moments of connection with loved ones",
    ],
    withPlanTitle: "Your Christmas with Christmas Reset",
    withPlanSubtitle: "The 10-minute daily ritual that changes everything:",
    withPlanItems: [
      "Thoughtful gifts wrapped well ahead of time without haste",
      "Expenses clearly planned with zero financial surprises in January",
      "One calm, joyful task each morning from the calendar",
      "Cozy evening rituals: hot spiced tea, gentle music, soft fairy lights",
      "Meaningful, restorative quality time with partner and family",
      "Pure presence, gratitude, and deep calm on Christmas Eve",
    ],
  },
  howItWorks: {
    heading: "How It Works: 3 Simple Steps",
    subheading: "No clunky apps or tedious signups. Opens smoothly in any browser on phone, tablet, or laptop.",
    steps: [
      {
        number: "01",
        title: "Get your digital access",
        description: "Gain instant, lifetime access to the 2026 digital calendar and all printable planners.",
      },
      {
        number: "02",
        title: "Open one door each day",
        description: "From December 1 to 24, unlock a fresh interactive tool, checklist, or soul-warming moment.",
      },
      {
        number: "03",
        title: "Savor a small festive step",
        description: "In just 5–15 minutes, cross off a practical prep step or immerse yourself in a peaceful holiday ritual.",
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
      { days: 3, message: "Wonderful start! You took the first decisive steps toward peace.", badge: "Spark of Calm" },
      { days: 7, message: "Great flow! Your home and schedule are reaching harmony.", badge: "Winter Harmony" },
      { days: 12, message: "Halfway there! The true magic of Christmas is unfolding.", badge: "Holiday Balance" },
      { days: 18, message: "Christmas is near! You are well ahead of any deadline.", badge: "Peaceful Ahead" },
      { days: 24, message: "You made it! You created the calmest Christmas of your life.", badge: "Christmas Reset" },
    ],
  },
  pricing: {
    heading: "Choose Your Christmas Reset",
    subheading: "One small investment for a whole month of calm and festive joy.",
    currency: "€",
    guarantee: "Instant digital access immediately upon purchase.",
    digitalNotice: "Digital Product • Instant Access • Lifetime access to 2026 edition",
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
        description: "Our complete tier: includes all interactive tools, emergency mode, and full printable bundle.",
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
        question: "Is this a physical product? Will I receive a package?",
        answer: "No, everything is 100% digital. No waiting for couriers, no shipping fees. Instant access from any phone, tablet, or laptop.",
      },
      {
        question: "When can I start?",
        answer: "The calendar is designed for December 1–24, but you can explore preview tools immediately. Preview mode lets you explore the entire structure at your own pace.",
      },
      {
        question: "Can I use it on my phone?",
        answer: "Yes! The entire experience is mobile-first, designed for seamless one-handed use on iOS and Android.",
      },
      {
        question: "Can I print the resources?",
        answer: "Yes! Dedicated print styling allows clean A4 printing directly from your browser for planners and checklists.",
      },
      {
        question: "Can I give it as a gift?",
        answer: "Yes, you can check 'Send as a gift' at checkout to deliver access directly to your recipient's email address.",
      },
    ],
  },
  emailReminder: {
    heading: "Want a reminder when the Christmas Reset begins?",
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
    disclaimer: "Crafted with care to bring back peaceful joy and calm to the winter holidays.",
    languages: "Language:",
    editionLabel: "English Edition",
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
    startDateLabel: "Start date:",
    allDoorsUnlocked: "All 24 doors unlocked",
    dailyUnlock: "Daily step-by-step unlock",
    unlockAll: "Unlock all days",
    normalMode: "Return to normal view",
  },
  checkout: {
    title: "Complete Christmas Reset Access",
    subtitle: "Instant Digital Activation • 2026 Holiday Edition",
    tierLabel: "Selected Tier:",
    firstNameLabel: "Your First Name:",
    firstNamePlaceholder: "e.g. Sarah",
    emailLabel: "Your Email (access will be sent here):",
    emailPlaceholder: "e.g. sarah@example.com",
    giftOption: "This is a gift for someone special",
    giftRecipientLabel: "Recipient's Email Address:",
    giftRecipientPlaceholder: "lovedone@example.com",
    submitButton: "Unlock Instant Access Now",
    processing: "Activating access...",
    instantNotice: "Instant Digital Delivery • No hidden fees • Lifetime access to 2026 edition",
    guarantee: "100% Peace-of-Mind Guarantee",
  },
  languageModal: {
    title: "Select Language / Nyelvválasztás",
    subtitle: "Please choose your preferred language to begin your holiday journey.",
    welcomeHeadline: "Welcome to Christmas Reset 2026",
    prompt: "All calendar doors, interactive tools, guides, and planners will adapt seamlessly to your choice.",
    enterButton: "Enter Christmas Reset",
    selectedBadge: "Selected",
    quickSwitchNotice: "You can change your language anytime from the menu.",
  },
};

// ---------------- GERMAN (DE) ----------------
const deTranslations: TranslationDictionary = {
  brandName: "Christmas Reset 2026",
  tagline: "24 Tage zu einem ruhigeren, organisierteren Weihnachtsfest.",
  supportingLine: "Jeden Tag ein Türchen öffnen. Eine kleine Sache tun. Die Weihnachtszeit wirklich genießen.",
  nav: {
    calendar: "Adventskalender",
    concept: "Warum Reset?",
    phases: "Die 4 Phasen",
    pricing: "Pakete",
    faq: "Häufige Fragen",
    printables: "Druckvorlagen",
    emergency: "Notfall-Modus",
    giftHelper: "Geschenke-Berater",
    aiCard: "KI-Grußkarten",
    creatorMode: "Vorschau-Modus",
    startCta: "Christmas Reset starten",
    openCalendar: "Kalender öffnen",
    backToHome: "Zurück zur Übersicht",
    changeLanguage: "Sprache ändern",
  },
  hero: {
    headline: "Lassen Sie Weihnachten wieder wahrhaft magisch werden.",
    subheadline: "24 kleine tägliche Rituale, smarte Planungstools und festliche Inspirationen, um die Feiertage ohne den üblichen Dezember-Stress zu organisieren.",
    primaryCta: "Starten Sie Ihren Christmas Reset",
    secondaryCta: "Entdecken Sie den Inhalt",
    badges: {
      digitalOnly: "100% Digital • Kein Versand nötig",
      noStress: "5–15 Min. täglich • Null Druck",
      instantAccess: "Sofortiger Zugriff auf Smartphone & PC",
    },
    calendarPreviewTitle: "Ihr digitaler Adventskalender",
    calendarPreviewSubtitle: "Ein warmherziges tägliches Erlebnis vom 1. bis 24. Dezember",
  },
  landing: {
    editionBand: "Limitierte Winterausgabe • 2026 Atelier",
    subtlePoem: "Friede, Rhythmus und behagliche Wärme für Dezemberabende",
    dateRange: "1. — 24. Dezember",
    heroBadge: "CHRISTMAS RESET 2026 • FESTAUSGABE",
    heroPitch: "Keine überfüllten Einkaufszentren und Last-Minute-Panik. Eine rhythmische tägliche Methode, um das echte Weihnachtsgefühl wiederzuentdecken.",
    metric1Value: "15 Min.",
    metric1Label: "Fokussiertes Tagesritual",
    metric2Value: "9 Leitfäden",
    metric2Label: "Druckbare Planer",
    metric3Value: "100%",
    metric3Label: "Stressfreie Festtage",
    adventAtelier: "ADVENTS-ATELIER",
    doorsTitle: "Der 24-Türen-Adventskalender",
    todayActive: "HEUTE AKTIV",
    todayOpen: "HEUTE • ÖFFNEN",
    completed: "Erledigt ✓",
    eveClimax: "HEILIGABEND",
    startedOn: "Begonnen:",
  },
  doorTitles: {
    1: "Weihnachtsbudget",
    2: "Geschenkeliste",
    3: "Dezember-Meisterplan",
    4: "20-Minuten-Wohnung",
    5: "Geschenkideen",
    6: "Digital-Detox",
    7: "Festmenü-Konzept",
    8: "Smarter Einkauf",
    9: "Hausgemachte Köstlichkeiten",
    10: "Festliche Klänge",
    11: "Weihnachtskarten",
    12: "Halbzeit-Meilenstein",
    13: "Verbindungs-Impulse",
    14: "Familienspiele & Quiz",
    15: "Kuscheliger Filmabend",
    16: "Winterliche Düfte",
    17: "Lichterspaziergang",
    18: "Einpack-Atelier",
    19: "Sicherheits-Check",
    20: "Baum-Erleuchtung",
    21: "Frische Betten",
    22: "Frischemarkt-Besuch",
    23: "Tisch eindecken",
    24: "Heiligabend-Stille",
  },
  problem: {
    heading: "Weihnachten sollte Frieden und Geborgenheit bringen...",
    subheading: "Doch viel zu oft wird der Dezember zu einer ermüdenden Spirale aus Verpflichtungen und Hektik.",
    withoutPlanTitle: "Dezember ohne klaren Plan",
    withoutPlanSubtitle: "Der Stress, den wir alle zu gut kennen:",
    withoutPlanItems: [
      "Vergessene Geschenke und panisches Einkaufen an Heiligabend",
      "Kostenexplosion ohne Überblick, wohin das Geld geflossen ist",
      "Überfüllte Geschäfte, endlose Schlangen und gereizte Nerven",
      "Eine erdrückende To-Do-Liste, die niemals endet",
      "Völlige Erschöpfung pünktlich zur Bescherung",
      "Keine echten, stillen Momente des Innehaltens mit den Liebsten",
    ],
    withPlanTitle: "Ihr Fest mit Christmas Reset",
    withPlanSubtitle: "Das tägliche 10-Minuten-Ritual, das alles verändert:",
    withPlanItems: [
      "Mit Bedacht ausgewählte und rechtzeitig verpackte Präsente",
      "Klar kalkulierte Ausgaben ohne böse Überraschungen im Januar",
      "Jeden Morgen nur ein kleiner, freudvoller Schritt",
      "Behagliche Abendrituale: Gewürztee, sanfte Musik, warmes Kerzenlicht",
      "Wertvolle Zeit für Partner, Kinder, Familie und sich selbst",
      "Wahre Gegenwart, Dankbarkeit und tiefe Ruhe an Heiligabend",
    ],
  },
  howItWorks: {
    heading: "Wie funktioniert es? Ganz einfach in 3 Schritten.",
    subheading: "Keine komplizierte Installation. Funktioniert reibungslos auf jedem Smartphone, Tablet oder PC.",
    steps: [
      {
        number: "01",
        title: "Zugang sichern",
        description: "Erhalten Sie sofortigen, lebenslangen Zugriff auf den Kalender 2026 und alle Druckvorlagen.",
      },
      {
        number: "02",
        title: "Täglich ein Türchen öffnen",
        description: "Vom 1. bis 24. Dezember erwartet Sie jeden Morgen ein interaktives Tool oder ein Wohlfühlmoment.",
      },
      {
        number: "03",
        title: "Kleine Festtagsmagie erleben",
        description: "In nur 5–15 Minuten haken Sie einen Vorbereitungsschritt ab oder genießen ein beruhigendes Ritual.",
      },
    ],
    digitalDisclaimer: "Dies ist ein 100% digitales Produkt. Es erfolgt kein physischer Paketversand.",
  },
  phasesSection: {
    heading: "Die 24 Tage in 4 klaren Phasen",
    subheading: "Jede Phase hat eine Aufgabe und führt Sie Schritt für Schritt zur vollkommenen Gelassenheit.",
    phases: [
      {
        id: 1,
        name: "PHASE 1 — ORGANISIEREN",
        dateRange: "1.–6. Dezember",
        description: "Ruhige Grundlagen schaffen: Budget, Geschenkeplaner, Master-Kalender und Wohnungs-Reset.",
      },
      {
        id: 2,
        name: "PHASE 2 — VORBEREITEN",
        dateRange: "7.–12. Dezember",
        description: "Menüs planen, smarte Vorräte besorgen, kleine DIY-Aufmerksamkeiten und festliche Musik.",
      },
      {
        id: 3,
        name: "PHASE 3 — ERLEBEN",
        dateRange: "13.–18. Dezember",
        description: "Echte Nähe: Gesprächsimpulse für Paare, Familienspiele, Weihnachts-Filmabend und Gemütlichkeit.",
      },
      {
        id: 4,
        name: "PHASE 4 — ABSCHLIESSEN",
        dateRange: "19.–24. Dezember",
        description: "Stressfreie Vollendung: Sicherheits-Checkliste, Heiligabend-Menü und ein friedvoller Abend.",
      },
    ],
  },
  gamification: {
    title: "Ihr Weihnachts-Fortschritt",
    progressLabel: "Erledigte Tage",
    completedLabel: "von 24 Tagen abgeschlossen",
    milestones: [
      { days: 3, message: "Wunderbarer Start! Die ersten Schritte zu mehr Ruhe sind getan.", badge: "Funke der Ruhe" },
      { days: 7, message: "Sehr gut! Zuhause und Pläne finden in harmonischen Einklang.", badge: "Winterharmonie" },
      { days: 12, message: "Halbzeit! Die Magie der Festtage entfaltet sich spürbar.", badge: "Festliche Balance" },
      { days: 18, message: "Weihnachten ist nah! Sie sind den Terminen weit voraus.", badge: "Gelassen voraus" },
      { days: 24, message: "Geschafft! Sie haben das friedlichste Weihnachten Ihres Lebens gestaltet.", badge: "Christmas Reset" },
    ],
  },
  pricing: {
    heading: "Wählen Sie Ihr passendes Paket",
    subheading: "Eine kleine Investition für einen ganzen Monat voller Gelassenheit und Freude.",
    currency: "€",
    guarantee: "Sofortige digitale Bereitstellung direkt nach dem Kauf.",
    digitalNotice: "Digitales Produkt • Keine Versandkosten • Dauerhafter Zugriff auf Ausgabe 2026",
    tiers: [
      {
        id: "free",
        name: "KOSTENLOS",
        price: "0",
        period: "kostenlos",
        description: "Lernen Sie das Christmas Reset Erlebnis mit ausgewählten Einstiegstools kennen.",
        features: [
          "Adventskalender-Schnuppererlebnis",
          "Vollständige Vorschau Tag 1 (Budget)",
          "Grundlegende Vorbereitungsliste",
          "Ausgewählte freie Festtagsinhalte",
          "E-Mail-Erinnerung zur Adventszeit",
        ],
        cta: "Kostenlos testen",
      },
      {
        id: "standard",
        name: "STANDARD",
        price: "9.90",
        period: "einmalig",
        description: "Die unverzichtbare Basis für einen organisierten und ruhigen Dezember.",
        features: [
          "Voller Zugriff auf alle 24 Adventstürchen",
          "Alle interaktiven Planer & Rechner",
          "Interaktiver Weihnachts-Budgetrechner",
          "Interaktiver Geschenkeplaner mit Budgetkontrolle",
          "Raum-für-Raum Vorbereitungslisten",
          "Grundlegender Geschenke-Berater",
          "Automatische Speicherung auf Ihrem Gerät",
          "Ausgewählte druckbare Vorlagen",
        ],
        cta: "Standard wählen",
      },
      {
        id: "premium",
        name: "PREMIUM",
        price: "14.90",
        period: "einmalig",
        description: "Das komplette Festtagserlebnis inklusive Notfallmodus und gesamtem Druckpaket.",
        badge: "Beliebteste Wahl",
        features: [
          "Alles aus dem Standard-Paket",
          "Vollständiges Arbeitsblätter-Paket (A4 PDF)",
          "Weihnachts-Notfallmodus (30 / 14 / 7 / 3 Tage & Heiligabend)",
          "Smarter Geschenke-Berater mit KI-Inspiration",
          "Festmenü-Planer & intelligente Einkaufsliste",
          "Druckbare Weihnachtskarten & Geschenkanhänger",
          "Weihnachts-Familienspiele & Festtagsquiz",
          "Zusätzliche Festtagsaktivitäten & Film-Kit",
        ],
        cta: "Premium wählen",
      },
    ],
  },
  faq: {
    heading: "Häufig gestellte Fragen",
    subheading: "Alles Wissenswerte über das Christmas Reset 2026 Erlebnis.",
    items: [
      {
        question: "Was erhalte ich mit dem Kauf?",
        answer: "Vollständigen Zugriff auf eine webbasierte interaktive Adventsanwendung mit 24 täglichen Schritten: Budget- und Geschenkeplaner, Einkaufslisten, Menüplaner, Familienspiele, Vorlagen und elegante Arbeitsblätter zum Ausdrucken.",
      },
      {
        question: "Ist das ein physisches Produkt? Kommt ein Paket per Post?",
        answer: "Nein, das Produkt ist zu 100 % digital. Sie müssen auf keinen Paketboten warten und zahlen keine Versandkosten. Sofort nutzbar auf jedem Gerät.",
      },
      {
        question: "Wann kann ich starten?",
        answer: "Der Kalender ist für den 1.–24. Dezember konzipiert. Sie können jedoch schon jetzt in der Vorschau alle Vorbereitungen und Module erkunden.",
      },
      {
        question: "Funktioniert es auf dem Smartphone?",
        answer: "Ja, die Anwendung ist mobiloptimiert gestaltet und lässt sich einhändig auf iPhone und Android bedienen.",
      },
      {
        question: "Kann ich die Vorlagen ausdrucken?",
        answer: "Selbstverständlich! Alle Arbeitsblätter, Karten und Listen sind sauber für den Standard-A4-Druck formatiert.",
      },
      {
        question: "Kann ich das Erlebnis verschenken?",
        answer: "Ja! Beim Checkout können Sie die Geschenkoption wählen, um den Zugang direkt an eine geliebte Person zu senden.",
      },
    ],
  },
  emailReminder: {
    heading: "Möchten Sie zum Start der Adventszeit erinnert werden?",
    subheading: "Hinterlassen Sie Ihre E-Mail-Adresse und erhalten Sie am 1. Dezember eine freundliche Erinnerung und ein kostenloses Starter-Blatt.",
    namePlaceholder: "Ihr Vorname",
    emailPlaceholder: "Ihre E-Mail-Adresse",
    cta: "Am 1. Dezember erinnern",
    disclaimer: "Kein Spam. Abmeldung jederzeit mit einem Klick möglich. Ihre Daten sind sicher.",
    successMessage: "Vielen Dank! Wir haben Sie notiert und melden uns pünktlich zum Fest.",
  },
  footer: {
    rights: "Alle Rechte vorbehalten.",
    digitalNotice: "Christmas Reset 2026 ist ein originäres digitales Produkt.",
    disclaimer: "Mit Liebe gestaltet, damit die Winterzeit wieder zu einem Fest der Ruhe und Freude wird.",
    languages: "Sprache:",
    editionLabel: "Deutsche Ausgabe",
  },
  calendar: {
    title: "Ihr Adventskalender",
    subtitle: "Öffnen Sie das heutige Türchen, tun Sie einen kleinen Schritt und spüren Sie die einkehrende Ruhe.",
    filterAll: "Alle 24 Tage",
    filterPhase1: "1.–6. Dez: Organisieren",
    filterPhase2: "7.–12. Dez: Vorbereiten",
    filterPhase3: "13.–18. Dez: Erleben",
    filterPhase4: "19.–24. Dez: Abschließen",
    previewModeNotice: "Vorschau-Modus aktiv: Alle 24 Tage sind zu Testzwecken geöffnet.",
    previewModeToggle: "Alle Tage freischalten (Vorschau)",
    doorLockedTooltip: "Dieses Türchen öffnet am:",
    doorCompletedTooltip: "Mit Liebe erledigt",
    markCompleted: "Tag als erledigt markieren",
    completedStatus: "Erfolgreich abgeschlossen!",
    openTodayDoor: "Heutiges Türchen öffnen",
    startDateLabel: "Startdatum:",
    allDoorsUnlocked: "Alle 24 Türen geöffnet",
    dailyUnlock: "Täglich öffnender Kalender",
    unlockAll: "Alle Tage freischalten",
    normalMode: "Zurück zum Normalmodus",
  },
  checkout: {
    title: "Christmas Reset Zugang freischalten",
    subtitle: "Sofortige digitale Freischaltung • Festtagsausgabe 2026",
    tierLabel: "Gewähltes Paket:",
    firstNameLabel: "Ihr Vorname:",
    firstNamePlaceholder: "z.B. Julia",
    emailLabel: "Ihre E-Mail-Adresse (Zugang wird hierhin gesendet):",
    emailPlaceholder: "z.B. julia@beispiel.de",
    giftOption: "Als Geschenk für einen lieben Menschen kaufen",
    giftRecipientLabel: "E-Mail-Adresse des Empfängers:",
    giftRecipientPlaceholder: "lieblingsmensch@beispiel.de",
    submitButton: "Sofortigen Zugang freischalten",
    processing: "Wird aktiviert...",
    instantNotice: "Sofortiger digitaler Zugang • Keine versteckten Kosten • Lebenslanger Zugriff auf Ausgabe 2026",
    guarantee: "100% Zufriedenheits- & Ruhe-Garantie",
  },
  languageModal: {
    title: "Sprache wählen / Select Language",
    subtitle: "Bitte wählen Sie Ihre bevorzugte Sprache für das gesamte Erlebnis.",
    welcomeHeadline: "Willkommen beim Christmas Reset 2026",
    prompt: "Alle Kalendertüren, interaktiven Werkzeuge, Vorlagen und Planer werden in Ihrer gewählten Sprache dargestellt.",
    enterButton: "Zum Christmas Reset",
    selectedBadge: "Ausgewählt",
    quickSwitchNotice: "Sie können die Sprache später jederzeit im Menü ändern.",
  },
};

// ---------------- ROMANIAN (RO) ----------------
const roTranslations: TranslationDictionary = {
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
    aiCard: "Felicitare AI",
    creatorMode: "Mod Previzualizare",
    startCta: "Începe Resetul de Crăciun",
    openCalendar: "Deschide Calendarul",
    backToHome: "Înapoi la Prezentare",
    changeLanguage: "Schimbă Limba",
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
  landing: {
    editionBand: "Ediție Limitată de Iarnă • 2026 Atelier",
    subtlePoem: "Liniște, cadență și rafinament pentru serile de decembrie",
    dateRange: "Decembrie 1 — 24",
    heroBadge: "CHRISTMAS RESET 2026 • EDIȚIA EDITORIALĂ",
    heroPitch: "Fără maratoane epuizante în magazine, fără liste interminabile lăsate pe 23 decembrie. O metodă ritmică creată pentru a-ți reda bucuria primară a iernii.",
    metric1Value: "15 min",
    metric1Label: "Ritual zilnic concentrat",
    metric2Value: "9 Ghiduri",
    metric2Label: "Printabile & Ledgere",
    metric3Value: "100%",
    metric3Label: "Fără grabă & vinovăție",
    adventAtelier: "ATELIERUL DE CRĂCIUN",
    doorsTitle: "Calendarul celor 24 de Uși",
    todayActive: "AZI ACTIVĂ",
    todayOpen: "AZI • DESCHIDE",
    completed: "Complet ✓",
    eveClimax: "AJUN",
    startedOn: "Început:",
  },
  doorTitles: {
    1: "Bugetul de Crăciun",
    2: "Lista de Cadouri",
    3: "Planificator Decembrie",
    4: "Resetul Casei în 20 Min",
    5: "Idei de Cadouri",
    6: "Detox Digital de Seară",
    7: "Meniul de Sărbătoare",
    8: "Cumpărături Inteligente",
    9: "Bunătăți Făcute în Casă",
    10: "Muzică & Atmosferă",
    11: "Felicitări de Mână",
    12: "Popasul de la Jumătate",
    13: "Conectare în Cuplu",
    14: "Jocuri & Trivia Festivă",
    15: "Seară de Film Caldă",
    16: "Arome Naturale de Iarnă",
    17: "Plimbare de Seară",
    18: "Atelierul de Împachetat",
    19: "Verificarea de Siguranță",
    20: "Aprinderea Bradului",
    21: "Lenjerii & Oaspeți",
    22: "Cumpărăturile Proaspete",
    23: "Așezarea Mesei din Ajun",
    24: "Liniștea din Ajun",
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
        answer: "Da! La checkout poți bifa 'Cumpăr ca un cadou', iar accesul va fi expediat direct către persoana dragă.",
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
    editionLabel: "Ediție Românească",
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
    startDateLabel: "Data începerii:",
    allDoorsUnlocked: "Toate 24 de uși deblocate",
    dailyUnlock: "Deblocare zilnică",
    unlockAll: "Deblochează toate cele 24 zile",
    normalMode: "Comută la modul normal",
  },
  checkout: {
    title: "Finalizare Acces Christmas Reset",
    subtitle: "Livrare digitală instantanee • Ediția 2026",
    tierLabel: "Pachetul ales:",
    firstNameLabel: "Prenumele tău:",
    firstNamePlaceholder: "Ex: Elena",
    emailLabel: "Adresa ta de email (pentru trimiterea accesului):",
    emailPlaceholder: "elena@exemplu.ro",
    giftOption: "Cumpăr ca un cadou pentru cineva drag",
    giftRecipientLabel: "Emailul persoanei dragi:",
    giftRecipientPlaceholder: "persoana.draga@exemplu.ro",
    submitButton: "Deblochează Accesul Imediat",
    processing: "Se procesează accesul...",
    instantNotice: "Acces digital instant • Fără costuri ascunse • Acces pe viață la ediția 2026",
    guarantee: "100% Garanție de Claritate și Liniște",
  },
  languageModal: {
    title: "Alege Limba / Select Language",
    subtitle: "Selectează limba preferată pentru o experiență festivă completă.",
    welcomeHeadline: "Bine ai venit la Christmas Reset 2026!",
    prompt: "Întreaga experiență, de la calendar și planificatoare până la fișele de lucru, va fi adaptată limbii alese.",
    enterButton: "Intră în Christmas Reset",
    selectedBadge: "Selectat",
    quickSwitchNotice: "Poți schimba limba oricând din meniu sau din subsolul paginii.",
  },
};

// ---------------- POLISH (PL) ----------------
const plTranslations: TranslationDictionary = {
  ...enTranslations,
  brandName: "Christmas Reset 2026",
  tagline: "24 dni do spokojniejszych, zorganizowanych Świąt.",
  supportingLine: "Otwórz jedno okienko każdego dnia. Zrób jedną małą rzecz. Poczuj prawdziwą magię Świąt.",
  nav: {
    ...enTranslations.nav,
    calendar: "Kalendarz Adwentowy",
    concept: "Dlaczego Reset?",
    phases: "4 Fazy",
    pricing: "Pakiety",
    faq: "FAQ",
    printables: "Materiały do druku",
    emergency: "Tryb Awaryjny",
    giftHelper: "Asystent Prezentów",
    aiCard: "Kartki AI",
    creatorMode: "Podgląd",
    startCta: "Zacznij Christmas Reset",
    openCalendar: "Otwórz Kalendarz",
    backToHome: "Powrót",
    changeLanguage: "Zmień język",
  },
  footer: {
    ...enTranslations.footer,
    editionLabel: "Edycja Polska",
  },
  languageModal: {
    title: "Wybierz Język / Select Language",
    subtitle: "Wybierz preferowany język, aby rozpocząć świąteczną podróż.",
    welcomeHeadline: "Witaj w Christmas Reset 2026!",
    prompt: "Wszystkie okienka, narzędzia i materiały dostosują się do Twojego wyboru.",
    enterButton: "Wejdź do Christmas Reset",
    selectedBadge: "Wybrano",
    quickSwitchNotice: "Możesz zmienić język w dowolnym momencie w menu.",
  },
};

// ---------------- CZECH (CZ) ----------------
const czTranslations: TranslationDictionary = {
  ...enTranslations,
  brandName: "Christmas Reset 2026",
  tagline: "24 dní ke klidnějším a organizovanějším Vánocům.",
  supportingLine: "Otevřete každý den jedno okénko. Udělejte jednu drobnost. Užijte si Vánoce v klidu.",
  nav: {
    ...enTranslations.nav,
    calendar: "Adventní Kalendář",
    concept: "Proč Reset?",
    phases: "4 Fáze",
    pricing: "Balíčky",
    faq: "Časté dotazy",
    printables: "K tisku",
    emergency: "Krizový Režim",
    giftHelper: "Rádce s dárky",
    aiCard: "AI Přání",
    creatorMode: "Náhled",
    startCta: "Začít Christmas Reset",
    openCalendar: "Otevřít Kalendář",
    backToHome: "Zpět na úvod",
    changeLanguage: "Změnit jazyk",
  },
  footer: {
    ...enTranslations.footer,
    editionLabel: "Česká Edice",
  },
  languageModal: {
    title: "Vyberte Jazyk / Select Language",
    subtitle: "Vyberte prosím svůj preferovaný jazyk.",
    welcomeHeadline: "Vítejte v Christmas Reset 2026!",
    prompt: "Všechna okénka, nástroje a plánovače se přizpůsobí vaší volbě.",
    enterButton: "Vstoupit do Christmas Reset",
    selectedBadge: "Vybráno",
    quickSwitchNotice: "Jazyk můžete kdykoli změnit v horním menu.",
  },
};

// ---------------- SLOVAK (SK) ----------------
const skTranslations: TranslationDictionary = {
  ...enTranslations,
  brandName: "Christmas Reset 2026",
  tagline: "24 dní k pokojnejším a zorganizovaným Vianociam.",
  supportingLine: "Otvorte každý deň jedno okienko. Urobte jednu maličkosť. Zažite pravé čaro Vianoc.",
  nav: {
    ...enTranslations.nav,
    calendar: "Adventný Kalendár",
    concept: "Prečo Reset?",
    phases: "4 Fázy",
    pricing: "Balíky",
    faq: "Časté otázky",
    printables: "Na vytlačenie",
    emergency: "Núdzový Režim",
    giftHelper: "Sprievodca darčekmi",
    aiCard: "AI Pohľadnice",
    creatorMode: "Náhľad",
    startCta: "Začať Christmas Reset",
    openCalendar: "Otvoriť Kalendár",
    backToHome: "Späť",
    changeLanguage: "Zmeniť jazyk",
  },
  footer: {
    ...enTranslations.footer,
    editionLabel: "Slovenská Edícia",
  },
  languageModal: {
    title: "Vyberte Jazyk / Select Language",
    subtitle: "Vyberte si prosím svoj jazyk pre sviatočné plánovanie.",
    welcomeHeadline: "Vitajte v Christmas Reset 2026!",
    prompt: "Celý kalendár, nástroje aj vytlačiteľné materiály sa prispôsobia vášmu výberu.",
    enterButton: "Vstúpiť do Christmas Reset",
    selectedBadge: "Vybrané",
    quickSwitchNotice: "Jazyk môžete kedykoľvek zmeniť v hornom menu.",
  },
};

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  hu: huTranslations,
  en: enTranslations,
  de: deTranslations,
  ro: roTranslations,
  pl: plTranslations,
  cz: czTranslations,
  sk: skTranslations,
};

// Safe multilingual fallback logic
export function getTranslations(lang: SupportedLanguage): TranslationDictionary {
  if (translations[lang] && Object.keys(translations[lang]).length > 0) {
    return translations[lang];
  }
  return translations.hu || translations.en || translations.ro;
}
