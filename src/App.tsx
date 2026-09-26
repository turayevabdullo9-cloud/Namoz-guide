/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { SearchModal } from './components/SearchModal';

// Section Views
import { HomeDashboard } from './components/HomeDashboard';
import { SalahList } from './components/SalahList';
import { InteractiveTrainer } from './components/InteractiveTrainer';
import { HomeMosqueJamoat } from './components/HomeMosqueJamoat';
import { JumaSection } from './components/JumaSection';
import { TarovehSection } from './components/TarovehSection';
import { EidSection } from './components/EidSection';
import { TaharahSection } from './components/TaharahSection';
import { MistakesKnowledgeBase } from './components/MistakesKnowledgeBase';
import { SunnahsSection } from './components/SunnahsSection';
import { HadithsSection } from './components/HadithsSection';
import { QuranReader } from './components/QuranReader';
import { ArabicLearningSection } from './components/ArabicLearningSection';
import { DuasSection } from './components/DuasSection';
import { TasbihCounter } from './components/TasbihCounter';
import { PrayerTimesSection } from './components/PrayerTimesSection';
import { HijriCalendarSection } from './components/HijriCalendarSection';
import { BeginnerGuide } from './components/BeginnerGuide';
import { AskAssistant } from './components/AskAssistant';
import { SourcesSection } from './components/SourcesSection';
import { BookmarksSection } from './components/BookmarksSection';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { CreatorNoticeModal } from './components/CreatorNoticeModal';

