'use client';

import React from 'react';
import { Film, Landmark, HeartPulse, ShoppingBag, Navigation, GraduationCap, ArrowUpRight } from 'lucide-react';

interface Domain {
  title: string;
  sentence: string;
  example: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  glowColor: string;
}

const DOMAINS: Domain[] = [
  {
    title: 'Entertainment',
    sentence: 'Streaming platforms analyze your viewing history to recommend movies and songs you will love.',
    example: 'Netflix & Spotify recommendation engines',
    icon: Film,
    color: 'from-pink-500/20 to-rose-500/10 border-pink-500/30 text-pink-400',
    glowColor: 'group-hover:shadow-pink-500/10',
  },
  {
    title: 'Banking',
    sentence: 'Financial institutions detect fraudulent transactions in milliseconds using classification models.',
    example: 'Credit card real-time fraud detection',
    icon: Landmark,
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    glowColor: 'group-hover:shadow-emerald-500/10',
  },
  {
    title: 'Healthcare',
    sentence: 'Hospitals analyze patient symptoms and medical scans to assist doctors with early disease diagnosis.',
    example: 'X-Ray & MRI automated classification',
    icon: HeartPulse,
    color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    glowColor: 'group-hover:shadow-cyan-500/10',
  },
  {
    title: 'E-Commerce',
    sentence: 'Online stores predict which items you are likely to purchase and dynamically optimize delivery routes.',
    example: 'Amazon "Frequently Bought Together" & inventory forecasting',
    icon: ShoppingBag,
    color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400',
    glowColor: 'group-hover:shadow-amber-500/10',
  },
  {
    title: 'Navigation',
    sentence: 'Maps analyze live traffic signals and road density to calculate the fastest route to your destination.',
    example: 'Google Maps real-time ETA prediction',
    icon: Navigation,
    color: 'from-violet-500/20 to-purple-500/10 border-violet-500/30 text-violet-400',
    glowColor: 'group-hover:shadow-violet-500/10',
  },
  {
    title: 'Education',
    sentence: 'Universities analyze student engagement and attendance data to predict outcomes and offer proactive support.',
    example: 'Placement predictor & personalized tutoring',
    icon: GraduationCap,
    color: 'from-indigo-500/20 to-blue-500/10 border-indigo-500/30 text-indigo-400',
    glowColor: 'group-hover:shadow-indigo-500/10',
  },
];

export const DomainCards: React.FC = () => {
  return (
    <section className="mt-16 sm:mt-24">
      <div className="text-center">
        <span className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-300">
          Why Learn Data Science?
        </span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Real-World Applications of Data Science
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
          From the apps on your phone to hospitals and banks, data science powers modern society.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {DOMAINS.map((domain) => {
          const Icon = domain.icon;
          return (
            <div
              key={domain.title}
              className={`group relative rounded-2xl border bg-gradient-to-b p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${domain.color} ${domain.glowColor}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/80 shadow-md">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-mono text-slate-400 opacity-60">Domain</span>
              </div>

              <h3 className="mt-4 text-lg font-bold text-white group-hover:text-white">
                {domain.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {domain.sentence}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-700/40 flex items-center justify-between text-xs text-slate-400">
                <span className="truncate italic">Ex: {domain.example}</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
