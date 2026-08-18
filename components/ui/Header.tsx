'use client';

import React from 'react';
import { Database, Sparkles, RefreshCw, Cpu, CheckCircle2, AlertCircle } from 'lucide-react';

interface HeaderProps {
  supabaseConnected: boolean;
  isSampleFallback: boolean;
  onReset: () => void;
  onGoHome: () => void;
  currentStep: number;
}

export const Header: React.FC<HeaderProps> = ({
  supabaseConnected,
  isSampleFallback,
  onReset,
  onGoHome,
  currentStep,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#050914]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <div
          onClick={onGoHome}
          className="group flex cursor-pointer items-center space-x-3 transition-transform hover:scale-[1.02]"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#0A1024]">
              <Cpu className="h-5 w-5 text-cyan-400 transition-transform group-hover:rotate-12" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-lg font-extrabold tracking-tight text-transparent sm:text-xl">
                DATA SCIENCE LAB
              </span>
              <span className="hidden rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-300 sm:inline-block">
                B.Tech 1st Year
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Interactive ML Learning Workflow</p>
          </div>
        </div>

        {/* Right Info & Actions */}
        <div className="flex items-center space-x-3">
          {/* Supabase Status Badge */}
          <div
            className={`hidden sm:flex items-center space-x-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
              supabaseConnected
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                : isSampleFallback
                ? 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                : 'border-slate-700 bg-slate-800/60 text-slate-400'
            }`}
            title={
              supabaseConnected
                ? 'Supabase Database is live and connected!'
                : 'Running in built-in 150-row seed dataset mode. Connect Supabase anytime in .env.local.'
            }
          >
            <Database className="h-3.5 w-3.5" />
            <span>
              {supabaseConnected
                ? 'Supabase Connected'
                : isSampleFallback
                ? '150-Row Seed Data Active'
                : 'Database Ready'}
            </span>
            {supabaseConnected ? (
              <CheckCircle2 className="h-3 w-3 text-emerald-400" />
            ) : (
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            )}
          </div>

          {/* Reset Journey button */}
          {currentStep > 0 && (
            <button
              onClick={onReset}
              className="flex items-center space-x-1.5 rounded-lg border border-slate-700/80 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 transition-all hover:border-indigo-500/40 hover:bg-slate-800 hover:text-white"
              title="Reset the learning pipeline from Step 1"
            >
              <RefreshCw className="h-3.5 w-3.5 text-indigo-400" />
              <span className="hidden md:inline">Restart Pipeline</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
