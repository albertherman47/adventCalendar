import React, { useState } from 'react';
import { X, Search, CheckCircle2, AlertCircle, Sparkles, KeyRound, ShieldCheck } from 'lucide-react';
import { SupportedLanguage, PricingTier } from '../types';
import { restoreSubscriptionByEmail } from '../lib/subscriptionService';

interface RestoreSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
  onSuccessRestore: (tier: PricingTier, email: string) => void;
  onQuickSimulateTier?: (tier: PricingTier) => void;
}

export const RestoreSubscriptionModal: React.FC<RestoreSubscriptionModalProps> = ({
  isOpen,
  onClose,
  language,
  onSuccessRestore,
  onQuickSimulateTier,
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const isHu = language === 'hu';

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const profile = await restoreSubscriptionByEmail(email);
      if (profile && profile.hasPurchased) {
        setSuccessMsg(
          isHu
            ? `Sikeres azonosítás! A(z) ${profile.tier.toUpperCase()} csomag aktiválva lett.`
            : `Verified! Your ${profile.tier.toUpperCase()} plan has been restored.`
        );
        setTimeout(() => {
          onSuccessRestore(profile.tier, email);
          onClose();
        }, 1200);
      } else {
        setErrorMsg(
          isHu
            ? 'Nem találtunk aktív vásárlást ezzel az email címmel a felhőbeli adatbázisban.'
            : 'No active subscription found with this email in the database.'
        );
      }
    } catch (err) {
      setErrorMsg(
        isHu
          ? 'Hiba történt a felhőbeli adatbázis lekérdezése közben.'
          : 'Failed to query the database. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 no-print">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-[#D8B76E]/40 shadow-2xl overflow-hidden animate-scale-in">
        <div className="px-6 py-5 bg-[#FAF7F2] border-b border-[#EAE3D5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#621927] text-[#D8B76E] flex items-center justify-center">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#2C0B12]">
                {isHu ? 'Vásárlás Visszaállítása' : 'Restore Subscription'}
              </h3>
              <p className="text-[11px] text-[#7E7468]">
                {isHu ? 'Adatbázis-szinkronizáció email cím alapján' : 'Cloud database sync via your email'}
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

        <div className="p-6 space-y-5">
          <p className="text-xs text-[#6B645B] leading-relaxed">
            {isHu
              ? 'Ha korábban már előfizettél vagy megvásároltad a Christmas Reset-et egy másik gépen vagy telefonon, add meg a vásárláskor használt email címed, és a rendszerünk automatikusan szinkronizálja a felhőbeli adatbázisból.'
              : 'Enter the email you used during checkout to restore your full lifetime subscription from the cloud database.'}
          </p>

          <form onSubmit={handleLookup} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#4A453E] block mb-1">
                {isHu ? 'Vásárláskor használt email cím:' : 'Your purchase email:'}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pelda@email.hu"
                className="w-full bg-[#FAF7F2] border border-[#EAE3D5] focus:border-[#C29B48] rounded-xl px-3.5 py-2.5 text-sm text-[#2C0B12] outline-hidden transition-colors"
              />
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#621927] hover:bg-[#46121C] text-white py-3 rounded-xl font-medium text-xs tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <span>{isHu ? 'Adatbázis keresése...' : 'Checking database...'}</span>
              ) : (
                <>
                  <Search className="w-4 h-4 text-[#D8B76E]" />
                  <span>{isHu ? 'Előfizetés lekérdezése' : 'Lookup Subscription'}</span>
                </>
              )}
            </button>
          </form>

          {/* Developer / Demo Quick Testing Section */}
          {onQuickSimulateTier && (
            <div className="pt-4 border-t border-[#EAE3D5]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7E7468] block mb-2">
                {isHu ? '⚡ Gyors Tesztelés & Csomagváltás (Értékelőknek):' : '⚡ Quick Test & Switch (For Reviewers):'}
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onQuickSimulateTier('free');
                    onClose();
                  }}
                  className="py-1.5 px-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-[11px] font-medium transition-colors cursor-pointer text-center"
                >
                  Ingyenes (Zárak)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onQuickSimulateTier('standard');
                    onClose();
                  }}
                  className="py-1.5 px-2 bg-amber-50 hover:bg-amber-100 text-[#7E2232] border border-[#C29B48]/30 rounded-lg text-[11px] font-medium transition-colors cursor-pointer text-center"
                >
                  Standard (€9.90)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onQuickSimulateTier('premium');
                    onClose();
                  }}
                  className="py-1.5 px-2 bg-[#621927] hover:bg-[#46121C] text-white rounded-lg text-[11px] font-medium transition-colors cursor-pointer text-center"
                >
                  Prémium (Teljes)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
