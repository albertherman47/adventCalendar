import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { getTranslations } from '../data/translations';

interface FAQSectionProps {
  language: SupportedLanguage;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ language }) => {
  const t = getTranslations(language);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#EAE3D5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EAE3D5] text-xs text-[#7E2232] font-medium mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#C29B48]" />
            <span>Răspunsuri transparente</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2C0B12] mb-3">
            {t.faq.heading}
          </h2>
          <p className="text-sm sm:text-base text-[#6B645B]">
            {t.faq.subheading}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white border border-[#EAE3D5] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FCFAF7] transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg font-semibold text-[#2C0B12]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C29B48] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-[#5E574D] leading-relaxed border-t border-[#F1E9DB]">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
