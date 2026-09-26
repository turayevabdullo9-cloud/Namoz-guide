import React from 'react';
import {
  Home,
  BookOpen,
  PlayCircle,
  MapPin,
  Sparkles,
  Droplets,
  Book,
  HeartHandshake,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Clock,
  Calendar,
  GraduationCap,
  HelpCircle,
  Bookmark,
  Shield,
  Layers,
  Moon,
  Bot,
  Languages,
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  savedCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  savedCount,
}) => {
  const sections = [
    {
      group: 'Ibodat & Amaliyot',
      items: [
        { id: 'home', label: 'Bosh sahifa', icon: Home },
        { id: 'prayers', label: 'Namozlar (5 mahal & Maxsus)', icon: BookOpen },
        { id: 'trainer', label: 'Namozni birga o‘rganamiz', icon: PlayCircle },
        { id: 'modes', label: 'Uy / Masjid / Safar / Bemor', icon: MapPin },
        { id: 'juma', label: 'Juma namozi', icon: Sparkles },
        { id: 'taroveh', label: 'Taroveh namozi', icon: Moon },
        { id: 'eid', label: 'Hayit namozlari', icon: Layers },
      ],
    },
    {
      group: 'Qur\'on & Arab Tili',
      items: [
        { id: 'quran', label: 'Qur\'oni Karim (114 Sura)', icon: BookOpen },
        { id: 'arabic-learning', label: 'Arab tili (Muallimi soniy)', icon: Languages },
        { id: 'taharah', label: 'Tahorat, G‘usl, Tayammum', icon: Droplets },
        { id: 'hadiths', label: 'Sahih hadislar', icon: Book },
        { id: 'duas', label: 'Duolar to‘plami', icon: HeartHandshake },
        { id: 'sunnahs', label: 'Sunnat amallar', icon: CheckCircle2 },
        { id: 'fiqh', label: 'Makruh & Xatolar bazasi', icon: AlertTriangle },
      ],
    },
    {
      group: 'Kundalik asboblar',
      items: [
        { id: 'prayer-times', label: 'Namoz vaqtlari (Realtime)', icon: Clock },
        { id: 'tasbih', label: 'Zikr hisoblagich (Tasbeh)', icon: RotateCw },
        { id: 'calendar', label: 'Hijriy taqvim', icon: Calendar },
        { id: 'beginner', label: 'Boshlovchilar kursi (7 kun)', icon: GraduationCap },
      ],
    },
    {
      group: 'AI & Manbalar',
      items: [
        { id: 'ask', label: 'AI Islomiy maslahatchi', icon: Bot },
        { id: 'sources', label: 'Mo‘tabar manbalar', icon: Shield },
        { id: 'saved', label: `Saqlanganlar (${savedCount})`, icon: Bookmark },
      ],
    },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:block border-r border-stone-200/80 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/20 py-4 px-3 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      <div className="space-y-6">
        {sections.map((sec, idx) => (
          <div key={idx}>
            <div className="px-3 text-[11px] font-semibold tracking-wider uppercase text-stone-600 dark:text-stone-300 mb-2">
              {sec.group}
            </div>
            <div className="space-y-0.5">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/70 dark:text-emerald-200 font-semibold'
                        : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 hover:text-stone-900 dark:hover:text-stone-100'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : 'text-stone-600 dark:text-stone-300'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
