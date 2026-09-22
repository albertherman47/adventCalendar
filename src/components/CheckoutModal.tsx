import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, ShieldCheck, Sparkles, CheckCircle2, ArrowRight, CreditCard, Lock, Download, Gift } from 'lucide-react';
import { SupportedLanguage, PricingTier } from '../types';
import { getTranslations } from '../data/translations';
import { trackEvent } from '../utils/analytics';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier: PricingTier;
  onTierChange: (tier: PricingTier) => void;
  language: SupportedLanguage;
  onSuccessUnlock: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedTier,
  onTierChange,
  language,
  onSuccessUnlock,
}) => {
  if (!isOpen) return null;

  const t = getTranslations(language);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isGift, setIsGift] = useState(false);
  const [giftRecipientEmail, setGiftRecipientEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const currentTierData = t.pricing.tiers.find((t) => t.id === selectedTier) || t.pricing.tiers[1];

  const handleCompleteUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    trackEvent('checkout_start', { tier: selectedTier, email, isGift });

    setTimeout(() => {
      setIsProcessing(false);
      trackEvent('purchase_complete', { tier: selectedTier, email, isGift });

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#621927', '#C29B48', '#2E5844', '#D8B76E'],
        });
      } catch {
        // safe
      }

      onSuccessUnlock();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 no-print">
      <div className="relative w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl border border-[#D8B76E]/40 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-[#FAF7F2] border-b border-[#EAE3D5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#621927] text-[#D8B76E] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#2C0B12]">
                Finalizare Acces Christmas Reset
              </h3>
              <p className="text-[11px] text-[#7E7468]">
                Livrare digitală instantanee • Ediția 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#7E7468] hover:text-[#2C0B12] rounded-full hover:bg-[#F1E9DB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleCompleteUnlock} className="p-6 sm:p-8 space-y-6">
          {/* Tier Selector */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#4A453E] block mb-2">
              Pachetul ales:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {t.pricing.tiers.map((tier) => (
                <button
                  type="button"
                  key={tier.id}
                  onClick={() => onTierChange(tier.id as PricingTier)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedTier === tier.id
                      ? 'bg-[#621927] text-white border-[#621927] shadow-xs'
                      : 'bg-[#FAF7F2] text-[#4A453E] border-[#EAE3D5] hover:bg-white'
                  }`}
                >
                  <span className="font-serif font-bold text-sm block">
                    {tier.name}
                  </span>
                  <span className={`text-xs font-semibold ${selectedTier === tier.id ? 'text-[#D8B76E]' : 'text-[#621927]'}`}>
                    €{tier.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-3.5">
            <div>
              <label className="text-xs font-medium text-[#4A453E] block mb-1">
                Prenumele tău:
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ex: Elena"
                className="w-full bg-[#FAF7F2] border border-[#EAE3D5] focus:border-[#C29B48] rounded-xl px-3.5 py-2.5 text-sm text-[#2C0B12] outline-hidden transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#4A453E] block mb-1">
                Adresa ta de email (pentru trimiterea accesului):
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nume@exemplu.ro"
                className="w-full bg-[#FAF7F2] border border-[#EAE3D5] focus:border-[#C29B48] rounded-xl px-3.5 py-2.5 text-sm text-[#2C0B12] outline-hidden transition-colors"
              />
            </div>

            {/* Gift option toggle */}
            <div className="pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#4A453E]">
                <input
                  type="checkbox"
                  checked={isGift}
                  onChange={(e) => setIsGift(e.target.checked)}
                  className="rounded text-[#621927] focus:ring-[#621927]"
                />
                <span className="flex items-center gap-1 font-medium">
                  <Gift className="w-3.5 h-3.5 text-[#621927]" />
                  Doresc să ofer acest calendar cadou unei persoane dragi
                </span>
              </label>

              {isGift && (
                <input
                  type="email"
                  placeholder="Emailul persoanei dragi..."
                  value={giftRecipientEmail}
                  onChange={(e) => setGiftRecipientEmail(e.target.value)}
                  className="mt-2 w-full bg-[#FAF7F2] border border-[#EAE3D5] rounded-xl px-3.5 py-2 text-xs text-[#2C0B12]"
                />
              )}
            </div>
          </div>

          {/* Prototype Reassurance Box */}
          <div className="p-4 rounded-xl bg-[#F7EAEF]/70 border border-[#621927]/20 text-xs text-[#621927] space-y-1">
            <div className="font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2E5844]" />
              <span>Gata pentru Stripe Checkout (Prototip Live)</span>
            </div>
            <p className="text-[#6B645B] leading-relaxed">
              În acest prototip funcțional, apeși butonul de mai jos pentru a activa instantaneu accesul la produs. Codul este structurat pentru a conecta ușor un endpoint Stripe real.
            </p>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-[#621927] hover:bg-[#46121C] text-[#FDFBF7] py-3.5 px-6 rounded-xl font-medium text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-[#C29B48]/50 disabled:opacity-75"
          >
            {isProcessing ? (
              <span>Se configurează accesul...</span>
            ) : (
              <>
                <Lock className="w-4 h-4 text-[#D8B76E]" />
                <span>Activează Accesul ({t.pricing.currency}{currentTierData.price})</span>
                <ArrowRight className="w-4 h-4 text-[#D8B76E]" />
              </>
            )}
          </button>

          <div className="text-center text-[11px] text-[#7E7468]">
            Plată securizată • Acces pe viață la ediția 2026 • Fără taxe ascunse
          </div>
        </form>
      </div>
    </div>
  );
};
