import { SupportedLanguage } from '../types';

export interface ObstacleCard {
  id: string;
  icon: string;
  obstacleNumber: string;
  title: string;
  problemText: string;
  solutionBadge: string;
  solutionTitle: string;
  solutionDescription: string;
  targetDay: number;
  navigateAction?: 'gifts' | 'emergency';
}

export function getObstaclesData(lang: SupportedLanguage): {
  badge: string;
  heading: string;
  description: string;
  cards: ObstacleCard[];
} {
  const isHu = lang === 'hu';
  const isDe = lang === 'de';
  const isRo = lang === 'ro';
  const isPl = lang === 'pl';
  const isCz = lang === 'cz';
  const isSk = lang === 'sk';

  if (isHu) {
    return {
      badge: "DIAGNÓZIS & MEGOLDÁS",
      heading: "A karácsonynak örömnek kellene lennie. Nem egy újabb kimerítő projektnek.",
      description: "Azonosítottuk az 5 legfőbb stresszforrást, ami elrabolja az ünnepek varázsát, és mindegyikre egy egyszerű, elegáns és azonnal használható eszközt alkottunk.",
      cards: [
        {
          id: "obs-1",
          icon: "featured_seasonal_and_gifts",
          obstacleNumber: "01. Kihívás",
          title: "Túl sok ajándékot kell megvenni?",
          problemText: "Elveszett cetlik, kaotikus listák és az állandó félelem, hogy valakit kifelejtettél.",
          solutionBadge: "Atelier Megoldás",
          solutionTitle: "Ajándéktervező & Tanácsadó",
          solutionDescription: "Állapotkövetés, méretek, személyre szabott ötletek és keretösszeg.",
          targetDay: 2,
          navigateAction: 'gifts',
        },
        {
          id: "obs-2",
          icon: "account_balance_wallet",
          obstacleNumber: "02. Kihívás",
          title: "Bizonytalanság, mennyibe fog kerülni?",
          problemText: "Észrevétlenül összeadódó apró kiadások, amelyek felesleges pénzügyi szorongást okoznak.",
          solutionBadge: "Atelier Megoldás",
          solutionTitle: "Karácsonyi Költségvetés",
          solutionDescription: "Világos kategóriák, biztonsági tartalék és automatikus egyenleg.",
          targetDay: 1,
        },
        {
          id: "obs-3",
          icon: "timer",
          obstacleNumber: "03. Kihívás",
          title: "Nyomasztóan sok a hátralévő teendő?",
          problemText: "A tehetetlenség érzése, amikor a feladatlista már 40 pontból áll, és nem tudod, hol kezdd.",
          solutionBadge: "Atelier Megoldás",
          solutionTitle: "Napi Reset (15 perc)",
          solutionDescription: "Egyetlen kis mikrolépés naponta, békés ritmusban, zéró nyomás alatt.",
          targetDay: 8,
        },
        {
          id: "obs-4",
          icon: "restaurant_menu",
          obstacleNumber: "04. Kihívás",
          title: "Bonyolulttá válik a menütervezés?",
          problemText: "Felesleges túlfőzés, kidobott ételek és órákon át tartó magányos robotolás a konyhában.",
          solutionBadge: "Atelier Megoldás",
          solutionTitle: "Menü & Receptsegédlet",
          solutionDescription: "Időzített sütő-menetrend és csoportosított piaci bevásárlólista.",
          targetDay: 7,
        },
        {
          id: "obs-5",
          icon: "warning_amber",
          obstacleNumber: "05. Kihívás",
          title: "Már túl közel van a szenteste?",
          problemText: "Későn kezdted, és úgy érzed, az idő menthetetlenül kifut a kezeid közül.",
          solutionBadge: "Atelier Megoldás",
          solutionTitle: "Vészhelyzet Mód (Expressz)",
          solutionDescription: "Koncentrált mentőterv 30, 14, 7 vagy akár 48 órával szenteste előtt.",
          targetDay: 23,
          navigateAction: 'emergency',
        },
      ],
    };
  }

  if (isDe) {
    return {
      badge: "DIAGNOSE & LÖSUNG",
      heading: "Weihnachten sollte pure Freude sein. Kein weiteres erschöpfendes Projekt.",
      description: "Wir haben die 5 Engpässe identifiziert, die den Weihnachtszauber rauben, und konkrete, beruhigende Werkzeuge dafür geschaffen.",
      cards: [
        {
          id: "obs-1",
          icon: "featured_seasonal_and_gifts",
          obstacleNumber: "Engpass 01",
          title: "Zu viele Geschenke zu besorgen?",
          problemText: "Verlorene Zettel, Gedankenchaos und die ständige Sorge, jemanden zu vergessen.",
          solutionBadge: "Atelier Lösung",
          solutionTitle: "Geschenke-Planer & Berater",
          solutionDescription: "Lieferstatus, Größen, persönliche Ideen und individuelles Budget.",
          targetDay: 2,
          navigateAction: 'gifts',
        },
        {
          id: "obs-2",
          icon: "account_balance_wallet",
          obstacleNumber: "Engpass 02",
          title: "Ungewissheit über die Gesamtkosten?",
          problemText: "Kleinausgaben, die sich unbemerkt summieren und finanzielle Anspannung erzeugen.",
          solutionBadge: "Atelier Lösung",
          solutionTitle: "Weihnachtsbudget-Rechner",
          solutionDescription: "Klare Kategorien, Notfallreserve und automatische Ausgabenbalance.",
          targetDay: 1,
        },
        {
          id: "obs-3",
          icon: "timer",
          obstacleNumber: "Engpass 03",
          title: "Zu viele offene To-Dos auf der Liste?",
          problemText: "Gefühl der Überforderung, wenn die To-Do-Liste über 40 Zeilen lang ist.",
          solutionBadge: "Atelier Lösung",
          solutionTitle: "Täglicher Reset (15 Min.)",
          solutionDescription: "Nur eine einzige Mikro-Aktion pro Tag ohne jeglichen Druck.",
          targetDay: 8,
        },
        {
          id: "obs-4",
          icon: "restaurant_menu",
          obstacleNumber: "Engpass 04",
          title: "Festmenü wird zur Stressfalle?",
          problemText: "Zu viel Kochen, Lebensmittelverschwendung und endlose Stunden allein am Herd.",
          solutionBadge: "Atelier Lösung",
          solutionTitle: "Menüplan & Backzeitplan",
          solutionDescription: "Vorbereitungsplan für 24. Dez. und organisierte Supermarktliste.",
          targetDay: 7,
        },
        {
          id: "obs-5",
          icon: "warning_amber",
          obstacleNumber: "Engpass 05",
          title: "Heiligabend ist schon bedrohlich nah?",
          problemText: "Zu spät angefangen und das Gefühl, dass die Tage wie im Flug verrinnen.",
          solutionBadge: "Atelier Lösung",
          solutionTitle: "Notfallmodus (Express)",
          solutionDescription: "Strikt priorisierter Rettungsplan für 30, 14, 7 Tage oder 48 Stunden.",
          targetDay: 23,
          navigateAction: 'emergency',
        },
      ],
    };
  }

  if (isRo) {
    return {
      badge: "DIAGNOSTIC & REZOLVARE",
      heading: "Crăciunul ar trebui să fie o bucurie. Nu încă un proiect epuizant.",
      description: "Am identificat cele 5 puncte nevralgice care fură farmecul sărbătorilor și am construit instrumente simple, elegante și concrete pentru fiecare.",
      cards: [
        {
          id: "obs-1",
          icon: "featured_seasonal_and_gifts",
          obstacleNumber: "Obstacol 01",
          title: "Prea multe cadouri de cumpărat?",
          problemText: "Haosul listelor pe foițe rătăcite și teama că ai uitat pe cineva drag.",
          solutionBadge: "Soluția Atelier",
          solutionTitle: "Planificator Cadouri",
          solutionDescription: "Status livrare, mărimi & buget individual.",
          targetDay: 2,
          navigateAction: 'gifts',
        },
        {
          id: "obs-2",
          icon: "account_balance_wallet",
          obstacleNumber: "Obstacol 02",
          title: "Nesigură cât va costa totul?",
          problemText: "Cheltuieli mărunte care se adună pe nesimțite și creează anxietate financiară.",
          solutionBadge: "Soluția Atelier",
          solutionTitle: "Bugetul de Crăciun",
          solutionDescription: "Plafoane pe categorii & balanță automată.",
          targetDay: 1,
        },
        {
          id: "obs-3",
          icon: "timer",
          obstacleNumber: "Obstacol 03",
          title: "Prea multe sarcini rămase?",
          problemText: "Senzația de paralizie când lista are peste 40 de rânduri neterminate.",
          solutionBadge: "Soluția Atelier",
          solutionTitle: "Resetul Zilnic (15 min)",
          solutionDescription: "O singură micro-acțiune pe zi, fără presiune.",
          targetDay: 8,
        },
        {
          id: "obs-4",
          icon: "restaurant_menu",
          obstacleNumber: "Obstacol 04",
          title: "Meniul devine complicat?",
          problemText: "Gătit excesiv, risipă alimentară și ore întregi petrecute singură în bucătărie.",
          solutionBadge: "Soluția Atelier",
          solutionTitle: "Meniu & Rețete",
          solutionDescription: "Planificator feluri principale & lista pe raioane.",
          targetDay: 7,
        },
        {
          id: "obs-5",
          icon: "warning_amber",
          obstacleNumber: "Obstacol 05",
          title: "Sărbătorile sunt prea aproape?",
          problemText: "Ai început târziu și timpul pare să se scurgă mult prea repede.",
          solutionBadge: "Soluția Atelier",
          solutionTitle: "Mod de Urgență",
          solutionDescription: "Plan condensat de 48h axat doar pe esențial.",
          targetDay: 23,
          navigateAction: 'emergency',
        },
      ],
    };
  }

  // Default English / Slavic languages fallback
  const isSlavic = isPl || isCz || isSk;
  return {
    badge: isPl ? "DIAGNOZA I ROZWIĄZANIE" : isCz ? "DIAGNÓZA A ŘEŠENÍ" : isSk ? "DIAGNÓZA A RIEŠENIE" : "DIAGNOSIS & RESOLUTION",
    heading: isPl 
      ? "Święta powinny być radością, a nie kolejnym wyczerpującym projektem."
      : isCz
      ? "Vánoce by měly být radostí, ne dalším vyčerpávajícím projektem."
      : isSk
      ? "Vianoce by mali byť radosťou, nie ďalším vyčerpávajúcim projektom."
      : "Christmas should be pure joy. Not another exhausting project.",
    description: isPl
      ? "Zidentyfikowaliśmy 5 głównych źródeł stresu świątecznego i stworzyliśmy proste, eleganckie narzędzia dla każdego z nich."
      : isCz
      ? "Identifikovali jsme 5 hlavních zdrojů stresu a vytvořili jednoduché nástroje pro každý z nich."
      : isSk
      ? "Identifikovali sme 5 hlavných zdrojov stresu a vytvorili jednoduché nástroje pre každý z nich."
      : "We identified the 5 primary bottlenecks stealing holiday peace and crafted elegant, practical tools for each.",
    cards: [
      {
        id: "obs-1",
        icon: "featured_seasonal_and_gifts",
        obstacleNumber: "01",
        title: isPl ? "Zbyt wiele prezentów do kupienia?" : isCz ? "Příliš mnoho dárků k nákupu?" : isSk ? "Priveľa darčekov na nákup?" : "Too many gifts to buy?",
        problemText: isPl ? "Chaos zagubionych karteczek i lęk, że o kimś zapomnisz." : isCz ? "Ztracené papírky a strach, že na někoho zapomenete." : isSk ? "Stratené papieriky a strach, že na niekoho zabudnete." : "Chaotic scattered notes and fear of forgetting someone special.",
        solutionBadge: "Atelier Solution",
        solutionTitle: isPl ? "Planer Prezentów" : isCz ? "Plánovač Dárků" : isSk ? "Plánovač Darčekov" : "Gift Planner & Assistant",
        solutionDescription: isPl ? "Status dostawy, rozmiary i indywidualny budżet." : isCz ? "Stav doručení, velikosti a individuální rozpočet." : isSk ? "Stav doručenia, veľkosti a individuálny rozpočet." : "Delivery tracking, sizing, personalized ideas and budget caps.",
        targetDay: 2,
        navigateAction: 'gifts',
      },
      {
        id: "obs-2",
        icon: "account_balance_wallet",
        obstacleNumber: "02",
        title: isPl ? "Niepewność co do kosztów?" : isCz ? "Nejistota ohledně nákladů?" : isSk ? "Neistota ohľadom nákladov?" : "Unsure how much it will all cost?",
        problemText: isPl ? "Niezauważalnie rosnące wydatki i lęk finansowy." : isCz ? "Nenápadně narůstající výdaje a finanční stres." : isSk ? "Nenápadne narastajúce výdavky a finančný stres." : "Small expenses adding up quietly and creating seasonal anxiety.",
        solutionBadge: "Atelier Solution",
        solutionTitle: isPl ? "Budżet Świąteczny" : isCz ? "Vánoční Rozpočet" : isSk ? "Vianočný Rozpočet" : "Holiday Budget Planner",
        solutionDescription: isPl ? "Kategorie wydatków i automatyczny bilans." : isCz ? "Kategorie výdajů a automatická bilance." : isSk ? "Kategórie výdavkov a automatická bilancia." : "Category spending caps, emergency buffers and real balance.",
        targetDay: 1,
      },
      {
        id: "obs-3",
        icon: "timer",
        obstacleNumber: "03",
        title: isPl ? "Przytłaczająca lista zadań?" : isCz ? "Příliš mnoho úkolů?" : isSk ? "Priveľa úloh na zozname?" : "Too many unfinished tasks?",
        problemText: isPl ? "Uczucie paraliżu przy liście liczącej 40 pozycji." : isCz ? "Pocit zahlcení při seznamu o 40 položkách." : isSk ? "Pocit zahltenia pri zozname so 40 položkami." : "Paralysis when facing a sprawling 40-item December to-do list.",
        solutionBadge: "Atelier Solution",
        solutionTitle: isPl ? "Dzienny Reset (15 min)" : isCz ? "Denní Reset (15 min)" : isSk ? "Denný Reset (15 min)" : "Daily Reset (15 min)",
        solutionDescription: isPl ? "Jedno małe działanie dziennie, bez pośpiechu." : isCz ? "Jeden malý krok denně, bez tlaku." : isSk ? "Jeden malý krok denne, bez tlaku." : "One single micro-action each morning with zero pressure.",
        targetDay: 8,
      },
      {
        id: "obs-4",
        icon: "restaurant_menu",
        obstacleNumber: "04",
        title: isPl ? "Zbyt skomplikowane menu?" : isCz ? "Komplikované menu?" : isSk ? "Komplikované menu?" : "Holiday menu becoming too complex?",
        problemText: isPl ? "Nadmierne gotowanie i godziny spędzone w kuchni." : isCz ? "Příliš mnoho vaření a hodiny v kuchyni." : isSk ? "Príliš veľa varenia a hodiny v kuchyni." : "Excess cooking, food waste and exhausting lonely hours in the kitchen.",
        solutionBadge: "Atelier Solution",
        solutionTitle: isPl ? "Menu i Przepisy" : isCz ? "Menu a Recepty" : isSk ? "Menu a Recepty" : "Menu & Prep Timeline",
        solutionDescription: isPl ? "Harmonogram pieczenia i lista zakupów." : isCz ? "Harmonogram pečení a nákupní seznam." : isSk ? "Harmonogram pečenia a nákupný zoznam." : "Oven timeline for Dec 24 and aisle-by-aisle grocery checklist.",
        targetDay: 7,
      },
      {
        id: "obs-5",
        icon: "warning_amber",
        obstacleNumber: "05",
        title: isPl ? "Święta są już zbyt blisko?" : isCz ? "Štědrý den se neúprosně blíží?" : isSk ? "Štedrý deň sa neúprosne blíži?" : "Holidays arriving too fast?",
        problemText: isPl ? "Zacząłeś późno i czas ucieka przez palce." : isCz ? "Začali jste pozdě a čas utíká." : isSk ? "Začali ste neskoro a čas uteká." : "Started late and feeling the clock ticking against you.",
        solutionBadge: "Atelier Solution",
        solutionTitle: isPl ? "Tryb Awaryjny" : isCz ? "Nouzový Režim" : isSk ? "Núdzový Režim" : "Emergency Express Mode",
        solutionDescription: isPl ? "Skondensowany plan 48h skupiony na istocie." : isCz ? "Kondenzovaný 48h plán zaměřený na to nejdůležitější." : isSk ? "Kondenzovaný 48h plán zameraný na to najdôležitejšie." : "Condensed 48h express plan focused only on what truly matters.",
        targetDay: 23,
        navigateAction: 'emergency',
      },
    ],
  };
}

