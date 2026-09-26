import React from 'react';
import { getHijriDate, MAJOR_ISLAMIC_EVENTS } from '../utils/hijriDate';
import { Calendar, Moon, Sparkles, Info } from 'lucide-react';

export const HijriCalendarSection: React.FC = () => {
  const hijri = getHijriDate(new Date());

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
          <Moon className="w-4 h-4" />
          <span>Qamariy Islomiy taqvim</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
          Hijriy taqvim va Muhim sanalar
        </h2>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          Payg‘ambarimiz (s.a.v.)ning hijratlaridan boshlangan qamariy yil hisobi va muborak oylar.
        </p>
      </div>

      {/* Today Hijri Highlight */}
      <div className="rounded-3xl p-6 sm:p-8 bg-stone-900 text-stone-100 border border-stone-800 shadow-sm text-center space-y-2">
        <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
          Bugungi hijriy sana
        </div>
        <div className="font-arabic text-3xl sm:text-4xl text-white py-1">
          {hijri.day} {hijri.monthNameArabic} {hijri.year} هـ
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-stone-100">
          {hijri.formattedUz}
        </h3>
        <p className="text-xs text-stone-400">
          Milodiy sana: {new Date().toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Moon sighting disclaimer */}
      <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 flex items-start gap-3 text-xs text-stone-600 dark:text-stone-300">
        <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <p>
          <strong>Muhim eslatma:</strong> Hijriy oylarning boshlanishi (ayniqsa Ramazon va Hayitlar) oy hilolining ko‘rinishiga qarab O‘zbekiston Musulmonlari Idorasi rasmiy qarori bilan tasdiqlanadi.
        </p>
      </div>

      {/* Major Islamic Events List */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 sm:p-8 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-stone-900 dark:text-stone-50">
          Yil davomidagi eng muhim islomiy sanalar va fazilatlari
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MAJOR_ISLAMIC_EVENTS.map((event, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 space-y-1.5 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                  {event.titleUz}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {event.hijriDateStr}
                </span>
              </div>
              <p className="text-stone-600 dark:text-stone-300">{event.descriptionUz}</p>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium pt-1 border-t border-stone-200/40 dark:border-stone-700/40">
                <strong>Fazilati:</strong> {event.significance}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
