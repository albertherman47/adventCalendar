import React from 'react';
import { Lock, Check, Sparkles, Clock, ArrowUpRight, Gift, Wallet, Calendar, Utensils, Music, Heart, Film, Camera, Feather, Smile, CheckSquare, Sun, Trash2, ShieldCheck, Coffee, Mail, Lightbulb, HelpCircle, Star, Key } from 'lucide-react';
import { DayData, SupportedLanguage } from '../types';

interface AdventDoorProps {
  day: DayData;
  isUnlocked: boolean;
  isCompleted: boolean;
  isToday: boolean;
  isTierLocked?: boolean;
  language?: SupportedLanguage;
  onClick: () => void;
  onOpenPaywall?: () => void;
}

// Icon helper to render the accurate aesthetic icon
const renderIcon = (iconName: string, className: string) => {
  switch (iconName) {
    case 'Wallet': return <Wallet className={className} />;
    case 'Gift': return <Gift className={className} />;
    case 'Calendar': return <Calendar className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Lightbulb': return <Lightbulb className={className} />;
    case 'Heart': return <Heart className={className} />;
    case 'Utensils': return <Utensils className={className} />;
    case 'Coffee': return <Coffee className={className} />;
    case 'Mail': return <Mail className={className} />;
    case 'Music': return <Music className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'Camera': return <Camera className={className} />;
    case 'Feather': return <Feather className={className} />;
    case 'Smile': return <Smile className={className} />;
    case 'Film': return <Film className={className} />;
    case 'Trash2': return <Trash2 className={className} />;
    case 'CheckSquare': return <CheckSquare className={className} />;
    case 'Sun': return <Sun className={className} />;
    case 'HelpCircle': return <HelpCircle className={className} />;
    case 'Star': return <Star className={className} />;
    default: return <Sparkles className={className} />;
  }
};

