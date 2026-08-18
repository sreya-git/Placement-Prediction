'use client';

import React, { useState } from 'react';
import { ChartDataSets } from '@/lib/types/dataset';
import {
  BarChart3,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Eye,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface Step5VisualizationProps {
  charts: ChartDataSets | null;
  loading: boolean;
  onNext: () => void;
}

export const Step5Visualization: React.FC<Step5VisualizationProps> = ({
  charts,
  loading,
  onNext,
}) => {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  const [hoveredScatter, setHoveredScatter] = useState<any | null>(null);

  if (!charts) {
    return (
      <div className="flex h-64 items-center justify-center rounded-3xl border border-slate-800 bg-[#090F26]">
        <div className="text-center">
          <BarChart3 className="mx-auto h-8 w-8 text-cyan-400 animate-bounce" />
          <p className="mt-3 text-sm text-slate-300">Rendering interactive visualizations...</p>
        </div>
      </div>
    );
  }

  const {
    avgFinalScoreByDept,
    attendanceVsFinalScore,
    studentsByDept,
    backlogDistribution,
    studyHoursVsFinalScore,
  } = charts;

  // Max values for SVG scaling
  const maxAvgScore = Math.max(...avgFinalScoreByDept.map((d) => d.avgFinalScore), 100);
  const maxDeptCount = Math.max(...studentsByDept.map((d) => d.count), 1);
  const maxBacklogCount = Math.max(...backlogDistribution.map((d) => d.count), 1);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="rounded-3xl border border-indigo-900/60 bg-gradient-to-r from-[#0B122C] to-[#080D20] p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center space-x-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300">
              <BarChart3 className="h-3.5 w-3.5" />
              <span>Step 05 / 06 — Data Visualization</span>
            </span>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
              Turn Numbers Into Pictures
            </h2>
            <p className="mt-2 text-base text-slate-300 max-w-3xl">
              “Graphs make patterns easier to understand.” Explore 5 interactive visualizations built strictly from your cleaned working dataset.
            </p>
          </div>

          <button
            onClick={onNext}
            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:scale-105"
          >
            <span>NEXT → TEACH A MACHINE</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Grid of 5 Charts */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* CHART 1: Average Final Score by Department */}
        <div className="rounded-3xl border border-slate-800/80 bg-[#090F26] p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-indigo-400 font-bold">Chart 01 • Bar Graph</span>
                <h3 className="mt-1 text-lg font-bold text-white">Average Final Score by Department</h3>
              </div>
              <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300 font-mono">
                Out of 100
              </span>
            </div>

            {/* Custom Bar Visualization */}
            <div className="mt-6 space-y-4">
              {avgFinalScoreByDept.map((item) => {
                const percentage = (item.avgFinalScore / maxAvgScore) * 100;
                return (
                  <div
                    key={item.dept}
                    onMouseEnter={() => setHoveredBar(`c1-${item.dept}`)}
                    onMouseLeave={() => setHoveredBar(null)}
                    className="group"
                  >
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.dept}
                      </span>
                      <span className="text-cyan-400 font-bold">
                        {item.avgFinalScore} / 100 ({item.studentCount} students)
                      </span>
                    </div>
                    <div className="h-7 w-full rounded-xl bg-slate-900 overflow-hidden p-1 border border-slate-800">
                      <div
                        style={{ width: `${percentage}%` }}
                        className="h-full rounded-lg bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-400 transition-all duration-700 shadow-md group-hover:from-indigo-500 group-hover:to-cyan-300"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* What can we notice? */}
          <div className="mt-6 rounded-2xl border border-indigo-500/20 bg-indigo-950/20 p-4">
            <div className="flex items-center space-x-2 text-indigo-300 font-bold text-xs">
              <Eye className="h-4 w-4" />
              <span>What can we notice?</span>
            </div>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed">
              Final score averages are relatively well-balanced across departments, ranging from {avgFinalScoreByDept[avgFinalScoreByDept.length - 1]?.avgFinalScore} to {avgFinalScoreByDept[0]?.avgFinalScore}. {avgFinalScoreByDept[0]?.dept} shows the highest average performance.
            </p>
          </div>
        </div>

        {/* CHART 2: Attendance vs Final Score (Scatter Plot) */}
        <div className="rounded-3xl border border-slate-800/80 bg-[#090F26] p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 font-bold">Chart 02 • Scatter Plot</span>
                <h3 className="mt-1 text-lg font-bold text-white">Attendance % vs Final Exam Score</h3>
              </div>
              <div className="flex items-center space-x-3 text-[11px] font-mono">
                <span className="flex items-center space-x-1 text-emerald-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span>Placed</span>
                </span>
                <span className="flex items-center space-x-1 text-slate-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-500" />
                  <span>Other</span>
                </span>
              </div>
            </div>

            {/* Scatter SVG Plot */}
            <div className="mt-4 relative h-64 w-full rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <svg className="h-full w-full overflow-visible" viewBox="0 0 400 200">
                {/* Grid lines */}
                <line x1="40" y1="20" x2="380" y2="20" stroke="#1E293B" strokeDasharray="3 3" />
                <line x1="40" y1="90" x2="380" y2="90" stroke="#1E293B" strokeDasharray="3 3" />
                <line x1="40" y1="160" x2="380" y2="160" stroke="#1E293B" strokeDasharray="3 3" />
                <line x1="40" y1="180" x2="380" y2="180" stroke="#334155" />
                <line x1="40" y1="20" x2="40" y2="180" stroke="#334155" />

                {/* Y Axis labels */}
                <text x="32" y="25" fill="#64748B" fontSize="10" textAnchor="end">100</text>
                <text x="32" y="95" fill="#64748B" fontSize="10" textAnchor="end">50</text>
                <text x="32" y="165" fill="#64748B" fontSize="10" textAnchor="end">0</text>

                {/* X Axis labels */}
                <text x="40" y="195" fill="#64748B" fontSize="10" textAnchor="start">40%</text>
                <text x="210" y="195" fill="#64748B" fontSize="10" textAnchor="middle">70%</text>
                <text x="380" y="195" fill="#64748B" fontSize="10" textAnchor="end">100% Attendance</text>

                {/* Scatter Dots */}
                {attendanceVsFinalScore.map((pt, i) => {
                  // X: map 40%..100% -> 40..380
                  const cx = 40 + ((pt.attendance - 40) / 60) * 340;
                  // Y: map 0..100 -> 180..20
                  const cy = 180 - (pt.finalScore / 100) * 160;
                  const isPlaced = pt.placement === 'Placed';

                  return (
                    <circle
                      key={i}
                      cx={Math.max(40, Math.min(380, cx))}
                      cy={Math.max(20, Math.min(180, cy))}
                      r={isPlaced ? 4.5 : 3.5}
                      fill={isPlaced ? '#10B981' : '#64748B'}
                      opacity={isPlaced ? 0.9 : 0.6}
                      className="transition-all hover:r-6 hover:opacity-100 hover:stroke-white hover:stroke-2 cursor-pointer"
                      onMouseEnter={() => setHoveredScatter(pt)}
                      onMouseLeave={() => setHoveredScatter(null)}
                    />
                  );
                })}
              </svg>

              {/* Scatter Tooltip */}
              {hoveredScatter && (
                <div className="absolute top-2 right-2 rounded-xl border border-slate-700 bg-slate-900/90 p-2 text-[11px] font-mono text-white shadow-lg backdrop-blur-md">
                  <div>Attendance: <span className="text-cyan-300 font-bold">{hoveredScatter.attendance}%</span></div>
                  <div>Final Score: <span className="text-emerald-300 font-bold">{hoveredScatter.finalScore}</span></div>
                  <div>Dept: {hoveredScatter.dept} | Status: <span className="text-indigo-300 font-bold">{hoveredScatter.placement}</span></div>
                </div>
              )}
            </div>
          </div>

          {/* What can we notice? */}
          <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-4">
            <div className="flex items-center space-x-2 text-cyan-300 font-bold text-xs">
              <Eye className="h-4 w-4" />
              <span>What can we notice?</span>
            </div>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed">
              Notice the positive cluster trend: students with attendance above 75% tend to achieve higher final exam scores. Placed students (green dots) are predominantly concentrated in the top-right quadrant. Note: This illustrates correlation in this sample, but does not alone prove direct causation.
            </p>
          </div>
        </div>

        {/* CHART 3: Students by Department */}
        <div className="rounded-3xl border border-slate-800/80 bg-[#090F26] p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-purple-400 font-bold">Chart 03 • Bar Graph</span>
                <h3 className="mt-1 text-lg font-bold text-white">Student Enrollment by Department</h3>
              </div>
              <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300 font-mono">
                Total Count
              </span>
            </div>

            {/* Department Counts Bar Graph */}
            <div className="mt-6 space-y-4">
              {studentsByDept.map((item) => {
                const percentage = (item.count / maxDeptCount) * 100;
                return (
                  <div key={item.dept} className="group">
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="font-bold text-white group-hover:text-purple-300 transition-colors">
                        {item.dept}
                      </span>
                      <span className="text-purple-300 font-bold">
                        {item.count} students ({item.percentage}%)
                      </span>
                    </div>
                    <div className="h-7 w-full rounded-xl bg-slate-900 overflow-hidden p-1 border border-slate-800">
                      <div
                        style={{ width: `${percentage}%` }}
                        className="h-full rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 transition-all duration-700 shadow-md group-hover:from-purple-500 group-hover:to-cyan-400"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* What can we notice? */}
          <div className="mt-6 rounded-2xl border border-purple-500/20 bg-purple-950/20 p-4">
            <div className="flex items-center space-x-2 text-purple-300 font-bold text-xs">
              <Eye className="h-4 w-4" />
              <span>What can we notice?</span>
            </div>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed">
              Student distribution across departments shows balanced representation across CSE, ME, CE, IT, EEE, and ECE, providing a diverse sample across engineering disciplines.
            </p>
          </div>
        </div>

        {/* CHART 4: Backlog Distribution */}
        <div className="rounded-3xl border border-slate-800/80 bg-[#090F26] p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-rose-400 font-bold">Chart 04 • Distribution</span>
                <h3 className="mt-1 text-lg font-bold text-white">Backlog Distribution Among Students</h3>
              </div>
              <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300 font-mono">
                Academic Standing
              </span>
            </div>

            {/* Backlog Bar Graph */}
            <div className="mt-6 space-y-4">
              {backlogDistribution.map((item) => {
                const percentage = (item.count / maxBacklogCount) * 100;
                return (
                  <div key={item.backlogs} className="group">
                    <div className="flex justify-between text-xs font-mono mb-1.5">
                      <span className="font-bold text-white group-hover:text-rose-300 transition-colors">
                        {item.backlogs}
                      </span>
                      <span className="text-rose-300 font-bold">
                        {item.count} students ({item.percentage}%)
                      </span>
                    </div>
                    <div className="h-7 w-full rounded-xl bg-slate-900 overflow-hidden p-1 border border-slate-800">
                      <div
                        style={{ width: `${percentage}%` }}
                        className="h-full rounded-lg bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-400 transition-all duration-700 shadow-md"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* What can we notice? */}
          <div className="mt-6 rounded-2xl border border-rose-500/20 bg-rose-950/20 p-4">
            <div className="flex items-center space-x-2 text-rose-300 font-bold text-xs">
              <Eye className="h-4 w-4" />
              <span>What can we notice?</span>
            </div>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed">
              The vast majority of students maintain 0 active backlogs. Notice how the number of students drops sharply as the backlog count increases to 2 or 3+.
            </p>
          </div>
        </div>
      </div>

      {/* CHART 5: Full Width Study Hours vs Final Score */}
      <div className="rounded-3xl border border-slate-800/80 bg-[#090F26] p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-amber-400 font-bold">Chart 05 • Scatter Plot</span>
            <h3 className="mt-1 text-lg font-bold text-white">Daily Study Hours vs Final Examination Score</h3>
          </div>
          <div className="flex items-center space-x-3 text-[11px] font-mono">
            <span className="flex items-center space-x-1 text-emerald-400">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span>Placed</span>
            </span>
            <span className="flex items-center space-x-1 text-slate-400">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-500" />
              <span>Not Placed / Ineligible</span>
            </span>
          </div>
        </div>

        {/* Scatter SVG Plot */}
        <div className="mt-6 relative h-64 w-full rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
          <svg className="h-full w-full overflow-visible" viewBox="0 0 600 200">
            {/* Grid lines */}
            <line x1="40" y1="20" x2="580" y2="20" stroke="#1E293B" strokeDasharray="3 3" />
            <line x1="40" y1="90" x2="580" y2="90" stroke="#1E293B" strokeDasharray="3 3" />
            <line x1="40" y1="160" x2="580" y2="160" stroke="#1E293B" strokeDasharray="3 3" />
            <line x1="40" y1="180" x2="580" y2="180" stroke="#334155" />
            <line x1="40" y1="20" x2="40" y2="180" stroke="#334155" />

            {/* Y Axis labels */}
            <text x="32" y="25" fill="#64748B" fontSize="10" textAnchor="end">100</text>
            <text x="32" y="95" fill="#64748B" fontSize="10" textAnchor="end">50</text>
            <text x="32" y="165" fill="#64748B" fontSize="10" textAnchor="end">0</text>

            {/* X Axis labels */}
            <text x="40" y="195" fill="#64748B" fontSize="10" textAnchor="start">1 hr</text>
            <text x="310" y="195" fill="#64748B" fontSize="10" textAnchor="middle">5 hrs</text>
            <text x="580" y="195" fill="#64748B" fontSize="10" textAnchor="end">10 hrs Daily Study</text>

            {/* Scatter Dots */}
            {studyHoursVsFinalScore.map((pt, i) => {
              // X: map 1..10 -> 40..580
              const cx = 40 + ((pt.studyHour - 1) / 9) * 540;
              // Y: map 0..100 -> 180..20
              const cy = 180 - (pt.finalScore / 100) * 160;
              const isPlaced = pt.placement === 'Placed';

              return (
                <circle
                  key={i}
                  cx={Math.max(40, Math.min(580, cx))}
                  cy={Math.max(20, Math.min(180, cy))}
                  r={isPlaced ? 4.5 : 3.5}
                  fill={isPlaced ? '#10B981' : '#64748B'}
                  opacity={isPlaced ? 0.9 : 0.6}
                  className="transition-all hover:r-6 hover:opacity-100 hover:stroke-white hover:stroke-2 cursor-pointer"
                />
              );
            })}
          </svg>
        </div>

        {/* What can we notice? */}
        <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-950/20 p-4">
          <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs">
            <Eye className="h-4 w-4" />
            <span>What can we notice?</span>
          </div>
          <p className="mt-1 text-xs text-slate-300 leading-relaxed">
            Students dedicating 4 to 8 hours daily generally secure final scores above 70, reflecting positive study correlation without implying that hours alone are the sole determinant of exam mastery.
          </p>
        </div>

        {/* Next Step CTA */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onNext}
            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-indigo-500/25 transition-all hover:scale-105"
          >
            <span>NEXT → TEACH A MACHINE (ML)</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
