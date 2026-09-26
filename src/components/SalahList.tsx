import React, { useState, useEffect } from 'react';
import { PRAYERS_DATA } from '../data/prayersData';
import { PrayerDetail } from '../types';
import { BookOpen, Clock, Layers, AlertCircle, ChevronRight, Bookmark, Check, Shield } from 'lucide-react';
import { AudioPlayerButton } from './AudioPlayerButton';

interface SalahListProps {
  onStartTrainer: (prayerId: string) => void;
  onBookmark: (item: { id: string; type: 'prayer'; title: string; subtitle: string }) => void;
  isBookmarked: (id: string) => boolean;
  initialPrayerId?: string;
}

export const SalahList: React.FC<SalahListProps> = ({
  onStartTrainer,
  onBookmark,
  isBookmarked,
  initialPrayerId,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | '5mahal' | 'special'>('all');
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerDetail | null>(null);
  const [isDetailedMode, setIsDetailedMode] = useState<boolean>(true);

  // If initialPrayerId is passed, open that prayer modal
  useEffect(() => {
    if (initialPrayerId) {
      const found = PRAYERS_DATA.find((p) => p.id === initialPrayerId);
      if (found) {
        setSelectedPrayer(found);
      }
    }
  }, [initialPrayerId]);

  // Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedPrayer) {
        setSelectedPrayer(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPrayer]);

  const filteredPrayers = PRAYERS_DATA.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
            Namozlar qo‘llanmasi
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
            Besh vaqt farz namozlari hamda maxsus holat va jamoat namozlarining Hanafiy mazhabidagi to‘liq tartibi.
          </p>
        </div>

        {/* Filter segment */}
        <div className="inline-flex items-center p-1 bg-stone-100 dark:bg-stone-800/80 rounded-lg text-xs font-medium self-start sm:self-auto">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeCategory === 'all'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm font-semibold'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
            }`}
          >
            Barchasi
          </button>
          <button
            onClick={() => setActiveCategory('5mahal')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeCategory === '5mahal'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm font-semibold'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
            }`}
          >
            5 Mahal Farz
          </button>
          <button
            onClick={() => setActiveCategory('special')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeCategory === 'special'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm font-semibold'
                : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
            }`}
          >
            Maxsus & Holatlar
          </button>
        </div>
      </div>

      {/* Grid of Prayer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrayers.map((prayer) => {
          const bookmarked = isBookmarked(prayer.id);
          return (
            <div
              key={prayer.id}
              onClick={() => setSelectedPrayer(prayer)}
              className="group cursor-pointer rounded-xl p-5 bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
                      {prayer.category === '5mahal' ? 'Besh mahal farz' : 'Maxsus namoz'}
                    </span>
                    <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {prayer.name}
                    </h3>
                  </div>

                  <span className="font-arabic text-xl text-stone-700 dark:text-stone-300">
                    {prayer.arabicName}
                  </span>
                </div>

                <div className="my-2.5 text-xs font-semibold text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/60 py-1.5 px-2.5 rounded-lg border border-stone-200/50 dark:border-stone-700/50">
                  {prayer.rakatsSummary}
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                  {prayer.timeDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
                <span className="text-emerald-700 dark:text-emerald-400 font-medium group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                  Batafsil tartibi <ChevronRight className="w-3.5 h-3.5" />
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookmark({
                      id: prayer.id,
                      type: 'prayer',
                      title: prayer.name,
                      subtitle: prayer.rakatsSummary,
                    });
                  }}
                  className="p-1 text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                  title="Saqlab qo‘yish"
                >
                  <Bookmark
                    className={`w-4 h-4 ${bookmarked ? 'fill-emerald-600 text-emerald-600' : ''}`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedPrayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-stone-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-stone-200 dark:border-stone-800 shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
              <div>
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                  {selectedPrayer.category === '5mahal' ? '5 Mahal Farz Namozi' : 'Maxsus / Holat Namozi'}
                </div>
                <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-50 mt-0.5">
                  {selectedPrayer.name}
                </h3>
                <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Rak'atlar: <strong className="text-stone-900 dark:text-stone-200">{selectedPrayer.rakatsSummary}</strong>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsDetailedMode(!isDetailedMode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    isDetailedMode
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-300'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  {isDetailedMode ? 'Mukammal rejim' : 'Boshlovchi rejimi'}
                </button>

                <button
                  onClick={() => setSelectedPrayer(null)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                >
                  Yopish
                </button>
              </div>
            </div>

            {/* Time Description */}
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-900 dark:text-stone-100 mb-1">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Namoz vaqti:</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {selectedPrayer.timeDescription}
              </p>
            </div>

            {/* Niyyah (Intention) */}
            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                  Niyat qilish qoidasi:
                </span>
                <AudioPlayerButton arabicText={selectedPrayer.niyyah.arabic} label="Niyatni tinglash" size="sm" />
              </div>
              <div className="font-arabic text-xl text-stone-900 dark:text-stone-50 py-1 text-right">
                {selectedPrayer.niyyah.arabic}
              </div>
              <div className="text-xs text-stone-600 dark:text-stone-400 italic">
                {selectedPrayer.niyyah.transliteration}
              </div>
              <div className="text-xs text-stone-800 dark:text-stone-200 font-medium">
                Ma'nosi: "{selectedPrayer.niyyah.meaningUz}"
              </div>
            </div>

            {/* Preparation steps */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
                Namozdan oldingi tayyorgarlik (Shartlar):
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                {selectedPrayer.preparation.map((prep, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{prep}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hanafi Rules */}
            {isDetailedMode && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                  Hanafiy mazhabi bo‘yicha muhim qoidalar:
                </h4>
                <div className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
                  {selectedPrayer.rulesHanafi.map((rule, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-200/50 dark:border-stone-800">
                      {rule}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Common Mistakes */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Keng tarqalgan xatolar:</span>
              </h4>
              <ul className="space-y-1 text-xs text-stone-600 dark:text-stone-400">
                {selectedPrayer.commonMistakes.map((mis, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">·</span>
                    <span>{mis}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Authoritative Sources */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
              <div className="text-xs font-semibold text-stone-500 dark:text-stone-400 mb-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mo‘tabar manbalar:</span>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] text-stone-600 dark:text-stone-400">
                {selectedPrayer.sources.map((s, idx) => (
                  <span key={idx} className="px-2 py-1 rounded bg-stone-100 dark:bg-stone-800">
                    {s.book}, {s.author} {s.hadithNumber ? `(#${s.hadithNumber})` : ''} · {s.authenticity}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer action */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => {
                  const id = selectedPrayer.id;
                  setSelectedPrayer(null);
                  onStartTrainer(id);
                }}
                className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
              >
                Ushbu namozni interaktiv o‘rganish →
              </button>

              <button
                onClick={() => setSelectedPrayer(null)}
                className="px-4 py-2 text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900"
              >
                Orqaga qaytish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
