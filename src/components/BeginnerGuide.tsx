import React, { useState, useEffect } from 'react';
import { GraduationCap, CheckCircle2, Circle, ArrowRight, ShieldCheck } from 'lucide-react';

interface DayPlan {
  day: number;
  title: string;
  summary: string;
  tasks: string[];
  tips: string;
}

const BEGINNER_PLAN: DayPlan[] = [
  {
    day: 1,
    title: 'Poklik va Niyat tushunchasi',
    summary: 'Ibodatning eng birinchi poydevori – qalb niyati va jismoniy poklikdir.',
    tasks: [
      'Niyatning dindagi o‘rni haqidagi hadisni o‘qish ("Amallar faqat niyatga bog‘liqdir")',
      'Kiyim, badan va namoz o‘rnining tozaligi shartlarini bilib olish',
      'Najosat turlari va ulardan poklanishni o‘rganish',
    ],
    tips: 'Ibodatni boshlashda shoshilmang, har bir amalni qalb xotirjamligi bilan bajaring.',
  },
  {
    day: 2,
    title: 'Tahoratni mukammal o‘rganish',
    summary: 'Tahorat – namozning kaliti. 4 ta asosiy farz va Nabaviy sunnatlar.',
    tasks: [
      'Tahoratning 4 farzini yodlash (yuz, 2 qo‘l tirsak bilan, boshga mash, 2 oyoq to‘piq bilan)',
      'Og‘iz, burun chayqash va misvoq sunnatini amalda sinab ko‘rish',
      'Tahoratni sindiruvchi holatlar bilan tanishish',
    ],
    tips: 'Suvni isrof qilmasdan, har bir a\'zoni to‘liq va shoshmasdan yuvishga odatlaning.',
  },
  {
    day: 3,
    title: 'Namozning 6 tashqi sharti',
    summary: 'Namoz boshlanishidan oldin topilishi shart bo‘lgan asosiy shartlar.',
    tasks: [
      'Tahoratli bo‘lish va badanni poklash',
      'Avrat a\'zolarni yopish qoidalari (erkaklar va ayollar farqi)',
      'Qiblani aniqlash va qiblaga to‘g‘ri yuzlanish',
      'Namoz vaqtining kirganligiga ishonch hosil qilish',
    ],
    tips: 'Namoz o‘qiydigan joyingiz tinch va chalg‘ituvchi vositalardan xoli bo‘lsin.',
  },
  {
    day: 4,
    title: '2 rak\'at namoz amaliyoti',
    summary: 'Takbiri tahrimadan to salomgacha bo‘lgan asosiy harakatlar va zikrlar.',
    tasks: [
      'Sano (Subhanakallohumma) duosini o‘rganish',
      'Fotiha surasini to‘g‘ri talaffuz bilan takrorlash',
      'Ruku va Sajda tasbehlarini yod olish',
      'Attahiyyat (tashahhud) duosini o‘rganish',
    ],
    tips: 'Interaktiv "Namozni birga o‘rganamiz" bo‘limidan foydalanib bir necha bor mashq qiling.',
  },
  {
    day: 5,
    title: 'Bomdod namozi adosi',
    summary: 'Tonggi birinchi farz ibodat: 2 rak\'at sunnat va 2 rak\'at farz.',
    tasks: [
      'Bomdod sunnatining fazilati haqidagi hadisni o‘qish',
      'Bomdod farzini amalda ado etish',
      'Namozdan keyingi 33 martalik tasbehlarni o‘rganish',
    ],
    tips: 'Bomdod namozini vaqtida o‘qish butun kunga baraka va ma\'naviy quvvat beradi.',
  },
  {
    day: 6,
    title: 'Peshin va Asr namozlari',
    summary: '4 rak\'atli farz namozlarining o‘qilish tartibi (maxfiy qiroat).',
    tasks: [
      'Birinchi o‘tirish (qa\'dai ula) va ikkinchi o‘tirish (qa\'dai oxir) farqini bilish',
      'Farzning 3 va 4-rak\'atlarida faqat Fotiha o‘qilishini eslab qolish',
      'Ta\'dili arkon (harakatlarda shoshilmaslik) qoidasiga amal qilish',
    ],
    tips: 'Kunduzgi namozlarda harflarni o‘zingiz eshitadigan darajada pichirlab maxfiy o‘qing.',
  },
  {
    day: 7,
    title: 'Shom, Xufton va Vitr vojib',
    summary: 'Kechki namozlar va Qunut duosi bilan Vitr namozining xususiyatlari.',
    tasks: [
      'Shom namozi (3 rak\'at farz, 2 rak\'at sunnat) tartibi',
      'Xufton farzi va undan keyingi Vitr namozi',
      'Vitr namozidagi Qunut duosini o‘rganish',
    ],
    tips: 'Muborak 7 kunlik bosqichni yakunladingiz! Endi har kunlik namozlarni mustahkamlash davri boshlandi.',
  },
];

export const BeginnerGuide: React.FC = () => {
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('namoz_beginner_days');
      if (saved) {
        setCompletedDays(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const toggleDay = (day: number) => {
    let updated: number[];
    if (completedDays.includes(day)) {
      updated = completedDays.filter((d) => d !== day);
    } else {
      updated = [...completedDays, day];
    }
    setCompletedDays(updated);
    try {
      localStorage.setItem('namoz_beginner_days', JSON.stringify(updated));
    } catch {}
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
          <GraduationCap className="w-4 h-4" />
          <span>Bosqichma-bosqich ta'lim</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
          Yangi boshlovchilar uchun 7 kunlik yo‘riqnoma
        </h2>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          Namozni endi o‘rganayotgan birodarlarimiz uchun shoshilmasdan, har bir amalni puxta o‘zlashtirish dasturi.
        </p>
      </div>

      {/* Progress Card */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200/90 dark:border-stone-800 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs text-stone-500">O‘zlashtirish darajasi:</span>
          <div className="text-lg font-bold text-stone-900 dark:text-stone-50">
            {completedDays.length} / 7 kun o‘tildi
          </div>
        </div>

        <div className="w-32 h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
          <div
            className="h-full bg-emerald-600 transition-all duration-300"
            style={{ width: `${(completedDays.length / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* Days List */}
      <div className="space-y-4">
        {BEGINNER_PLAN.map((plan) => {
          const isDone = completedDays.includes(plan.day);
          return (
            <div
              key={plan.day}
              className={`rounded-2xl p-6 border transition-all ${
                isDone
                  ? 'bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/60'
                  : 'bg-white dark:bg-stone-900 border-stone-200/90 dark:border-stone-800'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${isDone ? 'bg-emerald-600 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'}`}>
                    {plan.day}-kun
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-50">
                      {plan.title}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {plan.summary}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleDay(plan.day)}
                  className={`p-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                    isDone
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'border-stone-200 dark:border-stone-700 text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {isDone ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Bajarildi</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4" />
                      <span className="hidden sm:inline">Belgilash</span>
                    </>
                  )}
                </button>
              </div>

              {/* Tasks Checklist */}
              <div className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300 pl-11">
                {plan.tasks.map((task, tIdx) => (
                  <div key={tIdx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{task}</span>
                  </div>
                ))}

                <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400 italic">
                  <strong>Tavsiya:</strong> {plan.tips}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
