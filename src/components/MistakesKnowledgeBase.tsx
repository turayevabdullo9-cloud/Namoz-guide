import React, { useState, useMemo } from 'react';
import { FIQH_KNOWLEDGE_BASE } from '../data/fiqhKnowledgeBase';
import { AlertTriangle, Search, Shield, ChevronDown, ChevronUp } from 'lucide-react';

export const MistakesKnowledgeBase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return FIQH_KNOWLEDGE_BASE.filter((item) => {
      const matchesCat =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.titleUz.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summaryUz.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.hanafiRuling.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">
          <AlertTriangle className="w-4 h-4" />
          <span>Shar'iy qoidalar va ogohlik</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
          Makruhlar, Buzuvchilar va Xatolar bazasi
        </h2>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          Namoz va tahoratdagi botil qiluvchi va makruh amallar, ularning Hanafiy fiqhidagi dalillari va to‘g‘rilash yo‘llari.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Xato yoki qoidani qidirish..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl outline-none text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-xl text-xs font-medium overflow-x-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-50 shadow-sm font-semibold'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            Barchasi
          </button>
          <button
            onClick={() => setSelectedCategory('NamozniBuzuvchi')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === 'NamozniBuzuvchi'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-50 shadow-sm font-semibold'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            Namozni buzuvchi
          </button>
          <button
            onClick={() => setSelectedCategory('Makruh')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === 'Makruh'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-50 shadow-sm font-semibold'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            Makruhlar
          </button>
          <button
            onClick={() => setSelectedCategory('SavolJavob')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === 'SavolJavob'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-50 shadow-sm font-semibold'
                : 'text-stone-600 dark:text-stone-400'
            }`}
          >
            Fiqhiy savol-javob
          </button>
        </div>
      </div>

      {/* Accordion / Cards List */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200/90 dark:border-stone-800 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-stone-50/50 dark:hover:bg-stone-800/40 transition-colors"
              >
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      {item.category === 'NamozniBuzuvchi'
                        ? 'Namozni buzuvchi amal'
                        : item.category === 'Makruh'
                        ? 'Makruh amal'
                        : 'Fiqhiy qoida'}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-50">
                    {item.titleUz}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-1">
                    {item.summaryUz}
                  </p>
                </div>

                <div className="p-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-500 shrink-0">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="p-5 pt-0 border-t border-stone-100 dark:border-stone-800 space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-800 space-y-2 mt-4">
                    <div className="font-semibold text-stone-900 dark:text-stone-100">
                      Hanafiy fiqhidagi hukm va tushuntirish:
                    </div>
                    <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                      {item.hanafiRuling}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-stone-500 text-[11px]">
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      Manba: <strong>{item.source.book}</strong>, muallif: {item.source.author} ({item.source.authenticity})
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
