import React from 'react';
import { Moon, Sparkles, Clock, Check, Info } from 'lucide-react';
import { AudioPlayerButton } from './AudioPlayerButton';

export const TarovehSection: React.FC = () => {
  const tasbihArabic = 'سُبْحَانَ ذِي الْمُلْكِ وَالْمَلَكُوتِ ، سُبْحَانَ ذِي الْعِزَّةِ وَالْعَظَمَةِ وَالْقُدْرَةِ وَالْكِبْرِيَاءِ وَالْجَبَرُوتِ ، سُبْحَانَ الْمَلِكِ الْحَيِّ الَّذِي لَا يَمُوتُ ، سُبُّوحٌ قُدُّوسٌ رَبُّنَا وَرَبُّ الْمَلَائِكَةِ وَالرُّوحِ ، لَا إِلَهَ إِلَّا اللَّهُ نَسْتَغْفِرُ اللَّهَ ، نَسْأَلُكَ الْجَنَّةَ وَنَعُوذُ بِكَ مِنَ النَّارِ';

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
          <Moon className="w-4 h-4" />
          <span>Muborak Ramazon oyi kechalari</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
          Taroveh namozi qo‘llanmasi
        </h2>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          Taroveh namozi Ramazon oyiga xos bo‘lgan ulkan ajrli sunnat namozidir.
        </p>
      </div>

      {/* Main explanation card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white dark:bg-stone-900 rounded-xl p-5 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Taroveh nima va uning vaqti</span>
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            "Taroveh" so‘zi arabchada "orom olish", "dam olish" degan ma'noni anglatadi. Har to‘rt rak'at namozdan keyin bir oz o‘tirib dam olingani uchun shunday nomlangan.
          </p>
          <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/60 text-xs text-stone-700 dark:text-stone-300 space-y-1">
            <strong>Vaqti:</strong> Ramazon oyining har bir kechasida, xufton namozining 2 rak'at sunnatidan keyin to Vitr namozigacha ado etiladi.
          </div>
        </div>

        {/* Rakats explanation */}
        <div className="bg-white dark:bg-stone-900 rounded-xl p-5 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Rak'atlar soni va mazhablar qarashi</span>
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            <strong>Hanafiy mazhabi bo‘yicha:</strong> Taroveh namozi 20 rak'at bo‘lib, erkak va ayollarga sunnati muakkadadir. Hazrati Umar (r.a.) davrlarida sahobalar ittifoqi bilan 20 rak'at qilib jamoat bilan o‘qilgan va to‘rt mazhab (jumhur) ulamolari shunga ittifoq qilishgan.
          </p>
          <p className="text-xs text-stone-500 leading-relaxed">
            <em>Qayd:</em> Kishi uyda yoki imkoniyatiga qarab 8 yoki undan ko‘p rak'at o‘qisa ham namozi durust bo‘ladi va qiyom savobiga erishadi, ammo sunnati muakkadani to‘liq 20 rak'at o‘qish afzaldir.
          </p>
        </div>
      </div>

      {/* Tarawih Tasbeeh Card */}
      <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-900/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/60 dark:border-emerald-900/40 pb-3">
          <div>
            <h3 className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
              Taroveh tasbehi (Har 4 rak'at oralig‘ida aytiladigan zikr)
            </h3>
            <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
              O‘zbekiston masjidlarida an'anaviy o‘qiladigan mashhur tasbeh
            </p>
          </div>
          <AudioPlayerButton arabicText={tasbihArabic} label="Tasbehni tinglash" />
        </div>

        {/* Arabic text */}
        <div className="font-arabic text-xl sm:text-2xl text-stone-900 dark:text-stone-50 text-right leading-loose">
          {tasbihArabic}
        </div>

        {/* Transliteration */}
        <div className="text-xs text-stone-700 dark:text-stone-300 italic bg-white/60 dark:bg-stone-900/40 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
          <strong>O‘qilishi:</strong> "Subhana zil mulki val malakut. Subhana zil 'izzati val 'azomati val qudroti val kibriya-i val jabarut. Subhanal malikil hayyillaziy la yamut. Subbuhun quddusun robbuna va robbul mala-ikati var-ruh. La ilaha illallohu nastag'firulloh, nas'alukal jannata va na'uzu bika minan-nar."
        </div>

        {/* Meaning */}
        <div className="text-xs text-stone-800 dark:text-stone-200 font-medium">
          <strong>Ma'nosi:</strong> "Mulk va malakut Egasiga tasbeh bo‘lsin. Izzat, ulug‘lik, qudrat, kibriyo va saltanat Egasiga tasbeh bo‘lsin. Hech qachon o‘lmaydigan Tirik Podshohga tasbeh bo‘lsin. U Zot benuqson, o‘ta pokiza zotdir, bizning Rabbimiz hamda farishtalar va Jabroilning Rabbidir. Allohdan o‘zga iloh yo‘q, Uning O‘zidan mag‘firat so‘raymiz. Senda jannatni so‘raymiz va do‘zax olovidan panoh tilaymiz."
        </div>
      </div>
    </div>
  );
};
