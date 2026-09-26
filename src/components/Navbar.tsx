import React, { useState, useRef, useEffect } from 'react';
import { Search, Moon, Sun, Menu, X, Bot, LogOut, Heart, User as UserIcon, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSearch: () => void;
  onToggleSidebarMobile: () => void;
  isMobileSidebarOpen: boolean;
  user: UserProfile | null;
  onOpenAuthModal: () => void;
  onSignOut: () => void;
  onOpenCreatorNotice: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  isDarkMode,
  onToggleDarkMode,
  onOpenSearch,
  onToggleSidebarMobile,
  isMobileSidebarOpen,
  user,
  onOpenAuthModal,
  onSignOut,
  onOpenCreatorNotice,
}) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: 'home', label: 'Bosh sahifa' },
    { id: 'prayers', label: 'Namoz' },
    { id: 'trainer', label: 'O‘rganish' },
    { id: 'quran', label: 'Qur\'on' },
    { id: 'arabic-learning', label: 'Arab tili' },
    { id: 'prayer-times', label: 'Vaqtlar' },
  ];

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebarMobile}
            className="md:hidden p-2 -ml-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-900"
            aria-label="Menyuni ochish"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-2 group text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm group-hover:bg-emerald-700 transition-colors">
              ن
            </div>
            <span className="text-lg font-bold tracking-tight text-stone-900 dark:text-stone-50">
              Namoz Guide
            </span>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600 dark:text-stone-300">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`transition-colors relative py-1 hover:text-stone-900 dark:hover:text-stone-50 ${
                  isActive
                    ? 'text-emerald-700 dark:text-emerald-400 font-semibold'
                    : 'text-stone-600 dark:text-stone-300'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions + Dark Mode + Google Profile */}
        <div className="flex items-center gap-2">
          {/* AI Advisor direct button */}
          <button
            onClick={() => onSelectTab('ask')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
              currentTab === 'ask'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI Maslahatchi</span>
          </button>

          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-lg border border-stone-200/80 dark:border-stone-800 transition-colors"
            title="Qidiruv (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Qidirish...</span>
            <kbd className="hidden sm:inline text-[10px] bg-white dark:bg-stone-800 px-1.5 py-0.5 rounded border border-stone-300 dark:border-stone-700 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Dark / Light Mode Switch */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-stone-700 dark:text-stone-200 hover:text-stone-900 dark:hover:text-stone-50 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Mavzuni almashtirish"
            title={isDarkMode ? "Yorug' rejimga o'tish" : "Qorong'u rejimga o'tish"}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-stone-700" />
            )}
          </button>

          {/* Google User Profile or Google Sign In Button */}
          {user ? (
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-1.5 p-1 sm:px-2 sm:py-1 rounded-xl bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[11px] overflow-hidden">
                  {user.photoUrl ? (
                    <img src={user.photoUrl} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user.name.charAt(0)
                  )}
                </div>
                <span className="hidden md:inline text-xs font-medium text-stone-800 dark:text-stone-200 max-w-[100px] truncate">
                  {user.name.split(' ')[0]}
                </span>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl p-2.5 z-50 animate-fade-in text-xs space-y-2">
                  <div className="p-2 border-b border-stone-100 dark:border-stone-800">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-stone-900 dark:text-stone-100 truncate">
                          {user.name}
                        </div>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full font-medium">
                      <span>✓ Google bilan tasdiqlangan</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onOpenCreatorNotice();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 text-left font-medium transition-colors"
                  >
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>14 yoshli dasturchi eslatmasi</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onSignOut();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-left font-medium transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Hisobdan chiqish</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-stone-850 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-100 font-semibold text-xs border border-stone-300 dark:border-stone-700 shadow-sm transition-all"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Kirish</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
