import React, { useState } from 'react';
import { Home, Landmark, Users, Plane, Stethoscope, Check, AlertCircle, Info, Shield } from 'lucide-react';

export const HomeMosqueJamoat: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'home' | 'mosque' | 'jamoat' | 'travel' | 'sick'>('home');

  const modes = [
    { id: 'home', label: 'Uyda', icon: Home, subtitle: 'Yakka yoki oila bilan' },
    { id: 'mosque', label: 'Masjidda', icon: Landmark, subtitle: 'Masjid odoblari va tahiyyat' },
    { id: 'jamoat', label: 'Jamoatda', icon: Users, subtitle: 'Imom, muqtadi va masbuq' },
    { id: 'travel', label: 'Safarda', icon: Plane, subtitle: 'Qasr va musofirlik qoidalari' },
    { id: 'sick', label: 'Bemor holatda', icon: Stethoscope, subtitle: 'O‘tirib va imo-ishora bilan' },
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
          Qayerda namoz o‘qiyapsiz?
        </h2>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          Namoz o‘qilayotgan joy va insonning holatiga qarab shariatimizda belgilangan amaliy farqlar va odoblar.
        </p>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {modes.map((m) => {
          const Icon = m.icon;
          const isActive = activeMode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveMode(m.id as any)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-emerald-300 dark:hover:border-emerald-700'
              }`}
            >
              <Icon className={`w-5 h-5 mb-2 ${isActive ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
              <div className="text-xs font-bold leading-tight">{m.label}</div>
              <div className={`text-[10px] mt-0.5 line-clamp-1 ${isActive ? 'text-emerald-100' : 'text-stone-600 dark:text-stone-300'}`}>
                {m.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Mode Content Card */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 sm:p-8 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-6">
        {activeMode === 'home' && (
          <div className="space-y-5">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50">
                Uyda namoz o‘qish tartibi
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                Yakka holda yoki oila a'zolari bilan birga namoz o‘qish qoidalari.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-800 space-y-2">
                <h4 className="font-semibold text-stone-900 dark:text-stone-100">
                  1. Yolg‘iz (yakka) o‘quvchi:
                </h4>
                <ul className="space-y-1.5 text-stone-600 dark:text-stone-300">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Azon va iqomat aytish mustahab (faqat o‘zi eshitadigan qilib aytsa ham kifoya).</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Kunduzgi namozlarda (Peshin, Asr) maxfiy qiroat qiladi.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Tungi namozlarda (Bomdod, Shom, Xufton) xohlasa ovoz chiqarib, xohlasa maxfiy o‘qishi joiz.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-800 space-y-2">
                <h4 className="font-semibold text-stone-900 dark:text-stone-100">
                  2. Oila bilan jamoat bo‘lganda:
                </h4>
                <ul className="space-y-1.5 text-stone-600 dark:text-stone-300">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Agar 2 erkak bo‘lsa: Imom chapda, ergashtiruvchi esa uning roppa-rosa o‘ng tomonida (tovoni imomdan bir oz orqaroqda) turadi.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Agar 3 yoki undan ko‘p erkak bo‘lsa: Imom oldinda yakka turadi, orqasida bir qator saf tuziladi.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Ayollar safi: Erkaklarning safidan orqada turadi. Ayol kishi erkak bilan bitta safda yonma-yon tursa, Hanafiyda namoz buziladi (muhozot masalasi).</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'mosque' && (
          <div className="space-y-5">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50">
                Masjid odoblari va tahiyyatul masjid
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                Masjid – Allohning uyi. U yerga kirish, o‘tirish va ibodat qilish madaniyati.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 space-y-1">
                <span className="font-semibold text-stone-900 dark:text-stone-100">Kirish va chiqish odobi:</span>
                <p className="text-stone-600 dark:text-stone-300">
                  Masjidga o‘ng oyoq bilan va salovot aytib: <em>"Bismillahi vas-solatu vas-salamu 'ala rosulillah, Allohummaftah liy abvaba rohmatik"</em> duosi bilan kiriladi. Chiqishda esa chap oyoq bilan chiqiladi.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 space-y-1">
                <span className="font-semibold text-stone-900 dark:text-stone-100">Tahiyyatul masjid namozi:</span>
                <p className="text-stone-600 dark:text-stone-300">
                  Masjidga kirgach o‘tirmasdan oldin 2 rak'at namoz o‘qish sunnatdir. Agar makruh vaqt (quyosh chiqishi, qiyom yoki botish payti) bo‘lsa yoki imom xutbaga chiqqan bo‘lsa o‘qilmaydi.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 space-y-1">
                <span className="font-semibold text-stone-900 dark:text-stone-100">Telefon va xushbo‘ylik:</span>
                <p className="text-stone-600 dark:text-stone-300">
                  Masjidga kirishdan oldin telefon ovozi mutlaqo o‘chiriladi. Piyozi yoki sarimsoq yegan kishi og‘iz hidini ketkazmaguncha masjidga kelishi makruhdir.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'jamoat' && (
          <div className="space-y-5">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50">
                Jamoat namozi va Kech qolgan kishi (Masbuq)
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                Jamoat bilan namoz o‘qish 27 barobar ko‘proq savobga ega (Buxoriy).
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-1.5">
                <div className="font-semibold text-emerald-900 dark:text-emerald-200">
                  Imomga qachon va qanday ergashiladi?
                </div>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  Imom harakat qilgachgina orqasidan ergashiladi. Imomdan oldinga o‘tib ketish (takbir, ruku yoki sajdada) qattiq qaytarilgan. Hanafiy mazhabida muqtadi (ergashuvchi) jahriy namozlarda ham, maxfiy namozlarda ham imom orqasida Fotiha va zam sura o‘qimaydi, sukut saqlab tinglaydi.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 space-y-1.5">
                <div className="font-semibold text-stone-900 dark:text-stone-100">
                  Kechikib kelgan odam (Masbuq) nima qiladi?
                </div>
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  Agar imom ruku'daligida yetib kelsa va imom qad rostlamasdan bir lahza ruku'ga ulgursa – o‘sha rak'atga yetishgan hisoblanadi. Imom ikki tarafga salom bergach, masbuq salom bermasdan tik turadi va yetolmay qolgan rak'atlarini Fotiha va zam sura bilan tartib bo‘yicha to‘ldiradi.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeMode === 'travel' && (
          <div className="space-y-5">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50">
                Safarda namoz (Qasr qoidalari)
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                Alloh taolo safardagi bandasiga rahm qilib bergan shar'iy yengillik.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 space-y-1">
                <span className="font-semibold text-stone-900 dark:text-stone-100">Safar masofasi:</span>
                <p className="text-stone-600 dark:text-stone-300">
                  Kamida 96 km (3 kunlik tuyali yurish) masofaga yo‘lga chiqilganda va o‘z shahri chegarasidan chiqqanda musofir hukmiga o‘tiladi.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800 space-y-1">
                <span className="font-semibold text-stone-900 dark:text-stone-100">Muddat:</span>
                <p className="text-stone-600 dark:text-stone-300">
                  Borgan joyda 15 kundan kam turish niyat qilinsa, u yerda musofir hisoblanadi. 15 kun yoki undan ortiq niyat qilsa, muqim (to‘liq o‘quvchi) bo‘ladi.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-100/80 dark:bg-stone-800/60 text-xs text-stone-700 dark:text-stone-300">
              <strong>Hanafiy hukmi:</strong> 4 rak'atli farz namozlari (Peshin, Asr, Xufton) 2 rak'at qilib o‘qiladi. Bomdod, Shom va Vitr namozlari qisqartirilmaydi.
            </div>
          </div>
        )}

        {activeMode === 'sick' && (
          <div className="space-y-5">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-4">
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50">
                Bemor kishining namozi
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                "Dinda mashaqqat yo‘qdir". Sog‘liq imkon bermaganda namoz tartibi.
              </p>
            </div>

            <div className="space-y-2.5 text-xs text-stone-700 dark:text-stone-300">
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800">
                <strong>1-daraja:</strong> Tik tura olmasa yoki kasalligi zo‘rayish xavfi bo‘lsa, stulda yoki gilamda o‘tirib ruku va sajdalar bilan o‘qiydi.
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800">
                <strong>2-daraja:</strong> Boshini yerga qo‘yib sajda qilishga ham qodir bo‘lmasa, ruku va sajdalarni imo-ishora (boshni egish) bilan bajaradi. Sajda uchun rukudagiga qaraganda ko‘proq bosh egiladi.
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800">
                <strong>3-daraja:</strong> O‘tirishga ham majoli qolmasa, chalqancha yotib (oyog‘ini qiblaga qaratib, boshi tagiga yostiq qo‘yib) yoki o‘ng yonboshi bilan yotib imo-ishora bilan o‘qiydi.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
