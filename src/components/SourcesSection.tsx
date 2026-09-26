import React from 'react';
import { SOURCES_CATALOG } from '../data/sourcesData';
import { ShieldCheck, BookOpen, ExternalLink, CheckCircle } from 'lucide-react';

export const SourcesSection: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Ilmiy omonat va ochiqlik</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
          Mo‘tabar Islomiy Manbalar
        </h2>
        <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
          Ushbu platformadagi har bir fiqhiy hukm, namoz tartibi, hadis va duo Islom olamida e'tirof etilgan quyidagi asl manbalarga tayanadi.
        </p>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SOURCES_CATALOG.map((source) => (
          <div
            key={source.id}
            className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                  {source.category}
                </span>
                <span className="text-[11px] text-stone-600 dark:text-stone-300 font-mono">
                  {source.years}
                </span>
              </div>

              <h3 className="text-base font-bold text-stone-900 dark:text-stone-50">
                {source.name}
              </h3>

              <div className="text-xs font-medium text-stone-700 dark:text-stone-300">
                Muallif: {source.author}
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {source.description}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center gap-1.5 text-[11px] text-stone-600 dark:text-stone-300 font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ahamiyati: {source.importance}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Scholarly Advisory Note */}
      <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300 space-y-2">
        <h4 className="font-bold text-stone-900 dark:text-stone-100">
          Ulamolarga murojaat qilish etikasi
        </h4>
        <p className="leading-relaxed">
          Ibodatlar va kundalik hayotdagi umumiy amallar barcha musulmonlar uchun barqaror va ravshan bo‘lsada, shaxsiy nizolar, murakkab nikoh-taloq masalalari va jiddiy fatvo ehtiyojlarida insonning shaxsiy holati inobatga olinishi lozim. Shu sababli doimo yashash hududingizdagi rasmiy masjid imom-xatibi yoki O‘zbekiston Musulmonlari Idorasi Fatvo hay'ati mutaxassislari bilan bevosita maslahatlashish lozim.
        </p>
      </div>
    </div>
  );
};
