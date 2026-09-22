import React, { useState } from 'react';
import { Download, Printer, ArrowLeft, Check, Sparkles, FileText, Eye, X } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { getTranslations } from '../data/translations';
import { trackEvent } from '../utils/analytics';

interface PrintableItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  pageCount: string;
  description: string;
}

const PRINTABLE_ITEMS_RO: PrintableItem[] = [
  {
    id: "printable-budget",
    title: "Fișa de Buget de Crăciun 2026",
    subtitle: "Planificator pe categorii & cheltuieli reale",
    category: "Finanțe",
    pageCount: "1 pagină A4",
    description: "Tabel complet pentru stabilirea bugetului total, repartizarea pe cadouri, masă, decor și rezervă, plus coloană pentru cheltuieli efective.",
  },
  {
    id: "printable-gifts",
    title: "Planificatorul de Cadouri & Împachetare",
    subtitle: "Listă cu destinatari, idei, bugete și status",
    category: "Cadouri",
    pageCount: "2 pagini A4",
    description: "Secțiuni organizate pe cercuri de apropiați, căsuțe de bifat 'Cumpărat' și 'Împachetat', plus spațiu pentru idei de felicitări.",
  },
  {
    id: "printable-grocery",
    title: "Lista Inteligentă de Cumpărături",
    subtitle: "Organizare pe raioane & cămară",
    category: "Bucătărie",
    pageCount: "1 pagină A4",
    description: "Împărțită pe categorii logice: Băcănie, Lactate, Carne & Pește, Fructe & Legume, Condimente festive și Băuturi pentru un drum eficient la magazin.",
  },
  {
    id: "printable-menu",
    title: "Planificatorul Meniului Festiv",
    subtitle: "Template elegant pentru meniul de Crăciun",
    category: "Bucătărie",
    pageCount: "1 pagină A4",
    description: "Cadru armonios pentru aperitive, fel principal, garnituri, desert și băuturi, plus orar de pregătire în avans.",
  },
  {
    id: "printable-cards",
    title: "Colecția de 4 Felicitări Elegante",
    subtitle: "Format A5/A4 pliant gata de printat pe carton",
    category: "Papetărie",
    pageCount: "4 modele",
    description: "Modele grafice create în armonie cu identitatea Christmas Reset, cu urări calde în limba română gata de completat cu stiloul.",
  },
  {
    id: "printable-family-game",
    title: "Pachetul de Jocuri Festive de Familie",
    subtitle: "Cartonașe decupabile cu întrebări & Trivia",
    category: "Jocuri",
    pageCount: "3 pagini A4",
    description: "30 de cartonașe cu întrebări amuzante 'Cine din familie...', Trivia de Crăciun și ghicitori pentru seri pline de veselie.",
  },
  {
    id: "printable-movie-kit",
    title: "Kitul Serii de Filme de Crăciun",
    subtitle: "Top 12 recomandări, rețete & bilete festive",
    category: "Experiențe",
    pageCount: "1 pagină A4",
    description: "Checklist de bifat filmele clasice și moderne văzute, plus rețeta secretă de popcorn caramelizat și ciocolată vieneză.",
  },
  {
    id: "printable-morning",
    title: "Planul Dimineții Lente de Crăciun",
    subtitle: "Cronologia liniștită 8:00–12:00",
    category: "Ritualuri",
    pageCount: "1 pagină A4",
    description: "Ghidul pas cu pas pentru o dimineață de 25 Decembrie savurată fără grabă, cu miros de cafea proaspătă și colinde.",
  },
  {
    id: "printable-final-check",
    title: "Checklistul Salvator: „Oare am uitat ceva?”",
    subtitle: "Verificarea finală calmă în 10 puncte înainte de Ajun",
    category: "Organizare",
    pageCount: "1 pagină A4",
    description: "Cele 10 detalii esențiale care asigură liniștea deplină în noaptea de 24 Decembrie (baterii, scotch, lumânări, ținute gata).",
  },
];

