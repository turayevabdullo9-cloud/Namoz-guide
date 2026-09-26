import React from 'react';
import {
  BookOpen,
  Clock,
  Book,
  HeartHandshake,
  PlayCircle,
  Droplets,
  RotateCw,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { HADITHS_DATA } from '../data/hadithsData';
import { SUNNAHS_DATA } from '../data/sunnahsData';
import { PRAYERS_DATA } from '../data/prayersData';
import { PrayerTimesResult } from '../utils/prayerTimes';

interface HomeDashboardProps {
  onNavigate: (tab: string, targetId?: string) => void;
  prayerTimes: PrayerTimesResult;
  selectedCityName: string;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onNavigate,
  prayerTimes,
  selectedCityName,
}) => {
  const featuredHadith = HADITHS_DATA[0];
  const featuredSunnah = SUNNAHS_DATA[0];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-stone-900 text-stone-100 border border-stone-800 shadow-sm">
        {/* Subtle background image overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-luminosity">
          <img
            src="/src/assets/images/hero_mosque_architecture_1790406765502.jpg"
            alt="Masjid arxitekturasi"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Graceful CSS fallback if image not loaded
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <div className="relative z-10 px-6 sm:px-10 py-10 sm:py-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 mb-3 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Hanafiy mazhabi bo‘yicha mo‘tabar manbalar</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 text-balance">
            Namozni o‘rganing. Ibodatni tushuning.
          </h1>

          <p className="text-base sm:text-lg text-stone-300 mb-8 max-w-2xl leading-relaxed">
            Namoz, tahorat, duolar, sunnat amallar va sahih hadislarni bir joyda, qadam-baqadam va ishonchli manbalar asosida o‘rganing.
          </p>

          {/* Main quick actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('trainer')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-colors shadow-sm"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Namozni o‘rganish</span>
            </button>

            <button
              onClick={() => onNavigate('prayer-times')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-200 font-medium text-sm border border-stone-700 transition-colors"
            >
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Namoz vaqtlari</span>
            </button>

            <button
              onClick={() => onNavigate('quran')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-200 font-medium text-sm border border-stone-700 transition-colors"
            >
              <Book className="w-4 h-4 text-emerald-400" />
              <span>Qur'on (114 sura)</span>
            </button>

            <button
              onClick={() => onNavigate('arabic-learning')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-200 font-medium text-sm border border-stone-700 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Arab tili (Muallimi soniy)</span>
            </button>

            <button
              onClick={() => onNavigate('duas')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-200 font-medium text-sm border border-stone-700 transition-colors"
            >
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              <span>Duolar</span>
            </button>
          </div>
        </div>
      </section>

      {/* Primary Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Next Prayer Countdown Card */}
        <div className="rounded-xl p-5 bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Bugungi namozlar ({selectedCityName})</span>
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Jonli</span>
            </div>

            <div className="mt-2">
              <div className="text-xs text-stone-500 dark:text-stone-400">Keyingi namoz:</div>
              <div className="flex items-baseline justify-between mt-0.5">
                <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-50">
                  {prayerTimes.nextPrayer.nameUz} namozi
                </h3>
                <span className="text-lg font-semibold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                  {prayerTimes.nextPrayer.timeStr}
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                Kirishiga: <strong className="text-stone-900 dark:text-stone-100 font-semibold">{prayerTimes.nextPrayer.remainingFormatted}</strong> qoldi
              </p>
            </div>

            {/* Quick 5 times row */}
            <div className="grid grid-cols-5 gap-1.5 mt-4 pt-4 border-t border-stone-100 dark:border-stone-800/80 text-center">
              <div>
                <div className="text-[10px] text-stone-400">Bomdod</div>
                <div className="text-xs font-semibold tabular-nums text-stone-700 dark:text-stone-300">{prayerTimes.fajr}</div>
              </div>
              <div>
                <div className="text-[10px] text-stone-400">Peshin</div>
                <div className="text-xs font-semibold tabular-nums text-stone-700 dark:text-stone-300">{prayerTimes.dhuhr}</div>
              </div>
              <div>
                <div className="text-[10px] text-stone-400">Asr</div>
                <div className="text-xs font-semibold tabular-nums text-stone-700 dark:text-stone-300">{prayerTimes.asr}</div>
              </div>
              <div>
                <div className="text-[10px] text-stone-400">Shom</div>
                <div className="text-xs font-semibold tabular-nums text-stone-700 dark:text-stone-300">{prayerTimes.maghrib}</div>
              </div>
              <div>
                <div className="text-[10px] text-stone-400">Xufton</div>
                <div className="text-xs font-semibold tabular-nums text-stone-700 dark:text-stone-300">{prayerTimes.isha}</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('prayer-times')}
            className="mt-4 pt-3 flex items-center justify-between text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 border-t border-stone-100 dark:border-stone-800"
          >
            <span>To‘liq oylik taqvim va sozlamalar</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Step-by-Step Prayer Trainer Card */}
        <div className="rounded-xl p-5 bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mb-2">
              <PlayCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Interaktiv o‘rgatuvchi</span>
            </div>

            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50 mb-1">
              Namozni birga o‘rganamiz
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Niyatdan to salomgacha: har bir qadam, harakat, arabcha matn, ma'no va qiroat audio talaffuzi bilan.
            </p>

            <div className="mt-4 p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">Bomdod namozi</div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400">2 rak'at farz · 18 ta qadam</div>
              </div>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                Tavsiya
              </span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('trainer')}
            className="mt-4 inline-flex items-center justify-between w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors"
          >
            <span>Mashg‘ulotni boshlash</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Taharah (Purification) Card */}
        <div className="rounded-xl p-5 bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mb-2">
              <Droplets className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Poklik (Tahorat)</span>
            </div>

            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50 mb-1">
              Tahorat, G‘usl va Tayammum
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
              Namozning eng asosiy kaliti – poklikdir. 4 ta farz, sunnatlar, mustahablar va sindiruvchi holatlar.
            </p>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                <span className="text-stone-600 dark:text-stone-400">Tahorat farzlari</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">4 ta a'zo</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-stone-100 dark:border-stone-800">
                <span className="text-stone-600 dark:text-stone-400">G‘usl farzlari</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">3 ta amal</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-stone-600 dark:text-stone-400">Tayammum farzlari</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">2 ta zarb</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('taharah')}
            className="mt-4 pt-3 flex items-center justify-between text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 border-t border-stone-100 dark:border-stone-800"
          >
            <span>Qadam-baqadam o‘rganish</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Featured Sahih Hadith Card */}
        <div className="rounded-xl p-5 bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-2">
              <span className="flex items-center gap-1.5">
                <Book className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Bugungi hadis</span>
              </span>
              <span className="text-stone-500 font-mono text-[11px]">{featuredHadith.collection}, #{featuredHadith.hadithNumber}</span>
            </div>

            <p className="text-xs text-stone-700 dark:text-stone-300 italic mb-3 line-clamp-3 leading-relaxed">
              "{featuredHadith.translationUz}"
            </p>

            <div className="text-[11px] text-stone-500 dark:text-stone-400">
              Roviy: <span className="font-medium text-stone-800 dark:text-stone-200">{featuredHadith.narratorUz}</span>
              <span className="mx-1.5">·</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Sahih</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('hadiths')}
            className="mt-4 pt-3 flex items-center justify-between text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 border-t border-stone-100 dark:border-stone-800"
          >
            <span>Barcha sahih hadislar kutubxonasi</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Featured Daily Sunnah Card */}
        <div className="rounded-xl p-5 bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Bugungi sunnat</span>
              </span>
              <span className="text-[11px] text-stone-500">{featuredSunnah.category}</span>
            </div>

            <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-1">
              {featuredSunnah.titleUz}
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed">
              {featuredSunnah.descriptionUz}
            </p>
          </div>

          <button
            onClick={() => onNavigate('sunnahs')}
            className="mt-4 pt-3 flex items-center justify-between text-xs font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 border-t border-stone-100 dark:border-stone-800"
          >
            <span>Kunlik sunnatlar ro‘yxati</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Digital Tasbih & Quick Tools */}
        <div className="rounded-xl p-5 bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-xs text-stone-500 dark:text-stone-400 mb-3 font-medium">
              Tezkor asboblar
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => onNavigate('tasbih')}
                className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/70 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200/60 dark:border-stone-700/60 text-left transition-colors"
              >
                <RotateCw className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-2" />
                <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                  Zikr hisoblagich
                </div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">
                  Subhanalloh, Hamd...
                </div>
              </button>

              <button
                onClick={() => onNavigate('prayer-times')}
                className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/70 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200/60 dark:border-stone-700/60 text-left transition-colors"
              >
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-2" />
                <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                  Namoz vaqtlari
                </div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5">
                  Jonli vaqtlar
                </div>
              </button>
            </div>

            <div className="mt-3 p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/40 flex items-center justify-between text-xs">
              <span className="text-stone-700 dark:text-stone-300 text-[11px]">
                Yangi boshlovchilar uchun 7 kunlik reja
              </span>
              <button
                onClick={() => onNavigate('beginner')}
                className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline text-[11px]"
              >
                Boshlash →
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100 dark:border-stone-800">
            <span className="flex items-center gap-1 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>O‘zbekiston ulamolari manbalari</span>
            </span>
            <button
              onClick={() => onNavigate('sources')}
              className="text-[11px] text-stone-600 dark:text-stone-400 hover:underline"
            >
              Manbalar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