export function getPhilosophyData(lang: SupportedLanguage): {
  title: string;
  description: string;
  badge: string;
} {
  if (lang === 'hu') {
    return {
      title: "A Reset Filozófiája: Semmi kapkodás, semmi feszültség, lépésről lépésre.",
      description: "Gyakorlatias ünnepi rendszerezés a sűrű decemberi napokra. Ahelyett, hogy mindent egyetlen kimerítő hétvégébe sűrítenél, minden reggel egyetlen apró részletet oldasz meg békében.",
      badge: "15 PERCES ATELIER MÓDSZER",
    };
  }
  if (lang === 'de') {
    return {
      title: "Die Reset-Philosophie: Keine Eile, kein Stress, Schritt für Schritt.",
      description: "Ein praktisches Organisationssystem für geschäftige Dezembertage. Statt alles in ein überwältigendes Wochenende zu packen, lösen Sie jeden Morgen ein einzelnes Detail in aller Ruhe.",
      badge: "15-MINUTEN ATELIER METHODE",
    };
  }
  if (lang === 'ro') {
    return {
      title: "Filosofia Resetului: Fără grabă, fără stres, pas cu pas.",
      description: "Un sistem practic de organizare a sărbătorilor pentru zile aglomerate de decembrie. În loc să condensezi totul într-un weekend copleșitor, rezolvi câte un singur detaliu în fiecare dimineață.",
      badge: "METODA 15-MINUTE ATELIER",
    };
  }
  return {
    title: "The Reset Philosophy: No rush, zero stress, step by mindful step.",
    description: "A calm seasonal organization system designed for busy winter days. Instead of cramming everything into one chaotic weekend, you gently resolve one single detail each morning.",
    badge: "15-MINUTE ATELIER METHOD",
  };
}

