import React from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, Heart, DownloadCloud } from 'lucide-react';
import { SupportedLanguage, PricingTier } from '../types';
import { getTranslations } from '../data/translations';
import { trackEvent } from '../utils/analytics';

interface PricingSectionProps {
  language: SupportedLanguage;
  onSelectTier: (tier: PricingTier) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  language,
  onSelectTier,
}) => {
  const t = getTranslations(language);

  const handleSelectTier = (tier: PricingTier) => {
    trackEvent('pricing_view', { selectedTier: tier });
    onSelectTier(tier);
  };

  return (
    <section id="pricing-section" className="py-16 sm:py-24 bg-[#FCFAF7] border-b border-[#EAE3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EAE3D5] text-xs text-[#7E2232] font-medium mb-4">
            <Sparkles className="w-3 h-3 text-[#C29B48]" />
            <span>Acces complet pentru tot sezonul 2026</span>
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
            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-white border-2 border-[#C29B48] shadow-xl ring-1 ring-[#C29B48]/30 lg:-translate-y-2'
                    : 'bg-[#FAF7F2] border border-[#EAE3D5] shadow-xs hover:shadow-md'
                }`}
              >
                {/* Popular Badge */}
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#621927] text-white text-xs font-semibold tracking-wider uppercase shadow-xs flex items-center gap-1.5 border border-[#C29B48]/50">
                    <Sparkles className="w-3 h-3 text-[#D8B76E]" />
                    <span>{tier.badge}</span>
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="font-serif text-2xl font-bold text-[#2C0B12]">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-[#7E7468] mt-1">
                      {tier.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 my-6 pb-6 border-b border-[#EAE3D5]">
                    <span className="font-serif text-4xl sm:text-5xl font-bold text-[#621927]">
                      {t.pricing.currency}{tier.price}
                    </span>
                    <span className="text-xs font-medium text-[#7E7468]">
                      / {tier.period}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3.5 mb-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#4A453E] block">
                      {language === 'hu' ? 'Mit tartalmaz:' : language === 'en' ? 'What’s included:' : 'Ce este inclus:'}
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
                    className={`w-full py-3.5 px-6 rounded-xl font-medium text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                      isPopular
                        ? 'bg-[#621927] hover:bg-[#46121C] text-[#FDFBF7] shadow-md hover:shadow-lg border border-[#C29B48]/40'
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

        {/* Reassurance Banner */}
        <div className="mt-12 text-center text-xs text-[#7E7468] max-w-xl mx-auto space-y-1">
          <p className="flex items-center justify-center gap-1.5 font-medium text-[#2E5844]">
            <ShieldCheck className="w-4 h-4" />
            <span>{t.pricing.guarantee}</span>
          </p>
          <p>{t.pricing.digitalNotice}</p>
        </div>
      </div>
    </section>
  );
};
