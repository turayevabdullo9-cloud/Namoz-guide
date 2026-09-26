import React, { useState } from 'react';
import { TAHARAH_DATA } from '../data/taharahData';
import { Droplets, Check, AlertCircle, Info, Shield, ArrowRight } from 'lucide-react';

export const TaharahSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wudu' | 'ghusl' | 'tayammum'>('wudu');

  const currentCategory = TAHARAH_DATA.find((t) => t.id === activeTab) || TAHARAH_DATA[0];

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
          <Droplets className="w-4 h-4" />
          <span>Ibodatning kaliti – Poklik</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
          Tahorat, G‘usl va Tayammum
        </h2>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          "Namozning kaliti – poklikdir" (Termiziy). Hanafiy fiqhi bo‘yicha farzlar, sunnatlar va amaliy tartib.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-xl max-w-md">
        <button
          onClick={() => setActiveTab('wudu')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'wudu'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-50 shadow-sm'
              : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
          }`}
        >
          Tahorat (4 farz)
        </button>
        <button
          onClick={() => setActiveTab('ghusl')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'ghusl'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-50 shadow-sm'
              : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
          }`}
        >
          G‘usl (3 farz)
        </button>
        <button
          onClick={() => setActiveTab('tayammum')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'tayammum'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-50 shadow-sm'
              : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
          }`}
        >
          Tayammum (2 zarb)
        </button>
      </div>

      {/* Active Tab Main Card */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 sm:p-8 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-6">
        <div className="flex items-start justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
          <div>
            <span className="font-arabic text-2xl text-emerald-700 dark:text-emerald-400">
              {currentCategory.arabicTitle}
            </span>
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mt-1">
              {currentCategory.title}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
              {currentCategory.summary}
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              Farzlari soni:
            </span>
            <div className="text-3xl font-extrabold text-stone-900 dark:text-stone-50">
              {currentCategory.fardCount} ta
            </div>
          </div>
        </div>

        {/* Farz List Highlight */}
        <div className="p-5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-900/40 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
            Asosiy farzlar (Bularsiz poklik hosil bo‘lmaydi):
          </h4>
          <ol className="space-y-2 text-xs text-stone-800 dark:text-stone-200 list-decimal list-inside font-medium leading-relaxed">
            {currentCategory.fardList.map((fard, idx) => (
              <li key={idx} className="pl-1">
                {fard}
              </li>
            ))}
          </ol>
        </div>

        {/* Step-by-step procedure */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
            Qadam-baqadam tartibi:
          </h4>
          <div className="space-y-3">
            {currentCategory.steps.map((st) => (
              <div
                key={st.stepNumber}
                className="flex items-start gap-3 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800"
              >
                <span className="w-6 h-6 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold flex items-center justify-center shrink-0">
                  {st.stepNumber}
                </span>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900 dark:text-stone-100">
                      {st.title}
                    </span>
                    <span className="text-[10px] px-2 py-0.2 rounded bg-stone-200/60 dark:bg-stone-700 font-semibold text-stone-600 dark:text-stone-300">
                      {st.ruling}
                    </span>
                  </div>
                  <p className="text-stone-700 dark:text-stone-300">{st.description}</p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 italic">{st.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invalidators (Sindiruvchi holatlar) */}
        <div className="p-5 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-red-900 dark:text-red-300 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span>Sindiruvchi (buzuvchi) amallar:</span>
          </h4>
          <ul className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
            {currentCategory.invalidators.map((inv, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✕</span>
                <span>{inv}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sources */}
        <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>Manba: {currentCategory.sources[0]?.book}, {currentCategory.sources[0]?.author}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
