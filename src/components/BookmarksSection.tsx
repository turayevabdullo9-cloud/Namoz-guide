import React from 'react';
import { BookmarkItem } from '../types';
import { Bookmark, Trash2, ArrowRight, BookOpen, HeartHandshake, Book, Sparkles } from 'lucide-react';

interface BookmarksSectionProps {
  bookmarks: BookmarkItem[];
  onRemoveBookmark: (id: string) => void;
  onNavigate: (tab: string, targetId?: string) => void;
}

export const BookmarksSection: React.FC<BookmarksSectionProps> = ({
  bookmarks,
  onRemoveBookmark,
  onNavigate,
}) => {
  const getTabForType = (type: string) => {
    switch (type) {
      case 'prayer':
        return 'prayers';
      case 'dua':
        return 'duas';
      case 'hadith':
        return 'hadiths';
      case 'sunnah':
        return 'sunnahs';
      case 'quran':
        return 'quran';
      default:
        return 'home';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'prayer':
        return BookOpen;
      case 'dua':
        return HeartHandshake;
      case 'hadith':
        return Book;
      case 'sunnah':
        return Sparkles;
      default:
        return Bookmark;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
          <Bookmark className="w-4 h-4" />
          <span>Shaxsiy to‘plam</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
          Saqlangan ma'lumotlar
        </h2>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          O‘zingiz uchun saqlab qo‘ygan hadislar, duolar, namoz tartiblari va sunnat amallar.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 p-8">
          <Bookmark className="w-10 h-10 text-stone-300 dark:text-stone-700 mx-auto mb-3" />
          <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
            Hozircha hech narsa saqlanmagan
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 mb-6">
            Namozlar, duolar, sahih hadislar yoki sunnat amallar yonidagi xatcho‘p (saqlash) tugmasini bosib shu yerda to‘plashingiz mumkin.
          </p>
          <button
            onClick={() => onNavigate('prayers')}
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
          >
            Namozlarni ko‘rish →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarks.map((bm) => {
            const Icon = getIcon(bm.type);
            const targetTab = getTabForType(bm.type);
            return (
              <div
                key={bm.id}
                className="bg-white dark:bg-stone-900 rounded-xl p-5 border border-stone-200/90 dark:border-stone-800 shadow-sm flex items-start justify-between gap-3 group"
              >
                <div
                  onClick={() => onNavigate(targetTab, bm.id)}
                  className="flex items-start gap-3 flex-1 cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-stone-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {bm.title}
                    </h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mt-0.5">
                      {bm.subtitle}
                    </p>
                    <div className="text-[10px] text-stone-400 mt-2">
                      Saqlangan sana: {bm.dateAdded}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => onRemoveBookmark(bm.id)}
                    className="p-1.5 text-stone-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    title="O‘chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
