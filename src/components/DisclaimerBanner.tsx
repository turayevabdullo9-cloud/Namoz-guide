import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';

interface DisclaimerBannerProps {
  onOpenSources?: () => void;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ onOpenSources }) => {
  return (
    <div className="w-full bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-200/60 dark:border-emerald-800/40 px-4 py-2 text-xs text-stone-600 dark:text-stone-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            <strong>Ta'limiy qo‘llanma:</strong> Barcha ma'lumotlar mo‘tadil Hanafiy mazhabi va sahih manbalarga tayangan. Shaxsiy va shar'iy fatvo masalalarida malakali mahalliy ulamolar bilan maslahatlashish tavsiya etiladi.
          </span>
        </div>
        {onOpenSources && (
          <button
            onClick={onOpenSources}
            className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 hover:underline font-medium shrink-0"
          >
            <span>Mo‘tabar manbalar</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
