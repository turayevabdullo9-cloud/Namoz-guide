import React, { useState, useMemo } from 'react';
import { HADITHS_DATA } from '../data/hadithsData';
import { HadithItem } from '../types';
import { Book, Search, Shield, Bookmark, Info } from 'lucide-react';
import { AudioPlayerButton } from './AudioPlayerButton';

interface HadithsSectionProps {
  onBookmark: (item: { id: string; type: 'hadith'; title: string; subtitle: string }) => void;
  isBookmarked: (id: string) => boolean;
}

export const HadithsSection: React.FC<HadithsSectionProps> = ({
  onBookmark,
  isBookmarked,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Barchasi' },
    { id: 'Salah', label: 'Namoz' },
    { id: 'Taharah', label: 'Tahorat' },
    { id: 'Juma', label: 'Juma' },
    { id: 'Ramadan', label: 'Ramazon' },
    { id: 'Dua', label: 'Duo' },
  ];

  const filteredHadiths = useMemo(() => {
    return HADITHS_DATA.filter((h) => {
      const matchCat =
        selectedCategory === 'all' || h.category === selectedCategory;
      const matchSearch =
        h.translationUz.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.narratorUz.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.collection.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
          <Book className="w-4 h-4" />
          <span>Sahih manbalar kutubxonasi</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
          Sahih Hadislar to‘plami
        </h2>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          Buxoriy, Muslim, Termiziy va boshqa mo‘tabar to‘plamlardan olingan, arabcha matni va raqamlari aniq ko‘rsatilgan rivoyatlar.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Hadis matni, roviy yoki mavzu bo‘yicha qidiruv..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl outline-none text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
          />
        </div>

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
      </div>

      {/* Hadiths List */}
      <div className="space-y-5">
        {filteredHadiths.map((h) => {
          const bookmarked = isBookmarked(h.id);
          return (
            <div
              key={h.id}
              className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    {h.collection}
                  </span>
                  <span className="text-stone-400">·</span>
                  <span className="text-xs text-stone-500 font-mono">
                    Hadis #{h.hadithNumber}
                  </span>
                  <span className="text-stone-400">·</span>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {h.authenticity}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <AudioPlayerButton arabicText={h.arabicText} label="Arabchasini tinglash" size="sm" />
                  <button
                    onClick={() =>
                      onBookmark({
                        id: h.id,
                        type: 'hadith',
                        title: `${h.collection}, #${h.hadithNumber}`,
                        subtitle: h.translationUz.slice(0, 70) + '...',
                      })
                    }
                    className="p-1.5 text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
                    title="Saqlab qo‘yish"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${bookmarked ? 'fill-emerald-600 text-emerald-600' : ''}`}
                    />
                  </button>
                </div>
              </div>

              {/* Arabic text */}
              <div className="font-arabic text-xl sm:text-2xl text-stone-900 dark:text-stone-50 text-right leading-loose py-1">
                {h.arabicText}
              </div>

              {/* Translation */}
              <div className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-normal">
                "{h.translationUz}"
              </div>

              {/* Narrator & Explanation */}
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 text-xs space-y-1">
                <div className="text-stone-500 dark:text-stone-400">
                  Roviy: <strong className="text-stone-800 dark:text-stone-200">{h.narratorUz}</strong>
                </div>
                <div className="text-stone-600 dark:text-stone-300">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">Sharh:</span> {h.explanationUz}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
