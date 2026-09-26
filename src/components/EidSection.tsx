import React from 'react';
import { Layers, Sparkles, Check, Info } from 'lucide-react';
import { AudioPlayerButton } from './AudioPlayerButton';

export const EidSection: React.FC = () => {
  const takbirTashriq = 'اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ ، لَا إِلَهَ إِلَّا اللَّهُ ، وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ';

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
          <Layers className="w-4 h-4" />
          <span>Ikkala ulug‘ bayram namozi</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
          Ramazon va Qurbon Hayiti namozlari
        </h2>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          Hayit namozi Hanafiy mazhabida juma farz bo‘lgan kishilarga VOJIB hisoblanadi. Unda 6 ta qo‘shimcha takbir aytiladi.
        </p>
      </div>

      {/* 6 Takbirs Interactive Step visualizer */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 sm:p-8 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-stone-900 dark:text-stone-50">
          Hanafiy mazhabi bo‘yicha 2 rak'at Hayit namozi tartibi
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* 1st Rakat */}
          <div className="p-5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                1-Rak'at tartibi
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                3 ta qo‘shimcha takbir
              </span>
            </div>

            <ol className="space-y-2 text-stone-700 dark:text-stone-300 list-decimal list-inside leading-relaxed">
              <li>Niyat qilinadi va imom bilan birga <strong>"Allohu Akbar"</strong> deb takbiri tahrima aytilib, qo‘l bog‘lanadi.</li>
              <li>Ichda <strong>Sano (Subhanaka)</strong> duosi o‘qiladi.</li>
              <li>Imom <strong>3 marta takbir</strong> aytadi: har gal qo‘llar quloqqa ko‘tariladi. 1 va 2-takbirlarda qo‘llar yon tomonga tushiriladi; 3-takbirdan so‘ng qo‘l bog‘lanadi!</li>
              <li>Imom ovoz chiqarib Fotiha va zam sura o‘qiydi.</li>
              <li>Oddiy tartibda ruku va sajdalar qilinadi.</li>
            </ol>
          </div>

          {/* 2nd Rakat */}
          <div className="p-5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                2-Rak'at tartibi
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                3 ta takbir + 1 ruku takbiri
              </span>
            </div>

            <ol className="space-y-2 text-stone-700 dark:text-stone-300 list-decimal list-inside leading-relaxed">
              <li>2-rak'atga turgach, qo‘llar bog‘liq holda turiladi.</li>
              <li>Imom avval <strong>Fotiha va zam sura</strong> o‘qiydi.</li>
              <li>Qiroat tugagach, ruku'ga ketishdan oldin <strong>3 marta takbir</strong> aytiladi va har gal qo‘llar quloqqa ko‘tarilib yonboshga tushiriladi (bog‘lanmaydi).</li>
              <li><strong>4-takbir bilan</strong> qo‘l ko‘tarilmasdan to‘g‘ridan-to‘g‘ri ruku'ga egilinadi.</li>
              <li>Ruku, sajdalar, oxirgi qa'da (Attahiyyat, Salovot, Duo) o‘qilib salom beriladi.</li>
            </ol>
          </div>
        </div>

        {/* Khutbah notice */}
        <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 text-xs text-stone-700 dark:text-stone-300 space-y-1">
          <div className="font-semibold text-emerald-900 dark:text-emerald-200">
            Hayit xutbasi namozdan KEYIN o‘qiladi
          </div>
          <p>
            Juma namozidan farqli ravishda, Hayit namozida xutba namozdan so‘ng o‘qiladi. Uni jim o‘tirib tinglash sunnat va fazilatdir.
          </p>
        </div>
      </div>

      {/* Takbiri Tashriq */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-50">
              Takbiri Tashriq (Qurbon hayitida har farz namozidan keyin)
            </h3>
            <p className="text-[11px] text-stone-500">
              Arafa kuni bomdod namozidan to hayitning 4-kuni asr namozigacha jami 23 vaqt farz namozlaridan so‘ng aytish vojibdir.
            </p>
          </div>
          <AudioPlayerButton arabicText={takbirTashriq} label="Takbirni tinglash" />
        </div>

        <div className="font-arabic text-xl sm:text-2xl text-stone-900 dark:text-stone-50 text-right leading-loose">
          {takbirTashriq}
        </div>

        <div className="text-xs text-stone-700 dark:text-stone-300 italic">
          "Allohu Akbar, Allohu Akbar, la ilaha illallohu vallohu Akbar, Allohu Akbar va lillahil hamd."
        </div>

        <div className="text-xs text-stone-800 dark:text-stone-200 font-medium">
          Ma'nosi: "Alloh buyukdir, Alloh buyukdir! Allohdan o‘zga iloh yo‘q. Alloh buyukdir, Alloh buyukdir va barcha hamdu sanolar Allohgadir!"
        </div>
      </div>
    </div>
  );
};
