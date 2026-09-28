import React from 'react';
import { X, Lock, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Heart, Star } from 'lucide-react';
import { SupportedLanguage, PricingTier } from '../types';
import { getTranslations } from '../data/translations';

interface TierFeatureGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  requiredTier: 'standard' | 'premium';
  featureTitle: string;
  featureSubtitle?: string;
  language: SupportedLanguage;
  onSelectTier: (tier: PricingTier) => void;
  onOpenRestoreModal: () => void;
}

export const TierFeatureGateModal: React.FC<TierFeatureGateModalProps> = ({
  isOpen,
  onClose,
  requiredTier,
  featureTitle,
  featureSubtitle,
  language,
  onSelectTier,
  onOpenRestoreModal,
}) => {
  if (!isOpen) return null;

  const t = getTranslations(language);

  const isHu = language === 'hu';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 no-print">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-[#D8B76E]/50 shadow-2xl overflow-hidden animate-scale-in">
        {/* Top Gold Gradient Header */}
        <div className="bg-gradient-to-r from-[#2C0B12] via-[#621927] to-[#2C0B12] p-6 text-white text-center relative overflow-hidden">
          {/* Background sparkles decoration */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D8B76E_1px,transparent_1px)] [background-size:12px_12px]" />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-[#D8B76E]/50 mb-3 text-[#D8B76E] shadow-inner">
            <Lock className="w-6 h-6" />
          </div>

          <span className="block text-[11px] font-semibold tracking-widest uppercase text-[#D8B76E] mb-1">
            {requiredTier === 'premium' 
              ? (isHu ? 'PRÉMIUM FUNKCIÓ' : 'PREMIUM FEATURE')
              : (isHu ? 'TELJES ADVENTI CSOMAGHOZ KÖTÖTT' : 'REQUIRES STANDARD OR PREMIUM ACCESS')}
          </span>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
            {featureTitle}
          </h3>

          <p className="text-xs sm:text-sm text-[#F1E9DB] max-w-sm mx-auto">
            {featureSubtitle || (isHu 
              ? 'Nyisd fel a teljes adventi utazást, és éld át a karácsonyt stressz és kapkodás nélkül!' 
              : 'Unlock the full 24-day journey and experience a stress-free Christmas!')}
          </p>
        </div>

        {/* Modal Body & Benefits */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#621927] block">
              {isHu ? 'Mit kapsz az azonnali végleges hozzáféréssel?' : 'What you get with full access:'}
            </span>

            <div className="grid grid-cols-1 gap-2.5 text-xs sm:text-sm text-[#4A453E]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2E5844] shrink-0 mt-0.5" />
                <span>{isHu ? 'Mind a 24 adventi ablak korlátlan, azonnali elérése' : 'Full access to all 24 advent doors'}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2E5844] shrink-0 mt-0.5" />
                <span>{isHu ? 'Interaktív költségvetés- és ajándéktervező valós időben' : 'Interactive budget & gift planning tools'}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2E5844] shrink-0 mt-0.5" />
                <span>{isHu ? 'Karácsonyi Vészhelyzet Mód (14/7/3 napos pánikmentes tervek)' : 'Holiday Emergency Mode & quick checklists'}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2E5844] shrink-0 mt-0.5" />
                <span>{isHu ? '9+ profi, nyomtatható PDF munkalap és családi kvíz' : '9+ printable PDF worksheets and family games'}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2E5844] shrink-0 mt-0.5" />
                <span>{isHu ? 'Adatbázisban tárolt végleges hozzáférés, bármilyen eszközről' : 'Permanent cloud access across phone and PC'}</span>
              </div>
            </div>
          </div>

          {/* Social proof mini quote */}
          <div className="bg-[#FAF7F2] border border-[#EAE3D5] rounded-2xl p-3.5 flex items-center gap-3">
            <div className="flex text-[#C29B48]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <p className="text-xs text-[#6B645B] italic">
              {isHu 
                ? '„Végre egy olyan decemberünk volt, amikor nem fáradtan estünk be a fa alá!” — D. Laura'
                : '“Finally a December where we arrived at Christmas Eve calm and rested!” — Laura'}
            </p>
          </div>

          {/* CTA options */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => {
                onClose();
                onSelectTier('premium');
              }}
              className="w-full bg-[#621927] hover:bg-[#46121C] text-[#FDFBF7] py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-[#C29B48]/50"
            >
              <Sparkles className="w-4 h-4 text-[#D8B76E]" />
              <span>{isHu ? 'Prémium Csomag feloldása (€14.90 • Végleges)' : 'Unlock Premium (€14.90 • Lifetime)'}</span>
              <ArrowRight className="w-4 h-4 text-[#D8B76E]" />
            </button>

            {requiredTier !== 'premium' && (
              <button
                onClick={() => {
                  onClose();
                  onSelectTier('standard');
                }}
                className="w-full bg-[#FAF7F2] hover:bg-white text-[#2C0B12] py-2.5 px-4 rounded-xl font-semibold text-xs tracking-wide transition-all border border-[#D8B76E]/40 hover:border-[#621927] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{isHu ? 'Standard csomag választása (€9.90)' : 'Standard package (€9.90)'}</span>
              </button>
            )}

            <div className="flex items-center justify-between text-[11px] text-[#7E7468] pt-1">
              <span className="flex items-center gap-1 text-[#2E5844] font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isHu ? '100% Pénzvisszafizetési garancia' : '100% Money-Back Guarantee'}</span>
              </span>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenRestoreModal();
                }}
                className="underline hover:text-[#621927] transition-colors cursor-pointer"
              >
                {isHu ? 'Már fizettél? Hozzáférés visszaállítása' : 'Already purchased? Restore access'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