// Utilities
import {
  UZBEKISTAN_CITIES,
  CityLocation,
  calculatePrayerTimes,
  processPrayerSchedule,
  fetchAladhanPrayerTimes,
  findClosestUzbekistanCity,
  AladhanTimings,
} from './utils/prayerTimes';
import { BookmarkItem, UserProfile } from './types';
import { X, Heart, LogOut } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('namoz_guide_theme') === 'dark' ||
        (!('namoz_guide_theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // User Profile & Google Authentication State
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('namoz_guide_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Prompt Google Auth on first entry if not authenticated
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('namoz_guide_user');
    }
    return false;
  });

  // 14-year-old creator heartfelt notice (only for first-time visitors)
  const [isCreatorNoticeOpen, setIsCreatorNoticeOpen] = useState<boolean>(false);

  // If user is already logged in, check if they haven't seen the creator notice yet
  useEffect(() => {
    if (user) {
      const seen = localStorage.getItem('namoz_guide_seen_creator_notice');
      if (!seen) {
        setIsCreatorNoticeOpen(true);
      }
    }
  }, [user]);

  const handleLoginSuccess = (signedInUser: UserProfile) => {
    setUser(signedInUser);
    setIsAuthModalOpen(false);
    // After logging in with Google, show the creator notice if first time
    const seen = localStorage.getItem('namoz_guide_seen_creator_notice');
    if (!seen) {
      setIsCreatorNoticeOpen(true);
    }
  };

  const handleSignOut = () => {
    try {
      localStorage.removeItem('namoz_guide_user');
    } catch {}
    setUser(null);
    setIsAuthModalOpen(true);
  };

  // Prayer times state
  const [selectedCity, setSelectedCity] = useState<CityLocation>(UZBEKISTAN_CITIES[0]);
  const [isHanafiAsr, setIsHanafiAsr] = useState<boolean>(true);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [aladhanTimings, setAladhanTimings] = useState<AladhanTimings | null>(null);
  const [hijriDateStr, setHijriDateStr] = useState<string | null>(null);

  // Keep live time ticking for home screen
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch real-time Aladhan prayer times on city / school change
  useEffect(() => {
    let isCancelled = false;
    async function loadData() {
      try {
        const data = await fetchAladhanPrayerTimes(
          selectedCity.latitude,
          selectedCity.longitude,
          isHanafiAsr
        );
        if (!isCancelled) {
          setAladhanTimings(data.timings);
          if (data.hijriDateStr) {
            setHijriDateStr(data.hijriDateStr);
          }
        }
      } catch (err) {
        console.warn('Aladhan fetch in App.tsx fallback:', err);
      }
    }
    loadData();
    return () => {
      isCancelled = true;
    };
  }, [selectedCity.latitude, selectedCity.longitude, isHanafiAsr]);

  // Try auto-detecting user's location via HTML5 Geolocation on load
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const closest = findClosestUzbekistanCity(latitude, longitude);
          setSelectedCity({
            nameUz: `${closest.city.nameUz} (GPS aniqlangan)`,
            nameEn: closest.city.nameEn,
            regionUz: closest.city.regionUz,
            latitude: Number(latitude.toFixed(4)),
            longitude: Number(longitude.toFixed(4)),
            timezone: 5,
            isDetectedGps: true,
          });
        },
        () => {
          // Graceful fallback: default Tashkent already active
        },
        { enableHighAccuracy: false, timeout: 6000 }
      );
    }
  }, []);

  // Bookmarks state
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    try {
      const saved = localStorage.getItem('namoz_guide_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('namoz_guide_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('namoz_guide_theme', 'light');
    }
  }, [isDarkMode]);

  // Save bookmarks
  const handleToggleBookmark = (item: {
    id: string;
    type: 'hadith' | 'dua' | 'prayer' | 'sunnah' | 'fiqh' | 'quran';
    title: string;
    subtitle: string;
  }) => {
    setBookmarks((prev) => {
      const exists = prev.find((b) => b.id === item.id);
      let updated: BookmarkItem[];
      if (exists) {
        updated = prev.filter((b) => b.id !== item.id);
      } else {
        const newItem: BookmarkItem = {
          ...item,
          dateAdded: new Date().toLocaleDateString('uz-UZ'),
        };
        updated = [newItem, ...prev];
      }
      try {
        localStorage.setItem('namoz_guide_bookmarks', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleRemoveBookmark = (id: string) => {
    setBookmarks((prev) => {
      const updated = prev.filter((b) => b.id !== id);
      try {
        localStorage.setItem('namoz_guide_bookmarks', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const isBookmarked = (id: string) => {
    return bookmarks.some((b) => b.id === id);
  };

  const currentPrayerTimes = aladhanTimings
    ? processPrayerSchedule(
        {
          fajr: aladhanTimings.Fajr,
          sunrise: aladhanTimings.Sunrise,
          dhuhr: aladhanTimings.Dhuhr,
          asr: aladhanTimings.Asr,
          maghrib: aladhanTimings.Maghrib,
          isha: aladhanTimings.Isha,
          tahajjud: aladhanTimings.Lastthird,
        },
        currentDate,
        'aladhan',
        hijriDateStr || undefined
      )
    : calculatePrayerTimes(
        currentDate,
        selectedCity.latitude,
        selectedCity.longitude,
        selectedCity.timezone,
        isHanafiAsr
      );

  // Deep-linking target states
  const [selectedSurahId, setSelectedSurahId] = useState<number>(1);
  const [selectedPrayerId, setSelectedPrayerId] = useState<string | undefined>(undefined);
  const [selectedTrainerPreset, setSelectedTrainerPreset] = useState<string>('bomdod-farz');

  const handleSelectTab = (tab: string, targetId?: string) => {
    setCurrentTab(tab);
    setIsMobileSidebarOpen(false);

    if (targetId) {
      if (tab === 'quran') {
        const num = parseInt(targetId.replace('quran-', ''), 10);
        if (!isNaN(num) && num >= 1 && num <= 114) {
          setSelectedSurahId(num);
        }
      } else if (tab === 'prayers') {
        setSelectedPrayerId(targetId);
      } else if (tab === 'trainer') {
        if (targetId.includes('sunnat')) {
          setSelectedTrainerPreset('bomdod-sunnat');
        } else if (targetId.includes('shom')) {
          setSelectedTrainerPreset('shom-farz');
        } else if (targetId.includes('vitr')) {
          setSelectedTrainerPreset('vitr');
        } else {
          setSelectedTrainerPreset('bomdod-farz');
        }
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-100 flex flex-col transition-colors selection:bg-emerald-500/20 selection:text-emerald-700 dark:selection:text-emerald-300">
      {/* Top Disclaimer Banner */}
      <DisclaimerBanner onOpenSources={() => handleSelectTab('sources')} />

      {/* Top 3-Zone Contract Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleSidebarMobile={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isMobileSidebarOpen={isMobileSidebarOpen}
        user={user}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onSignOut={handleSignOut}
        onOpenCreatorNotice={() => setIsCreatorNoticeOpen(true)}
      />

      {/* Google Authentication Gate / Modal */}
      <GoogleAuthModal
        isOpen={isAuthModalOpen}
        onLoginSuccess={handleLoginSuccess}
        onClose={user ? () => setIsAuthModalOpen(false) : undefined}
        defaultEmail="turayevabdullo9@gmail.com"
      />

      {/* 14-year-old Creator Heartfelt Notice Modal */}
      <CreatorNoticeModal
        isOpen={isCreatorNoticeOpen}
        onClose={() => setIsCreatorNoticeOpen(false)}
      />

      {/* Search Modal (Ctrl+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(tab, targetId) => handleSelectTab(tab, targetId)}
      />

      {/* Mobile Drawer Navigation for "Barchasi" */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-stone-950/70 backdrop-blur-sm flex">
          <div className="w-4/5 max-w-xs bg-white dark:bg-stone-900 h-full p-4 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
                <span className="text-base font-bold text-stone-900 dark:text-stone-50">
                  Bo‘limlar menyusi
                </span>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1 text-xs">
                {[
                  { id: 'home', label: 'Bosh sahifa' },
                  { id: 'prayers', label: 'Namozlar (5 mahal & Maxsus)' },
                  { id: 'trainer', label: 'Namozni birga o‘rganamiz' },
                  { id: 'quran', label: 'Qur\'oni Karim (114 Sura)' },
                  { id: 'arabic-learning', label: 'Arab tili (Muallimi soniy)' },
                  { id: 'prayer-times', label: 'Namoz vaqtlari (Realtime)' },
                  { id: 'ask', label: 'AI Islomiy maslahatchi' },
                  { id: 'taharah', label: 'Tahorat, G‘usl, Tayammum' },
                  { id: 'hadiths', label: 'Sahih hadislar' },
                  { id: 'duas', label: 'Duolar to‘plami' },
                  { id: 'sunnahs', label: 'Sunnat amallar' },
                  { id: 'modes', label: 'Uy / Masjid / Safar / Bemor' },
                  { id: 'juma', label: 'Juma namozi' },
                  { id: 'taroveh', label: 'Taroveh namozi' },
                  { id: 'eid', label: 'Hayit namozlari' },
                  { id: 'fiqh', label: 'Makruh & Xatolar bazasi' },
                  { id: 'tasbih', label: 'Zikr hisoblagich (Tasbeh)' },
                  { id: 'calendar', label: 'Hijriy taqvim' },
                  { id: 'beginner', label: 'Boshlovchilar kursi (7 kun)' },
                  { id: 'sources', label: 'Mo‘tabar manbalar' },
                  { id: 'saved', label: `Saqlanganlar (${bookmarks.length})` },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full text-left py-2 px-3 rounded-lg font-medium transition-colors ${
                      currentTab === item.id
                        ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
              {user ? (
                <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/60">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                          {user.name}
                        </div>
                        <div className="text-[10px] text-stone-500 dark:text-stone-400 truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="p-1 text-rose-500 hover:text-rose-700 text-xs"
                      title="Chiqish"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileSidebarOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-600 text-white text-xs font-semibold shadow-sm"
                >
                  <span>Google bilan kirish</span>
                </button>
              )}

              <button
                onClick={() => {
                  setIsMobileSidebarOpen(false);
                  setIsCreatorNoticeOpen(true);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-medium border border-emerald-200 dark:border-emerald-800"
              >
                <span>🤲 14 yoshli dasturchi eslatmasi</span>
              </button>

              <div className="text-[11px] text-stone-400 dark:text-stone-500 text-center">
                Namoz Guide · Hanafiy ta'limiy qo‘llanmasi
              </div>
            </div>
          </div>
          <div
            className="flex-1"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content Layout with Desktop Sidebar */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Desktop Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={handleSelectTab}
          savedCount={bookmarks.length}
        />

        {/* Content Viewport */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {currentTab === 'home' && (
            <HomeDashboard
              onNavigate={handleSelectTab}
              prayerTimes={currentPrayerTimes}
              selectedCityName={selectedCity.nameUz}
            />
          )}

          {currentTab === 'prayers' && (
            <SalahList
              initialPrayerId={selectedPrayerId}
              onStartTrainer={(prayerId) => {
                handleSelectTab('trainer', prayerId);
              }}
              onBookmark={handleToggleBookmark}
              isBookmarked={isBookmarked}
            />
          )}

          {currentTab === 'trainer' && (
            <InteractiveTrainer initialPreset={selectedTrainerPreset} />
          )}

          {currentTab === 'quran' && (
            <QuranReader
              initialSurahId={selectedSurahId}
              onBookmark={handleToggleBookmark}
              isBookmarked={isBookmarked}
            />
          )}

          {currentTab === 'arabic-learning' && <ArabicLearningSection />}

          {currentTab === 'prayer-times' && (
            <PrayerTimesSection
              selectedCity={selectedCity}
              onSelectCity={setSelectedCity}
              isHanafiAsr={isHanafiAsr}
              onToggleHanafiAsr={() => setIsHanafiAsr(!isHanafiAsr)}
              onOpenAssistantWithPrompt={(prompt) => {
                handleSelectTab('ask');
              }}
            />
          )}

          {currentTab === 'ask' && <AskAssistant />}

          {currentTab === 'modes' && <HomeMosqueJamoat />}

          {currentTab === 'juma' && <JumaSection />}

          {currentTab === 'taroveh' && <TarovehSection />}

          {currentTab === 'eid' && <EidSection />}

          {currentTab === 'taharah' && <TaharahSection />}

          {currentTab === 'fiqh' && <MistakesKnowledgeBase />}

          {currentTab === 'sunnahs' && (
            <SunnahsSection
              onBookmark={handleToggleBookmark}
              isBookmarked={isBookmarked}
            />
          )}

          {currentTab === 'hadiths' && (
            <HadithsSection
              onBookmark={handleToggleBookmark}
              isBookmarked={isBookmarked}
            />
          )}

          {currentTab === 'duas' && (
            <DuasSection
              onBookmark={handleToggleBookmark}
              isBookmarked={isBookmarked}
            />
          )}

          {currentTab === 'tasbih' && <TasbihCounter />}

          {currentTab === 'calendar' && <HijriCalendarSection />}

          {currentTab === 'beginner' && <BeginnerGuide />}

          {currentTab === 'sources' && <SourcesSection />}

          {currentTab === 'saved' && (
            <BookmarksSection
              bookmarks={bookmarks}
              onRemoveBookmark={handleRemoveBookmark}
              onNavigate={handleSelectTab}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-stone-200/80 dark:border-stone-800/80 py-8 px-4 sm:px-6 bg-white/50 dark:bg-stone-900/30 text-xs text-stone-500 mb-14 md:mb-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-800 dark:text-stone-200">Namoz Guide</span>
            <span>·</span>
            <span>Islomiy Ta'limiy Platforma</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-stone-600 dark:text-stone-400">
            <button
              onClick={() => setIsCreatorNoticeOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors shadow-2xs"
            >
              <span>🤲 14 yoshli dasturchi eslatmasi</span>
            </button>
            <button
              onClick={() => handleSelectTab('arabic-learning')}
              className="hover:underline font-medium text-emerald-700 dark:text-emerald-400"
            >
              Arab tili
            </button>
            <button
              onClick={() => handleSelectTab('sources')}
              className="hover:underline"
            >
              Manbalar
            </button>
            <button
              onClick={() => handleSelectTab('beginner')}
              className="hover:underline"
            >
              Boshlovchilar
            </button>
            <button
              onClick={() => handleSelectTab('ask')}
              className="hover:underline"
            >
              AI Maslahatchi
            </button>
          </div>

          <div className="text-[11px] text-stone-400">
            Hanafiy mazhabi mezonlari asosida
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Thumb Nav */}
      <MobileNav
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
      />
    </div>
  );
}
