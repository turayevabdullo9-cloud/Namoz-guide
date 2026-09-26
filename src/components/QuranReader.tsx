import React, { useState, useEffect, useRef } from 'react';
import { ALL_114_SURAHS, SurahMeta } from '../data/quranSurahsList';
import { QURAN_SURAHS } from '../data/quranData';
import { SurahItem } from '../types';
import {
  BookOpen,
  Search,
  Volume2,
  Bookmark,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Layers,
  Info,
} from 'lucide-react';

interface QuranReaderProps {
  onBookmark: (item: { id: string; type: 'quran'; title: string; subtitle: string }) => void;
  isBookmarked: (id: string) => boolean;
  initialSurahId?: number;
}

interface LoadedAyah {
  number: number;
  globalAyahNumber: number;
  arabicText: string;
  transliteration?: string;
  translationUz: string;
  audioUrl: string;
}

export const QuranReader: React.FC<QuranReaderProps> = ({
  onBookmark,
  isBookmarked,
  initialSurahId = 1,
}) => {
  const [selectedSurahId, setSelectedSurahId] = useState<number>(initialSurahId);
  const [arabicFontSize, setArabicFontSize] = useState<'md' | 'lg' | 'xl'>('lg');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Loaded ayahs for active surah
  const [ayahsList, setAyahsList] = useState<LoadedAyah[]>([]);
  const [activeSurahMeta, setActiveSurahMeta] = useState<SurahMeta>(ALL_114_SURAHS[0]);

  // Audio state
  const [currentPlayingAyahIndex, setCurrentPlayingAyahIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isAutoPlayNext, setIsAutoPlayNext] = useState<boolean>(true);
  const [copiedAyahNumber, setCopiedAyahNumber] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ayahRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Synchronize when initialSurahId prop changes
  useEffect(() => {
    if (initialSurahId && initialSurahId >= 1 && initialSurahId <= 114) {
      setSelectedSurahId(initialSurahId);
    }
  }, [initialSurahId]);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showDropdown) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showDropdown]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Filter surahs for quick search
  const filteredSurahs = ALL_114_SURAHS.filter(
    (s) =>
      s.nameUz.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameArabic.includes(searchQuery) ||
      s.id.toString() === searchQuery.trim()
  );

  // Load surah ayahs when selectedSurahId changes
  useEffect(() => {
    const meta = ALL_114_SURAHS.find((s) => s.id === selectedSurahId) || ALL_114_SURAHS[0];
    setActiveSurahMeta(meta);
    stopPlayback();

    // Check if we have pre-bundled offline data
    const preBundled = QURAN_SURAHS.find((s) => s.id === selectedSurahId);

    // Fetch from Al-Quran API for full text & authentic Uzbek translation
    setIsLoading(true);
    setErrorMsg(null);

    const controller = new AbortController();

    async function fetchSurah() {
      try {
        const res = await fetch(
          `https://api.alquran.cloud/v1/surah/${selectedSurahId}/editions/quran-uthmani,uz.sodik`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error('API serveridan ma\'lumot yuklab bo‘lmadi');

        const json = await res.json();
        if (json.code === 200 && json.data && json.data.length >= 2) {
          const uthmaniEdition = json.data[0];
          const uzbekEdition = json.data[1];

          const formatted: LoadedAyah[] = uthmaniEdition.ayahs.map((ayah: any, index: number) => {
            const uzText = uzbekEdition.ayahs[index]?.text || '';
            const globalNum = ayah.number; // Global ayah index in entire Quran (1 to 6236)
            return {
              number: ayah.numberInSurah,
              globalAyahNumber: globalNum,
              arabicText: ayah.text,
              translationUz: uzText,
              audioUrl: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${globalNum}.mp3`,
            };
          });

          setAyahsList(formatted);
          setIsLoading(false);
          return;
        }
        throw new Error('Ma\'lumotlar formati mos kelmadi');
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        console.warn('Online Quran fetch fallback:', err);

        // Fallback to pre-bundled if available
        if (preBundled) {
          const formatted: LoadedAyah[] = preBundled.ayahs.map((a) => ({
            number: a.number,
            globalAyahNumber: a.number,
            arabicText: a.arabicText,
            transliteration: a.transliteration,
            translationUz: a.translationUz,
            audioUrl: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${a.number}.mp3`,
          }));
          setAyahsList(formatted);
          setIsLoading(false);
        } else {
          setErrorMsg(
            "Internet aloqasi sekin yoki oflayn holatdasiz. Sura matni yuklanmadi. Iltimos qayta urinib ko‘ring."
          );
          setIsLoading(false);
        }
      }
    }

    fetchSurah();

    return () => {
      controller.abort();
    };
  }, [selectedSurahId]);

  // Audio Playback functions
  const playAyahByIndex = (index: number) => {
    if (index < 0 || index >= ayahsList.length) {
      stopPlayback();
      return;
    }

    const ayah = ayahsList[index];
    if (!ayah) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    setCurrentPlayingAyahIndex(index);
    setIsPlaying(true);

    const audio = new Audio(ayah.audioUrl);
    audioRef.current = audio;

    // Scroll active ayah into view smoothly
    const element = ayahRefs.current[ayah.number];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    audio.play().catch((err) => {
      console.warn('Quran audio error:', err);
      setIsPlaying(false);
    });

    audio.onended = () => {
      if (isAutoPlayNext && index + 1 < ayahsList.length) {
        playAyahByIndex(index + 1);
      } else {
        setIsPlaying(false);
        setCurrentPlayingAyahIndex(null);
      }
    };

    audio.onerror = () => {
      setIsPlaying(false);
    };
  };

  const togglePlayCurrent = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (currentPlayingAyahIndex !== null) {
        audioRef.current?.play();
        setIsPlaying(true);
      } else {
        playAyahByIndex(0);
      }
    }
  };

  const stopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentPlayingAyahIndex(null);
  };

  const copyAyah = (ayah: LoadedAyah) => {
    const textToCopy = `${ayah.arabicText}\n\n${ayah.translationUz}\n[Qur'oni Karim, ${activeSurahMeta.nameUz} surasi, ${ayah.number}-oyat]`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAyahNumber(ayah.number);
    setTimeout(() => setCopiedAyahNumber(null), 2000);
  };

  const fontClasses = {
    md: 'text-xl sm:text-2xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-24">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
          <BookOpen className="w-4 h-4" />
          <span>Qur'oni Karim • 114 Sura To‘liq</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
          Qur'oni Karim Mutolaasi va Qiroati
        </h2>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          Barcha 114 surani arabcha matni, Shayx Muhammad Sodiq Muhammad Yusufning sahih o‘zbekcha tarjimasi va Shayx Mishariy Roshid al-Afasiyning toza internet audiosi bilan tinglang.
        </p>
      </div>

      {/* Surah bar & controls */}
      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Surah dropdown selector */}
          <div className="relative flex-1" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 text-stone-900 dark:text-stone-100 outline-none hover:border-emerald-500 transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {activeSurahMeta.id}
                </span>
                <span className="font-bold text-stone-900 dark:text-stone-100">
                  {activeSurahMeta.nameUz}
                </span>
                <span className="font-arabic text-emerald-700 dark:text-emerald-400 text-sm">
                  ({activeSurahMeta.nameArabic})
                </span>
                <span className="text-xs text-stone-500 hidden sm:inline">
                  · {activeSurahMeta.totalAyahs} oyat · {activeSurahMeta.revelationType}
                </span>
              </div>
              <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown modal for 114 surahs */}
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl p-3 space-y-2 max-h-[380px] overflow-hidden flex flex-col">
                {/* Search in surahs */}
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Sura nomi, raqami yoki arabchasini qidiring (masalan: 36, Yosin, Mulk)..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 outline-none text-stone-900 dark:text-stone-100"
                    autoFocus
                  />
                </div>

                {/* List of 114 surahs */}
                <div className="overflow-y-auto space-y-1 pr-1 flex-1">
                  {filteredSurahs.map((surah) => (
                    <button
                      key={surah.id}
                      onClick={() => {
                        setSelectedSurahId(surah.id);
                        setShowDropdown(false);
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-colors ${
                        surah.id === selectedSurahId
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800'
                          : 'hover:bg-stone-100 dark:hover:bg-stone-800/60 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-5 h-5 rounded-md bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-[10px] font-bold">
                          {surah.id}
                        </span>
                        <span>{surah.nameUz}</span>
                        <span className="text-stone-400 text-[11px] truncate">
                          ({surah.meaningUz})
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] text-stone-400">
                          {surah.totalAyahs} oyat
                        </span>
                        <span className="font-arabic text-sm text-stone-800 dark:text-stone-200">
                          {surah.nameArabic}
                        </span>
                      </div>
                    </button>
                  ))}
                  {filteredSurahs.length === 0 && (
                    <div className="p-4 text-center text-xs text-stone-500">
                      Bunday nomli sura topilmadi.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Font size control & bookmark */}
          <div className="flex items-center justify-between sm:justify-end gap-2">
            <div className="inline-flex items-center p-1 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs">
              <span className="text-[10px] text-stone-400 px-1.5">Shrift:</span>
              <button
                onClick={() => setArabicFontSize('md')}
                className={`px-2 py-0.5 rounded text-xs transition-all ${
                  arabicFontSize === 'md'
                    ? 'bg-white dark:bg-stone-900 font-bold text-emerald-600 shadow-sm'
                    : 'text-stone-500'
                }`}
              >
                A-
              </button>
              <button
                onClick={() => setArabicFontSize('lg')}
                className={`px-2 py-0.5 rounded text-xs transition-all ${
                  arabicFontSize === 'lg'
                    ? 'bg-white dark:bg-stone-900 font-bold text-emerald-600 shadow-sm'
                    : 'text-stone-500'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setArabicFontSize('xl')}
                className={`px-2 py-0.5 rounded text-xs transition-all ${
                  arabicFontSize === 'xl'
                    ? 'bg-white dark:bg-stone-900 font-bold text-emerald-600 shadow-sm'
                    : 'text-stone-500'
                }`}
              >
                A+
              </button>
            </div>

            <button
              onClick={() =>
                onBookmark({
                  id: `quran-${activeSurahMeta.id}`,
                  type: 'quran',
                  title: `${activeSurahMeta.nameUz} surasi`,
                  subtitle: `${activeSurahMeta.totalAyahs} oyat · ${activeSurahMeta.revelationType}`,
                })
              }
              className="p-2 text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900"
              title="Surani saqlab qo‘yish"
            >
              <Bookmark
                className={`w-4 h-4 ${
                  isBookmarked(`quran-${activeSurahMeta.id}`) ? 'fill-emerald-600 text-emerald-600' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Global Continuous Player Bar for the Surah */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlayCurrent}
              className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                isPlaying
                  ? 'bg-amber-600 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>To‘xtatish</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>
                    {currentPlayingAyahIndex !== null
                      ? 'Davom ettirish'
                      : 'Surani boshidan tinglash'}
                  </span>
                </>
              )}
            </button>

            {isPlaying && (
              <button
                onClick={stopPlayback}
                className="px-2.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
                title="Qayta boshlash"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}

            {currentPlayingAyahIndex !== null && (
              <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                O‘qilmoqda: {currentPlayingAyahIndex + 1} / {ayahsList.length}-oyat
              </span>
            )}
          </div>

          <label className="flex items-center gap-1.5 cursor-pointer text-stone-500 text-[11px]">
            <input
              type="checkbox"
              checked={isAutoPlayNext}
              onChange={(e) => setIsAutoPlayNext(e.target.checked)}
              className="accent-emerald-600 rounded"
            />
            <span>Keyingi oyatga avtomatik o‘tish</span>
          </label>
        </div>
      </div>

      {/* Surah Header Card */}
      <div className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 text-stone-100 p-6 sm:p-8 text-center space-y-3 border border-stone-800 shadow-xl relative overflow-hidden">
        <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
          {activeSurahMeta.revelationType} sura · {activeSurahMeta.totalAyahs} oyat
        </div>
        <h3 className="font-arabic text-4xl sm:text-5xl text-white py-1">
          {activeSurahMeta.nameArabic}
        </h3>
        <h4 className="text-xl font-bold tracking-tight text-stone-100">
          {activeSurahMeta.nameUz} surasi
        </h4>
        <p className="text-xs text-stone-400">
          Ma'nosi: {activeSurahMeta.meaningUz}
        </p>

        {activeSurahMeta.id !== 9 && (
          <div className="pt-3 font-arabic text-2xl text-emerald-300">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="p-12 text-center space-y-3 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full"></div>
          <p className="text-xs text-stone-500">
            {activeSurahMeta.nameUz} surasi oyatlari va tarjimasi yuklanmoqda...
          </p>
        </div>
      )}

      {/* Error state */}
      {errorMsg && !isLoading && (
        <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 text-xs text-center space-y-2">
          <p>{errorMsg}</p>
          <button
            onClick={() => setSelectedSurahId(selectedSurahId)}
            className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-semibold"
          >
            Qayta urinish
          </button>
        </div>
      )}

      {/* Ayahs List */}
      {!isLoading && (
        <div className="space-y-4">
          {ayahsList.map((ayah, idx) => {
            const isCurrentPlaying = currentPlayingAyahIndex === idx && isPlaying;

            return (
              <div
                key={ayah.number}
                ref={(el) => {
                  ayahRefs.current[ayah.number] = el;
                }}
                className={`bg-white dark:bg-stone-900 rounded-2xl p-5 sm:p-6 border transition-all shadow-sm space-y-4 ${
                  isCurrentPlaying
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/20 dark:bg-emerald-950/20'
                    : 'border-stone-200/90 dark:border-stone-800 hover:border-emerald-200 dark:hover:border-emerald-800'
                }`}
              >
                {/* Top row: Ayah number & Action buttons */}
                <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-100 dark:border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center font-bold text-stone-700 dark:text-stone-300 text-xs">
                      {ayah.number}
                    </span>
                    <span className="text-[11px] text-stone-400 hidden sm:inline">
                      {activeSurahMeta.nameUz} · {ayah.number}-oyat
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Audio Play button */}
                    <button
                      onClick={() => {
                        if (isCurrentPlaying) {
                          stopPlayback();
                        } else {
                          playAyahByIndex(idx);
                        }
                      }}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                        isCurrentPlaying
                          ? 'bg-amber-600 text-white'
                          : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
                      }`}
                    >
                      {isCurrentPlaying ? (
                        <>
                          <Pause className="w-3 h-3" />
                          <span>To‘xtatish</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3" />
                          <span>Qiroat</span>
                        </>
                      )}
                    </button>

                    {/* Copy Ayah */}
                    <button
                      onClick={() => copyAyah(ayah)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                      title="Oyatni nusxalash"
                    >
                      {copiedAyahNumber === ayah.number ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Arabic text */}
                <div
                  className={`font-arabic ${fontClasses[arabicFontSize]} text-stone-900 dark:text-stone-50 text-right leading-loose py-2 select-text`}
                >
                  {ayah.arabicText}
                </div>

                {/* Transliteration if available */}
                {ayah.transliteration && (
                  <div className="text-xs text-stone-600 dark:text-stone-400 italic">
                    <strong>O‘qilishi:</strong> {ayah.transliteration}
                  </div>
                )}

                {/* Uzbek Translation by Sheikh Muhammad Sodiq Muhammad Yusuf */}
                <div className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-normal pt-2 border-t border-stone-100 dark:border-stone-800 select-text">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400 mr-1">
                    Tarjima:
                  </span>
                  {ayah.translationUz}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
