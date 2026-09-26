import React, { useState, useEffect } from 'react';
import { RotateCw, Volume2, VolumeX, Sparkles, Check } from 'lucide-react';
import { audioHelper } from '../utils/audioSpeech';

interface ZikrPreset {
  id: string;
  arabicText: string;
  nameUz: string;
  meaningUz: string;
  targetCount: number;
}

const ZIKR_PRESETS: ZikrPreset[] = [
  {
    id: 'subhanallah',
    arabicText: 'سُبْحَانَ اللَّهِ',
    nameUz: 'Subhanalloh',
    meaningUz: 'Alloh barcha nuqsonlardan pokdir',
    targetCount: 33,
  },
  {
    id: 'alhamdulillah',
    arabicText: 'الْحَمْدُ لِلَّهِ',
    nameUz: 'Alhamdulillah',
    meaningUz: 'Barcha hamd va maqtovlar Allohgadir',
    targetCount: 33,
  },
  {
    id: 'allahuakbar',
    arabicText: 'اللَّهُ أَكْبَرُ',
    nameUz: 'Allohu Akbar',
    meaningUz: 'Alloh eng buyukdir',
    targetCount: 34,
  },
  {
    id: 'astaghfirullah',
    arabicText: 'أَسْتَغْفِرُ اللَّهَ',
    nameUz: 'Astaghfirulloh',
    meaningUz: 'Allohdan mag‘firat va kechirim so‘rayman',
    targetCount: 100,
  },
  {
    id: 'lailahaillallah',
    arabicText: 'لَا إِلَهَ إِلَّا اللَّهُ',
    nameUz: 'La ilaha illalloh',
    meaningUz: 'Allohdan o‘zga iloh yo‘q',
    targetCount: 100,
  },
  {
    id: 'salavat',
    arabicText: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ',
    nameUz: 'Allohumma solli \'ala Muhammad',
    meaningUz: 'Allohim, Muhammad alayhissalomga salovot yog‘dirgin',
    targetCount: 100,
  },
];

export const TasbihCounter: React.FC = () => {
  const [selectedZikr, setSelectedZikr] = useState<ZikrPreset>(ZIKR_PRESETS[0]);
  const [count, setCount] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [totalZikrDone, setTotalZikrDone] = useState<number>(0);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedCount = localStorage.getItem(`tasbih_${selectedZikr.id}`);
      if (savedCount !== null) {
        setCount(parseInt(savedCount, 10) || 0);
      } else {
        setCount(0);
      }

      const total = localStorage.getItem('tasbih_total');
      if (total !== null) {
        setTotalZikrDone(parseInt(total, 10) || 0);
      }
    } catch {
      // Storage not available
    }
  }, [selectedZikr]);

  const handleIncrement = () => {
    const nextCount = count + 1;
    setCount(nextCount);
    setTotalZikrDone((prev) => prev + 1);

    // Save
    try {
      localStorage.setItem(`tasbih_${selectedZikr.id}`, nextCount.toString());
      localStorage.setItem('tasbih_total', (totalZikrDone + 1).toString());
    } catch {}

    // Feedback
    if (soundEnabled) {
      if (nextCount === selectedZikr.targetCount) {
        audioHelper.playTasbihComplete();
      } else {
        audioHelper.playTasbihClick();
      }
    }

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        if (nextCount === selectedZikr.targetCount) {
          navigator.vibrate([100, 50, 100]);
        } else {
          navigator.vibrate(30);
        }
      } catch {}
    }
  };

  const handleReset = () => {
    setCount(0);
    try {
      localStorage.setItem(`tasbih_${selectedZikr.id}`, '0');
    } catch {}
  };

  const progressPercent = Math.min(
    100,
    Math.round((count / selectedZikr.targetCount) * 100)
  );

  return (
    <div className="space-y-6 animate-fade-in max-w-xl mx-auto pb-12">
      {/* Header */}
      <div className="text-center border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Qalblar tasallisi</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
          Elektron Zikr hisoblagich (Tasbeh)
        </h2>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          "Allohni zikr qilish bilan qalblar orom olur" (Ra'd surasi, 28)
        </p>
      </div>

      {/* Preset selector pills */}
      <div className="flex flex-wrap gap-2 justify-center">
        {ZIKR_PRESETS.map((p) => {
          const isSelected = selectedZikr.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => {
                setSelectedZikr(p);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-emerald-300'
              }`}
            >
              {p.nameUz} ({p.targetCount})
            </button>
          );
        })}
      </div>

      {/* Main Tasbih Instrument Card */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200/90 dark:border-stone-800 shadow-sm text-center space-y-6">
        {/* Controls row */}
        <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-100 dark:border-stone-800 pb-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Ovozli tebranish</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-stone-400" />
                <span>Ovozsiz</span>
              </>
            )}
          </button>

          <div className="text-[11px] text-stone-500">
            Jami zikrlar: <strong className="text-stone-900 dark:text-stone-200">{totalZikrDone}</strong>
          </div>
        </div>

        {/* Selected Zikr info */}
        <div className="space-y-2">
          <div className="font-arabic text-3xl sm:text-4xl text-emerald-700 dark:text-emerald-400 py-2">
            {selectedZikr.arabicText}
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50">
            {selectedZikr.nameUz}
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            {selectedZikr.meaningUz}
          </p>
        </div>

        {/* Target Progress Bar */}
        <div className="space-y-1.5 max-w-xs mx-auto">
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Maqsad: {selectedZikr.targetCount}</span>
            <span className="font-semibold text-emerald-600">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Tap Button area */}
        <div className="py-2">
          <button
            onClick={handleIncrement}
            className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full bg-stone-50 dark:bg-stone-800/80 border-4 border-emerald-600/40 hover:border-emerald-600 dark:border-emerald-500/30 dark:hover:border-emerald-500 flex flex-col items-center justify-center shadow-lg active:scale-95 transition-all select-none group cursor-pointer"
          >
            <span className="text-5xl sm:text-6xl font-extrabold font-mono tabular-nums text-stone-900 dark:text-stone-50 group-active:text-emerald-600">
              {count}
            </span>
            <span className="text-xs text-stone-400 mt-2 font-medium">
              Bosing (+1)
            </span>
          </button>
        </div>

        {/* Reset button */}
        <div>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Hisobni nollash</span>
          </button>
        </div>
      </div>
    </div>
  );
};
