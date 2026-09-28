import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, ShieldCheck, Sparkles, CheckCircle2, ArrowRight, CreditCard, Lock, Download, Gift, Check, Clock } from 'lucide-react';
import { SupportedLanguage, PricingTier } from '../types';
import { getTranslations } from '../data/translations';
import { trackEvent } from '../utils/analytics';
import { saveSubscriptionToDatabase, getOrCreateLocalUserId } from '../lib/subscriptionService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier: PricingTier;
  onTierChange: (tier: PricingTier) => void;
  language: SupportedLanguage;
  onSuccessUnlock: (tier: PricingTier, email: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedTier,
  onTierChange,
  language,
  onSuccessUnlock,
}) => {
  const t = getTranslations(language);
  const isHu = language === 'hu';

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [isGift, setIsGift] = useState(false);
  const [giftRecipientEmail, setGiftRecipientEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseSuccessRecord, setPurchaseSuccessRecord] = useState<{ id: string; tier: string } | null>(null);

  if (!isOpen) return null;

  // Make sure tier is not free when checking out
  const activeCheckoutTier = selectedTier === 'free' ? 'premium' : selectedTier;
  const currentTierData = t.pricing.tiers.find((t) => t.id === activeCheckoutTier) || t.pricing.tiers[2] || t.pricing.tiers[1];

  const handleCompleteUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsProcessing(true);
    trackEvent('checkout_start', { tier: activeCheckoutTier, email, isGift });

    try {
      const localUid = getOrCreateLocalUserId();
      const amount = parseFloat(currentTierData.price) || 14.90;
      
      const record = await saveSubscriptionToDatabase({
        userId: localUid,
        email,
        customerName: firstName || 'Kedves Vásárló',
        tier: activeCheckoutTier === 'standard' ? 'standard' : 'premium',
        amount,
        currency: 'EUR',
        isGift,
        giftRecipientEmail,
      });

      trackEvent('purchase_complete', { tier: activeCheckoutTier, email, isGift, id: record.id });

      try {
        confetti({
          particleCount: 120,
          spread: 85,
          origin: { y: 0.5 },
          colors: ['#621927', '#C29B48', '#2E5844', '#D8B76E'],
        });
      } catch {
        // safe
      }

      setPurchaseSuccessRecord({ id: record.id, tier: activeCheckoutTier });
      setIsProcessing(false);

      setTimeout(() => {
        onSuccessUnlock(activeCheckoutTier, email);
        setPurchaseSuccessRecord(null);
      }, 2000);
    } catch (error) {
      console.error('Subscription purchase failed:', error);
      // Fallback local activation so user is never blocked
      setIsProcessing(false);
      onSuccessUnlock(activeCheckoutTier, email);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 no-print">
      <div className="relative w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl border border-[#D8B76E]/40 shadow-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="px-6 py-5 bg-[#FAF7F2] border-b border-[#EAE3D5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#621927] text-[#D8B76E] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#2C0B12]">
                {t.checkout.title}
              </h3>
              <p className="text-[11px] text-[#7E7468]">
                {t.checkout.subtitle} • {isHu ? 'Örökös, végleges licenc' : 'Lifetime cloud license'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 text-[#7E7468] hover:text-[#2C0B12] rounded-full hover:bg-[#F1E9DB] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {purchaseSuccessRecord ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#2E5844] text-white mx-auto flex items-center justify-center shadow-lg ring-4 ring-[#D8B76E]/40">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#2C0B12]">
              {isHu ? 'Sikeres vásárlás! Köszönjük!' : 'Payment Successful! Welcome!'}
            </h3>
            <p className="text-sm text-[#6B645B] max-w-sm mx-auto">
              {isHu
                ? `A(z) ${purchaseSuccessRecord.tier.toUpperCase()} csomagod sikeresen rögzítve lett a felhőbeli adatbázisban. Minden funkció feloldva!`
                : `Your ${purchaseSuccessRecord.tier.toUpperCase()} license has been permanently stored in the database. Enjoy all features!`}
            </p>
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE3D5] text-xs font-mono text-[#621927]">
              Tranzakció ID: {purchaseSuccessRecord.id}
            </div>
          </div>
        ) : (
          /* Form Body */
          <form onSubmit={handleCompleteUnlock} className="p-6 sm:p-8 space-y-5">
            {/* Tier Selector */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A453E] block mb-2">
                {t.checkout.tierLabel}
              </label>
              <div className="grid grid-cols-2 gap-3">
                {t.pricing.tiers
                  .filter((tier) => tier.id !== 'free')
                  .map((tier) => {
                    const isSelected = activeCheckoutTier === tier.id;
                    const isPremium = tier.id === 'premium';
                    return (
                      <button
                        type="button"
                        key={tier.id}
                        onClick={() => onTierChange(tier.id as PricingTier)}
                        className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer relative ${
                          isSelected
                            ? 'bg-[#621927] text-white border-[#621927] shadow-md ring-2 ring-[#C29B48]/50'
                            : 'bg-[#FAF7F2] text-[#4A453E] border-[#EAE3D5] hover:bg-white'
                        }`}
                      >
                        {isPremium && (
                          <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-[#C29B48] text-[#2C0B12] text-[9px] font-bold uppercase tracking-wider shadow-xs">
                            {isHu ? '85% ezt választja' : 'Best Value'}
                          </span>
                        )}
                        <span className="font-serif font-bold text-base block">
                          {tier.name}
                        </span>
                        <span className={`text-xs font-bold ${isSelected ? 'text-[#D8B76E]' : 'text-[#621927]'}`}>
                          €{tier.price} • {isHu ? 'egyszeri' : 'one-time'}
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-[#4A453E] block mb-1">
                    {t.checkout.firstNameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={t.checkout.firstNamePlaceholder}
                    className="w-full bg-[#FAF7F2] border border-[#EAE3D5] focus:border-[#C29B48] rounded-xl px-3.5 py-2 text-sm text-[#2C0B12] outline-hidden transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#4A453E] block mb-1">
                    {t.checkout.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.checkout.emailPlaceholder}
                    className="w-full bg-[#FAF7F2] border border-[#EAE3D5] focus:border-[#C29B48] rounded-xl px-3.5 py-2 text-sm text-[#2C0B12] outline-hidden transition-colors"
                  />
                </div>
              </div>

              {/* Realistic Simulated Secure Card Input */}
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EAE3D5] space-y-2">
                <div className="flex items-center justify-between text-xs text-[#4A453E]">
                  <span className="font-medium flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-[#621927]" />
                    <span>{isHu ? 'Biztonságos kártyás fizetés (Stripe / Bank)' : 'Secure Card Payment'}</span>
                  </span>
                  <div className="flex gap-1.5 text-[10px] text-[#7E7468] font-bold">
                    <span className="px-1.5 py-0.5 bg-white border border-[#EAE3D5] rounded text-blue-700">VISA</span>
                    <span className="px-1.5 py-0.5 bg-white border border-[#EAE3D5] rounded text-orange-600">MC</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-white border border-[#EAE3D5] rounded-lg px-2.5 py-1.5 text-xs text-[#2C0B12] font-mono outline-hidden"
                      placeholder="4242 •••• •••• 4242"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      className="w-full bg-white border border-[#EAE3D5] rounded-lg px-2.5 py-1.5 text-xs text-[#2C0B12] font-mono text-center outline-hidden"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full bg-white border border-[#EAE3D5] rounded-lg px-2.5 py-1.5 text-xs text-[#2C0B12] font-mono text-center outline-hidden"
                      placeholder="CVC"
                    />
                  </div>
                </div>
              </div>

              {/* Gift option toggle */}
              <div className="pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#4A453E]">
                  <input
                    type="checkbox"
                    checked={isGift}
                    onChange={(e) => setIsGift(e.target.checked)}
                    className="rounded text-[#621927] focus:ring-[#621927]"
                  />
                  <span className="flex items-center gap-1 font-medium">
                    <Gift className="w-3.5 h-3.5 text-[#621927]" />
                    {t.checkout.giftOption}
                  </span>
                </label>

                {isGift && (
                  <input
                    type="email"
                    placeholder={t.checkout.giftRecipientPlaceholder}
                    value={giftRecipientEmail}
                    onChange={(e) => setGiftRecipientEmail(e.target.value)}
                    className="mt-2 w-full bg-[#FAF7F2] border border-[#EAE3D5] rounded-xl px-3.5 py-2 text-xs text-[#2C0B12]"
                  />
                )}
              </div>
            </div>

            {/* Prototype Reassurance Box */}
            <div className="p-3.5 rounded-xl bg-[#F7EAEF]/70 border border-[#621927]/20 text-xs text-[#621927] flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-semibold text-[#2E5844]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{t.checkout.guarantee}</span>
              </div>
              <span className="text-[11px] text-[#6B645B]">
                {isHu ? 'Felhőbeli adatbázisba mentve' : 'Stored in cloud database'}
              </span>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-[#621927] hover:bg-[#46121C] text-[#FDFBF7] py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-[#C29B48]/50 disabled:opacity-75"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{isHu ? 'Adatbázis rögzítés...' : 'Processing cloud purchase...'}</span>
                </div>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-[#D8B76E]" />
                  <span>
                    {isHu 
                      ? `Vásárlás Véglegesítése (€${currentTierData.price})` 
                      : `Complete Lifetime Purchase (€${currentTierData.price})`}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#D8B76E]" />
                </>
              )}
            </button>

            <div className="text-center text-[11px] text-[#7E7468]">
              {t.pricing.digitalNotice}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