const PRINTABLE_ITEMS_HU: PrintableItem[] = [
  {
    id: "printable-budget",
    title: "Karácsonyi Költségvetési Tervezőlap 2026",
    subtitle: "Kategóriák szerinti felosztás & valós kiadások",
    category: "Pénzügyek",
    pageCount: "1 A4-es oldal",
    description: "Átlátható táblázat a teljes keret rögzítéséhez, az ajándékokra, ünnepi asztalra, dekorációra és tartalékra szánt összegek beosztásával.",
  },
  {
    id: "printable-gifts",
    title: "Ajándéktervező & Csomagolási Lista",
    subtitle: "Címzettek, ötletek, költségkeretek és állapot",
    category: "Ajándékok",
    pageCount: "2 A4-es oldal",
    description: "Rendszerezett szekciók közeli családtagoknak, barátoknak és kollégáknak, 'Megvéve' és 'Csomagolva' pipálható mezőkkel.",
  },
  {
    id: "printable-grocery",
    title: "Okos Ünnepi Bevásárlólista",
    subtitle: "Részlegek és kamra szerinti bontásban",
    category: "Konyha",
    pageCount: "1 A4-es oldal",
    description: "Logikus kategóriákra bontva: Tartós élelmiszer, Tejtermék, Hús & Hal, Zöldség & Gyümölcs, Ünnepi fűszerek és Italok a gyors boltjáráshoz.",
  },
  {
    id: "printable-menu",
    title: "Ünnepi Menütervező Sablon",
    subtitle: "Elegáns sablon a karácsonyi fogásokhoz",
    category: "Konyha",
    pageCount: "1 A4-es oldal",
    description: "Átlátható szerkezet előételekhez, főételekhez, köretekhez, süteményekhez és italokhoz, előkészítési időrenddel.",
  },
  {
    id: "printable-cards",
    title: "4 Elegáns Karácsonyi Képeslap",
    subtitle: "Félbehajtható A4/A5 formátum nyomtatásra készen",
    category: "Papíráru",
    pageCount: "4 modell",
    description: "Kifinomult grafikai sablonok meleg magyar nyelvű üzenetekkel, amelyeket tollal személyre szabhatsz.",
  },
  {
    id: "printable-family-game",
    title: "Ünnepi Családi Játékcsomag",
    subtitle: "Kivágható kártyák kérdésekkel és kvízzel",
    category: "Játékok",
    pageCount: "3 A4-es oldal",
    description: "30 vicces és szívmelengető kérdéskártya 'Ki a családból az, aki...', ünnepi fejtörők és generációkat összekötő feladványok.",
  },
  {
    id: "printable-movie-kit",
    title: "Karácsonyi Mozieste Csomag",
    subtitle: "Top 12 téli film, receptek és retró mozijegyek",
    category: "Élmények",
    pageCount: "1 A4-es oldal",
    description: "Klasszikus és modern filmek ellenőrzőlistája, házi pirított karamellás popcorn és bécsi forró csokoládé receptjével.",
  },
  {
    id: "printable-morning",
    title: "A Lassú Karácsonyi Reggel Tervezője",
    subtitle: "Nyugodt időrend 8:00 és 12:00 között",
    category: "Rituálék",
    pageCount: "1 A4-es oldal",
    description: "Gyakorlati útmutató december 25-e reggelének meghitt, kapkodásmentes megéléséhez, friss kávéillattal és halk zenével.",
  },
  {
    id: "printable-final-check",
    title: "A Megmentő Lista: „Vajon elfelejtettem valamit?”",
    subtitle: "Nyugodt 10 pontos záró ellenőrzés szenteste előtt",
    category: "Szervezés",
    pageCount: "1 A4-es oldal",
    description: "A 10 leggyakrabban elfelejtett apróság, amely megmenti a szentestét (tartalék elemek, cellux, mécsesek, vasalt ruhák).",
  },
];

function getPrintableItems(language: SupportedLanguage): PrintableItem[] {
  if (language === 'hu') {
    return PRINTABLE_ITEMS_HU;
  }
  return PRINTABLE_ITEMS_RO;
}

