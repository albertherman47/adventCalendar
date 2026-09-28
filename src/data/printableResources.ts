import { SupportedLanguage } from '../types';

export interface PrintableResourceData {
  id: string;
  badge: {
    ro: string;
    en: string;
    hu: string;
  };
  title: {
    ro: string;
    en: string;
    hu: string;
  };
  subtitle: {
    ro: string;
    en: string;
    hu: string;
  };
  category: {
    ro: string;
    en: string;
    hu: string;
  };
  pageCount: {
    ro: string;
    en: string;
    hu: string;
  };
  description: {
    ro: string;
    en: string;
    hu: string;
  };
  visualTheme: {
    containerClass: string;
    headerAccentClass: string;
    badgeClass: string;
    accentColor: string;
    styleType: 'burgundy-gold' | 'pine-ribbon' | 'cinnamon-apothecary' | 'bistro-menu' | 'vintage-airmail' | 'candy-game' | 'midnight-cinema' | 'hygge-cashmere' | 'heraldic-shield';
  };
}

export function getLocalizedText(
  field: { ro: string; en: string; hu: string },
  lang: SupportedLanguage
): string {
  if (lang === 'hu') return field.hu;
  if (lang === 'ro') return field.ro;
  return field.en;
}

export const PRINTABLE_RESOURCES: PrintableResourceData[] = [
  {
    id: "printable-budget",
    badge: {
      ro: "Finanțe & Control 2026",
      en: "Finance & Control 2026",
      hu: "Pénzügyi Egyensúly 2026",
    },
    title: {
      ro: "Fișa de Buget de Crăciun 2026",
      en: "Christmas Budget Worksheet 2026",
      hu: "Karácsonyi Költségvetési Tervezőlap 2026",
    },
    subtitle: {
      ro: "Planificator pe categorii & cheltuieli reale fără surprize",
      en: "Category allocation & real expense tracker with zero debt",
      hu: "Kategóriák szerinti felosztás & valós kiadások meglepetések nélkül",
    },
    category: {
      ro: "Finanțe",
      en: "Finance",
      hu: "Pénzügyek",
    },
    pageCount: {
      ro: "1 pagină A4 • Tabular",
      en: "1 Page A4 • Ledger",
      hu: "1 A4-es oldal • Táblázatos",
    },
    description: {
      ro: "Tabel complet pentru stabilirea plafonului total, repartizarea pe cadouri, masă, decor și rezervă, plus coloană pentru cheltuieli efective.",
      en: "Complete worksheet to set your hard spending cap, distribute across gifts, festive meals, decor, and emergency buffer with real vs. planned tracking.",
      hu: "Átlátható táblázat a teljes keret rögzítéséhez, az ajándékokra, ünnepi asztalra, dekorációra és tartalékra szánt összegek beosztásával.",
    },
    visualTheme: {
      containerClass: "bg-gradient-to-br from-[#2D0910] via-[#3B1017] to-[#1F0408] text-white border-2 border-[#D4AF37]/50 shadow-[0_8px_30px_rgba(45,9,16,0.25)]",
      headerAccentClass: "text-[#F5D77F]",
      badgeClass: "bg-[#D4AF37]/20 text-[#F5D77F] border border-[#D4AF37]/40",
      accentColor: "#D4AF37",
      styleType: 'burgundy-gold',
    },
  },
  {
    id: "printable-gifts",
    badge: {
      ro: "Brad & Cadouri",
      en: "Tree & Gifts",
      hu: "Fa & Ajándékok",
    },
    title: {
      ro: "Planificatorul de Cadouri & Împachetare",
      en: "Gifts & Wrapping Master Tracker",
      hu: "Ajándéktervező & Csomagolási Mesterlista",
    },
    subtitle: {
      ro: "Destinatari, idei, bugete, căsuțe de bifat cumpărat și împachetat",
      en: "Recipients, thoughtful ideas, budgets, purchased & wrapped checkmarks",
      hu: "Címzettek, szívhez szóló ötletek, keretek, megvéve és csomagolva pipák",
    },
    category: {
      ro: "Cadouri",
      en: "Gifts",
      hu: "Ajándékok",
    },
    pageCount: {
      ro: "2 pagini A4 • Extensibil",
      en: "2 Pages A4 • Comprehensive",
      hu: "2 A4-es oldal • Bővíthető",
    },
    description: {
      ro: "Secțiuni organizate pe cercuri de apropiați, căsuțe de bifat 'Cumpărat' și 'Împachetat', plus spațiu dedicat pentru idei de mesaje calde.",
      en: "Organized in concentric circles of loved ones, with discrete check-boxes for purchased and wrapped, plus room for handwritten card notes.",
      hu: "Rendszerezett szekciók családtagoknak, barátoknak és kollégáknak, 'Megvéve' és 'Csomagolva' pipálható mezőkkel és kártyaszöveg hellyel.",
    },
    visualTheme: {
      containerClass: "bg-gradient-to-br from-[#12281D] via-[#1A382A] to-[#0A1A12] text-white border-2 border-dashed border-[#57C794]/40 shadow-[0_8px_30px_rgba(18,40,29,0.25)]",
      headerAccentClass: "text-[#7FE4B4]",
      badgeClass: "bg-[#285E43] text-[#A6F5CD] border border-[#57C794]/40",
      accentColor: "#57C794",
      styleType: 'pine-ribbon',
    },
  },
  {
    id: "printable-grocery",
    badge: {
      ro: "Cămară & Bucătărie",
      en: "Pantry & Kitchen",
      hu: "Kamra & Konyha",
    },
    title: {
      ro: "Lista Inteligentă de Cumpărături",
      en: "Smart Festive Grocery & Pantry List",
      hu: "Okos Ünnepi Bevásárló- & Kamralista",
    },
    subtitle: {
      ro: "Organizare pe raioane & cămară pentru un singur drum la magazin",
      en: "Aisle-by-aisle organization for a single, calm shopping trip",
      hu: "Részlegek és kamra szerinti logikus bontás egyetlen nyugodt boltjáráshoz",
    },
    category: {
      ro: "Bucătărie",
      en: "Kitchen",
      hu: "Konyha",
    },
    pageCount: {
      ro: "1 pagină A4 • Raioane",
      en: "1 Page A4 • Aisles",
      hu: "1 A4-es oldal • Részlegek",
    },
    description: {
      ro: "Împărțită pe categorii logice: Băcănie uscată, Lactate, Carne & Pește, Fructe & Legume, Condimente festive și Băuturi pentru cumpărături rapide.",
      en: "Separated into supermarket sections: Dry goods, Dairy, Meat & Fish, Fresh produce, Holiday spices and Drinks to avoid zig-zagging aisles.",
      hu: "Logikus részlegekre bontva: Tartós élelmiszer, Tejtermékek, Hús & Hal, Zöldség-gyümölcs, Ünnepi fűszerek és Italok a gyors vásárláshoz.",
    },
    visualTheme: {
      containerClass: "bg-gradient-to-br from-[#FAF3EA] via-[#F4E9DA] to-[#EDE0CE] text-[#362516] border-2 border-[#C07044]/35 shadow-[0_8px_30px_rgba(192,112,68,0.15)]",
      headerAccentClass: "text-[#9E4A1E]",
      badgeClass: "bg-[#EAD0BE] text-[#7A3311] border border-[#C07044]/30",
      accentColor: "#C07044",
      styleType: 'cinnamon-apothecary',
    },
  },
  {
    id: "printable-menu",
    badge: {
      ro: "Gastronomie Regală",
      en: "Royal Gastronomy",
      hu: "Ünnepi Gasztronómia",
    },
    title: {
      ro: "Planificatorul Meniului Festiv",
      en: "Grand Holiday Feast Menu Planner",
      hu: "Ünnepi Karácsonyi Menütervező Sablon",
    },
    subtitle: {
      ro: "Template bistro vienez pentru aperitive, fel principal și desert",
      en: "Viennese bistro template for appetizers, mains, sides and sweets",
      hu: "Bécsi bistro stílusú sablon előételekhez, főfogásokhoz és desszertekhez",
    },
    category: {
      ro: "Bucătărie",
      en: "Dining",
      hu: "Vendéglátás",
    },
    pageCount: {
      ro: "1 pagină A4 • Meniu",
      en: "1 Page A4 • Menu",
      hu: "1 A4-es oldal • Menükártya",
    },
    description: {
      ro: "Cadru armonios cu colțuri filigranate pentru aperitive, fel principal, garnituri, desert și băuturi, plus orar de pregătire în avans.",
      en: "Harmonious layout with ornate flourishes for hors d'oeuvres, main roast, sides, desserts and drink pairing with a prep-ahead schedule.",
      hu: "Kifinomult filigrános keret előételekhez, ünnepi sültekhez, köretekhez, süteményekhez és borokhoz, előkészületi időbeosztással.",
    },
    visualTheme: {
      containerClass: "bg-[#FCFAF5] text-[#2C241B] border-4 border-double border-[#C49E52] shadow-[0_8px_30px_rgba(196,158,82,0.18)]",
      headerAccentClass: "text-[#8A6A24]",
      badgeClass: "bg-[#F5ECCE] text-[#694E13] border border-[#C49E52]/40",
      accentColor: "#C49E52",
      styleType: 'bistro-menu',
    },
  },
  {
    id: "printable-cards",
    badge: {
      ro: "Papetărie Nostalgică",
      en: "Vintage Stationery",
      hu: "Nosztalgikus Papíráru",
    },
    title: {
      ro: "Colecția de 4 Felicitări Elegante",
      en: "Set of 4 Bespoke Holiday Cards",
      hu: "4 Elegáns Karácsonyi Képeslap Kollekció",
    },
    subtitle: {
      ro: "Format A4/A5 pliant cu timbru retro și sigiliu de ceară",
      en: "Foldable A4/A5 with vintage postal stamps and wax seal imprint",
      hu: "Hajtható A4/A5 formátum retró postabélyeggel és viaszpecséttel",
    },
    category: {
      ro: "Papetărie",
      en: "Stationery",
      hu: "Papíráru",
    },
    pageCount: {
      ro: "4 modele • Carton",
      en: "4 Designs • Cardstock",
      hu: "4 modell • Kartonra kész",
    },
    description: {
      ro: "Modele grafice create în armonie cu identitatea Christmas Reset, cu bordură poștală și urări calde gata de completat cu stiloul.",
      en: "Four timeless botanical cards with postal border trim, ready to be printed on thick paper and inscribed with personal warm wishes.",
      hu: "Klasszikus botanikai és postai szegélyű sablonok meleg ünnepi üzenetekkel, amelyeket töltőtollal személyre szabhatsz.",
    },
    visualTheme: {
      containerClass: "bg-[#FBF8F2] text-[#29221C] border-2 border-[#B93845] shadow-[0_8px_30px_rgba(185,56,69,0.16)] relative overflow-hidden",
      headerAccentClass: "text-[#A82835]",
      badgeClass: "bg-[#F7DEE1] text-[#911B28] border border-[#B93845]/30",
      accentColor: "#B93845",
      styleType: 'vintage-airmail',
    },
  },
  {
    id: "printable-family-game",
    badge: {
      ro: "Veselie & Familie",
      en: "Joy & Family",
      hu: "Családi Vidámság",
    },
    title: {
      ro: "Pachetul de Jocuri Festive de Familie",
      en: "Holiday Family Games & Trivia Cards",
      hu: "Ünnepi Családi Játékcsomag & Kvízkártyák",
    },
    subtitle: {
      ro: "30 cartonașe decupabile cu întrebări comice & ghicitori",
      en: "30 cut-out conversation cards, funny family trivia and winter riddles",
      hu: "30 kivágható kártya vicces családi kérdésekkel és téli fejtörőkkel",
    },
    category: {
      ro: "Jocuri",
      en: "Games",
      hu: "Játékok",
    },
    pageCount: {
      ro: "3 pagini A4 • 30 Cartonașe",
      en: "3 Pages A4 • 30 Cards",
      hu: "3 A4-es oldal • 30 Kártya",
    },
    description: {
      ro: "Cartonașe decupabile cu întrebări 'Cine din familie...', Trivia de Crăciun și ghicitori pentru seri calde fără ecrane.",
      en: "Printable and cuttable card decks featuring 'Who in the family...', Christmas trivia, and cozy storytelling prompts for screen-free evenings.",
      hu: "Kivágható kártyák 'Ki a családból az, aki...', ünnepi kvízek és mesélős kérdések a képernyőmentes, meghitt estékhez.",
    },
    visualTheme: {
      containerClass: "bg-gradient-to-br from-[#A81C30] via-[#C92A41] to-[#8C1425] text-white border-2 border-white/60 shadow-[0_8px_30px_rgba(168,28,48,0.3)]",
      headerAccentClass: "text-[#FFE6EA]",
      badgeClass: "bg-white/20 text-white border border-white/40",
      accentColor: "#FFD1D8",
      styleType: 'candy-game',
    },
  },
  {
    id: "printable-movie-kit",
    badge: {
      ro: "Cinema & Pături",
      en: "Cinema & Blankets",
      hu: "Mozi & Takarók",
    },
    title: {
      ro: "Kitul Serii de Filme de Crăciun",
      en: "Christmas Movie Night & Snack Kit",
      hu: "Karácsonyi Mozieste & Csemege Csomag",
    },
    subtitle: {
      ro: "Top 12 filme clasice, rețete de popcorn caramelizat & bilete retro",
      en: "Top 12 classic holiday movies, caramel popcorn recipes & vintage ticket stubs",
      hu: "Top 12 klasszikus téli film, karamellás popcorn receptek & retró jegyek",
    },
    category: {
      ro: "Experiențe",
      en: "Experiences",
      hu: "Élmények",
    },
    pageCount: {
      ro: "1 pagină A4 • Bilete & Ghid",
      en: "1 Page A4 • Tickets & Guide",
      hu: "1 A4-es oldal • Jegyek & Menü",
    },
    description: {
      ro: "Checklist de bifat capodoperele de iarnă văzute, bilete de cinema decupabile pentru copii și rețeta secretă de ciocolată vieneză densă.",
      en: "Interactive holiday movie bucket list, cut-out golden cinema tickets for the kids, and secret recipes for thick spiced cocoa.",
      hu: "Kipipálható ünnepi filmlista, kivágható aranyozott mozijegyek a gyerekeknek és sűrű bécsi fűszeres forró csokoládé recept.",
    },
    visualTheme: {
      containerClass: "bg-gradient-to-br from-[#0C1626] via-[#14233D] to-[#080E1A] text-white border-2 border-[#E5B869]/50 shadow-[0_8px_30px_rgba(12,22,38,0.35)]",
      headerAccentClass: "text-[#F7D89C]",
      badgeClass: "bg-[#E5B869]/20 text-[#F7D89C] border border-[#E5B869]/40",
      accentColor: "#E5B869",
      styleType: 'midnight-cinema',
    },
  },
  {
    id: "printable-morning",
    badge: {
      ro: "Liniște & Ritual",
      en: "Peace & Ritual",
      hu: "Béke & Rituálé",
    },
    title: {
      ro: "Planul Dimineții Lente de Crăciun",
      en: "Slow Christmas Morning Blueprint",
      hu: "A Lassú Karácsonyi Reggel Forgatókönyve",
    },
    subtitle: {
      ro: "Cronologia liniștită 8:00–12:00 savurată fără grabă și fără haos",
      en: "Peaceful 8:00 AM–12:00 PM timeline savored slowly with no morning rush",
      hu: "Nyugodt időrend 8:00 és 12:00 között kapkodás és reggeli káosz nélkül",
    },
    category: {
      ro: "Ritualuri",
      en: "Rituals",
      hu: "Rituálék",
    },
    pageCount: {
      ro: "1 pagină A4 • Cronologie",
      en: "1 Page A4 • Timeline",
      hu: "1 A4-es oldal • Időrend",
    },
    description: {
      ro: "Ghidul pas cu pas pentru o dimineață de 25 Decembrie savurată fără grabă, cu miros de cafea proaspătă, cozonac cald și colinde lente.",
      en: "Step-by-step hygge morning blueprint for December 25th: fresh coffee rituals, relaxed gift unwrapping, and cozy acoustic carols.",
      hu: "Gyakorlati útmutató december 25-e reggelének meghitt megéléséhez: friss kávéillat, ráérős ajándékbontás és meleg kalács halk zenével.",
    },
    visualTheme: {
      containerClass: "bg-gradient-to-br from-[#F5EFE6] via-[#ECE3D5] to-[#DFD5C4] text-[#2D2821] border-2 border-[#547363]/30 shadow-[0_8px_30px_rgba(84,115,99,0.15)]",
      headerAccentClass: "text-[#395A4A]",
      badgeClass: "bg-[#D8E6DE] text-[#294B3B] border border-[#547363]/30",
      accentColor: "#547363",
      styleType: 'hygge-cashmere',
    },
  },
  {
    id: "printable-final-check",
    badge: {
      ro: "Salvare & Liniște",
      en: "Rescue & Serenity",
      hu: "Biztonság & Megnyugvás",
    },
    title: {
      ro: "Checklistul Salvator: „Oare am uitat ceva?”",
      en: "The Savior Checklist: “Did I Forget Anything?”",
      hu: "A Megmentő Lista: „Vajon elfelejtettem valamit?”",
    },
    subtitle: {
      ro: "Verificarea finală calmă în 10 puncte esențiale înainte de Ajun",
      en: "Calm 10-point emergency audit before Christmas Eve night",
      hu: "Nyugodt 10 pontos záró ellenőrzés szenteste előtt a teljes békéért",
    },
    category: {
      ro: "Organizare",
      en: "Emergency",
      hu: "Szervezés",
    },
    pageCount: {
      ro: "1 pagină A4 • 10 Puncte",
      en: "1 Page A4 • 10 Points",
      hu: "1 A4-es oldal • 10 Pont",
    },
    description: {
      ro: "Cele 10 detalii esențiale care asigură liniștea deplină în noaptea de 24 Decembrie (baterii jucării, foarfece, chibrituri, ținute gata calcate).",
      en: "The 10 easily forgotten essentials that save Christmas Eve (toy batteries, extra scissors, matches, ironed clothes, charged cameras).",
      hu: "A 10 leggyakrabban elfelejtett apróság, amely megmenti a szentestét (elemek a játékokba, olló, gyufa, vasalt ruhák, feltöltött gépek).",
    },
    visualTheme: {
      containerClass: "bg-gradient-to-br from-[#4A0E17] via-[#631420] to-[#360810] text-white border-2 border-[#E5A93C] shadow-[0_8px_30px_rgba(99,20,32,0.3)]",
      headerAccentClass: "text-[#FCD385]",
      badgeClass: "bg-[#E5A93C]/25 text-[#FCD385] border border-[#E5A93C]/40",
      accentColor: "#E5A93C",
      styleType: 'heraldic-shield',
    },
  },
];
