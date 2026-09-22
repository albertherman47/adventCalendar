import React from 'react';
import { Smartphone, Sparkles, Check, DownloadCloud, Lock, Gift } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { getTranslations } from '../data/translations';

interface HowItWorksProps {
  language: SupportedLanguage;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ language }) => {
  const t = getTranslations(language);

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#EAE3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EAE3D5] text-xs text-[#7E2232] font-medium mb-4">
            <Sparkles className="w-3 h-3 text-[#C29B48]" />
            <span>Simplitate înainte de toate</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2C0B12] mb-4">
            {t.howItWorks.heading}
          </h2>
          <p className="text-base text-[#6B645B]">
            {t.howItWorks.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {t.howItWorks.steps.map((step, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl p-6 sm:p-8 bg-white border border-[#EAE3D5] shadow-xs flex flex-col justify-between hover:shadow-md transition-all group"
            >
              <div>
                <span className="font-serif text-4xl font-bold text-[#D8B76E] tracking-wider block mb-4 group-hover:text-[#C29B48] transition-colors">
                  {step.number}
                </span>
                <h3 className="font-serif text-xl font-semibold text-[#2C0B12] mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-[#5E574D] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#F1E9DB] flex items-center gap-2 text-xs font-medium text-[#2E5844]">
                <Check className="w-4 h-4 text-[#2E5844]" />
                <span>
                  {idx === 0 && "Plată securizată • Acces instant"}
                  {idx === 1 && "Fiecare dimineață de la 1 la 24 Dec"}
                  {idx === 2 && "Doar 5–15 minute de relaxare"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Digital Notice Banner */}
        <div className="mt-12 max-w-2xl mx-auto text-center p-4 rounded-xl bg-[#F7EAEF]/60 border border-[#B83D54]/20 text-xs sm:text-sm text-[#621927]">
          <div className="flex items-center justify-center gap-2 font-medium">
            <DownloadCloud className="w-4 h-4" />
            <span>{t.howItWorks.digitalDisclaimer}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
