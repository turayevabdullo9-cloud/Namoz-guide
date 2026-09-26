import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, BookOpen, HeartHandshake, Book, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { PRAYERS_DATA } from '../data/prayersData';
import { DUAS_DATA } from '../data/duasData';
import { HADITHS_DATA } from '../data/hadithsData';
import { SUNNAHS_DATA } from '../data/sunnahsData';
import { FIQH_KNOWLEDGE_BASE } from '../data/fiqhKnowledgeBase';
import { ALL_114_SURAHS } from '../data/quranSurahsList';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string, targetId?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open handled by parent
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const items: {
      id: string;
      title: string;
      snippet: string;
      category: string;
      tab: string;
      icon: React.ElementType;
    }[] = [];

    // Search Prayers
    PRAYERS_DATA.forEach((p) => {
      if (
        p.name.toLowerCase().includes(q) ||
        p.arabicName.includes(q) ||
        p.rakatsSummary.toLowerCase().includes(q) ||
        p.niyyah.meaningUz.toLowerCase().includes(q)
      ) {
        items.push({
          id: p.id,
          title: p.name,
          snippet: `${p.rakatsSummary} · ${p.timeDescription.slice(0, 70)}...`,
          category: 'Namoz',
          tab: 'prayers',
          icon: BookOpen,
        });
      }
    });

    // Search Duas
    DUAS_DATA.forEach((d) => {
      if (
        d.titleUz.toLowerCase().includes(q) ||
        d.transliteration.toLowerCase().includes(q) ||
        d.meaningUz.toLowerCase().includes(q)
      ) {
        items.push({
          id: d.id,
          title: d.titleUz,
          snippet: d.meaningUz.slice(0, 80) + '...',
          category: 'Duo',
          tab: 'duas',
          icon: HeartHandshake,
        });
      }
    });

    // Search Hadiths
    HADITHS_DATA.forEach((h) => {
      if (
        h.translationUz.toLowerCase().includes(q) ||
        h.narratorUz.toLowerCase().includes(q) ||
        h.collection.toLowerCase().includes(q)
      ) {
        items.push({
          id: h.id,
          title: `${h.collection}, #${h.hadithNumber}`,
          snippet: h.translationUz.slice(0, 85) + '...',
          category: 'Hadis',
          tab: 'hadiths',
          icon: Book,
        });
      }
    });

    // Search Quran (All 114 Surahs)
    ALL_114_SURAHS.forEach((s) => {
      if (
        s.nameUz.toLowerCase().includes(q) ||
        s.nameArabic.includes(q) ||
        s.meaningUz.toLowerCase().includes(q) ||
        s.id.toString() === q
      ) {
        items.push({
          id: s.id.toString(),
          title: `${s.id}. ${s.nameUz} surasi (${s.nameArabic})`,
          snippet: `${s.totalAyahs} oyat · ${s.meaningUz} · ${s.revelationType}`,
          category: 'Qur\'on',
          tab: 'quran',
          icon: BookOpen,
        });
      }
    });

    // Search Sunnahs
    SUNNAHS_DATA.forEach((s) => {
      if (
        s.titleUz.toLowerCase().includes(q) ||
        s.descriptionUz.toLowerCase().includes(q)
      ) {
        items.push({
          id: s.id,
          title: s.titleUz,
          snippet: s.descriptionUz.slice(0, 80) + '...',
          category: 'Sunnat',
          tab: 'sunnahs',
          icon: CheckCircle2,
        });
      }
    });

    // Search Fiqh
    FIQH_KNOWLEDGE_BASE.forEach((f) => {
      if (
        f.titleUz.toLowerCase().includes(q) ||
        f.summaryUz.toLowerCase().includes(q) ||
        f.hanafiRuling.toLowerCase().includes(q)
      ) {
        items.push({
          id: f.id,
          title: f.titleUz,
          snippet: f.summaryUz.slice(0, 80) + '...',
          category: 'Fiqh & Qoidalar',
          tab: 'fiqh',
          icon: AlertTriangle,
        });
      }
    });

    return items.slice(0, 10);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-stone-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-stone-200 dark:border-stone-800">
          <Search className="w-5 h-5 text-stone-400 dark:text-stone-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Namoz, duo, hadis, sura yoki fiqhiy qoidalarni qidirish..."
            className="w-full px-3 py-4 text-sm bg-transparent outline-none text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 px-2 py-1 text-xs text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded border border-stone-200 dark:border-stone-700"
          >
            Esc
          </button>
        </div>

        {/* Results Box */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {!query && (
            <div className="p-6 text-center text-xs text-stone-600 dark:text-stone-300">
              <p className="mb-2">Tezkor so‘rovlar: "Bomdod", "Qunut", "Tahorat farzlari", "Fotiha", "Misvoq"</p>
              <p className="text-[11px] text-stone-600 dark:text-stone-300">Har qanday qidiruv natijasi sahih manba bilan ko‘rsatiladi.</p>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="p-8 text-center text-xs text-stone-600 dark:text-stone-300">
              Ushbu so‘rov bo‘yicha tekshirilgan ma'lumot topilmadi. Iltimos, boshqa kalit so‘z bilan sinab ko‘ring.
            </div>
          )}

          {results.map((res) => {
            const Icon = res.icon;
            return (
              <button
                key={`${res.tab}-${res.id}`}
                onClick={() => {
                  onNavigate(res.tab, res.id);
                  onClose();
                }}
                className="w-full flex items-start gap-3 p-3 rounded-lg text-left hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors group"
              >
                <div className="p-2 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                      {res.title}
                    </span>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400">
                      {res.category}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-1 mt-0.5">
                    {res.snippet}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-600 dark:text-stone-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
