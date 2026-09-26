import React, { useEffect } from 'react';
import { Heart, Sparkles, Check, Smile, X } from 'lucide-react';

interface CreatorNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatorNoticeModal: React.FC<CreatorNoticeModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleAcknowledge();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAcknowledge = () => {
    try {
      localStorage.setItem('namoz_guide_seen_creator_notice', 'true');
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="creator-notice-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-emerald-500/30 dark:border-emerald-700/40 p-6 sm:p-8 relative overflow-hidden transition-colors">
        <button
          onClick={handleAcknowledge}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors z-20"
          title="Yopish"
          aria-label="Yopish"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Badge & Icon */}
        <div className="relative z-10 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-xl shadow-emerald-600/30 mx-auto">
            <span className="text-3xl">🤲</span>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Dasturchidan samimiy eslatma</span>
            </div>

            <h3 id="creator-notice-title" className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              Assalomu alaykum va rahmatulloh!
            </h3>
          </div>

          {/* Sincere Creator Card with exact quote */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-stone-50 to-emerald-50/30 dark:from-stone-800/80 dark:to-stone-800/40 border border-stone-200/80 dark:border-stone-700/80 text-left relative">
            <div className="text-3xl text-emerald-600/30 dark:text-emerald-400/30 font-serif leading-none select-none mb-1">
              “
            </div>
            <p className="text-sm sm:text-base text-stone-800 dark:text-stone-200 leading-relaxed font-medium">
              Bu bepul islomiy ta'limiy qo‘llanma. Bu loyiha oddiy bir 14 yoshli dasturchi bola tomonidan qilingan. Bu loyiha savob uchun qilingan. Menga hech narsa kerak emas, bitta duo qilsangiz bas.
            </p>
            <div className="mt-3 flex items-center justify-end gap-1.5 text-xs text-stone-500 dark:text-stone-400 font-medium">
              <span>— 14 yoshli o‘zbek dasturchi bola</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </div>
          </div>

          {/* Sincere Dua action button */}
          <div className="pt-2 space-y-2">
            <button
              onClick={handleAcknowledge}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-semibold text-sm shadow-lg shadow-emerald-600/25 transition-all"
            >
              <span>Alloh rozi bo‘lsin, duo qilaman 🤲</span>
            </button>
            <p className="text-[11px] text-stone-400 dark:text-stone-400 text-center">
              (Ushbu eslatma faqat birinchi marta kirilganda chiqadi)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
