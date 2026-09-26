import React, { useState } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { audioHelper } from '../utils/audioSpeech';

interface AudioPlayerButtonProps {
  arabicText?: string;
  label?: string;
  size?: 'sm' | 'md';
}

export const AudioPlayerButton: React.FC<AudioPlayerButtonProps> = ({
  arabicText,
  label = "Tinglash",
  size = 'md',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!arabicText) return null;

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      audioHelper.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      audioHelper.playArabic(arabicText, () => {
        setIsPlaying(false);
      });
    }
  };

  const isSmall = size === 'sm';

  return (
    <button
      onClick={handleTogglePlay}
      type="button"
      title={isPlaying ? "To‘xtatish" : "Arabcha talaffuzni tinglash"}
      className={`inline-flex items-center gap-1.5 rounded-lg border transition-colors ${
        isPlaying
          ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
          : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400'
      } ${isSmall ? 'px-2 py-1 text-xs' : 'px-2.5 py-1.5 text-xs font-medium'}`}
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>To‘xtatish</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
