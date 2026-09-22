import React from 'react';
import { Lock, Check, Sparkles, Clock, ArrowUpRight, Gift, Wallet, Calendar, Utensils, Music, Heart, Film, Camera, Feather, Smile, CheckSquare, Sun, Trash2, ShieldCheck, Coffee, Mail, Lightbulb, HelpCircle, Star } from 'lucide-react';
import { DayData, SupportedLanguage } from '../types';

interface AdventDoorProps {
  day: DayData;
  isUnlocked: boolean;
  isCompleted: boolean;
  isToday: boolean;
  language?: SupportedLanguage;
  onClick: () => void;
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
  language = 'ro',
  onClick,
}) => {
  const isHu = language === 'hu';
  const isEn = language === 'en';

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

  return (
    <div
      onClick={isUnlocked ? onClick : undefined}
      className={`relative rounded-2xl transition-all duration-300 select-none overflow-hidden ${
        isUnlocked
          ? 'cursor-pointer transform hover:-translate-y-1 hover:shadow-lg'
          : 'cursor-not-allowed opacity-80'
      } ${
        isToday
          ? 'ring-2 ring-[#C29B48] ring-offset-2 ring-offset-[#FAF7F2] shadow-md'
          : ''
      } ${
        isCompleted
          ? 'bg-gradient-to-b from-white to-[#F9F4E8] border-2 border-[#C29B48]/50 shadow-sm'
          : isUnlocked
            ? 'bg-white border border-[#EAE3D5] hover:border-[#C29B48] shadow-xs'
            : 'bg-[#F4EFE6]/70 border border-[#E5DBC7]'
      }`}
    >
      {/* Top Header inside door */}
      <div className="p-4 sm:p-5 flex flex-col h-full justify-between min-h-[170px] sm:min-h-[190px]">
        <div>
          <div className="flex items-start justify-between mb-2">
            {/* Day Number */}
            <div className="flex items-baseline gap-1">
              <span className={`font-serif text-3xl sm:text-4xl font-bold tracking-tight ${
                isCompleted
                  ? 'text-[#C29B48]'
                  : isUnlocked
                    ? 'text-[#621927]'
                    : 'text-[#8E867B]'
              }`}>
                {day.id}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#A8A096]">
                {isHu ? "Dec." : "Dec"}
              </span>
            </div>

            {/* Status Indicator */}
            <div>
              {isCompleted ? (
                <div className="w-6 h-6 rounded-full bg-[#2E5844] text-white flex items-center justify-center shadow-xs" title={isHu ? "Teljesített nap" : "Zi finalizată"}>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              ) : isUnlocked ? (
                <div className="w-6 h-6 rounded-full bg-[#FAF7F2] text-[#621927] border border-[#EAE3D5] flex items-center justify-center group-hover:border-[#C29B48]">
                  {renderIcon(day.iconName, "w-3.5 h-3.5 text-[#7E2232]")}
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#E5DBC7]/60 text-[#8E867B] flex items-center justify-center" title={isHu ? `Megnyílik december ${day.id}.-án` : `Se deblochează pe ${day.id} Decembrie`}>
                  <Lock className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          </div>

          {/* Category Pill */}
          <div className="mb-2">
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${accent.bg} ${accent.text} border ${accent.border}`}>
              {day.category}
            </span>
          </div>

          {/* Title */}
          <h3 className={`font-serif text-base sm:text-lg font-semibold leading-snug line-clamp-2 ${
            isUnlocked ? 'text-[#2C0B12]' : 'text-[#8E867B]'
          }`}>
            {day.title}
          </h3>
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-[#F1E9DB] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-[11px] text-[#7E7468]">
            <Clock className="w-3 h-3 text-[#A8A096]" />
            <span>{day.timeEstimate}</span>
          </div>

          {isUnlocked ? (
            <span className="text-xs font-medium text-[#621927] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
              <span>{isCompleted ? (isHu ? "Megnyitás" : isEn ? "Reopen" : "Redeschide") : (isHu ? "Kinyitás" : isEn ? "Open" : "Deschide")}</span>
              <ArrowUpRight className="w-3 h-3 text-[#C29B48]" />
            </span>
          ) : (
            <span className="text-[10px] font-medium text-[#8E867B]">
              {day.id} {isHu ? "Dec." : "Dec"}
            </span>
          )}
        </div>
      </div>

      {/* Subtle completed gold banner */}
      {isCompleted && (
        <div className="h-1 bg-gradient-to-r from-[#C29B48] via-[#D8B76E] to-[#C29B48]" />
      )}
    </div>
  );
};
