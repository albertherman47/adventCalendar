import React from 'react';
import { Sparkles, Check, ArrowRight, Heart, DownloadCloud, Star, KeyRound, Clock, Flame } from 'lucide-react';
import { SupportedLanguage, PricingTier } from '../types';
import { getTranslations } from '../data/translations';
import { trackEvent } from '../utils/analytics';

interface PricingSectionProps {
  language: SupportedLanguage;
  onSelectTier: (tier: PricingTier) => void;
  onOpenRestoreModal?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  language,
  onSelectTier,
  onOpenRestoreModal,
}) => {
  const t = getTranslations(language);
  const isHu = language === 'hu';

  const handleSelectTier = (tier: PricingTier) => {
    trackEvent('pricing_view', { selectedTier: tier });
    onSelectTier(tier);
  };

  return (
    <section id="pricing-section" className="py-16 sm:py-24 bg-[#FCFAF7] border-b border-[#EAE3D5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#C29B48]/40 text-xs text-[#7E2232] font-semibold mb-4 shadow-xs">
            <Flame className="w-3.5 h-3.5 text-[#C29B48] fill-current" />
            <span>
              {isHu 
                ? 'Ünnepi Elővétel • Örökös Licenc a teljes 2026-os Karácsonyra' 
                : 'Limited Holiday Edition • Lifetime License for Christmas 2026'}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2C0B12] mb-4">
            {t.pricing.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#6B645B]">
            {t.pricing.subheading}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {t.pricing.tiers.map((tier) => {
            const isPopular = tier.id === 'premium';
            const isStandard = tier.id === 'standard';
            const isFree = tier.id === 'free';

            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-white border-2 border-[#C29B48] shadow-2xl ring-2 ring-[#C29B48]/30 lg:-translate-y-3'
                    : isStandard
                    ? 'bg-white border border-[#C29B48]/40 shadow-md hover:shadow-xl'
                    : 'bg-[#FAF7F2] border border-[#EAE3D5] shadow-xs hover:shadow-md'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#621927] text-white text-xs font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5 border border-[#C29B48]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D8B76E]" />
                    <span>{isHu ? 'LEGNÉPSZERŰBB • 85% EZT VÁLASZTJA' : 'MOST POPULAR • BEST VALUE'}</span>
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-2xl font-bold text-[#2C0B12]">
                        {tier.name}
                      </h3>
                      {isPopular && (
                        <div className="flex text-[#C29B48]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-[#7E7468] mt-1.5 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="my-6 pb-6 border-b border-[#EAE3D5]">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-4xl sm:text-5xl font-bold text-[#621927]">
                        {t.pricing.currency}{tier.price}
                      </span>
                      <span className="text-xs font-medium text-[#7E7468]">
                        / {tier.period}
                      </span>
                    </div>
                    {isPopular && (
                      <span className="inline-block mt-1 text-[11px] font-semibold text-[#2E5844]">
                        ✓ {isHu ? 'Egyszeri díj, nincs havidíj vagy rejtett költség' : 'One-time fee, no recurring charges'}
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3.5 mb-8">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4A453E] block">
                      {isHu ? 'Mit tartalmaz a csomag:' : language === 'en' ? 'What’s included:' : 'Ce este inclus:'}
                    </span>
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#4A453E]">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          isPopular ? 'bg-[#E6EFEA] text-[#2E5844]' : 'bg-[#F1E9DB] text-[#7E7468]'
                        }`}>
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => handleSelectTier(tier.id as PricingTier)}
                    className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                      isPopular
                        ? 'bg-[#621927] hover:bg-[#46121C] text-[#FDFBF7] shadow-lg hover:shadow-xl border border-[#C29B48]/50 hover:scale-[1.02]'
                        : isStandard
                        ? 'bg-[#2E5844] hover:bg-[#1E3B2D] text-white shadow-md hover:shadow-lg'
                        : 'bg-white hover:bg-[#FAF7F2] text-[#2C0B12] border border-[#D8B76E]/50 hover:border-[#621927]'
                    }`}
                  >
                    <span>{tier.cta}</span>
                    <ArrowRight className="w-4 h-4 text-[#D8B76E]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment status and account link */}
        <div className="mt-12 text-center text-xs text-[#7E7468] max-w-xl mx-auto space-y-2">
          <p>{isHu ? 'Az online fizetés jelenleg nem aktív; csomagválasztáskor nem történik terhelés.' : 'Online payments are not enabled; choosing a plan will not charge you.'}</p>
          <p>{isHu ? 'A bejelentkezés a haladásod eszközök közti szinkronizálását teszi lehetővé.' : 'Sign in to sync progress across your devices.'}</p>

          {onOpenRestoreModal && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenRestoreModal}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#621927] hover:underline cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#C29B48]" />
                <span>{isHu ? 'Bejelentkezés vagy fiók létrehozása' : 'Sign in or create an account'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
