import React, { useState, useRef } from 'react';
import {
  ARABIC_ALPHABET,
  HARAKATLAR_RULES,
  TAJWEED_RULES,
  ArabicLetter,
} from '../data/arabicAlphabetData';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  BookOpen,
  Sparkles,
  Info,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Layers,
} from 'lucide-react';

export const ArabicLearningSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'alphabet' | 'harakatlar' | 'words' | 'tajweed'>('alphabet');
  const [selectedLetter, setSelectedLetter] = useState<ArabicLetter | null>(ARABIC_ALPHABET[0]);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play authentic human audio from internet
  const playLetterAudio = (letter: ArabicLetter) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setPlayingId(letter.id);
    setIsPlayingAudio(true);

    const audio = new Audio(letter.audioUrl);
    audioRef.current = audio;

    audio.play().catch((err) => {
      console.warn('Audio playback error:', err);
      setIsPlayingAudio(false);
      setPlayingId(null);
    });

    audio.onended = () => {
      setIsPlayingAudio(false);
      setPlayingId(null);
    };

    audio.onerror = () => {
      setIsPlayingAudio(false);
      setPlayingId(null);
    };
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlayingAudio(false);
    setPlayingId(null);
  };

  const practiceWords = [
    {
      arabic: 'كَتَبَ',
      breakdown: 'كَ + تَ + بَ',
      transliteration: 'Kataba',
      meaningUz: 'Yozdi',
      harakatlar: 'Fatha + Fatha + Fatha',
      audioUrl: 'https://raw.githubusercontent.com/adnan/Arabic-Alphabet/master/sounds/22_kaaf.mp3',
    },
    {
      arabic: 'قَرَأَ',
      breakdown: 'قَ + رَ + أَ',
      transliteration: 'Qoro-a',
      meaningUz: 'O‘qidi',
      harakatlar: 'Qalin Qōf + Rō + Alif',
      audioUrl: 'https://raw.githubusercontent.com/adnan/Arabic-Alphabet/master/sounds/21_qaaf.mp3',
    },
    {
      arabic: 'صَبَرَ',
      breakdown: 'صَ + بَ + رَ',
      transliteration: 'Sobaro',
      meaningUz: 'Sabr qildi',
      harakatlar: 'Qalin Sōd + Bā + Rō',
      audioUrl: 'https://raw.githubusercontent.com/adnan/Arabic-Alphabet/master/sounds/14_saad.mp3',
    },
    {
      arabic: 'عَلِمَ',
      breakdown: 'عَ + لِ + مَ',
      transliteration: "'Alima",
      meaningUz: 'Bilddi',
      harakatlar: 'Ayn (fatha) + Lām (kasra) + Mīm',
      audioUrl: 'https://raw.githubusercontent.com/adnan/Arabic-Alphabet/master/sounds/18_ain.mp3',
    },
    {
      arabic: 'رَزَقَ',
      breakdown: 'رَ + زَ + قَ',
      transliteration: 'Rozaqo',
      meaningUz: 'Rizq berdi',
      harakatlar: 'Rō (fatha) + Zā + Qōf',
      audioUrl: 'https://raw.githubusercontent.com/adnan/Arabic-Alphabet/master/sounds/10_raa.mp3',
    },
    {
      arabic: 'شَكَرَ',
      breakdown: 'شَ + كَ + رَ',
      transliteration: 'Shakaro',
      meaningUz: 'Shukr qildi',
      harakatlar: 'Shīn + Kāf + Rō',
      audioUrl: 'https://raw.githubusercontent.com/adnan/Arabic-Alphabet/master/sounds/13_sheen.mp3',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-stone-900 to-stone-950 p-6 sm:p-8 text-white border border-emerald-800/40 shadow-xl">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold backdrop-blur-sm">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Muallimi Soniy • Arab tili va Tajvid</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Arab Tilini O‘rganamiz
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
            Qur'oni Karimni to‘g‘ri o‘qish uchun arab alifbosi, harflarning 4 xil yozilishi, maxrajlari va tajvid qoidalari.
          </p>

          <div className="inline-flex items-center gap-2 pt-1 text-[11px] sm:text-xs text-emerald-200/90 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-700/50">
            <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Sahih insoniy audio:</strong> Barcha harf talaffuzlari AI ovozi emas, internetdagi haqiqiy arab tili fonetika manbalaridan to‘g‘ridan-to‘g‘ri yangraydi.
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-stone-100 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800">
        <button
          onClick={() => setActiveTab('alphabet')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'alphabet'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          }`}
        >
          🔤 Alifbo harflari (28 ta)
        </button>

        <button
          onClick={() => setActiveTab('harakatlar')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'harakatlar'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          }`}
        >
          〰️ Harakatlar (Zabar, Zir, Pesh)
        </button>

        <button
          onClick={() => setActiveTab('words')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'words'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          }`}
        >
          📖 So‘z o‘qish mashqlari
        </button>

        <button
          onClick={() => setActiveTab('tajweed')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'tajweed'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          }`}
        >
          ✨ Tajvid qoidalari
        </button>
      </div>

      {/* TAB 1: ALPHABET */}
      {activeTab === 'alphabet' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Letters Grid */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span>Harf ustiga bosib tafsilotini ko‘ring va audiosini tinglang:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">28 ta harf</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5">
              {ARABIC_ALPHABET.map((letter) => {
                const isSelected = selectedLetter?.id === letter.id;
                const isPlaying = playingId === letter.id;

                return (
                  <button
                    key={letter.id}
                    onClick={() => {
                      setSelectedLetter(letter);
                      playLetterAudio(letter);
                    }}
                    className={`relative p-3 rounded-2xl flex flex-col items-center justify-center transition-all text-center group border ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                        : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-sm'
                    }`}
                  >
                    {/* Arabic Letter */}
                    <span className="font-arabic text-3xl font-bold text-stone-900 dark:text-stone-100 group-hover:scale-110 transition-transform my-1">
                      {letter.arabic}
                    </span>

                    {/* Uzbek Name */}
                    <span className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 truncate max-w-full">
                      {letter.nameUz.split(' ')[0]}
                    </span>

                    {/* Audio Status Indicator */}
                    <div className="mt-1 flex items-center justify-center">
                      {isPlaying ? (
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                        </span>
                      ) : (
                        <Volume2 className="w-3 h-3 text-stone-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Letter Detail Card */}
          <div className="space-y-4">
            {selectedLetter ? (
              <div className="sticky top-20 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 shadow-lg space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 mb-1">
                      <span>{selectedLetter.id}-harf</span>
                      <span>•</span>
                      <span>{selectedLetter.type}</span>
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50">
                      {selectedLetter.nameUz}
                    </h3>
                    <p className="text-xs text-stone-500">
                      Transliteratsiya: <strong>{selectedLetter.transliteration}</strong>
                    </p>
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center border border-emerald-200/50 dark:border-emerald-800/50">
                    <span className="font-arabic text-4xl font-bold text-emerald-700 dark:text-emerald-400">
                      {selectedLetter.arabic}
                    </span>
                  </div>
                </div>

                {/* Big Audio Play Button */}
                <button
                  onClick={() => {
                    if (playingId === selectedLetter.id && isPlayingAudio) {
                      stopAudio();
                    } else {
                      playLetterAudio(selectedLetter);
                    }
                  }}
                  className={`w-full py-3 px-4 rounded-2xl flex items-center justify-center gap-2 font-semibold text-xs sm:text-sm transition-all shadow-sm ${
                    playingId === selectedLetter.id && isPlayingAudio
                      ? 'bg-amber-600 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {playingId === selectedLetter.id && isPlayingAudio ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>To‘xtatish</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span>Haqiqiy talaffuzni eshitish</span>
                    </>
                  )}
                </button>

                {/* 4 Writing Forms */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
                    Yozilish shakllari (4 ko‘rinish):
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="p-2 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/70 dark:border-stone-800">
                      <span className="font-arabic text-xl font-bold text-stone-900 dark:text-stone-100 block mb-1">
                        {selectedLetter.isolated}
                      </span>
                      <span className="text-[10px] text-stone-500">Alohida</span>
                    </div>

                    <div className="p-2 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/70 dark:border-stone-800">
                      <span className="font-arabic text-xl font-bold text-stone-900 dark:text-stone-100 block mb-1">
                        {selectedLetter.initial}
                      </span>
                      <span className="text-[10px] text-stone-500">Boshida</span>
                    </div>

                    <div className="p-2 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/70 dark:border-stone-800">
                      <span className="font-arabic text-xl font-bold text-stone-900 dark:text-stone-100 block mb-1">
                        {selectedLetter.medial}
                      </span>
                      <span className="text-[10px] text-stone-500">O‘rtasida</span>
                    </div>

                    <div className="p-2 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/70 dark:border-stone-800">
                      <span className="font-arabic text-xl font-bold text-stone-900 dark:text-stone-100 block mb-1">
                        {selectedLetter.final}
                      </span>
                      <span className="text-[10px] text-stone-500">Oxirida</span>
                    </div>
                  </div>
                </div>

                {/* Moxraj (Articulation) */}
                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-stone-800 dark:text-stone-200">
                    <Info className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Moxraj (chiqish o‘rni):</span>
                  </div>
                  <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-[11px]">
                    {selectedLetter.makhrajUz}
                  </p>
                </div>

                {/* Example Word */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold uppercase text-emerald-800 dark:text-emerald-400">
                      Misol so‘z:
                    </span>
                    <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                      {selectedLetter.exampleWord.transliteration} – {selectedLetter.exampleWord.meaningUz}
                    </div>
                  </div>
                  <span className="font-arabic text-2xl font-bold text-emerald-800 dark:text-emerald-300">
                    {selectedLetter.exampleWord.arabic}
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center rounded-3xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-500 text-xs">
                Batafsil ma'lumot olish uchun chap tarafdagi harflardan birini tanlang.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: HARAKATLAR */}
      {activeTab === 'harakatlar' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
            <strong>Harakatlar nima?</strong> Arab alifbosidagi barcha 28 ta harf aslida undosh hisoblanadi. Ularni o‘qish va unli tovushlarni ("A", "I", "U") hosil qilish uchun maxsus harakat belgilari ishlatiladi.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HARAKATLAR_RULES.map((rule) => (
              <div
                key={rule.id}
                className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-50">
                      {rule.nameUz}
                    </h3>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      Tovush: {rule.soundUz}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-2xl font-arabic font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {rule.arabicSign}
                  </div>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {rule.descriptionUz}
                </p>

                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-medium">Misol:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-arabic text-xl font-bold text-stone-900 dark:text-stone-100">
                      {rule.example.arabic}
                    </span>
                    <span className="text-stone-600 dark:text-stone-400">
                      ({rule.example.transliteration} – {rule.example.meaningUz})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: WORDS */}
      {activeTab === 'words' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300">
            Harflarni bir-biriga qo‘shib o‘qish mashqlari. Harakatlarga e'tibor bering va to‘g‘ri talaffuz qiling.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {practiceWords.map((word, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3"
              >
                <div className="text-center py-2 bg-stone-50 dark:bg-stone-800/40 rounded-2xl border border-stone-100 dark:border-stone-800">
                  <span className="font-arabic text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-wider">
                    {word.arabic}
                  </span>
                </div>

                <div className="space-y-1 text-center">
                  <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                    {word.transliteration}
                  </div>
                  <div className="text-xs text-stone-500">
                    Ma'nosi: <strong>«{word.meaningUz}»</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500 space-y-1">
                  <div>
                    <strong>Bo‘g‘inlar:</strong> {word.breakdown}
                  </div>
                  <div>
                    <strong>Qoida:</strong> {word.harakatlar}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: TAJWEED */}
      {activeTab === 'tajweed' && (
        <div className="space-y-5">
          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
            <strong>Tajvid ilmi:</strong> Qur'oni Karim harflarini o‘zining haqiqiy moxrajidan (chiqish o‘rnidan) va har bir harfga tegishli bo‘lgan sifatlari bilan xatosiz, go‘zal o‘qish qoidalari to‘plamidir.
          </div>

          <div className="space-y-4">
            {TAJWEED_RULES.map((rule, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      {rule.category}
                    </span>
                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-50">
                      {rule.titleUz}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {rule.letters.map((ltr, lIdx) => (
                      <span
                        key={lIdx}
                        className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center font-arabic font-bold text-emerald-800 dark:text-emerald-300 text-sm"
                      >
                        {ltr}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {rule.descriptionUz}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                    Qur'oni Karimdan misollar:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {rule.examples.map((ex, eIdx) => (
                      <div
                        key={eIdx}
                        className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-800 flex items-center justify-between"
                      >
                        <div className="text-xs">
                          <span className="font-semibold text-stone-800 dark:text-stone-200 block">
                            {ex.transliteration}
                          </span>
                          <span className="text-[11px] text-stone-500">{ex.noteUz}</span>
                        </div>
                        <span className="font-arabic text-xl font-bold text-stone-900 dark:text-stone-100">
                          {ex.arabic}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
