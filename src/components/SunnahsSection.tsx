import React, { useState } from 'react';
import { SUNNAHS_DATA } from '../data/sunnahsData';
import { Sparkles, Bookmark, Shield, CheckCircle2 } from 'lucide-react';

interface SunnahsSectionProps {
  onBookmark: (item: { id: string; type: 'sunnah'; title: string; subtitle: string }) => void;
  isBookmarked: (id: string) => boolean;
}

export const SunnahsSection: React.FC<SunnahsSectionProps> = ({
  onBookmark,
  isBookmarked,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Barchasi' },
    { id: 'Namoz', label: 'Namoz sunnatlari' },
    { id: 'Tahorat', label: 'Tahorat' },
    { id: 'Juma', label: 'Juma' },
    { id: 'Taomlanish', label: 'Taomlanish' },
    { id: 'Uyqu', label: 'Uyqu' },
    { id: 'Salomlashish', label: 'Salom' },
    { id: 'BemorZiyorati', label: 'Bemor ziyorati' },
  ];

  const filtered = SUNNAHS_DATA.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Payg‘ambarimiz (s.a.v.) ning go‘zal yo‘llari</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
          Kundalik Sunnat amallar
        </h2>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          Har bir sunnat amalning sahih hadis asosi va uni hayotimizda amaliy tatbiq etish uslubi.
        </p>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === c.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-emerald-300'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Sunnah Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((sunnah) => {
          const bookmarked = isBookmarked(sunnah.id);
          return (
            <div
              key={sunnah.id}
              className="bg-white dark:bg-stone-900 rounded-xl p-5 border border-stone-200/90 dark:border-stone-800 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {sunnah.category}
                  </span>
                  <button
                    onClick={() =>
                      onBookmark({
                        id: sunnah.id,
                        type: 'sunnah',
                        title: sunnah.titleUz,
                        subtitle: sunnah.descriptionUz,
                      })
                    }
                    className="text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 p-1"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${bookmarked ? 'fill-emerald-600 text-emerald-600' : ''}`}
                    />
                  </button>
                </div>

                <h3 className="text-base font-bold text-stone-900 dark:text-stone-50">
                  {sunnah.titleUz}
                </h3>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {sunnah.descriptionUz}
                </p>

                <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300 space-y-1">
                  <div className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Amaliy tatbiq:</span>
                  </div>
                  <p>{sunnah.practicalApplication}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500 space-y-1">
                <div className="italic">"{sunnah.hadithTextUz}"</div>
                <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                  <Shield className="w-3 h-3" />
                  <span>
                    {sunnah.hadithSource.book} {sunnah.hadithSource.hadithNumber ? `(#${sunnah.hadithSource.hadithNumber})` : ''} · {sunnah.hadithSource.authenticity}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
