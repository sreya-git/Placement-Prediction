'use client';

import React, { useState, useEffect } from 'react';
import { AnalysisSummary } from '@/lib/types/dataset';
import {
  BrainCircuit,
  ArrowRight,
  Trophy,
  Users,
  Clock,
  GraduationCap,
  Sparkles,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';

interface Step4AnalysisProps {
  analysis: AnalysisSummary | null;
  loading: boolean;
  onNext: () => void;
}

export const Step4Analysis: React.FC<Step4AnalysisProps> = ({
  analysis,
  loading,
  onNext,
}) => {
  const [revealedQuestions, setRevealedQuestions] = useState<Record<string, boolean>>({
    q1: true,
    q2: true,
    q3: true,
    q4: true,
    q5: true,
  });

  if (!analysis) {
    return (
      <div className="flex h-64 items-center justify-center rounded-3xl border border-slate-800 bg-[#090F26]">
        <div className="text-center">
          <BrainCircuit className="mx-auto h-8 w-8 text-indigo-400 animate-spin" />
          <p className="mt-3 text-sm text-slate-300">Computing statistical insights...</p>
        </div>
      </div>
    );
  }

  const { questions, totalAnalyzed } = analysis;

  const ICONS = [Trophy, Users, GraduationCap, TrendingUp, Clock];
  const COLORS = [
    'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400',
    'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    'from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-400',
    'from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-400',
    'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="rounded-3xl border border-indigo-900/60 bg-gradient-to-r from-[#0B122C] to-[#080D20] p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center space-x-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-300">
              <BrainCircuit className="h-3.5 w-3.5" />
              <span>Step 04 / 06 — Exploratory Data Analysis</span>
            </span>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
              Let&apos;s Ask Questions
            </h2>
            <p className="mt-2 text-base text-slate-300 max-w-3xl">
              “Now that our data is clean, let&apos;s find some answers.” We ask 5 key statistical questions answered directly by the data.
            </p>
          </div>

          <button
            onClick={onNext}
            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:scale-105"
          >
            <span>NEXT → VISUALIZE THE DATA</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Dataset scope pill */}
        <div className="mt-6 flex items-center space-x-2 text-xs font-mono text-slate-400">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <span>Analyzed across {totalAnalyzed} clean, deduplicated student records.</span>
        </div>
      </div>

      {/* Interactive 5 Question Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {questions.map((q, idx) => {
          const Icon = ICONS[idx % ICONS.length];
          const colorClass = COLORS[idx % COLORS.length];

          return (
            <div
              key={q.id}
              className={`group relative flex flex-col justify-between rounded-3xl border bg-gradient-to-b p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${colorClass}`}
            >
              <div>
                {/* Header tag */}
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900/90 shadow-md">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-slate-900/80 px-2.5 py-0.5 text-[11px] font-mono font-bold text-slate-300">
                    Question 0{idx + 1}
                  </span>
                </div>

                {/* Question text */}
                <h3 className="mt-4 text-base font-bold text-white leading-snug">
                  {q.question}
                </h3>

                {/* Dynamic Answer Hero */}
                <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-center">
                  <div className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                    {q.answer}
                  </div>
                  {q.unit && (
                    <div className="mt-1 text-xs font-mono font-medium text-slate-400">
                      {q.unit}
                    </div>
                  )}
                </div>

                {/* Detail */}
                <p className="mt-4 text-xs text-slate-300 leading-relaxed">
                  {q.detail}
                </p>
              </div>

              {/* Statistical Context Footnote */}
              <div className="mt-5 pt-3 border-t border-slate-700/40 text-[11px] text-slate-400 italic">
                {q.context}
              </div>
            </div>
          );
        })}

        {/* 6th Card: Pedagogical takeaway */}
        <div className="flex flex-col justify-between rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/30 to-[#0A1024] p-6 backdrop-blur-xl">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300">
              <HelpCircle className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-base font-bold text-white">
              Why Does Data Analysis Matter?
            </h3>
            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Before jumping into Machine Learning, a data scientist must understand the distribution, averages, and outliers in the dataset.
            </p>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              These statistical questions reveal the underlying relationships that our Machine Learning model will soon learn automatically!
            </p>
          </div>

          <div className="mt-6 pt-3 border-t border-slate-800">
            <button
              onClick={onNext}
              className="w-full flex items-center justify-center space-x-2 rounded-xl bg-slate-800 py-2.5 text-xs font-bold text-cyan-300 transition-all hover:bg-slate-700 hover:text-white"
            >
              <span>See Graphs Next</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
