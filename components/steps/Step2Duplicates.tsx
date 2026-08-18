'use client';

import React, { useState } from 'react';
import { StudentRecord, DuplicateDetail } from '@/lib/types/dataset';
import {
  Copy,
  Trash2,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

interface Step2DuplicatesProps {
  rawRecords: StudentRecord[];
  duplicates: DuplicateDetail[];
  onRemoveDuplicates: () => void;
  isDuplicatesRemoved: boolean;
  uniqueRecords: StudentRecord[];
  onNext: () => void;
}

export const Step2Duplicates: React.FC<Step2DuplicatesProps> = ({
  rawRecords,
  duplicates,
  onRemoveDuplicates,
  isDuplicatesRemoved,
  uniqueRecords,
  onNext,
}) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemoveClick = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemoveDuplicates();
      setIsRemoving(false);
    }, 900);
  };

  const originalCount = rawRecords.length;
  const duplicateCount = duplicates.length;
  const uniqueCount = uniqueRecords.length > 0 ? uniqueRecords.length : originalCount - duplicateCount;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Step Header */}
      <div className="rounded-3xl border border-indigo-900/60 bg-gradient-to-r from-[#0B122C] to-[#080D20] p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center space-x-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Copy className="h-3.5 w-3.5" />
              <span>Step 02 / 06 — Data Cleaning: Duplicates</span>
            </span>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
              Remove Duplicate Data
            </h2>
            <p className="mt-2 text-base text-slate-300 max-w-3xl">
              Detect and filter out redundant identical student rows to prevent double-counting.
            </p>
          </div>

          {isDuplicatesRemoved ? (
            <button
              onClick={onNext}
              className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:scale-105"
            >
              <span>NEXT → HANDLE MISSING VALUES</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleRemoveClick}
              disabled={isRemoving || duplicateCount === 0}
              className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-500/30 transition-all duration-200 hover:scale-105 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              <span>{isRemoving ? 'CLEANING IN PROGRESS...' : 'REMOVE DUPLICATES'}</span>
            </button>
          )}
        </div>

        {/* Dynamic Transition Banner */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
            <span className="text-xs font-mono font-medium text-slate-400">Original Rows</span>
            <div className="mt-2 text-3xl font-extrabold text-white">{originalCount}</div>
            <p className="mt-1 text-xs text-slate-400">Raw rows loaded from database</p>
          </div>

          <div className="rounded-2xl border border-rose-500/30 bg-rose-950/40 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-medium text-rose-300">Duplicate Rows Found</span>
              <AlertCircle className="h-4 w-4 text-rose-400" />
            </div>
            <div className="mt-2 text-3xl font-extrabold text-rose-400">{duplicateCount}</div>
            <p className="mt-1 text-xs text-rose-300/80">Identical repeating records</p>
          </div>

          <div
            className={`rounded-2xl border p-5 transition-all duration-500 ${
              isDuplicatesRemoved
                ? 'border-emerald-500/50 bg-emerald-950/40 ring-2 ring-emerald-500/20'
                : 'border-slate-800 bg-slate-900/40 opacity-70'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-medium text-emerald-300">Unique Cleaned Rows</span>
              {isDuplicatesRemoved && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
            </div>
            <div className="mt-2 text-3xl font-extrabold text-emerald-400">
              {isDuplicatesRemoved ? uniqueCount : '—'}
            </div>
            <p className="mt-1 text-xs text-emerald-300/80">
              {isDuplicatesRemoved ? 'Working dataset deduplicated' : 'Click "Remove Duplicates"'}
            </p>
          </div>
        </div>

        {/* 1st Year Educational Callouts */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
              <HelpCircle className="h-4 w-4" />
              <h4>What is a Duplicate?</h4>
            </div>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed">
              “A duplicate means the exact same student information appears more than once in the table.”
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
              <ShieldCheck className="h-4 w-4" />
              <h4>Why Remove Duplicates?</h4>
            </div>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed">
              “If the same student is counted twice, our department averages, statistics, and machine learning models become distorted.”
            </p>
          </div>
        </div>

        {/* Supabase Protection Notice */}
        <div className="mt-4 flex items-center space-x-2 rounded-xl border border-indigo-500/20 bg-indigo-950/20 px-4 py-2.5 text-xs text-indigo-200">
          <ShieldCheck className="h-4 w-4 text-indigo-400 shrink-0" />
          <span>
            <strong>Supabase Safety Guarantee:</strong> Deduplication occurs strictly on the server-side working memory dataset. The original Supabase database records remain 100% untouched.
          </span>
        </div>
      </div>

      {/* Duplicate Rows Highlight Showcase */}
      <div className="rounded-3xl border border-slate-800/80 bg-[#090F26] p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Copy className="h-5 w-5 text-rose-400" />
            <h3 className="text-lg font-bold text-white">
              {isDuplicatesRemoved
                ? '✅ Duplicates Successfully Removed from Working Copy'
                : '🚨 We Found Duplicate Data in the Dataset!'}
            </h3>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-mono font-bold ${
              isDuplicatesRemoved
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
            }`}
          >
            {isDuplicatesRemoved ? '0 Duplicates Remaining' : `${duplicateCount} Duplicates Highlighted`}
          </span>
        </div>

        <p className="mt-2 text-xs text-slate-400">
          Below are the redundant rows detected in the student dataset alongside the original record they duplicated:
        </p>

        {/* Duplicate Table */}
        <div className="mt-4 overflow-x-auto rounded-2xl border border-rose-900/40 bg-rose-950/10">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#140E20] uppercase text-rose-200 font-mono">
              <tr>
                <th className="py-3 px-4">Duplicate Row #</th>
                <th className="py-3 px-4">Dept</th>
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Attendance %</th>
                <th className="py-3 px-4">Study Hr</th>
                <th className="py-3 px-4">Mid-Term</th>
                <th className="py-3 px-4">Final Score</th>
                <th className="py-3 px-4">Backlogs</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Duplicate Of</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-900/20">
              {duplicates.map((dup, i) => (
                <tr
                  key={i}
                  className={`transition-all duration-700 ${
                    isDuplicatesRemoved
                      ? 'opacity-25 line-through bg-rose-950/30'
                      : isRemoving
                      ? 'scale-95 bg-rose-900/40 animate-pulse'
                      : 'bg-rose-950/20 hover:bg-rose-900/30'
                  }`}
                >
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">
                    Row {dup.originalIndex + 1}
                  </td>
                  <td className="py-3 px-4 font-semibold text-white">{dup.record.dept}</td>
                  <td className="py-3 px-4 text-slate-300">{dup.record.year}</td>
                  <td className="py-3 px-4 font-mono text-slate-300">{dup.record.attendance_percentage}%</td>
                  <td className="py-3 px-4 font-mono text-slate-300">{dup.record.study_hour} hrs</td>
                  <td className="py-3 px-4 font-mono text-slate-300">{dup.record.mid_term_score}</td>
                  <td className="py-3 px-4 font-mono text-slate-300">{dup.record.final_score}</td>
                  <td className="py-3 px-4 font-mono text-slate-300">{dup.record.backlogs}</td>
                  <td className="py-3 px-4 font-semibold text-cyan-300">{dup.record.placement_status}</td>
                  <td className="py-3 px-4 font-mono text-xs text-amber-300">
                    Duplicate of Row #{dup.duplicateOfIndex + 1}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Deduplication Summary Flow */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-[#080E24] p-4">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs text-slate-400">Deduplication Transition:</span>
            <div className="flex items-center space-x-2 font-mono text-sm font-bold">
              <span className="text-rose-400">{originalCount} Raw Rows</span>
              <span className="text-slate-500">→</span>
              <span className="text-emerald-400">{uniqueCount} Unique Rows</span>
            </div>
          </div>

          {!isDuplicatesRemoved ? (
            <button
              onClick={handleRemoveClick}
              disabled={isRemoving}
              className="flex items-center space-x-2 rounded-xl bg-rose-600 px-5 py-2 text-xs font-bold text-white transition-all hover:bg-rose-500"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Remove {duplicateCount} Duplicate Rows</span>
            </button>
          ) : (
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>{duplicateCount} Duplicate rows removed successfully!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
