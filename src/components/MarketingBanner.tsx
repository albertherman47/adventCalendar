import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, Flame, Users, ShieldCheck, ChevronRight } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface MarketingBannerProps {
  language: SupportedLanguage;
  onOpenPricing: () => void;
  hasPurchased: boolean;
}

export const MarketingBanner: React.FC<MarketingBannerProps> = ({
  language,
  onOpenPricing,
  hasPurchased,
}) => {
  // 12-hour countdown urgency timer
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 5,
    minutes: 42,
    seconds: 18,
  });

  // Recent purchaser notification toast
  const [recentNotification, setRecentNotification] = useState<{ name: string; city: string; tier: string; time: string } | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 11, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Cycle social proof toasts
  useEffect(() => {
    if (hasPurchased) return;

    const purchasers = [
      { name: 'Eszter', city: 'Budapest', tier: 'Prémium Csomag', time: '2 perce' },
      { name: 'Máté és Anna', city: 'Győr', tier: 'Prémium Csomag', time: '5 perce' },
      { name: 'Katalin', city: 'Szeged', tier: 'Standard Csomag', time: '9 perce' },
      { name: 'Dániel', city: 'Debrecen', tier: 'Prémium Csomag', time: '14 perce' },
      { name: 'Viktória', city: 'Pécs', tier: 'Prémium Csomag', time: '18 perce' },
    ];

    let index = 0;
    const interval = setInterval(() => {
      setRecentNotification(purchasers[index % purchasers.length]);
      setShowNotification(true);
      index++;

      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }, 14000);

    // Initial trigger after 4s
    const initialTimeout = setTimeout(() => {
      setRecentNotification(purchasers[0]);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [hasPurchased]);

  if (hasPurchased) return null;

  const pad = (n: number) => String(n).padStart(2, '0');

  const textUrgency = language === 'hu'
    ? 'Ünnepi Elővételi Kedvezmény: Akár -40% megtakarítás a teljes adventi csomagra!'
    : language === 'en'
    ? 'Holiday Early-Bird Offer: Save up to 40% on full lifetime access!'
    : language === 'de'
    ? 'Feiertags-Frühbucherrabatt: Bis zu 40% auf das komplette Paket sparen!'
    : 'Ofertă Specială de Sărbători: Până la 40% reducere la pachetul complet!';

  const ctaText = language === 'hu'
    ? 'Kedvezmény érvényesítése'
    : language === 'en'
    ? 'Claim Offer'
    : language === 'de'
    ? 'Rabatt sichern'
    : 'Activează reducerea';

  return (
    <>
      {/* Top Floating Urgency Bar */}
      <div className="bg-gradient-to-r from-[#3D0A14] via-[#621927] to-[#3D0A14] text-white border-b border-[#C29B48]/30 px-3 py-2 text-xs font-medium z-40 relative shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center gap-1.5">
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#C29B48] text-[#2C0B12] shrink-0 animate-pulse">
              <Flame className="w-3 h-3 fill-current" />
            </span>
            <span className="font-semibold text-[#FDFBF7] tracking-tight text-[11px] sm:text-sm">
              <span className="sm:hidden">Ünnepi Akció: -40% ma éjfélig!</span>
              <span className="hidden sm:inline">{textUrgency}</span>
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Countdown timer */}
            <div className="flex items-center gap-1 font-mono text-[11px] sm:text-xs bg-black/30 px-2 py-0.5 sm:py-1 rounded-md border border-[#C29B48]/40 text-[#EEDCB2]">
              <Clock className="w-3 h-3 text-[#C29B48]" />
              <span>{pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}</span>
            </div>

            <button
              onClick={onOpenPricing}
              className="bg-[#C29B48] hover:bg-[#D8B76E] text-[#2C0B12] font-bold px-3 py-1 rounded-md text-[11px] sm:text-xs transition-transform hover:scale-105 active:scale-95 shadow-sm flex items-center gap-0.5 cursor-pointer min-h-[28px]"
            >
              <span>{ctaText}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Social Proof Toast in bottom left (positioned above mobile nav on phones) */}
      {showNotification && recentNotification && (
        <div className="fixed bottom-20 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-auto z-40 animate-bounce-in bg-white/95 backdrop-blur-md border border-[#C29B48]/50 shadow-2xl rounded-2xl p-3 max-w-sm flex items-center gap-2.5 transition-all duration-500">
          <div className="w-8 h-8 rounded-full bg-[#621927] text-[#D8B76E] flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs">
            <p className="font-semibold text-[#2C0B12] leading-tight">
              {recentNotification.name} ({recentNotification.city})
            </p>
            <p className="text-[#6B645B] text-[11px] leading-tight mt-0.5">
              Véglegesen megvásárolta: <strong className="text-[#621927]">{recentNotification.tier}</strong>
            </p>
            <span className="text-[10px] text-[#A8A096]">
              {recentNotification.time} • Azonnali hozzáféréssel
            </span>
          </div>
        </div>
      )}
    </>
  );
};
