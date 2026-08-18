'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Trophy,
  ArrowRight,
  RefreshCw,
  Database,
  Layers,
  BrainCircuit,
  BarChart3,
  Binary,
  CheckCircle2,
  Share2,
} from 'lucide-react';

interface Step8FinalSummaryProps {
  onTryAnother: () => void;
  onRestart: () => void;
}

export const Step8FinalSummary: React.FC<Step8FinalSummaryProps> = ({
  onTryAnother,
  onRestart,
}) => {
  useEffect(() => {
    // Launch celebratory confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366F1', '#06B6D4', '#A855F7', '#10B981', '#F59E0B'],
      });
    } catch (e) {
      // Graceful fallback
    }
  }, []);

  const PIPELINE_STEPS = [
    { title: '01 RAW DATA', desc: 'Explored 150 student records & schema', icon: Database, color: 'text-blue-400' },
    { title: '02 CLEAN DATA', desc: 'Deduplicated rows & filled empty cells with Mean', icon: Layers, color: 'text-amber-400' },
    { title: '03 ANALYZE', desc: 'Discovered averages, branch sizes, and backlogs', icon: BrainCircuit, color: 'text-indigo-400' },
    { title: '04 VISUALIZE', desc: 'Charted scores, attendance correlations & trends', icon: BarChart3, color: 'text-emerald-400' },
    { title: '05 TRAIN ML', desc: 'Taught Logistic Regression mathematical weights', icon: Binary, color: 'text-purple-400' },
    { title: '06 PREDICT', desc: 'Ran live inference on student profile features', icon: Sparkles, color: 'text-cyan-400' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Victory Banner */}
      <div className="rounded-3xl border border-indigo-900/80 bg-gradient-to-br from-[#0B1536] via-[#0D183E] to-[#070D22] p-8 sm:p-12 text-center backdrop-blur-xl shadow-2xl relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_70%)]" />

        <div className="relative z-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-emerald-400 p-[2px] shadow-xl shadow-indigo-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[22px] bg-[#0A1024]">
              <Trophy className="h-10 w-10 text-cyan-300 animate-bounce" />
            </div>
          </div>

          <span className="mt-6 inline-flex items-center space-x-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            <span>Mastery Achieved</span>
          </span>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            You Just Completed a Full Data Science Pipeline!
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300 sm:text-xl font-medium leading-relaxed">
            “You started with a spreadsheet and ended with a Machine Learning prediction.”
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={onTryAnother}
              className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-indigo-500/25 transition-all hover:scale-105"
            >
              <Sparkles className="h-5 w-5" />
              <span>TRY ANOTHER STUDENT</span>
            </button>

            <button
              onClick={onRestart}
              className="flex items-center space-x-2 rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-4 text-base font-bold text-slate-300 transition-all hover:bg-slate-700 hover:text-white"
            >
              <RefreshCw className="h-4 w-4" />
              <span>RESTART JOURNEY</span>
            </button>
          </div>
        </div>
      </div>

      {/* Completed Pipeline Summary Review */}
      <div className="rounded-3xl border border-slate-800/80 bg-[#090F26] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <h3 className="text-lg font-bold text-white text-center">
          What You Learned in this Laboratory
        </h3>
        <p className="mt-1 text-xs text-slate-400 text-center">
          The 6 core engineering stages every Data Scientist executes
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PIPELINE_STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="flex items-start space-x-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 shadow-md">
                  <Icon className={`h-5 w-5 ${step.color}`} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{step.title}</h4>
                  <p className="mt-1 text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
