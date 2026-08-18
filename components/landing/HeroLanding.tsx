'use client';

import React from 'react';
import {
  ArrowRight,
  Database,
  Sparkles,
  Layers,
  BrainCircuit,
  BarChart3,
  Binary,
  CheckCircle,
  Zap,
} from 'lucide-react';
import { DomainCards } from './DomainCards';

interface HeroLandingProps {
  onStartJourney: () => void;
  totalStudents: number;
  supabaseConnected: boolean;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  onStartJourney,
  totalStudents,
  supabaseConnected,
}) => {
  const PIPELINE_NODES = [
    { name: 'RAW DATA', desc: '150 Student Records', icon: Database, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
    { name: 'CLEAN DATA', desc: 'Deduplicate & Impute Mean', icon: Layers, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
    { name: 'ANALYZE', desc: 'Statistical Discovery', icon: BrainCircuit, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/30' },
    { name: 'VISUALIZE', desc: 'Interactive Charts', icon: BarChart3, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
    { name: 'TRAIN ML', desc: 'Logistic Regression Math', icon: Binary, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' },
    { name: 'PREDICT', desc: 'Real-time Placement AI', icon: Sparkles, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] py-12 sm:py-16 lg:py-20">
      {/* Background glow accents */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-500/15 via-cyan-500/10 to-transparent blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300 shadow-inner">
            <Zap className="h-3.5 w-3.5 text-cyan-400" />
            <span>Interactive AI Laboratory for 1st-Year Engineers</span>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            See How Data Becomes{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Intelligence
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl font-normal leading-relaxed">
            From raw student data to your own Machine Learning prediction.
          </p>

          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-400">
            A hands-on, step-by-step laboratory designed to make data cleaning, statistical
            analysis, and predictive AI intuitive and fun.
          </p>

          {/* CTA Action */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={onStartJourney}
              className="group relative flex items-center justify-center space-x-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-indigo-500/25 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <span>START DATA SCIENCE JOURNEY</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Quick specs pill */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center space-x-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>Real {totalStudents || 150}-Row Dataset</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>100% Server-Side Machine Learning</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <span>Zero Prior Coding Required</span>
            </span>
          </div>
        </div>

        {/* Visual Pipeline Section */}
        <div className="mt-16 sm:mt-20">
          <div className="rounded-3xl border border-indigo-900/60 bg-gradient-to-b from-[#0A112C]/90 to-[#060B1C]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                  Interactive Pipeline Architecture
                </span>
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  The Complete 6-Stage Data Science Lifecycle
                </h3>
              </div>
              <span className="hidden sm:inline-block rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300 font-mono">
                End-to-End Workflow
              </span>
            </div>

            {/* Pipeline flowchart grid */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 relative">
              {PIPELINE_NODES.map((node, index) => {
                const Icon = node.icon;
                return (
                  <div
                    key={node.name}
                    className={`relative flex flex-col items-center justify-center rounded-2xl border p-5 text-center transition-all duration-300 hover:scale-105 ${node.bg}`}
                  >
                    {/* Step indicator */}
                    <div className="absolute -top-3 left-4 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-400 border border-slate-800">
                      STAGE 0{index + 1}
                    </div>

                    <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/90 shadow-md">
                      <Icon className={`h-6 w-6 ${node.color}`} />
                    </div>

                    <h4 className="mt-3 text-sm font-extrabold tracking-wide text-white">
                      {node.name}
                    </h4>
                    <p className="mt-1 text-xs text-slate-400 leading-snug">{node.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Start Button inside pipeline */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={onStartJourney}
                className="flex items-center space-x-2 rounded-xl bg-slate-800/80 px-6 py-2.5 text-sm font-semibold text-cyan-300 border border-cyan-500/30 transition-all hover:bg-cyan-500/20 hover:text-white"
              >
                <span>Launch Stage 01: Raw Dataset</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Real-World Use Cases */}
        <DomainCards />
      </div>
    </div>
  );
};
