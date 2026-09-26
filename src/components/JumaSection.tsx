import React from 'react';
import { Sparkles, Clock, Check, AlertTriangle, Book, Heart } from 'lucide-react';
import { AudioPlayerButton } from './AudioPlayerButton';

export const JumaSection: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Hafta kunlarining sayyidi</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
          Muborak Juma namozi va sunnatlari
        </h2>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          Juma kuni musulmonlar uchun haftalik bayram bo‘lib, unda qilinadigan amallar va jamoat namozi ulkan fazilatlarga egadir.
        </p>
      </div>

      {/* Main Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Kimga farz va shartlari */}
        <div className="bg-white dark:bg-stone-900 rounded-xl p-5 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Juma namozi kimlarga farz?</span>
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            Hanafiy mazhabiga ko‘ra, juma namozi quyidagi shartlar topilgan kishilarga farzi ayn hisoblanadi:
          </p>
          <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Musulmon, oqil va balog‘atga yetgan bo‘lish</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Erkak kishi bo‘lish (ayollarga juma farz emas, peshin o‘qiydilar; agar masjidga kelsalar juma farzini o‘qishlari kifoya)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Muqim bo‘lish (musofir kishiga juma farz emas)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>Sog‘lom va erkin bo‘lish (kasal yoki ko‘zi ojizlarga uzr berilgan)</span>
            </li>
          </ul>
        </div>

        {/* Card 2: Rak'atlar tartibi */}
        <div className="bg-white dark:bg-stone-900 rounded-xl p-5 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Rak'atlar va tartibi</span>
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 flex items-center justify-between">
              <span className="text-stone-700 dark:text-stone-300 font-medium">1. Avvalgi sunnat</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">4 rak'at</span>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-between">
              <div>
                <span className="font-bold text-emerald-900 dark:text-emerald-200">2. Juma farzi (Jamoat bilan)</span>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-400">Xutbadan so‘ng imom orqasida</div>
              </div>
              <span className="font-bold text-emerald-800 dark:text-emerald-300">2 rak'at</span>
            </div>
            <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 flex items-center justify-between">
              <span className="text-stone-700 dark:text-stone-300 font-medium">3. Keyingi sunnat</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">4 rak'at</span>
            </div>
          </div>
          <p className="text-[11px] text-stone-500">
            Juma farzi o‘qilgach, o‘sha kundagi peshin namozi soqit bo‘ladi.
          </p>
        </div>
      </div>

      {/* Khutbah rules - Essential */}
      <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 space-y-3">
        <h3 className="text-sm font-bold text-amber-950 dark:text-amber-200 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Xutba eshitish odobi (Muhim shar'iy hukm)</span>
        </h3>
        <p className="text-xs text-amber-900 dark:text-amber-300 leading-relaxed">
          Imom minbarga chiqqan ondan boshlab to namoz tamom bo‘lguncha gaplashish, telefon bilan mashg‘ul bo‘lish, birovga "jim o‘tir" deb tanbeh berish va hatto nafl namoz o‘qish ham Hanafiy mazhabida makruh tahrimiy hisoblanadi. Namozxonlar jim o‘tirib xutbaga quloq solishlari vojibdir.
        </p>
      </div>

      {/* Friday Sunnahs list */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-stone-900 dark:text-stone-50">
          Juma kunining muborak sunnat amallari
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 space-y-1">
            <span className="font-semibold text-stone-900 dark:text-stone-100">1. G‘usl qilish:</span>
            <p className="text-stone-600 dark:text-stone-300">Juma namozi uchun to‘liq g‘usl qilish ta'kidlangan sunnatdir (Buxoriy, 877).</p>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 space-y-1">
            <span className="font-semibold text-stone-900 dark:text-stone-100">2. Toza kiyim va xushbo‘ylik:</span>
            <p className="text-stone-600 dark:text-stone-300">Eng chiroyli va pokiza liboslarni kiyish, misvoq ishlatish va atir surtish.</p>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 space-y-1">
            <span className="font-semibold text-stone-900 dark:text-stone-100">3. Kahf surasini tilovat qilish:</span>
            <p className="text-stone-600 dark:text-stone-300">Juma kuni yoki kechasi Kahf surasini o‘qigan kishiga ikki juma oralig‘ida nur porlaydi (Nasoiy).</p>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 space-y-1">
            <span className="font-semibold text-stone-900 dark:text-stone-100">4. Ko‘p salovot aytish:</span>
            <p className="text-stone-600 dark:text-stone-300">Payg‘ambarimiz (s.a.v.) ga salovotlarni ko‘paytirish, chunki salovotlar u zotga yetkaziladi.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
