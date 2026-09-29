import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Printer,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Layers,
  Heart,
  Wand2,
  TreePine,
  Star,
  Flame,
  Bell,
  Cookie,
  Mail,
  HelpCircle,
  Eye,
  Sliders,
  ChevronRight,
  Send,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { SupportedLanguage } from '../types';
import { supabase } from '../lib/supabase';
import { printA4, type PrintOrientation } from '../utils/printA4';

export type CardTheme =
  | 'classic-burgundy'
  | 'evergreen-forest'
  | 'starry-midnight'
  | 'winter-silver'
  | 'gingerbread-warm'
  | 'vintage-airmail';

export type StampMotif = 'forest' | 'star' | 'fireplace' | 'reindeer' | 'bells' | 'gingerbread';

export interface ChristmasCardData {
  coverTitle: string;
  coverSubtitle: string;
  greeting: string;
  insideMessage: string;
  poem: string;
  signOff: string;
  theme: CardTheme;
  stamp: StampMotif;
  fontFamily: 'christmas' | 'quicksand';
}

interface ChristmasCardStudioProps {
  language: SupportedLanguage;
  onNavigateToCalendar?: () => void;
}

const THEME_CONFIGS: Record<
  CardTheme,
  {
    nameHu: string;
    nameRo: string;
    nameEn: string;
    bgCover: string;
    borderCover: string;
    textCover: string;
    accentGold: string;
    bgInside: string;
    borderInside: string;
    textInside: string;
    previewBadge: string;
  }
> = {
  'classic-burgundy': {
    nameHu: 'Bordó & Királyi Arany',
    nameRo: 'Burgundia & Aur Regal',
    nameEn: 'Burgundy & Royal Gold',
    bgCover: 'bg-gradient-to-br from-[#4a151b] via-[#380e14] to-[#25070a]',
    borderCover: 'border-[#ca8a04]',
    textCover: 'text-[#fff8f6]',
    accentGold: '#fde047',
    bgInside: 'bg-[#fffaf8]',
    borderInside: 'border-[#e8d5d5]',
    textInside: 'text-[#2e0208]',
    previewBadge: 'bg-[#4a151b] text-[#fde047]',
  },
  'evergreen-forest': {
    nameHu: 'Fenyőzöld & Rusztikus',
    nameRo: 'Verde Brad & Rustic',
    nameEn: 'Evergreen & Rustic',
    bgCover: 'bg-gradient-to-br from-[#19382b] via-[#12281e] to-[#0c1c15]',
    borderCover: 'border-[#d4af37]',
    textCover: 'text-[#f4faf6]',
    accentGold: '#fef08a',
    bgInside: 'bg-[#f7fbf8]',
    borderInside: 'border-[#cfe0d6]',
    textInside: 'text-[#0f291e]',
    previewBadge: 'bg-[#19382b] text-[#fef08a]',
  },
  'starry-midnight': {
    nameHu: 'Éjféli Csillagkék',
    nameRo: 'Albastru de Miezul Nopții',
    nameEn: 'Midnight Starry Blue',
    bgCover: 'bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0a0f1d]',
    borderCover: 'border-[#93c5fd]',
    textCover: 'text-[#f8fafc]',
    accentGold: '#93c5fd',
    bgInside: 'bg-[#f8fafc]',
    borderInside: 'border-[#cbd5e1]',
    textInside: 'text-[#0f172a]',
    previewBadge: 'bg-[#0f172a] text-[#93c5fd]',
  },
  'winter-silver': {
    nameHu: 'Téli Hóezüst',
    nameRo: 'Argintiu de Iarnă',
    nameEn: 'Winter Silver Frost',
    bgCover: 'bg-gradient-to-br from-[#334155] via-[#475569] to-[#1e293b]',
    borderCover: 'border-[#e2e8f0]',
    textCover: 'text-[#f8fafc]',
    accentGold: '#e2e8f0',
    bgInside: 'bg-[#f8fafc]',
    borderInside: 'border-[#e2e8f0]',
    textInside: 'text-[#1e293b]',
    previewBadge: 'bg-[#475569] text-[#e2e8f0]',
  },
  'gingerbread-warm': {
    nameHu: 'Mézeskalács & Fahéj',
    nameRo: 'Turtă Dulce & Scorțișoară',
    nameEn: 'Gingerbread & Cinnamon',
    bgCover: 'bg-gradient-to-br from-[#542d14] via-[#3d1f0c] to-[#2b1406]',
    borderCover: 'border-[#f59e0b]',
    textCover: 'text-[#fffbeb]',
    accentGold: '#fde68a',
    bgInside: 'bg-[#fffdf7]',
    borderInside: 'border-[#fcd34d]',
    textInside: 'text-[#451a03]',
    previewBadge: 'bg-[#542d14] text-[#fde68a]',
  },
  'vintage-airmail': {
    nameHu: 'Klasszikus Téli Posta',
    nameRo: 'Poștă Tradițională',
    nameEn: 'Vintage Holiday Airmail',
    bgCover: 'bg-gradient-to-br from-[#f8f4eb] via-[#efe9dc] to-[#e5ddcd]',
    borderCover: 'border-[#b91c1c]',
    textCover: 'text-[#1e1b1a]',
    accentGold: '#b91c1c',
    bgInside: 'bg-[#faf7f0]',
    borderInside: 'border-[#e5ddcd]',
    textInside: 'text-[#2e0208]',
    previewBadge: 'bg-[#b91c1c] text-white',
  },
};