export const AdventDoor: React.FC<AdventDoorProps> = ({
  day,
  isUnlocked,
  isCompleted,
  isToday,
  isTierLocked = false,
  language = 'hu',
  onClick,
  onOpenPaywall,
}) => {
  const isHu = language === 'hu';
  const isDe = language === 'de';
  const isRo = language === 'ro';

  const doorRibbon = isCompleted
    ? (isHu ? "✓ KÉSZ" : isDe ? "✓ FERTIG" : isRo ? "✓ GATA" : "✓ DONE")
    : isToday
    ? (isHu ? "MA" : isDe ? "HEUTE" : isRo ? "AZI" : "TODAY")
    : `D${day.id}`;

  // Phase color accents
  const getPhaseAccent = (phase: number) => {
    switch (phase) {
      case 1: return { text: 'text-[#621927]', bg: 'bg-[#F7EAEF]', border: 'border-[#621927]/20' };
      case 2: return { text: 'text-[#2E5844]', bg: 'bg-[#E6EFEA]', border: 'border-[#2E5844]/20' };
      case 3: return { text: 'text-[#C29B48]', bg: 'bg-[#F9F4E8]', border: 'border-[#C29B48]/30' };
      case 4: return { text: 'text-[#7E2232]', bg: 'bg-[#FAF7F2]', border: 'border-[#7E2232]/30' };
      default: return { text: 'text-[#621927]', bg: 'bg-[#F7EAEF]', border: 'border-[#621927]/20' };
    }
  };

  const accent = getPhaseAccent(day.phase);

  // Gated Tier Locked Door (Marketing / Paywall preview)
  if (isTierLocked) {
    return (
      <div
        onClick={onOpenPaywall || onClick}
        className="relative rounded-2xl p-3.5 sm:p-5 min-h-[155px] sm:min-h-[190px] flex flex-col justify-between overflow-hidden transition-all duration-300 border border-[#D8B76E]/40 hover:border-[#621927] shadow-xs hover:shadow-lg bg-gradient-to-b from-[#FFFDF9] to-[#FBF8F2] cursor-pointer group hover:-translate-y-1"
      >
        {/* Top: Day number and Lock medallion */}
        <div>
          <div className="flex items-start justify-between mb-1.5 sm:mb-2">
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#8E867B] group-hover:text-[#621927] transition-colors">
                {day.id < 10 ? `0${day.id}` : day.id}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#A8A096]">
                {isHu ? "Dec." : "Dec"}
              </span>
            </div>

            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FAF7F2] border border-[#C29B48]/60 flex items-center justify-center text-[#C29B48] group-hover:bg-[#621927] group-hover:text-white transition-all shadow-xs">
              <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
          </div>

          {/* Category Pill */}
          <div className="mb-1">
            <span className={`text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full ${accent.bg} ${accent.text} border ${accent.border}`}>
              {day.category}
            </span>
          </div>

          {/* Teaser Title */}
          <h3 className="font-serif text-xs sm:text-base font-semibold text-[#2C0B12] group-hover:text-[#621927] leading-tight line-clamp-2 transition-colors">
            {day.title}
          </h3>
        </div>

        {/* Bottom CTA teaser */}
        <div className="pt-2 border-t border-[#EAE3D5] flex items-center justify-between text-xs">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#C29B48] font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#C29B48]" />
            <span>{isHu ? "Csomaggal" : "Requires Plan"}</span>
          </span>
          <span className="text-[11px] sm:text-xs font-bold text-[#621927] group-hover:underline flex items-center gap-0.5">
            <span>{isHu ? "Feloldás" : "Unlock"}</span>
            <ArrowUpRight className="w-3 h-3 text-[#D8B76E]" />
          </span>
        </div>
      </div>
    );
  }

  // Physical closed advent door state (by calendar date)
  if (!isUnlocked) {
    return (
      <div
        className="relative group rounded-2xl p-3.5 sm:p-5 min-h-[155px] sm:min-h-[190px] flex flex-col justify-between select-none overflow-hidden transition-all duration-300 border border-[#D8B76E]/20 hover:border-[#D8B76E]/50 shadow-sm hover:shadow-md cursor-not-allowed bg-gradient-to-br from-[#231518] via-[#1a0f12] to-[#120a0c]"
      >
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#D8B76E_1px,transparent_1px)] [background-size:12px_12px]" />
        <div className="absolute left-1.5 top-3 bottom-3 w-[2px] bg-[#D8B76E]/15 rounded-full" />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1 h-3 rounded-full bg-[#D8B76E]/30" />

        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#D8B76E]/80 group-hover:text-[#EEDCB2] transition-colors">
              {day.id < 10 ? `0${day.id}` : day.id}
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#D8B76E]/40">
              {isHu ? "Dec." : "Dec"}
            </span>
          </div>

          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#4A151B] to-[#2E0A10] border border-[#D8B76E]/40 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
            <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D8B76E]/80" />
          </div>
        </div>

        <div className="relative z-10 my-auto text-center py-1 sm:py-2">
          <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-[#D8B76E]/20 mb-1 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D8B76E]/60 animate-pulse" />
          </div>
          <span className="block text-[10px] sm:text-[11px] font-serif text-[#D8B76E]/80 italic">
            {isHu ? "Titokzatos..." : "Surprise..."}
          </span>
          <span className="block text-[8px] sm:text-[9px] uppercase tracking-widest text-white/40 mt-0.5">
            {isHu ? "Még zárva" : "Closed"}
          </span>
        </div>

        <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-[#D8B76E]/60">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#D8B76E]/40" />
            <span className="text-[9px] sm:text-[10px]">{day.timeEstimate}</span>
          </span>
          <span className="font-mono text-[#D8B76E]/70 font-medium text-[9px] sm:text-[10px]">
            {isHu ? `Dec. ${day.id}.` : `${day.id} Dec`}
          </span>
        </div>
      </div>
    );
  }

  // Unlocked or Completed Physical Advent Door
  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl transition-all duration-300 select-none overflow-hidden cursor-pointer group ${
        isCompleted
          ? 'bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F0] to-[#F5EEDD] border-2 border-[#C29B48]/70 shadow-sm hover:shadow-xl hover:-translate-y-1'
          : isToday
          ? 'bg-white border-2 border-[#C29B48] shadow-lg animate-glow-active hover:-translate-y-1'
          : 'bg-white border border-[#EAE3D5] hover:border-[#C29B48] shadow-xs hover:shadow-lg hover:-translate-y-1'
      }`}
    >
      <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden pointer-events-none z-10">
        <div className={`absolute transform rotate-45 text-center text-[8px] font-bold py-0.5 right-[-35px] top-[14px] w-[100px] ${
          isCompleted
            ? 'bg-[#2E5844] text-white'
            : isToday
            ? 'bg-[#C29B48] text-white'
            : 'bg-[#FAF7F2] text-[#8E867B]'
        }`}>
          {doorRibbon}
        </div>
      </div>

      <div className="p-3.5 sm:p-5 flex flex-col h-full justify-between min-h-[155px] sm:min-h-[190px]">
        <div>
          <div className="flex items-start justify-between mb-1.5 sm:mb-2">
            <div className="flex items-baseline gap-1">
              <span className={`font-serif text-2xl sm:text-4xl font-bold tracking-tight ${
                isCompleted
                  ? 'text-[#C29B48]'
                  : isToday
                  ? 'text-[#621927]'
                  : 'text-[#621927]'
              }`}>
                {day.id < 10 ? `0${day.id}` : day.id}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#A8A096]">
                {isHu ? "Dec." : "Dec"}
              </span>
            </div>

            <div>
              {isCompleted ? (
                <div
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#2E5844] text-white flex items-center justify-center shadow-md ring-2 ring-[#D8B76E]/50 transform transition-transform group-hover:scale-110"
                >
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                </div>
              ) : isToday ? (
                <div
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FAF7F2] text-[#621927] border-2 border-[#C29B48] flex items-center justify-center shadow-sm animate-pulse"
                >
                  {renderIcon(day.iconName, "w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#621927]")}
                </div>
              ) : (
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FAF7F2] text-[#621927] border border-[#EAE3D5] flex items-center justify-center group-hover:border-[#C29B48] group-hover:bg-[#FAF7F2]">
                  {renderIcon(day.iconName, "w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#7E2232]")}
                </div>
              )}
            </div>
          </div>

          <div className="mb-1">
            <span className={`text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full ${accent.bg} ${accent.text} border ${accent.border}`}>
              {day.category}
            </span>
          </div>

          <h3 className={`font-serif text-xs sm:text-base font-semibold leading-snug line-clamp-2 transition-colors ${
            isCompleted
              ? 'text-[#2C0B12]'
              : 'text-[#2C0B12] group-hover:text-[#621927]'
          }`}>
            {day.title}
          </h3>
        </div>

        <div className="pt-2 sm:pt-3 border-t border-[#F1E9DB] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-[#7E7468]">
            <Clock className="w-3 h-3 text-[#A8A096]" />
            <span>{day.timeEstimate}</span>
          </div>

          <span className={`text-[11px] sm:text-xs font-semibold flex items-center gap-0.5 transition-transform group-hover:translate-x-0.5 ${
            isCompleted ? 'text-[#2E5844]' : isToday ? 'text-[#C29B48]' : 'text-[#621927]'
          }`}>
            <span>
              {isCompleted ? (isHu ? "Kész ✓" : "Done ✓") : (isHu ? "Kinyitás" : "Open")}
            </span>
            <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </span>
        </div>
      </div>

      {isCompleted && (
        <div className="h-1.5 bg-gradient-to-r from-[#C29B48] via-[#F2E4C6] to-[#C29B48]" />
      )}
    </div>
  );
};
