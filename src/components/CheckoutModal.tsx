import React from 'react';
import { X, CreditCard, UserRound, CheckCircle2, LockKeyhole } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import { SupportedLanguage, PricingTier } from '../types';
import { getTranslations } from '../data/translations';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier: PricingTier;
  onTierChange: (tier: PricingTier) => void;
  language: SupportedLanguage;
  onOpenAccount: () => void;
  user: User | null;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, selectedTier, onTierChange, language, onOpenAccount, user }) => {
  const t = getTranslations(language);
  if (!isOpen) return null;
  const hu = language === 'hu';
  const plans = t.pricing.tiers.filter((tier) => tier.id === 'standard' || tier.id === 'premium');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="checkout-title" className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#D8B76E]/40 bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-[#EAE3D5] bg-[#FAF7F2] px-6 py-5">
          <h2 id="checkout-title" className="flex items-center gap-2 font-serif text-xl font-bold text-[#2C0B12]"><CreditCard className="h-5 w-5" />{hu ? 'Csomagválasztás' : 'Choose a plan'}</h2>
          <button onClick={onClose} aria-label={hu ? 'Bezárás' : 'Close'} className="rounded-full p-2 text-[#7E7468] hover:bg-[#F1E9DB]"><X className="h-5 w-5" /></button>
        </header>
        <div className="space-y-5 p-6">
          <div className="grid grid-cols-2 gap-3">
            {plans.map((plan) => (
              <button key={plan.id} onClick={() => onTierChange(plan.id as PricingTier)} className={`rounded-2xl border p-4 text-center ${selectedTier === plan.id ? 'border-[#621927] bg-[#621927] text-white' : 'border-[#EAE3D5] bg-[#FAF7F2] text-[#2C0B12]'}`}>
                <span className="block font-serif text-lg font-bold">{plan.name}</span>
                <span className="mt-1 block text-sm">€{plan.price} · {hu ? 'egyszeri' : 'one-time'}</span>
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-[#EAE3D5] bg-[#FAF7F2] p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#2C0B12]">
              {user ? <CheckCircle2 className="h-4 w-4 text-[#2E5844]" /> : <LockKeyhole className="h-4 w-4 text-[#7E7468]" />}
              {user ? (hu ? 'Bejelentkezve' : 'Signed in') : (hu ? 'Fiók szükséges' : 'Account required')}
            </div>
            <p className="text-sm leading-relaxed text-[#6B645B]">
              {user
                ? (hu ? `A kiválasztott csomag ehhez a fiókhoz kapcsolódik: ${user.email}.` : `The selected plan will be linked to ${user.email}.`)
                : (hu ? 'A csomaghoz tartozó hozzáférés a fiókodhoz kapcsolódik.' : 'Plan access is linked to your account.')}
            </p>
          </div>
          <div role="status" className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
            <strong className="mb-1 block">{hu ? 'A fizetés jelenleg nem érhető el' : 'Checkout is not available yet'}</strong>
            {hu ? 'A fizetési szolgáltató még nincs beállítva. Ezért most nem történik terhelés, és a csomag kiválasztása nem ad fizetős hozzáférést.' : 'The payment provider has not been configured. You will not be charged, and selecting a plan does not grant paid access.'}
          </div>
          <button onClick={onOpenAccount} className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#621927] bg-white py-3 text-sm font-bold text-[#621927] hover:bg-[#FAF7F2]"><UserRound className="h-4 w-4" />{user ? (hu ? 'Fiók megtekintése' : 'View account') : (hu ? 'Fiók létrehozása vagy bejelentkezés' : 'Create account or sign in')}</button>
        </div>
      </section>
    </div>
  );
};
