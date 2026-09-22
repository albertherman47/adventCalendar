import React, { useState } from 'react';
import { DownloadCloud, Sparkles, Check, CheckCircle2, ArrowRight } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { getTranslations } from '../data/translations';
import { trackEvent } from '../utils/analytics';

interface EmailCaptureProps {
  language: SupportedLanguage;
  onOpenStarterPack: () => void;
}

export const EmailCapture: React.FC<EmailCaptureProps> = ({
  language,
  onOpenStarterPack,
}) => {
  const t = getTranslations(language);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    trackEvent('email_capture_submit', { email, firstName });
    setIsSubmitted(true);
  };

  return (
    <section className="py-16 bg-[#F5EEE2] border-b border-[#EAE3D5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D8B76E]/50 shadow-md relative overflow-hidden">
          {/* Subtle festive background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F2E4C6]/30 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#EAE3D5] text-xs text-[#7E2232] font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C29B48]" />
              <span>Pachet Gratuit de Start</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#2C0B12] mb-3">
              {t.emailReminder.heading}
            </h2>
            <p className="text-sm sm:text-base text-[#5E574D] mb-8">
              {t.emailReminder.subheading}
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-[#E6EFEA] border border-[#2E5844]/30 space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#2E5844] text-white flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#172F24]">
                  {t.emailReminder.successMessage}
                </h3>
                <p className="text-xs text-[#2E5844]">
                  Descarcă acum primele 3 fișe practice pentru organizare.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onOpenStarterPack}
                    className="inline-flex items-center gap-2 bg-[#2E5844] hover:bg-[#172F24] text-white px-6 py-2.5 rounded-xl text-xs font-semibold shadow-xs cursor-pointer transition-colors"
                  >
                    <DownloadCloud className="w-4 h-4" />
                    <span>Descarcă Ghidul de Start Acum</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    placeholder={t.emailReminder.namePlaceholder}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="sm:w-1/3 bg-[#FAF7F2] border border-[#EAE3D5] focus:border-[#C29B48] rounded-xl px-3.5 py-3 text-xs text-[#2C0B12] outline-hidden"
                  />
                  <input
                    type="email"
                    required
                    placeholder={t.emailReminder.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-[#FAF7F2] border border-[#EAE3D5] focus:border-[#C29B48] rounded-xl px-3.5 py-3 text-xs text-[#2C0B12] outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#621927] hover:bg-[#46121C] text-[#FDFBF7] py-3.5 px-6 rounded-xl font-medium text-xs sm:text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer border border-[#C29B48]/40"
                >
                  <span>{t.emailReminder.cta}</span>
                  <ArrowRight className="w-4 h-4 text-[#D8B76E]" />
                </button>

                <p className="text-[11px] text-[#8E867B] pt-1">
                  {t.emailReminder.disclaimer}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
