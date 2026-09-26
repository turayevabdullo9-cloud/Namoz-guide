import React, { useState, useEffect } from 'react';
import { getPrayerTrainerSession } from '../data/prayerTrainerSteps';
import { PrayerStepItem } from '../types';
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw, Volume2, Info, AlertCircle, CheckCircle } from 'lucide-react';
import { AudioPlayerButton } from './AudioPlayerButton';

interface InteractiveTrainerProps {
  initialPreset?: string;
}

export const InteractiveTrainer: React.FC<InteractiveTrainerProps> = ({
  initialPreset = 'bomdod-farz',
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string>(initialPreset);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);

  useEffect(() => {
    if (initialPreset) {
      setSelectedPreset(initialPreset);
      setCurrentStepIdx(0);
    }
  }, [initialPreset]);

  const session = getPrayerTrainerSession(selectedPreset);
  const steps: PrayerStepItem[] = session.steps;
  const currentStep = steps[currentStepIdx] || steps[0];
  const progressPercent = Math.round(((currentStepIdx + 1) / steps.length) * 100);

  // Accurate rakat calculation based on preset and step index
  let currentRakat = 1;
  if (session.totalRakats === 3) {
    if (currentStepIdx >= 15) {
      currentRakat = 3;
    } else if (currentStepIdx >= 12) {
      currentRakat = 2;
    } else {
      currentRakat = 1;
    }
  } else {
    currentRakat = currentStepIdx >= 12 ? 2 : 1;
  }

  const handleNext = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIdx(0);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      {/* Header & Preset Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
            Namozni birga o‘rganamiz
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
            Har bir harakat, zikr, duo va qiroatni bosqichma-bosqich, qoidasi va ma'nosi bilan birga o‘rganing.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500">Namoz:</span>
          <select
            value={selectedPreset}
            onChange={(e) => {
              setSelectedPreset(e.target.value);
              setCurrentStepIdx(0);
            }}
            className="text-xs font-semibold py-1.5 px-3 rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 outline-none"
          >
            <option value="bomdod-farz">Bomdod — 2 rak'at farz</option>
            <option value="bomdod-sunnat">Bomdod — 2 rak'at sunnat</option>
            <option value="shom-farz">Shom — 3 rak'at farz</option>
            <option value="vitr">Vitr — 3 rak'at vojib (Qunut bilan)</option>
          </select>
        </div>
      </div>

      {/* Progress & Tracker Bar */}
      <div className="bg-white dark:bg-stone-900 rounded-xl p-4 border border-stone-200/90 dark:border-stone-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              {currentRakat}-rak'at
            </span>
            <span className="text-stone-400">·</span>
            <span className="text-stone-600 dark:text-stone-400">
              Qadam: <strong className="text-stone-900 dark:text-stone-100">{currentStepIdx + 1}</strong> / {steps.length}
            </span>
            <span className="text-stone-400">·</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              {currentStep.position}
            </span>
          </div>

          <span className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            {progressPercent}%
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
          <div
            className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Step Stage Card */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 shadow-sm overflow-hidden">
        {/* Step Top Bar */}
        <div className="px-6 py-4 bg-stone-50 dark:bg-stone-800/50 border-b border-stone-200/80 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
              {currentStep.stepNumber}
            </span>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-50">
              {currentStep.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-stone-200/60 dark:bg-stone-700 text-stone-700 dark:text-stone-300">
              Hukmi: {currentStep.ruling}
            </span>
          </div>
        </div>

        {/* Step Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Action Description */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">
              Harakat (Nima qilinadi?):
            </div>
            <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed bg-stone-50/80 dark:bg-stone-800/40 p-4 rounded-xl border border-stone-200/50 dark:border-stone-800">
              {currentStep.actionDescription}
            </p>
          </div>

          {/* Recitation (What to say) */}
          {currentStep.arabicText && (
            <div className="p-5 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
                  O‘qiladigan zikr / qiroat:
                </span>
                <AudioPlayerButton arabicText={currentStep.arabicText} label="Talaffuzni tinglash" />
              </div>

              {/* Arabic Text */}
              <div className="font-arabic text-2xl sm:text-3xl text-stone-900 dark:text-stone-50 text-right leading-loose py-2">
                {currentStep.arabicText}
              </div>

              {/* Transliteration */}
              {currentStep.transliteration && (
                <div className="text-xs text-stone-600 dark:text-stone-400 italic pt-1 border-t border-emerald-100 dark:border-emerald-900/30">
                  <strong>O‘qilishi:</strong> {currentStep.transliteration}
                </div>
              )}

              {/* Translation */}
              {currentStep.translationUz && (
                <div className="text-xs text-stone-800 dark:text-stone-200 font-medium">
                  <strong>Ma'nosi:</strong> "{currentStep.translationUz}"
                </div>
              )}

              {currentStep.repeatCount && (
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                  Takrorlash: kamida {currentStep.repeatCount} marta
                </div>
              )}
            </div>
          )}

          {/* Educational "Why" Explanation */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800">
            <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <div className="font-semibold text-stone-900 dark:text-stone-100">
                Nega bunday qilinadi? (Ta'limiy izoh)
              </div>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                {currentStep.educationalWhy}
              </p>
            </div>
          </div>

          {/* Common Mistake callout if available */}
          {currentStep.commonMistake && (
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-0.5">
                <div className="font-semibold text-amber-900 dark:text-amber-200">
                  Ehtiyot bo‘ling (Keng tarqalgan xato):
                </div>
                <p className="text-amber-800 dark:text-amber-300 leading-relaxed">
                  {currentStep.commonMistake}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Step Navigation Controls */}
        <div className="px-6 py-4 bg-stone-50 dark:bg-stone-800/50 border-t border-stone-200/80 dark:border-stone-800 flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={currentStepIdx === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Oldingi</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
            title="Boshidan boshlash"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {currentStepIdx < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-sm"
            >
              <span>Keyingi qadam</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-4 h-4" />
              <span>Namoz yakunlandi!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
