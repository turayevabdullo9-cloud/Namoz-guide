import React from 'react';
import { Home, BookOpen, PlayCircle, Book, Menu } from 'lucide-react';

interface MobileNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenMobileMenu: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenMobileMenu,
}) => {
  const tabs = [
    { id: 'home', label: 'Bosh sahifa', icon: Home },
    { id: 'prayers', label: 'Namoz', icon: BookOpen },
    { id: 'trainer', label: 'O‘rganish', icon: PlayCircle },
    { id: 'quran', label: 'Qur\'on', icon: Book },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 px-2 py-1 flex items-center justify-around h-14">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 min-h-[44px] transition-colors ${
              isActive
                ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Icon className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] leading-tight tracking-tight">{tab.label}</span>
          </button>
        );
      })}
      <button
        onClick={onOpenMobileMenu}
        className="flex flex-col items-center justify-center flex-1 py-1 px-1 min-h-[44px] text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
      >
        <Menu className="w-4 h-4 mb-0.5" />
        <span className="text-[10px] leading-tight tracking-tight">Barchasi</span>
      </button>
    </nav>
  );
};
