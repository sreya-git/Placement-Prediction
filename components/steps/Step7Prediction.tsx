'use client';

import React, { useState } from 'react';
import { PredictionInput, PredictionResult } from '@/lib/types/dataset';
import {
  Sparkles,
  ArrowRight,
  UserCheck,
  UserX,
  Sliders,
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  RotateCcw,
} from 'lucide-react';

interface Step7PredictionProps {
  onPredict: (input: PredictionInput) => Promise<PredictionResult | null>;
  onNext: () => void;
}

export const Step7Prediction: React.FC<Step7PredictionProps> = ({
  onPredict,
  onNext,
}) => {
  const [formData, setFormData] = useState<PredictionInput>({
    dept: 'CSE',
    year: '3rd',
    attendance_percentage: 85,
    study_hour: 5.5,
    mid_term_score: 75,
    final_score: 82,
    projects_completed: 3,
    backlogs: 0,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [predictionStep, setPredictionStep] = useState<string>('');
  const [result, setResult] = useState<PredictionResult | null>(null);

  const departments = ['CSE', 'IT', 'ECE', 'EEE', 'ME', 'CE'];
  const years = ['1st', '2nd', '3rd', '4th'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // Multi-stage animation trace
    setPredictionStep('Analyzing student profile...');
    await new Promise((r) => setTimeout(r, 450));

    setPredictionStep('Comparing learned patterns...');
    await new Promise((r) => setTimeout(r, 450));

    setPredictionStep('Running Logistic Regression weights on server...');
    await new Promise((r) => setTimeout(r, 450));

    const res = await onPredict(formData);
    setPredictionStep('Prediction ready!');
    setResult(res);
    setLoading(false);
  };

  const handlePresetHigh = () => {
    setFormData({
      dept: 'CSE',
      year: '4th',
      attendance_percentage: 95,
      study_hour: 7.0,
      mid_term_score: 88,
      final_score: 92,
      projects_completed: 4,
      backlogs: 0,
    });
  };

  const handlePresetChallenging = () => {
    setFormData({
      dept: 'ME',
      year: '2nd',
      attendance_percentage: 58,
      study_hour: 2.0,
      mid_term_score: 42,
      final_score: 48,
      projects_completed: 1,
      backlogs: 2,
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="rounded-3xl border border-indigo-900/60 bg-gradient-to-r from-[#0B122C] to-[#080D20] p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center space-x-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Step 06 / 06 — Live Prediction Simulator</span>
            </span>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
              Predict a Student&apos;s Placement
            </h2>
            <p className="mt-2 text-base text-slate-300 max-w-3xl">
              “Let&apos;s see what our trained model predicts.” Adjust the sliders below and click PREDICT to test the live server model.
            </p>
          </div>

          {result && (
            <button
              onClick={onNext}
              className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:scale-105"
            >
              <span>COMPLETE JOURNEY</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Quick Sample Presets */}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
          <span className="text-slate-400 font-mono">Load Sample Profile:</span>
          <button
            type="button"
            onClick={handlePresetHigh}
            className="rounded-lg border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 font-medium text-emerald-300 hover:bg-emerald-900/50"
          >
            🌟 High-Performing Student
          </button>
          <button
            type="button"
            onClick={handlePresetChallenging}
            className="rounded-lg border border-amber-500/30 bg-amber-950/40 px-3 py-1 font-medium text-amber-300 hover:bg-amber-900/50"
          >
            ⚠️ Struggling Profile
          </button>
        </div>
      </div>

      {/* Main Grid: Form + Result Display */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Form: Profile Builder (7 Cols) */}
        <div className="lg:col-span-7 rounded-3xl border border-slate-800/80 bg-[#090F26] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="h-5 w-5 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">Configure Student Profile</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Input Features</span>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Department & Year Row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300">
                  Department Branch
                </label>
                <div className="mt-2 grid grid-cols-3 gap-1.5">
                  {departments.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setFormData({ ...formData, dept: d })}
                      className={`rounded-xl py-2 text-xs font-bold transition-all ${
                        formData.dept === d
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-slate-300">
                  Year of Study
                </label>
                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  {years.map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setFormData({ ...formData, year: y })}
                      className={`rounded-xl py-2 text-xs font-bold transition-all ${
                        formData.year === y
                          ? 'bg-cyan-600 text-white shadow-md'
                          : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Slider: Attendance */}
            <div className="space-y-2 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4">
              <div className="flex justify-between text-xs">
                <span className="font-mono text-slate-300">Attendance Percentage</span>
                <span className="font-mono font-bold text-cyan-300 text-sm">
                  {formData.attendance_percentage}%
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                step="1"
                value={formData.attendance_percentage}
                onChange={(e) =>
                  setFormData({ ...formData, attendance_percentage: Number(e.target.value) })
                }
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>30% (Low)</span>
                <span>75% (Target)</span>
                <span>100% (Perfect)</span>
              </div>
            </div>

            {/* Slider: Study Hours */}
            <div className="space-y-2 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4">
              <div className="flex justify-between text-xs">
                <span className="font-mono text-slate-300">Daily Study Hours</span>
                <span className="font-mono font-bold text-purple-300 text-sm">
                  {formData.study_hour} hrs/day
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={formData.study_hour}
                onChange={(e) =>
                  setFormData({ ...formData, study_hour: Number(e.target.value) })
                }
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>1 hr</span>
                <span>5 hrs</span>
                <span>10 hrs</span>
              </div>
            </div>

            {/* Exam Scores Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Mid-term */}
              <div className="space-y-2 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4">
                <div className="flex justify-between text-xs">
                  <span className="font-mono text-slate-300">Mid-Term Score</span>
                  <span className="font-mono font-bold text-indigo-300 text-sm">
                    {formData.mid_term_score}/100
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={formData.mid_term_score}
                  onChange={(e) =>
                    setFormData({ ...formData, mid_term_score: Number(e.target.value) })
                  }
                  className="w-full"
                />
              </div>

              {/* Final Score */}
              <div className="space-y-2 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4">
                <div className="flex justify-between text-xs">
                  <span className="font-mono text-slate-300">Final Exam Score</span>
                  <span className="font-mono font-bold text-emerald-300 text-sm">
                    {formData.final_score}/100
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={formData.final_score}
                  onChange={(e) =>
                    setFormData({ ...formData, final_score: Number(e.target.value) })
                  }
                  className="w-full"
                />
              </div>
            </div>

            {/* Projects & Backlogs Row */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300">
                  Projects Completed
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={formData.projects_completed}
                  onChange={(e) =>
                    setFormData({ ...formData, projects_completed: Number(e.target.value) })
                  }
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm font-bold text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-slate-300">
                  Active Backlogs
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={formData.backlogs}
                  onChange={(e) =>
                    setFormData({ ...formData, backlogs: Number(e.target.value) })
                  }
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm font-bold text-white focus:border-rose-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Predict Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 py-4 text-base font-extrabold text-white shadow-xl shadow-indigo-500/25 transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              <Sparkles className="h-5 w-5" />
              <span>{loading ? 'RUNNING PREDICTION MODEL...' : 'PREDICT'}</span>
            </button>
          </form>
        </div>

        {/* Right Card: Prediction Animation & Results (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-indigo-900/80 bg-gradient-to-b from-[#0B1536] via-[#09102A] to-[#060B1C] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400">
              <Sparkles className="h-5 w-5" />
              <h3 className="text-lg font-bold text-white">Model Inference Result</h3>
            </div>

            {/* In-Flight Animation Steps */}
            {loading && (
              <div className="mt-12 space-y-4 text-center animate-fadeIn">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20 text-cyan-400 animate-spin">
                  <Sparkles className="h-8 w-8" />
                </div>
                <div className="text-base font-bold text-white">{predictionStep}</div>
                <p className="text-xs text-slate-400">Executing pure Logistic Regression on Next.js server</p>
              </div>
            )}

            {/* Result Display */}
            {result && !loading && (
              <div className="mt-6 space-y-6 animate-fadeIn">
                {/* Result Hero Badge */}
                <div
                  className={`rounded-2xl border p-6 text-center shadow-xl ${
                    result.isPlaced
                      ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300 ring-2 ring-emerald-500/20'
                      : 'border-rose-500/50 bg-rose-950/30 text-rose-300 ring-2 ring-rose-500/20'
                  }`}
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-900/90 shadow-md">
                    {result.isPlaced ? (
                      <UserCheck className="h-8 w-8 text-emerald-400" />
                    ) : (
                      <UserX className="h-8 w-8 text-rose-400" />
                    )}
                  </div>

                  <span className="mt-3 block text-xs font-mono uppercase tracking-widest text-slate-400">
                    MODEL PREDICTION
                  </span>

                  <div className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
                    {result.prediction}
                  </div>

                  <div className="mt-3 inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 font-mono text-xs font-bold text-white">
                    Confidence: {result.confidencePercentage}%
                  </div>
                </div>

                {/* Profile Summary Breakdown */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                    Student Profile Tested
                  </span>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="text-slate-300">Attendance: <span className="font-bold text-cyan-300">{formData.attendance_percentage}%</span></div>
                    <div className="text-slate-300">Study: <span className="font-bold text-purple-300">{formData.study_hour} hrs</span></div>
                    <div className="text-slate-300">Mid-Term: <span className="font-bold text-indigo-300">{formData.mid_term_score}</span></div>
                    <div className="text-slate-300">Final Score: <span className="font-bold text-emerald-300">{formData.final_score}</span></div>
                    <div className="text-slate-300">Projects: <span className="font-bold text-white">{formData.projects_completed}</span></div>
                    <div className="text-slate-300">Backlogs: <span className={`font-bold ${formData.backlogs > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>{formData.backlogs}</span></div>
                  </div>
                </div>

                {/* Explanation */}
                <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/20 p-4 text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-cyan-300">Inputs considered by model: </span>
                  {result.explanation}
                </div>

                {/* Disclaimer (Section 27) */}
                <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3 text-[11px] text-amber-200/90 leading-relaxed">
                  <span className="font-bold">Disclaimer: </span>
                  {result.disclaimer}
                </div>
              </div>
            )}

            {/* Empty State before first prediction */}
            {!result && !loading && (
              <div className="mt-12 text-center text-slate-400 space-y-3">
                <Sparkles className="mx-auto h-8 w-8 text-slate-600" />
                <p className="text-xs">
                  Set candidate attributes on the left and click <strong>PREDICT</strong> to evaluate placement probability with the trained model.
                </p>
              </div>
            )}
          </div>

          {result && (
            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={onNext}
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-500 py-3 text-sm font-bold text-white transition-all hover:scale-105"
              >
                <span>View Full Pipeline Certificate</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