interface PrintableResourcesViewProps {
  language: SupportedLanguage;
  onBackToHome: () => void;
  selectedResourceId?: string | null;
}

export const PrintableResourcesView: React.FC<PrintableResourcesViewProps> = ({
  language,
  onBackToHome,
  selectedResourceId,
}) => {
  const t = getTranslations(language);
  const items = getPrintableItems(language);
  const [activeItem, setActiveItem] = useState<PrintableItem | null>(() => {
    if (selectedResourceId) {
      return items.find((item) => item.id === selectedResourceId) || null;
    }
    return null;
  });

  const handlePrint = (item: PrintableItem) => {
    trackEvent('download_resource', { resourceId: item.id, title: item.title });
    setActiveItem(item);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8 no-print">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#7E7468] hover:text-[#621927] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.nav.backToHome}</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-[#E6EFEA] text-[#2E5844] border border-[#2E5844]/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'hu' ? "A4-es nyomtatásra vagy PDF mentésre készítve" : "Formatate pentru print A4 sau salvare PDF"}</span>
        </div>
      </div>

      <div className="text-center max-w-3xl mx-auto mb-12 no-print">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#2C0B12] mb-3">
          {language === 'hu' ? "Nyomtatható Segédanyagok & Tervezőlapok" : "Ghiduri & Planificatoare Imprimabile"}
        </h1>
        <p className="text-base text-[#6B645B]">
          {language === 'hu'
            ? "Minden segédanyag elegáns és letisztult formában készült a Christmas Reset stílusában. Kinyomtathatod papírra, vagy elmentheted a készülékedre."
            : "Fiecare fișă este creată minimalist și elegant, în armonie cu identitatea Christmas Reset. Le poți imprima pe hârtie sau le poți salva pe telefon."}
        </p>
      </div>

      {/* Grid of Printable Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 no-print">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 border border-[#EAE3D5] hover:border-[#C29B48] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#7E2232] border border-[#EAE3D5]">
                  {item.category}
                </span>
                <span className="text-xs text-[#7E7468] font-medium">
                  {item.pageCount}
                </span>
              </div>

              <h3 className="font-serif text-lg font-semibold text-[#2C0B12] mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-[#C29B48] font-medium mb-3">
                {item.subtitle}
              </p>

              <p className="text-xs text-[#5E574D] leading-relaxed mb-6">
                {item.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#F1E9DB] flex items-center gap-2.5">
              <button
                onClick={() => setActiveItem(item)}
                className="flex-1 bg-[#FAF7F2] hover:bg-[#F1E9DB] text-[#2C0B12] py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#7E7468]" />
                <span>{language === 'hu' ? "Előnézet" : "Previzualizează"}</span>
              </button>
              <button
                onClick={() => handlePrint(item)}
                className="bg-[#2E5844] hover:bg-[#172F24] text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{language === 'hu' ? "Nyomtatás" : "Tipărește"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Printable Sheet Modal Preview */}
      {activeItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D5] no-print">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C29B48]">
                  {activeItem.category} • Format A4
                </span>
                <h3 className="font-serif text-2xl font-semibold text-[#2C0B12]">
                  {activeItem.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="p-1.5 text-[#7E7468] hover:text-[#2C0B12] rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Print-Ready Sheet Layout */}
            <div className="print-page border border-[#EAE3D5] rounded-xl p-6 sm:p-8 bg-[#FCFAF7] space-y-6 text-[#2D2A26]">
              {/* Sheet Header */}
              <div className="text-center pb-4 border-b border-[#C29B48]/40 space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#7E2232] font-bold">
                  Christmas Reset 2026 • Fișă de Lucru Personală
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C0B12]">
                  {activeItem.title}
                </h2>
                <p className="text-xs text-[#6B645B] italic">
                  {activeItem.subtitle}
                </p>
              </div>

              {/* Sample structured print table / checklist depending on item */}
              {activeItem.id === 'printable-budget' && (
                <div className="space-y-4 text-xs">
                  <div className="flex justify-between p-3 bg-white rounded-lg border border-[#EAE3D5]">
                    <span className="font-bold">Buget Total Maxim: ________________ Lei</span>
                    <span>Data: ____/12/2026</span>
                  </div>
                  <table className="w-full border-collapse border border-[#EAE3D5] text-left">
                    <thead>
                      <tr className="bg-[#FAF7F2]">
                        <th className="border border-[#EAE3D5] p-2">Categorie</th>
                        <th className="border border-[#EAE3D5] p-2">Buget Alocat</th>
                        <th className="border border-[#EAE3D5] p-2">Cheltuială Reală</th>
                        <th className="border border-[#EAE3D5] p-2">Diferență</th>
                      </tr>
                    </thead>
                    <tbody>
                      {['Cadouri Partener & Familie', 'Cadouri Prieteni & Colegi', 'Masa de Crăciun & Băcănie', 'Decorațiuni & Brad', 'Îmbrăcăminte & Îngrijire', 'Rezervă Urgențe'].map((cat, i) => (
                        <tr key={i}>
                          <td className="border border-[#EAE3D5] p-2 font-medium">{cat}</td>
                          <td className="border border-[#EAE3D5] p-2"></td>
                          <td className="border border-[#EAE3D5] p-2"></td>
                          <td className="border border-[#EAE3D5] p-2"></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeItem.id === 'printable-gifts' && (
                <div className="space-y-3 text-xs">
                  <table className="w-full border-collapse border border-[#EAE3D5] text-left">
                    <thead>
                      <tr className="bg-[#FAF7F2]">
                        <th className="border border-[#EAE3D5] p-2">Destinatar</th>
                        <th className="border border-[#EAE3D5] p-2">Idee Cadou</th>
                        <th className="border border-[#EAE3D5] p-2">Buget</th>
                        <th className="border border-[#EAE3D5] p-2 text-center">Cumpărat [✓]</th>
                        <th className="border border-[#EAE3D5] p-2 text-center">Împachetat [✓]</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 8 }).map((_, i) => (
                        <tr key={i} className="h-9">
                          <td className="border border-[#EAE3D5] p-2"></td>
                          <td className="border border-[#EAE3D5] p-2"></td>
                          <td className="border border-[#EAE3D5] p-2"></td>
                          <td className="border border-[#EAE3D5] p-2 text-center">[ ]</td>
                          <td className="border border-[#EAE3D5] p-2 text-center">[ ]</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeItem.id !== 'printable-budget' && activeItem.id !== 'printable-gifts' && (
                <div className="space-y-3 text-xs">
                  <p className="text-sm font-serif italic text-[#4A453E]">
                    Folosește această fișă pentru a păstra claritatea și armonia în casa ta în perioada sărbătorilor.
                  </p>
                  <div className="space-y-2 pt-2">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <div key={n} className="flex items-center gap-3 p-2 bg-white rounded border border-[#EAE3D5]">
                        <span className="w-4 h-4 border border-[#A8A096] rounded-xs inline-block" />
                        <span className="text-[#5E574D]">Element de bifat #{n}: ____________________________________________________</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sheet Footer */}
              <div className="pt-4 border-t border-[#EAE3D5] flex items-center justify-between text-[10px] text-[#7E7468]">
                <span>Christmas Reset 2026 • 24 de zile către un Crăciun mai calm</span>
                <span>www.christmasreset.com</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 no-print">
              <button
                onClick={() => setActiveItem(null)}
                className="px-4 py-2 rounded-xl border border-[#EAE3D5] text-xs font-semibold text-[#7E7468]"
              >
                {language === 'hu' ? "Bezárás" : "Închide"}
              </button>
              <button
                onClick={() => window.print()}
                className="bg-[#2E5844] hover:bg-[#172F24] text-white px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{language === 'hu' ? "Nyomtatás / PDF Mentés" : "Tipărește / Salvează PDF"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
