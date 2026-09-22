import React from 'react';
import { XCircle, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { getTranslations } from '../data/translations';

interface ProblemSectionProps {
  language: SupportedLanguage;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ language }) => {
  const t = getTranslations(language);

  return (
    <section className="py-16 sm:py-24 bg-[#FCFAF7] border-b border-[#EAE3D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#EAE3D5] text-xs text-[#7E2232] font-medium mb-4">
            <Sparkles className="w-3 h-3 text-[#C29B48]" />
            <span>Contrastul lunii Decembrie</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2C0B12] leading-tight mb-4">
            {t.problem.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#6B645B] font-normal leading-relaxed">
            {t.problem.subheading}
          </p>
        </div>

        {/* Contrasting Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* LEFT: December Without a Plan */}
          <div className="rounded-2xl p-6 sm:p-8 bg-[#FAF7F2] border border-[#E5DBC7] shadow-xs relative">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#EAE3D5]">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A83A4B]">
                  Haos & Epuizare
                </span>
                <h3 className="font-serif text-2xl font-semibold text-[#2C0B12]">
                  {t.problem.withoutPlanTitle}
                </h3>
                <p className="text-xs text-[#7E7468] mt-1">
                  {t.problem.withoutPlanSubtitle}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#F7EAEF] flex items-center justify-center text-[#A83A4B]">
                <AlertCircle className="w-5 h-5" />
              </div>
            </div>

            <ul className="space-y-4">
              {t.problem.withoutPlanItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-[#B83D54] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#5E574D] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-4 border-t border-[#EAE3D5] text-xs text-[#7E7468] italic">
              Rezultatul: oboseală acumulată chiar în noaptea de Ajun, când ar trebui să te simți cel mai bine.
            </div>
          </div>

          {/* RIGHT: Your Christmas Reset */}
          <div className="rounded-2xl p-6 sm:p-8 bg-white border-2 border-[#2E5844]/30 shadow-md relative">
            <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-[#2E5844] text-white text-xs font-semibold tracking-wide shadow-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D8B76E]" />
              <span>Experiența Reset</span>
            </div>

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E6EFEA]">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2E5844]">
                  Armonie & Tihnă
                </span>
                <h3 className="font-serif text-2xl font-semibold text-[#172F24]">
                  {t.problem.withPlanTitle}
                </h3>
                <p className="text-xs text-[#5E574D] mt-1">
                  {t.problem.withPlanSubtitle}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#E6EFEA] flex items-center justify-center text-[#2E5844]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <ul className="space-y-4">
              {t.problem.withPlanItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#2E5844] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#2D2A26] font-medium leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-4 border-t border-[#E6EFEA] text-xs text-[#2E5844] font-medium italic">
              Rezultatul: claritate, bucurie curată și prezență autentică alături de cei pe care îi iubești.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