export const ChristmasCardStudio: React.FC<ChristmasCardStudioProps> = ({
  language,
  onNavigateToCalendar,
}) => {
  // AI Generator state
  const [recipient, setRecipient] = useState('');
  const [tone, setTone] = useState<string>('meghitt');
  const [customDetails, setCustomDetails] = useState('');
  const [sender, setSender] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewTab, setPreviewTab] = useState<'cover' | 'inside' | 'back' | 'print-sheet'>('cover');
  const [printPageSide, setPrintPageSide] = useState<'outer' | 'inner'>('outer');
  const [printOrientation, setPrintOrientation] = useState<PrintOrientation>('landscape');
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);
  const [generationNotice, setGenerationNotice] = useState<string | null>(null);

  // Card Content State
  const [card, setCard] = useState<ChristmasCardData>(() => {
    if (language === 'hu') {
      return {
        coverTitle: 'Békés, Boldog Karácsonyt!',
        coverSubtitle: 'Meghitt ünnepi pillanatokat és csendes békét kívánunk • 2026',
        greeting: 'Drága Nagymama és Nagypapa!',
        insideMessage:
          'Kívánjuk, hogy az idei karácsony hozzon számotokra megnyugvást, jó egészséget és sok örömteli percet. Köszönjük a szeretetet, a gondoskodást és a finom ünnepi ételeket, amikkel mindig megédesítitek az együtt töltött napokat.',
        poem: 'Hófehér csillag ragyog az égen,\nKandalló fénye táncol a széken.\nSzeretet melege töltse be házad,\nBékés, szép ünnepet kíván a családod.',
        signOff: 'Szívből jövő öleléssel:\nEszter és Dani',
        theme: 'classic-burgundy',
        stamp: 'star',
        fontFamily: 'christmas',
      };
    } else if (language === 'ro') {
      return {
        coverTitle: 'Crăciun Fericit și Luminos!',
        coverSubtitle: 'Pace, sănătate și clipe de neuitat alături de cei dragi • 2026',
        greeting: 'Dragă Bunică și Bunicule!',
        insideMessage:
          'Fie ca această sărbătoare sfântă să vă aducă în suflet liniște, armonie și bucurie curată. Vă mulțumim din toată inima pentru dragostea voastră nemărginită și căldura cu care ne primiți mereu acasă.',
        poem: 'Clinchet lin de clopoței,\nStele ninse peste văi,\nÎn cămin căldură vie,\nPace și multă bucurie.',
        signOff: 'Cu toată dragostea și recunoștința,\nElena și Andrei',
        theme: 'classic-burgundy',
        stamp: 'star',
        fontFamily: 'christmas',
      };
    } else {
      return {
        coverTitle: 'Merry Christmas & Peaceful Holidays',
        coverSubtitle: 'Warm wishes, cozy evenings, and bright blessings • 2026',
        greeting: 'Dearest Grandparents,',
        insideMessage:
          'May the quiet warmth of this holiday season fill your hearts with peace, happiness, and cherished moments. Thank you for all your guidance, delicious traditions, and endless love.',
        poem: 'Gentle snowflakes fall from above,\nHearts grow warmer, filled with love.\nCandles glow with tender light,\nBlessing this peaceful Christmas night.',
        signOff: 'With all our heartfelt love,\nSarah and Michael',
        theme: 'classic-burgundy',
        stamp: 'star',
        fontFamily: 'christmas',
      };
    }
  });

  // Check Gemini API status on mount
  useEffect(() => {
    fetch('/api/gemini/status')
      .then((res) => res.json())
      .then((data) => {
        setHasApiKey(Boolean(data.hasKey));
      })
      .catch(() => {
        setHasApiKey(false);
      });
  }, []);

  // Quick Preset Handlers
  const applyPreset = (presetType: 'grandparents' | 'parents' | 'partner' | 'friend' | 'colleague') => {
    if (language === 'hu') {
      if (presetType === 'grandparents') {
        setRecipient('Nagymama és Nagypapa');
        setTone('meghitt');
        setCustomDetails('Köszönjük a sok finom bejglit és a végtelen szeretetet.');
      } else if (presetType === 'parents') {
        setRecipient('Drága Anya és Apa');
        setTone('meghitt');
        setCustomDetails('Köszönjük a biztonságot, az otthon melegét és az önzetlen támogatást.');
      } else if (presetType === 'partner') {
        setRecipient('Szerelmemnek');
        setTone('verses');
        setCustomDetails('A közös forró csokizásokért, a karácsonyfa díszítésért és hogy veled kerek a világ.');
      } else if (presetType === 'friend') {
        setRecipient('Legjobb Barátomnak');
        setTone('vidam');
        setCustomDetails('A sok nevetésért, a havas kirándulásokért és a barátságodért.');
      } else {
        setRecipient('Kedves Munkatársaim');
        setTone('elegans');
        setCustomDetails('Köszönöm az egész éves sikeres közös munkát, pihentető ünnepeket kívánok.');
      }
    } else if (language === 'ro') {
      if (presetType === 'grandparents') {
        setRecipient('Bunicii Mei Dragi');
        setTone('meghitt');
        setCustomDetails('Vă mulțumim pentru cozonacul delicios și îmbrățișările calde.');
      } else if (presetType === 'parents') {
        setRecipient('Iubiții Mei Părinți');
        setTone('meghitt');
        setCustomDetails('Vă mulțumesc pentru căldura căminului și sprijinul necondiționat.');
      } else {
        setRecipient('Prietenului Meu Drag');
        setTone('vidam');
        setCustomDetails('Pentru toate momentele frumoase și râsetele împărtășite anul acesta.');
      }
    } else {
      if (presetType === 'grandparents') {
        setRecipient('Dearest Grandparents');
        setTone('meghitt');
        setCustomDetails('Thank you for the warm holiday traditions and endless love.');
      } else {
        setRecipient('My Dear Friend');
        setTone('vidam');
        setCustomDetails('For all the laughter, snowy strolls, and wonderful memories.');
      }
    }
  };

  // Trigger Gemini AI Card Generation
  const handleGenerateAiCard = async () => {
    setIsGenerating(true);
    setGenerationNotice(null);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const res = await fetch('/api/generate-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(sessionData.session?.access_token ? { Authorization: `Bearer ${sessionData.session.access_token}` } : {}),
        },
        body: JSON.stringify({
          recipient,
          tone,
          customDetails,
          sender,
          language,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setGenerationNotice(data.message || (language === 'hu' ? 'A funkció használatához Premium fiók szükséges.' : 'A Premium account is required to use this feature.'));
        return;
      }

      if (data.card) {
        setCard((prev) => ({
          ...prev,
          coverTitle: data.card.coverTitle || prev.coverTitle,
          coverSubtitle: data.card.coverSubtitle || prev.coverSubtitle,
          greeting: data.card.greeting || prev.greeting,
          insideMessage: data.card.insideMessage || prev.insideMessage,
          poem: data.card.poem || prev.poem,
          signOff: data.card.signOff || prev.signOff,
          theme: (data.card.suggestedTheme as CardTheme) || prev.theme,
          stamp: (data.card.suggestedStamp as StampMotif) || prev.stamp,
        }));

        if (data.noKey) {
          setGenerationNotice(
            language === 'hu'
              ? 'Megjegyzés: A Gemini API kulcs a Beállítások menüben adható meg. Addig is egy gazdagon összeállított ünnepi sablont alkalmaztunk, amit szabadon módosíthatsz!'
              : 'Notice: You can configure your Gemini API key in Settings > Secrets for customized dynamic AI generation. A premium tailored card was loaded!'
          );
        } else {
          // Trigger joyful confetti
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#ba1a2c', '#fde047', '#4c6359', '#ffffff'],
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Print Card
  const handlePrint = () => {
    // Switch to print view for clean output
    setPreviewTab('print-sheet');
    setTimeout(() => {
      printA4(printOrientation);
    }, 200);
  };

  // Copy card text to clipboard
  const handleCopyText = () => {
    const fullText = `${card.greeting}\n\n${card.poem}\n\n${card.insideMessage}\n\n${card.signOff}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const currentTheme = THEME_CONFIGS[card.theme];

  // Render Festive Stamp Icon
  const renderStampIcon = (motif: StampMotif, className = 'w-7 h-7') => {
    switch (motif) {
      case 'forest':
        return <TreePine className={className} />;
      case 'star':
        return <Star className={className} />;
      case 'fireplace':
        return <Flame className={className} />;
      case 'bells':
        return <Bell className={className} />;
      case 'gingerbread':
        return <Cookie className={className} />;
      case 'reindeer':
      default:
        return <Heart className={className} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f6] text-[#1e1b1a] pb-24">
      {/* Printable Area - Controlled strictly via CSS @media print */}
      <div id="print-container" className="print-target hidden print:block w-full h-full p-0 m-0">
        {printPageSide === 'outer' ? (
          /* Outer Spread: Left is Back Cover, Right is Front Cover */
          <div className="card-print-spread w-[297mm] h-[210mm] max-w-full flex items-stretch border border-dashed border-gray-300 relative bg-white page-break-after">
            {/* Left: Back Cover (Hátlap) */}
            <div className={`w-1/2 p-12 flex flex-col justify-between items-center text-center ${currentTheme.bgCover} ${currentTheme.textCover} border-r-2 border-dashed border-[#ca8a04]/40`}>
              <div className="pt-8">
                <span className="text-xs uppercase tracking-widest text-[#ca8a04]">Christmas Reset 2026</span>
                <p className="text-xs opacity-70 mt-1">Metoda ritmică pentru un decembrie liniștit</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border border-[#ca8a04]/40 flex items-center justify-center mb-3">
                  {renderStampIcon(card.stamp, 'w-8 h-8 text-[#ca8a04]')}
                </div>
                <p className={`text-lg font-bold ${card.fontFamily === 'christmas' ? 'font-christmas' : 'font-sans'}`}>
                  {card.coverTitle}
                </p>
              </div>
              <div className="pb-4 text-[11px] opacity-60">
                Kézzel hajtogatott és szeretettel készített egyedi képeslap • 2026
              </div>
            </div>

            {/* Right: Front Cover (Előlap) */}
            <div className={`w-1/2 p-12 flex flex-col justify-between items-center text-center ${currentTheme.bgCover} ${currentTheme.textCover} relative overflow-hidden`}>
              {/* Gold Filigree Corner Borders */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#ca8a04]/60 pointer-events-none" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#ca8a04]/60 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#ca8a04]/60 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#ca8a04]/60 pointer-events-none" />

              <div className="pt-6">
                <span className="text-xs uppercase tracking-widest text-[#ca8a04] font-semibold">
                  ÜNNEPI ÜDVÖZLET • 2026
                </span>
              </div>

              <div className="my-auto flex flex-col items-center max-w-sm">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-[#ca8a04]/40 mb-6 text-[#fde047]">
                  {renderStampIcon(card.stamp, 'w-12 h-12')}
                </div>
                <h1 className={`text-4xl font-bold tracking-tight mb-4 ${card.fontFamily === 'christmas' ? 'font-christmas text-5xl' : 'font-sans'}`}>
                  {card.coverTitle}
                </h1>
                <p className="text-sm opacity-90 leading-relaxed font-medium">
                  {card.coverSubtitle}
                </p>
              </div>

              <div className="pb-4 text-xs tracking-wider opacity-70">
                ★ BÉKE • SZERETET • MEGHITTSÉG ★
              </div>
            </div>
          </div>
        ) : (
          /* Inner Spread: Left is Inside Poem, Right is Inside Message */
          <div className="card-print-spread w-[297mm] h-[210mm] max-w-full flex items-stretch border border-dashed border-gray-300 relative bg-[#fffaf8] page-break-after">
            {/* Left: Poem Spread */}
            <div className={`w-1/2 p-14 flex flex-col justify-center items-center text-center border-r-2 border-dashed border-[#ca8a04]/30 ${currentTheme.textInside}`}>
              <div className="w-10 h-10 rounded-full border border-[#ca8a04]/40 flex items-center justify-center mb-6 text-[#ca8a04]">
                {renderStampIcon(card.stamp, 'w-5 h-5')}
              </div>
              <div className="italic whitespace-pre-line text-lg leading-relaxed max-w-xs font-serif opacity-90">
                "{card.poem}"
              </div>
            </div>

            {/* Right: Heartfelt Message & Sign-off */}
            <div className={`w-1/2 p-14 flex flex-col justify-between text-left ${currentTheme.textInside}`}>
              <div>
                <h2 className={`text-2xl font-bold mb-6 text-[#4a151b] ${card.fontFamily === 'christmas' ? 'font-christmas text-3xl' : ''}`}>
                  {card.greeting}
                </h2>
                <p className="text-base leading-relaxed whitespace-pre-line text-[#332527]">
                  {card.insideMessage}
                </p>
              </div>
              <div className="pt-8 text-right">
                <p className="text-sm italic text-[#534343] whitespace-pre-line font-medium">
                  {card.signOff}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Screen Interface */}
      <div className="no-print max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#534343] mb-2">
            <button
              onClick={onNavigateToCalendar}
              className="hover:text-[#4a151b] font-medium transition-colors cursor-pointer"
            >
              Christmas Reset 2026
            </button>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-[#4a151b] font-bold">
              {language === 'hu'
                ? 'Karácsonyi Képeslap Műhely'
                : language === 'ro'
                ? 'Atelier de Felicitări de Crăciun'
                : 'Christmas Card Studio'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eee7e4] pb-6">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2e0208]">
                  {language === 'hu'
                    ? 'Karácsonyi Képeslap Készítő'
                    : language === 'ro'
                    ? 'Creator de Felicitări de Crăciun'
                    : 'Christmas Card Creator'}
                </h1>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#ffdad6] text-[#4a151b] border border-[#ffb3b6] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI & Nyomtatás
                </span>
              </div>
              <p className="text-sm sm:text-base text-[#534343] mt-1.5 max-w-2xl">
                {language === 'hu'
                  ? 'Készíts személyre szabott, szívhez szóló karácsonyi üdvözlőlapot a Google Gemini AI segítségével vagy saját kezeddel, és nyomtasd ki azonnal összehajtható formátumban!'
                  : language === 'ro'
                  ? 'Creează o felicitare de Crăciun caldă și personalizată cu ajutorul Google Gemini AI sau configureaz-o manual, apoi printeaz-o pliată în format A4/A5!'
                  : 'Craft warm, heartfelt, personalized Christmas greeting cards with Google Gemini AI or tailor them by hand, then print them ready to fold!'}
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={handleCopyText}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#f4ecea] hover:bg-[#eee7e4] text-[#2e0208] text-xs font-bold border border-[#eee7e4] transition-all cursor-pointer shadow-xs"
                title="Szöveg másolása a vágólapra"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#534343]" />}
                <span>{copied ? (language === 'hu' ? 'Másolva!' : 'Copied!') : (language === 'hu' ? 'Szöveg másolása' : 'Copy Text')}</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#4a151b] hover:bg-[#2e0208] text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-[#4a151b]/20"
              >
                <Printer className="w-4 h-4" />
                <span>{language === 'hu' ? 'Képeslap Nyomtatása' : language === 'ro' ? 'Printează Felicitarea' : 'Print Card'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Studio Main Grid: Left Controls (AI + Manual Customizer) | Right Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Generator & Editor Controls (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Box 1: Gemini AI Generator Card */}
            <div className="bg-white rounded-2xl p-5 border border-[#eee7e4] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#ffdada]/60 to-transparent rounded-bl-full pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#4a151b] text-white flex items-center justify-center shadow-xs">
                    <Wand2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#2e0208]">
                      {language === 'hu' ? 'Google Gemini AI Készítő' : 'Google Gemini AI Creator'}
                    </h2>
                    <p className="text-[11px] text-[#534343]">
                      {language === 'hu' ? 'Egyedi, verses vagy meghitt karácsonyi szövegírás' : 'Personalized poetic Christmas card text'}
                    </p>
                  </div>
                </div>

                {hasApiKey ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    AI Aktív
                  </span>
                ) : (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    AI + Sablonok
                  </span>
                )}
              </div>

              {/* Quick Presets */}
              <div className="mb-4">
                <label className="text-[11px] font-bold text-[#534343] block mb-1.5 uppercase tracking-wider">
                  {language === 'hu' ? 'Gyors Címzett Sablonok:' : 'Quick Presets:'}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => applyPreset('grandparents')}
                    className="text-xs px-2.5 py-1 rounded-lg bg-[#f4ecea] hover:bg-[#eee7e4] text-[#2e0208] transition-colors font-medium cursor-pointer"
                  >
                    👵 Nagyszülők
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('parents')}
                    className="text-xs px-2.5 py-1 rounded-lg bg-[#f4ecea] hover:bg-[#eee7e4] text-[#2e0208] transition-colors font-medium cursor-pointer"
                  >
                    🏡 Szülők
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('partner')}
                    className="text-xs px-2.5 py-1 rounded-lg bg-[#f4ecea] hover:bg-[#eee7e4] text-[#2e0208] transition-colors font-medium cursor-pointer"
                  >
                    ❤️ Párom
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('friend')}
                    className="text-xs px-2.5 py-1 rounded-lg bg-[#f4ecea] hover:bg-[#eee7e4] text-[#2e0208] transition-colors font-medium cursor-pointer"
                  >
                    ☕ Barát
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('colleague')}
                    className="text-xs px-2.5 py-1 rounded-lg bg-[#f4ecea] hover:bg-[#eee7e4] text-[#2e0208] transition-colors font-medium cursor-pointer"
                  >
                    ✨ Kollégák
                  </button>
                </div>
              </div>

              {/* Form Inputs for AI */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-[#2e0208] block mb-1">
                    {language === 'hu' ? 'Kinek szól a képeslap?' : 'Who is this card for?'}
                  </label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder={language === 'hu' ? 'pl. Nagymama és Nagypapa, Anya, Eszti' : 'e.g. Grandma, Mom, Best Friend'}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-[#fff8f6] border border-[#eee7e4] focus:outline-none focus:border-[#4a151b] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-[#2e0208] block mb-1">
                      {language === 'hu' ? 'Hangulat / Stílus:' : 'Tone / Style:'}
                    </label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="w-full text-xs px-2.5 py-2 rounded-xl bg-[#fff8f6] border border-[#eee7e4] focus:outline-none focus:border-[#4a151b]"
                    >
                      <option value="meghitt">{language === 'hu' ? 'Meghitt & Szeretetteljes' : 'Warm & Heartfelt'}</option>
                      <option value="verses">{language === 'hu' ? 'Rímes, Karácsonyi Verses' : 'Poetic & Rhyming'}</option>
                      <option value="vidam">{language === 'hu' ? 'Vidám & Játékos' : 'Cheerful & Playful'}</option>
                      <option value="elegans">{language === 'hu' ? 'Elegáns & Klasszikus' : 'Elegant & Classic'}</option>
                      <option value="nosztalgikus">{language === 'hu' ? 'Nosztalgikus & Téli' : 'Nostalgic Winter'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#2e0208] block mb-1">
                      {language === 'hu' ? 'Aláírás / Feladó:' : 'Sender Signature:'}
                    </label>
                    <input
                      type="text"
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                      placeholder={language === 'hu' ? 'pl. Dani és Nóri, Unokáid' : 'e.g. With love, Anna'}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-[#fff8f6] border border-[#eee7e4] focus:outline-none focus:border-[#4a151b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#2e0208] block mb-1">
                    {language === 'hu'
                      ? 'Közös emlék, apró megjegyzés (opcionális):'
                      : 'Personal memories or special details (optional):'}
                  </label>
                  <textarea
                    rows={2}
                    value={customDetails}
                    onChange={(e) => setCustomDetails(e.target.value)}
                    placeholder={
                      language === 'hu'
                        ? 'pl. Köszönjük a finom bejglit, a közös társasozást, a sok jó tanácsot...'
                        : 'e.g. Thank you for the cozy cocoa moments and always believing in me...'
                    }
                    className="w-full text-xs px-3 py-2 rounded-xl bg-[#fff8f6] border border-[#eee7e4] focus:outline-none focus:border-[#4a151b] resize-none"
                  />
                </div>

                {generationNotice && (
                  <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                    {generationNotice}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleGenerateAiCard}
                  disabled={isGenerating}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#BA1A2C] via-[#901323] to-[#4a151b] text-white font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer shadow-md shadow-[#901323]/25 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{language === 'hu' ? 'Gemini AI verset és üzenetet ír...' : 'Gemini AI is crafting your card...'}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>{language === 'hu' ? '✨ Képeslap Generálása (Gemini AI)' : '✨ Generate Card with Gemini AI'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Box 2: Styling & Manual Customizer */}
            <div className="bg-white rounded-2xl p-5 border border-[#eee7e4] shadow-sm space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Sliders className="w-4 h-4 text-[#4a151b]" />
                <h3 className="text-sm font-bold text-[#2e0208]">
                  {language === 'hu' ? 'Dizájn & Kézi Testreszabás' : 'Design & Manual Customization'}
                </h3>
              </div>

              {/* Theme Selector */}
              <div>
                <label className="text-[11px] font-bold text-[#534343] block mb-1.5 uppercase tracking-wider">
                  {language === 'hu' ? 'Képeslap Színvilág:' : 'Color Theme:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(Object.keys(THEME_CONFIGS) as CardTheme[]).map((thm) => {
                    const cfg = THEME_CONFIGS[thm];
                    const isSel = card.theme === thm;
                    return (
                      <button
                        key={thm}
                        type="button"
                        onClick={() => setCard((prev) => ({ ...prev, theme: thm }))}
                        className={`text-left p-2 rounded-xl border text-xs transition-all cursor-pointer flex flex-col gap-1 ${
                          isSel
                            ? 'border-[#4a151b] bg-[#fff8f6] ring-1 ring-[#4a151b]'
                            : 'border-[#eee7e4] hover:bg-[#faf2f0]'
                        }`}
                      >
                        <div className={`w-full h-3.5 rounded-md ${cfg.bgCover} border border-black/10`} />
                        <span className="font-bold text-[11px] truncate text-[#2e0208]">
                          {language === 'hu' ? cfg.nameHu : language === 'ro' ? cfg.nameRo : cfg.nameEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stamp Motif Selector */}
              <div>
                <label className="text-[11px] font-bold text-[#534343] block mb-1.5 uppercase tracking-wider">
                  {language === 'hu' ? 'Bélyegző / Ünnepi Dísz:' : 'Holiday Stamp Motif:'}
                </label>
                <div className="flex items-center gap-2">
                  {(['star', 'forest', 'fireplace', 'bells', 'gingerbread', 'reindeer'] as StampMotif[]).map((motif) => {
                    const isSel = card.stamp === motif;
                    return (
                      <button
                        key={motif}
                        type="button"
                        onClick={() => setCard((prev) => ({ ...prev, stamp: motif }))}
                        className={`p-2 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                          isSel
                            ? 'bg-[#4a151b] text-white border-[#4a151b] shadow-xs'
                            : 'bg-[#fff8f6] text-[#534343] border-[#eee7e4] hover:bg-[#eee7e4]'
                        }`}
                      >
                        {renderStampIcon(motif, 'w-4 h-4')}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Font Family Selector */}
              <div>
                <label className="text-[11px] font-bold text-[#534343] block mb-1.5 uppercase tracking-wider">
                  {language === 'hu' ? 'Betűtípus Stílusa:' : 'Typography Style:'}
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCard((prev) => ({ ...prev, fontFamily: 'christmas' }))}
                    className={`flex-1 py-1.5 px-3 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                      card.fontFamily === 'christmas'
                        ? 'bg-[#4a151b] text-white border-[#4a151b]'
                        : 'bg-[#fff8f6] text-[#534343] border-[#eee7e4]'
                    }`}
                  >
                    <span className="font-christmas text-base">Ünnepi Kalligráfia</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCard((prev) => ({ ...prev, fontFamily: 'quicksand' }))}
                    className={`flex-1 py-1.5 px-3 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                      card.fontFamily === 'quicksand'
                        ? 'bg-[#4a151b] text-white border-[#4a151b]'
                        : 'bg-[#fff8f6] text-[#534343] border-[#eee7e4]'
                    }`}
                  >
                    <span>Letisztult Modern</span>
                  </button>
                </div>
              </div>

              {/* Direct Field Editing Accordion */}
              <div className="pt-2 border-t border-[#eee7e4] space-y-2.5">
                <div>
                  <label className="text-[11px] font-bold text-[#534343] block mb-0.5">
                    {language === 'hu' ? 'Előlap Cím:' : 'Cover Title:'}
                  </label>
                  <input
                    type="text"
                    value={card.coverTitle}
                    onChange={(e) => setCard((prev) => ({ ...prev, coverTitle: e.target.value }))}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-[#fff8f6] border border-[#eee7e4] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#534343] block mb-0.5">
                    {language === 'hu' ? 'Előlap Alcím:' : 'Cover Subtitle:'}
                  </label>
                  <input
                    type="text"
                    value={card.coverSubtitle}
                    onChange={(e) => setCard((prev) => ({ ...prev, coverSubtitle: e.target.value }))}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-[#fff8f6] border border-[#eee7e4] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#534343] block mb-0.5">
                    {language === 'hu' ? 'Belső Karácsonyi Vers:' : 'Inside Poem / Verse:'}
                  </label>
                  <textarea
                    rows={3}
                    value={card.poem}
                    onChange={(e) => setCard((prev) => ({ ...prev, poem: e.target.value }))}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-[#fff8f6] border border-[#eee7e4] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#534343] block mb-0.5">
                    {language === 'hu' ? 'Fő Üzenet:' : 'Inside Main Message:'}
                  </label>
                  <textarea
                    rows={3}
                    value={card.insideMessage}
                    onChange={(e) => setCard((prev) => ({ ...prev, insideMessage: e.target.value }))}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-[#fff8f6] border border-[#eee7e4] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Live Interactive Card Preview (7 cols) */}
          <div className="lg:col-span-7 space-y-4 sticky top-24">
            {/* Preview Navigation Tabs */}
            <div className="flex items-center justify-between bg-white p-1.5 rounded-2xl border border-[#eee7e4] shadow-xs overflow-x-auto no-scrollbar gap-1">
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setPreviewTab('cover')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap min-h-[36px] ${
                    previewTab === 'cover'
                      ? 'bg-[#4a151b] text-white shadow-xs'
                      : 'text-[#534343] hover:bg-[#f4ecea]'
                  }`}
                >
                  {language === 'hu' ? 'Előlap (Borító)' : 'Front Cover'}
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('inside')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap min-h-[36px] ${
                    previewTab === 'inside'
                      ? 'bg-[#4a151b] text-white shadow-xs'
                      : 'text-[#534343] hover:bg-[#f4ecea]'
                  }`}
                >
                  {language === 'hu' ? 'Belső Oldalpár' : 'Inside Spread'}
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('back')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap min-h-[36px] ${
                    previewTab === 'back'
                      ? 'bg-[#4a151b] text-white shadow-xs'
                      : 'text-[#534343] hover:bg-[#f4ecea]'
                  }`}
                >
                  {language === 'hu' ? 'Hátlap' : 'Back Cover'}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setPreviewTab('print-sheet')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 min-h-[36px] ${
                  previewTab === 'print-sheet'
                    ? 'bg-[#BA1A2C] text-white shadow-xs'
                    : 'text-[#534343] hover:bg-[#f4ecea]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{language === 'hu' ? 'A4 Nyomtatási Ív' : 'A4 Sheet'}</span>
              </button>
            </div>

            {/* PREVIEW CONTAINER */}
            <div className="bg-[#f0e8e6] p-4 sm:p-8 rounded-3xl border border-[#eee7e4] flex items-center justify-center min-h-[520px] shadow-inner relative overflow-hidden">
              <AnimatePresence mode="wait">
                {/* 1. FRONT COVER VIEW */}
                {previewTab === 'cover' && (
                  <motion.div
                    key="cover"
                    initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`w-full max-w-sm aspect-[1/1.4] rounded-2xl p-8 flex flex-col justify-between items-center text-center shadow-2xl relative overflow-hidden ${currentTheme.bgCover} ${currentTheme.textCover} border-2 ${currentTheme.borderCover}`}
                  >
                    {/* Golden corner ornaments */}
                    <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#ca8a04]/60 pointer-events-none" />
                    <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#ca8a04]/60 pointer-events-none" />
                    <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#ca8a04]/60 pointer-events-none" />
                    <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#ca8a04]/60 pointer-events-none" />

                    <div className="pt-2">
                      <span className="text-[10px] uppercase tracking-widest text-[#fde047] font-bold">
                        ÜNNEPI ÜDVÖZLET • 2026
                      </span>
                    </div>

                    <div className="my-auto flex flex-col items-center">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-[#ca8a04]/50 flex items-center justify-center mb-5 text-[#fde047] shadow-lg">
                        {renderStampIcon(card.stamp, 'w-9 h-9')}
                      </div>

                      <h2
                        className={`text-3xl sm:text-4xl font-bold tracking-tight mb-3 leading-tight ${
                          card.fontFamily === 'christmas' ? 'font-christmas text-4xl sm:text-5xl' : 'font-sans'
                        }`}
                      >
                        {card.coverTitle}
                      </h2>

                      <p className="text-xs opacity-90 max-w-[240px] leading-relaxed font-medium">
                        {card.coverSubtitle}
                      </p>
                    </div>

                    <div className="pb-1 text-[11px] tracking-widest opacity-75 text-[#fde047]">
                      ★ BÉKE • SZERETET • FÉNY ★
                    </div>
                  </motion.div>
                )}

                {/* 2. INSIDE SPREAD VIEW (BOOK FOLD) */}
                {previewTab === 'inside' && (
                  <motion.div
                    key="inside"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-xl aspect-auto sm:aspect-[1.4/1] rounded-2xl shadow-2xl flex flex-col sm:flex-row overflow-hidden border-2 border-[#d8c1c1]"
                  >
                    {/* Left Inside Page (Poem) */}
                    <div
                      className={`w-full sm:w-1/2 p-5 sm:p-8 flex flex-col justify-center items-center text-center border-b sm:border-b-0 sm:border-r border-dashed border-[#ca8a04]/40 ${currentTheme.bgInside} ${currentTheme.textInside}`}
                    >
                      <div className="w-8 h-8 rounded-full border border-[#ca8a04]/40 flex items-center justify-center mb-4 text-[#ca8a04]">
                        {renderStampIcon(card.stamp, 'w-4 h-4')}
                      </div>
                      <p
                        className={`text-xs sm:text-sm italic leading-relaxed whitespace-pre-line ${
                          card.fontFamily === 'christmas' ? 'font-christmas text-lg sm:text-xl' : 'font-serif'
                        }`}
                      >
                        "{card.poem}"
                      </p>
                    </div>

                    {/* Right Inside Page (Message + Signature) */}
                    <div
                      className={`w-full sm:w-1/2 p-5 sm:p-8 flex flex-col justify-between text-left ${currentTheme.bgInside} ${currentTheme.textInside}`}
                    >
                      <div>
                        <h3
                          className={`text-base sm:text-lg font-bold mb-3 text-[#4a151b] ${
                            card.fontFamily === 'christmas' ? 'font-christmas text-xl sm:text-2xl' : ''
                          }`}
                        >
                          {card.greeting}
                        </h3>
                        <p className="text-xs sm:text-xs leading-relaxed whitespace-pre-line text-[#332527]">
                          {card.insideMessage}
                        </p>
                      </div>

                      <div className="text-right pt-4 border-t border-[#ca8a04]/20">
                        <p className="text-[11px] sm:text-xs italic text-[#534343] whitespace-pre-line font-bold">
                          {card.signOff}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. BACK COVER VIEW */}
                {previewTab === 'back' && (
                  <motion.div
                    key="back"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`w-full max-w-sm aspect-[1/1.4] rounded-2xl p-8 flex flex-col justify-between items-center text-center shadow-2xl relative ${currentTheme.bgCover} ${currentTheme.textCover} border-2 ${currentTheme.borderCover}`}
                  >
                    <div className="pt-4">
                      <span className="text-xs uppercase tracking-widest text-[#fde047]">
                        CHRISTMAS RESET 2026
                      </span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full border border-[#ca8a04]/60 flex items-center justify-center mb-3 text-[#fde047]">
                        {renderStampIcon(card.stamp, 'w-7 h-7')}
                      </div>
                      <p className="text-sm font-bold opacity-90">
                        {language === 'hu' ? 'Szeretettel Készítve' : 'Made with Love'}
                      </p>
                      <p className="text-[11px] opacity-70 mt-1 max-w-[200px]">
                        {language === 'hu' ? 'A csendes, békés decemberi pillanatokért' : 'For a peaceful holiday season'}
                      </p>
                    </div>

                    <div className="pb-2 text-[10px] opacity-60">
                      christmas-reset.app • 2026
                    </div>
                  </motion.div>
                )}

                {/* 4. A4 PRINT SHEET VIEW */}
                {previewTab === 'print-sheet' && (
                  <motion.div
                    key="sheet"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-4 border border-gray-300"
                  >
                    <div className="flex items-center justify-between mb-3 border-b pb-2">
                      <span className="text-xs font-bold text-[#2e0208]">
                        A4 {printOrientation === 'landscape' ? 'Fekvő' : 'Álló'} Nyomtatási Oldalpár ({printPageSide === 'outer' ? 'Külső oldal: Hátlap + Előlap' : 'Belső oldal: Vers + Üzenet'})
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => setPrintPageSide('outer')}
                          className={`text-xs px-2.5 py-1 rounded font-bold ${
                            printPageSide === 'outer' ? 'bg-[#4a151b] text-white' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          1. Külső Oldal
                        </button>
                        <button
                          type="button"
                          onClick={() => setPrintPageSide('inner')}
                          className={`text-xs px-2.5 py-1 rounded font-bold ${
                            printPageSide === 'inner' ? 'bg-[#4a151b] text-white' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          2. Belső Oldal
                        </button>
                        {(['portrait', 'landscape'] as const).map((orientation) => (
                          <button
                            key={orientation}
                            type="button"
                            aria-pressed={printOrientation === orientation}
                            onClick={() => setPrintOrientation(orientation)}
                            className={`text-xs px-2.5 py-1 rounded font-bold ${
                              printOrientation === orientation ? 'bg-[#4a151b] text-white' : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {orientation === 'portrait' ? 'Álló' : 'Fekvő'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="aspect-[1.414/1] w-full flex border-2 border-dashed border-gray-400 relative overflow-hidden rounded">
                      {/* Center Fold Line Guide */}
                      <div className="absolute top-0 bottom-0 left-1/2 w-0 border-r-2 border-dashed border-red-500/60 z-20 pointer-events-none flex flex-col justify-between py-2 -translate-x-1/2">
                        <span className="text-[9px] bg-red-600 text-white px-1 rounded transform -translate-x-1/2 rotate-90">
                          Hajtás
                        </span>
                      </div>

                      {printPageSide === 'outer' ? (
                        <>
                          {/* Back on Left */}
                          <div className={`w-1/2 p-6 flex flex-col justify-between items-center text-center ${currentTheme.bgCover} ${currentTheme.textCover}`}>
                            <span className="text-[9px] opacity-75">CHRISTMAS RESET 2026</span>
                            <div className="flex flex-col items-center">
                              {renderStampIcon(card.stamp, 'w-6 h-6 text-[#fde047] mb-1')}
                              <p className="text-[11px] font-bold">{card.coverTitle}</p>
                            </div>
                            <span className="text-[9px] opacity-50">Hátlap (Kinyitva a bal oldalra esik)</span>
                          </div>

                          {/* Front on Right */}
                          <div className={`w-1/2 p-6 flex flex-col justify-between items-center text-center ${currentTheme.bgCover} ${currentTheme.textCover}`}>
                            <span className="text-[9px] text-[#fde047] font-bold">ELŐLAP • 2026</span>
                            <div className="flex flex-col items-center">
                              {renderStampIcon(card.stamp, 'w-8 h-8 text-[#fde047] mb-2')}
                              <h4 className={`text-base font-bold ${card.fontFamily === 'christmas' ? 'font-christmas text-xl' : ''}`}>
                                {card.coverTitle}
                              </h4>
                              <p className="text-[9px] opacity-80 mt-1">{card.coverSubtitle}</p>
                            </div>
                            <span className="text-[9px] opacity-75">★ BÉKE ÉS MEGHITTSÉG ★</span>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Left: Poem */}
                          <div className={`w-1/2 p-6 flex flex-col justify-center items-center text-center border-r border-dashed border-gray-300 ${currentTheme.bgInside} ${currentTheme.textInside}`}>
                            <p className="text-[11px] italic whitespace-pre-line font-serif">
                              "{card.poem}"
                            </p>
                          </div>

                          {/* Right: Greeting & Message */}
                          <div className={`w-1/2 p-6 flex flex-col justify-between text-left ${currentTheme.bgInside} ${currentTheme.textInside}`}>
                            <div>
                              <p className="text-xs font-bold text-[#4a151b] mb-1">{card.greeting}</p>
                              <p className="text-[10px] leading-relaxed whitespace-pre-line">{card.insideMessage}</p>
                            </div>
                            <p className="text-[9px] italic text-right font-bold opacity-80">{card.signOff}</p>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-[#534343]">
                          <span>💡 <strong>Nyomtatási tipp:</strong> A kiválasztott {printOrientation === 'landscape' ? 'fekvő' : 'álló'} tájolás és vastagabb (160-250g) papír ajánlott.</span>
                      <button
                        onClick={handlePrint}
                        className="px-3 py-1 bg-[#4a151b] text-white rounded font-bold hover:bg-[#2e0208] cursor-pointer"
                      >
                        Nyomtatás indítása
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick helper tip banner */}
            <div className="bg-white rounded-2xl p-4 border border-[#eee7e4] text-xs text-[#534343] flex items-start gap-3">
              <HelpCircle className="w-4 h-4 text-[#4a151b] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#2e0208]">
                  {language === 'hu' ? 'Hogyan lesz ebből igazi képeslap?' : 'How does this fold?'}
                </strong>
                <p className="mt-0.5 leading-relaxed">
                  {language === 'hu'
                    ? `1. Kattints a "Képeslap Nyomtatása" gombra. 2. A nyomtatónál válaszd a beállított ${printOrientation === 'landscape' ? 'fekvő' : 'álló'} tájolást. 3. A kinyomtatott A4-es lapot hajtsd pontosan félbe a szaggatott vonal mentén. Az előlap elöl, a hátlap hátul, a vers és az üzenet pedig a belső oldalpáron fog megjelenni!`
                    : '1. Click "Print Card". 2. Choose the selected page orientation in the print dialog. 3. Fold the printed A4 sheet in half along the center fold line to create a physical greeting card!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
