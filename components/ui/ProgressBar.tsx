'use client';

import React from 'react';
import { Database, Filter, BrainCircuit, BarChart3, Binary, Sparkles, Check, ChevronRight } from 'lucide-react';

interface Step {
  id: number;
  label: string;
  name: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: Step[] = [
  { id: 1, label: '01', name: 'DATA', subtext: 'Meet Your Data', icon: Database },
  { id: 2, label: '02', name: 'CLEAN', subtext: 'Duplicates & Mean', icon: Filter },
  { id: 3, label: '03', name: 'ANALYZE', subtext: 'Ask Questions', icon: BrainCircuit },
  { id: 4, label: '04', name: 'VISUALIZE', subtext: 'Charts & Patterns', icon: BarChart3 },
  { id: 5, label: '05', name: 'ML', subtext: 'Train Logistic Model', icon: Binary },
  { id: 6, label: '06', name: 'PREDICT', subtext: 'Live Student Predictor', icon: Sparkles },
];

interface ProgressBarProps {
  currentStep: number;
  maxUnlockedStep: number;
  onSelectStep: (stepId: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  maxUnlockedStep,
  onSelectStep,
}) => {
  if (currentStep === 0) return null; // Hidden on landing page

  const currentStepObj = STEPS.find((s) => s.id === currentStep) || STEPS[0];
  const nextStepObj = STEPS.find((s) => s.id === currentStep + 1);

  return (
    <section className="border-b border-indigo-950/60 bg-[#080E24]/90 py-4 shadow-xl backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Context Banner: Where am I & What's Next */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-slate-400">Current Step:</span>
            <span className="font-semibold text-cyan-300">
              Step {currentStepObj.label} — {currentStepObj.subtext}
            </span>
          </div>
          {nextStepObj ? (
            <div className="flex items-center space-x-1.5 text-slate-400">
              <span>Next up:</span>
              <span className="font-medium text-indigo-300">
                Step {nextStepObj.label} ({nextStepObj.name})
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-indigo-400" />
            </div>
          ) : (
            <span className="font-medium text-emerald-400">🎉 Pipeline Completed!</span>
          )}
        </div>

        {/* Desktop Progress Bar */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {STEPS.map((step, idx) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const isUnlocked = step.id <= maxUnlockedStep;
            const Icon = step.icon;

            return (
              <button
                key={step.id}
                disabled={!isUnlocked}
                onClick={() => isUnlocked && onSelectStep(step.id)}
                className={`group relative flex flex-col rounded-xl border p-3 text-left transition-all duration-300 ${
                  isCurrent
                    ? 'border-cyan-400/80 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-[#0B1536] shadow-lg shadow-cyan-500/10 ring-2 ring-cyan-400/20'
                    : isCompleted
                    ? 'border-emerald-500/30 bg-[#0B1530]/60 hover:border-emerald-500/50 hover:bg-[#0D1A3D]'
                    : isUnlocked
                    ? 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-800/40 cursor-pointer'
                    : 'border-slate-900 bg-slate-950/40 opacity-40 cursor-not-allowed'
                }`}
              >
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold ${
                      isCurrent
                        ? 'bg-cyan-500 text-black font-extrabold shadow-sm'
                        : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : step.label}
                  </span>
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      isCurrent
                        ? 'text-cyan-400'
                        : isCompleted
                        ? 'text-emerald-400'
                        : 'text-slate-500'
                    }`}
                  />
                </div>

                {/* Step title */}
                <div className="mt-2">
                  <div
                    className={`text-xs font-bold tracking-wider ${
                      isCurrent
                        ? 'text-cyan-200'
                        : isCompleted
                        ? 'text-slate-200'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.name}
                  </div>
                  <div className="truncate text-[11px] text-slate-400">{step.subtext}</div>
                </div>

                {/* Bottom active indicator line */}
                {isCurrent && (
                  <div className="absolute -bottom-[1px] left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 animate-shimmer" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