export function getFinalCtaData(lang: SupportedLanguage): {
  headline: string;
  subheadline: string;
  buttonText: string;
  exploreText: string;
  editionNote: string;
} {
  if (lang === 'hu') {
    return {
      headline: "Tedd a decembert meleg emlékké, ne versenyfutássá az idővel.",
      subheadline: "Csatlakozz azokhoz, akik a kapkodás helyett a tiszta rituálékat, a belső békét és a valódi meghittséget választották.",
      buttonText: "Kezdd el ma a Reset-et (9,90 €)",
      exploreText: "Fedezd fel a Kalendáriumot",
      editionNote: "2026-os Kiadás • Szeretettel készítve békés otthonoknak",
    };
  }
  if (lang === 'de') {
    return {
      headline: "Machen Sie den Dezember zu einer warmen Erinnerung, nicht zum Wettlauf gegen die Zeit.",
      subheadline: "Schließen Sie sich all jenen an, die Hektik durch klare Rituale, innere Ruhe und festliche Vorfreude ersetzt haben.",
      buttonText: "Heute den Reset starten (9,90 €)",
      exploreText: "Kalender erkunden",
      editionNote: "Ausgabe 2026 • Mit Liebe für ein ruhiges Zuhause kreiert",
    };
  }
  if (lang === 'ro') {
    return {
      headline: "Fă din decembrie o amintire caldă, nu o cursă contra cronometru.",
      subheadline: "Alătură-te celor care au ales să înlocuiască haosul cu ritualuri clare, liniște interioară și un sentiment nobil de împlinire.",
      buttonText: "Începe Astăzi Resetul (9,90 €)",
      exploreText: "Explorează Calendarul",
      editionNote: "Ediția 2026 • Creat cu dragoste pentru case liniștite",
    };
  }
  return {
    headline: "Make December a warm memory, not a race against the clock.",
    subheadline: "Join thousands who replaced holiday chaos with clear rituals, quiet confidence, and true presence with those who matter most.",
    buttonText: "Start Your Reset Today (9.90 €)",
    exploreText: "Explore the Calendar",
    editionNote: "2026 Edition • Crafted with care for peaceful homes",
  };
}
