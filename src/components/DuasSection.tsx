import React, { useState } from 'react';
import { DUAS_DATA } from '../data/duasData';
import { DuaItem } from '../types';
import { HeartHandshake, Search, Bookmark, Shield, Sparkles } from 'lucide-react';
import { AudioPlayerButton } from './AudioPlayerButton';

interface DuasSectionProps {
  onBookmark: (item: { id: string; type: 'dua'; title: string; subtitle: string }) => void;
  isBookmarked: (id: string) => boolean;
}

export const DuasSection: React.FC<DuasSectionProps> = ({
  onBookmark,
  isBookmarked,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Barchasi' },
    { id: 'Namozda', label: 'Namoz ichidagi (Qunut)' },
    { id: 'NamozdanKeyin', label: 'Namozdan keyin' },
    { id: 'Tahorat', label: 'Tahorat' },
    { id: 'Masjid', label: 'Masjid' },
    { id: 'UyqudanOldin', label: 'Uyqu' },
    { id: 'Taomlanish', label: 'Taomlanish' },
    { id: 'Safar', label: 'Safar' },
    { id: 'TonggiKechki', label: 'Tonggi & Kechki' },
  ];

  const filteredDuas = DUAS_DATA.filter((d) => {
    const matchCat =
      selectedCategory === 'all' || d.category === selectedCategory;
    const matchSearch =
      d.titleUz.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.meaningUz.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.transliteration.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
          <HeartHandshake className="w-4 h-4" />
          <span>Ibodatning mag‘zi</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
          Duolar va Zikrlar to‘plami
        </h2>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          Namozdagi va kundalik hayotdagi eng mo‘tabar duolar, arabcha matni, o‘qilishi va ma'nolari bilan.
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
            placeholder="Duo nomi yoki ma'nosi bo‘yicha qidiruv..."
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

      {/* Duas list */}
      <div className="space-y-4">
        {filteredDuas.map((dua) => {
          const bookmarked = isBookmarked(dua.id);
          return (
            <div
              key={dua.id}
              className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                <div>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {dua.category}
                  </span>
                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-50">
                    {dua.titleUz}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <AudioPlayerButton arabicText={dua.arabicText} label="Tinglash" size="sm" />
                  <button
                    onClick={() =>
                      onBookmark({
                        id: dua.id,
                        type: 'dua',
                        title: dua.titleUz,
                        subtitle: dua.meaningUz.slice(0, 70) + '...',
                      })
                    }
                    className="p-1.5 text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
                    title="Duoni saqlab qo‘yish"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${bookmarked ? 'fill-emerald-600 text-emerald-600' : ''}`}
                    />
                  </button>
                </div>
              </div>

              {/* Arabic Text */}
              <div className="font-arabic text-xl sm:text-2xl text-stone-900 dark:text-stone-50 text-right leading-loose py-1">
                {dua.arabicText}
              </div>

              {/* Transliteration */}
              <div className="text-xs text-stone-600 dark:text-stone-400 italic bg-stone-50 dark:bg-stone-800/40 p-3 rounded-xl border border-stone-200/60 dark:border-stone-800">
                <strong>O‘qilishi:</strong> {dua.transliteration}
              </div>

              {/* Translation */}
              <div className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed font-normal">
                <strong>Ma'nosi:</strong> "{dua.meaningUz}"
              </div>

              {/* Context and source */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500">
                <div>
                  <strong>Fazilati:</strong> {dua.context}
                </div>
                <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium shrink-0">
                  <Shield className="w-3 h-3" />
                  <span>{dua.source.book}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
