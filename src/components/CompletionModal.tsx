import React, { useRef, useState } from 'react';
import { Sparkles, CheckCircle2, Download, Copy, Check, X, Heart, BookOpen, Share2, Printer } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { trackEvent } from '../utils/analytics';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
  onNavigateToPrintables: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onClose,
  language,
  onNavigateToPrintables,
}) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const isHu = language === 'hu';
  const isEn = language === 'en';

  const shareText = isHu
    ? "Sikeresen végigcsináltam a Christmas Reset 2026 programot! 24 / 24 nap teljesítve egy nyugodt, szeretetteljes Karácsonyért. ✨🎄"
    : isEn
    ? "I completed my Christmas Reset 2026. 24 / 24 days completed for a calm, joyful Christmas! ✨🎄"
    : "Am finalizat cu succes Christmas Reset 2026! 24 / 24 zile completate pentru un Crăciun calm, organizat și plin de suflet. ✨🎄";

  const handleCopyShare = () => {
    try {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      trackEvent('share_card_copied');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 no-print">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border-2 border-[#C29B48] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Top Celebration Banner */}
        <div className="bg-gradient-to-r from-[#621927] via-[#46121C] to-[#2E5844] p-6 sm:p-8 text-white text-center relative overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 border border-[#D8B76E]/40 text-[#D8B76E] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isHu ? "Küldetés Teljesítve" : isEn ? "Mission Accomplished" : "Misiune Îndeplinită"}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            {isHu
              ? "A karácsonyi felkészülésed befejeződött."
              : isEn
              ? "Your Christmas Reset is complete."
              : "Crăciunul tău este complet resetat."}
          </h2>

          <div className="mt-3 inline-block px-4 py-1.5 rounded-full bg-white/20 text-sm sm:text-base font-bold text-[#FDFBF7] border border-white/30 shadow-xs">
            ✨ 24 / 24 {isHu ? "nap teljesítve" : isEn ? "days completed" : "zile completate"}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Heartfelt Reflection Prompt */}
          <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D5] space-y-2 text-center">
            <Heart className="w-6 h-6 text-[#C29B48] mx-auto" />
            <p className="font-serif text-lg text-[#2C0B12] italic">
              {isHu
                ? "„A karácsony nem arról szól, hogy minden tökéletes legyen, hanem arról, hogy jelen legyél szívvel és békével.”"
                : isEn
                ? "“Christmas is not about perfection, it is about presence, peace, and warmth with the ones you love.”"
                : "„Crăciunul nu este despre perfecțiune exterioară, ci despre prezență caldă, suflet împăcat și bucurie împărtășită.”"}
            </p>
            <p className="text-xs text-[#7E7468]">
              {isHu
                ? "Minden teendőt elvégeztél. Mostantól a legfontosabb feladatod: tedd le a telefont és élvezd az estét."
                : isEn
                ? "You did the work. Now your single most important task is to put your phone away and cherish every moment."
                : "Ai parcurs toți pașii. Singura ta datorie acum este să pui telefonul deoparte și să fii alături de cei dragi."}
            </p>
          </div>

          {/* Social Sharing Card */}
          <div className="p-5 rounded-2xl bg-[#FCFAF7] border-2 border-dashed border-[#C29B48]/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#621927] flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-[#C29B48]" />
                <span>{isHu ? "Opcionális Megosztókártya" : isEn ? "Celebration Share Card" : "Card de Sărbătoare"}</span>
              </span>
              <span className="text-[11px] text-[#7E7468]">{isHu ? "Nincs automata posztolás" : "Fără postare automată"}</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#EAE3D5] text-center space-y-1.5 shadow-2xs">
              <div className="font-serif text-xl font-bold text-[#621927]">
                Christmas Reset 2026
              </div>
              <p className="text-sm font-medium text-[#2C0B12]">
                {isHu
                  ? "„Sikeresen teljesítettem mind a 24 napot. Készen állok a békés Karácsonyra!”"
                  : isEn
                  ? "“I completed my Christmas Reset 2026. 24 / 24 days completed!”"
                  : "„Am finalizat toate cele 24 de zile. Sunt pregătită pentru cel mai frumos Crăciun!”"}
              </p>
              <span className="text-xs text-[#2E5844] font-semibold block">
                24 / 24 {isHu ? "nap pipa ✓" : "zile finalizate ✓"}
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleCopyShare}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#FAF7F2] hover:bg-[#F1E9DB] text-[#2C0B12] border border-[#EAE3D5] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#2E5844]" /> : <Copy className="w-3.5 h-3.5 text-[#C29B48]" />}
                <span>{copied ? (isHu ? "Szöveg kimásolva!" : "Text copiat!") : (isHu ? "Szöveg másolása" : "Copiază textul")}</span>
              </button>
            </div>
          </div>

          {/* Quick Access to Downloadable Resource Library */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigateToPrintables();
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#2E5844] hover:bg-[#172F24] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
            >
              <BookOpen className="w-4 h-4 text-[#D8B76E]" />
              <span>{isHu ? "Nyomtatható Munkalapok Könyvtára" : isEn ? "Resource Library" : "Biblioteca de Fișe Imprimabile"}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#621927] hover:bg-[#46121C] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
            >
              <span>{isHu ? "Vissza a Naptárhoz" : isEn ? "Back to Calendar" : "Înapoi la Calendar"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
