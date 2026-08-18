'use client';

import React, { useState } from 'react';
import {
  StudentRecord,
  CleanedStudentRecord,
  MissingValueDetectionResult,
  CleaningReport,
} from '@/lib/types/dataset';
import {
  Filter,
  Calculator,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  TrendingUp,
  Table as TableIcon,
} from 'lucide-react';

interface Step3MissingValuesProps {
  uniqueRecords: StudentRecord[];
  missingDetection: MissingValueDetectionResult;
  cleaningReport: CleaningReport | null;
  onImputeMissingValues: () => void;
  isMissingImputed: boolean;
  onNext: () => void;
}

export const Step3MissingValues: React.FC<Step3MissingValuesProps> = ({
  uniqueRecords,
  missingDetection,
  cleaningReport,
  onImputeMissingValues,
  isMissingImputed,
  onNext,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [animatingCell, setAnimatingCell] = useState<number | null>(null);

  const { missingCells, imputations, totalMissingCells } = missingDetection;

  const handleFillAll = () => {
    onImputeMissingValues();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="rounded-3xl border border-indigo-900/60 bg-gradient-to-r from-[#0B122C] to-[#080D20] p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center space-x-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-300">
              <Calculator className="h-3.5 w-3.5" />
              <span>Step 03 / 06 — Data Cleaning: Mean Imputation</span>
            </span>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
              Fill the Missing Values
            </h2>
            <p className="mt-2 text-base text-slate-300 max-w-3xl">
              “Sometimes information is not recorded. This creates an empty cell.” Replace empty numerical cells with the statistical column Mean.
            </p>
          </div>

          {isMissingImputed ? (
            <button
              onClick={onNext}
              className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:scale-105"
            >
              <span>NEXT → ANALYZE THE DATA</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleFillAll}
              className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-500/25 transition-all duration-200 hover:scale-105"
            >
              <Calculator className="h-4 w-4" />
              <span>CALCULATE MEAN & IMPUTE VALUES</span>
            </button>
          )}
        </div>

        {/* Dynamic Status Counter */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
            <span className="text-xs font-mono font-medium text-slate-400">Total Missing Cells</span>
            <div className="mt-2 text-3xl font-extrabold text-amber-300">
              {totalMissingCells}
            </div>
            <p className="mt-1 text-xs text-slate-400">Empty entries found</p>
          </div>

          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/40 p-5">
            <span className="text-xs font-mono font-medium text-indigo-300">Imputation Strategy</span>
            <div className="mt-2 text-2xl font-extrabold text-white">Mean (Average)</div>
            <p className="mt-1 text-xs text-indigo-300/80">Mean = Sum / Total Available</p>
          </div>

          <div
            className={`rounded-2xl border p-5 transition-all duration-500 ${
              isMissingImputed
                ? 'border-emerald-500/50 bg-emerald-950/40'
                : 'border-slate-800 bg-slate-900/40'
            }`}
          >
            <span className="text-xs font-mono font-medium text-emerald-300">Missing After Cleaning</span>
            <div className="mt-2 text-3xl font-extrabold text-emerald-400">
              {isMissingImputed ? '0' : totalMissingCells}
            </div>
            <p className="mt-1 text-xs text-emerald-300/80">
              {isMissingImputed ? '100% complete dataset' : 'Pending imputation'}
            </p>
          </div>
        </div>

        {/* Mean Formula Explanation Card */}
        <div className="mt-6 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-6 backdrop-blur-md">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold">
            <Calculator className="h-5 w-5" />
            <h4 className="text-base">Why Use the Mean Formula?</h4>
          </div>
          <p className="mt-2 text-xs text-slate-300 leading-relaxed">
            Filling missing cells with 0 or random numbers distorts machine learning models. Instead, we compute the <strong>arithmetic mean</strong> from all recorded student scores in that column:
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl border border-cyan-500/20 bg-slate-900/80 p-4 font-mono text-xs">
            <div className="flex items-center space-x-2 text-cyan-300">
              <span className="font-bold">Formula:</span>
              <span className="rounded bg-cyan-500/10 px-2 py-1 border border-cyan-500/30">
                Mean = (Sum of available values) / (Count of available values)
              </span>
            </div>
            <div className="text-slate-400">
              Example: 60, 70, 80, Missing → Mean = (60 + 70 + 80) / 3 = <strong>70.0</strong> → Missing replaced with 70.0
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Column Imputation Showcase */}
      <div className="rounded-3xl border border-slate-800/80 bg-[#090F26] p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Dynamic Column-by-Column Mean Calculations</h3>
          </div>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300 font-mono">
            {Object.keys(imputations).filter((k) => imputations[k].missingCount > 0).length} Columns Affected
          </span>
        </div>

        {/* Column Imputation Cards Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(imputations)
            .filter(([_, d]) => d.missingCount > 0)
            .map(([colName, detail]) => (
              <div
                key={colName}
                className="rounded-2xl border border-indigo-900/60 bg-gradient-to-b from-[#0E1738] to-[#090F26] p-5 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-cyan-300">
                    {colName.replace('_', ' ')}
                  </span>
                  <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                    {detail.missingCount} Missing
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Available Values:</span>
                    <span className="font-mono text-white">{detail.availableCount}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Sum of Values:</span>
                    <span className="font-mono text-white">{(detail.sum || 0).toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-700/60 pt-2 font-bold text-cyan-300">
                    <span>Calculated Mean:</span>
                    <span className="font-mono text-base text-cyan-400">{detail.meanValue}</span>
                  </div>
                </div>

                {/* Animated Replacement Indicator */}
                <div className="mt-4 rounded-xl border border-indigo-500/20 bg-indigo-950/30 p-2.5 text-center">
                  <div className="flex items-center justify-center space-x-1.5 text-[11px] font-mono">
                    <span className="text-amber-400">Empty Cell</span>
                    <span className="text-slate-500">→</span>
                    <span className="font-bold text-emerald-400">
                      {isMissingImputed ? `${detail.meanValue} (Replaced)` : `${detail.meanValue}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Missing Cells Detected List */}
        <div className="mt-8">
          <h4 className="text-sm font-bold text-slate-200">
            Detected Empty Cells in Working Records:
          </h4>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0D1636] uppercase text-slate-300 font-mono">
                <tr>
                  <th className="py-2.5 px-4">Row #</th>
                  <th className="py-2.5 px-4">Dept</th>
                  <th className="py-2.5 px-4">Year</th>
                  <th className="py-2.5 px-4">Missing Feature</th>
                  <th className="py-2.5 px-4">Replacement Method</th>
                  <th className="py-2.5 px-4">Calculated Replacement</th>
                  <th className="py-2.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-[#070D22]/60">
                {missingCells.map((cell, idx) => {
                  const imp = imputations[cell.column];
                  return (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-4 font-mono text-slate-400">Row #{cell.rowIndex + 1}</td>
                      <td className="py-2.5 px-4 font-semibold text-white">{cell.studentDept}</td>
                      <td className="py-2.5 px-4 text-slate-300">{cell.studentYear}</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-amber-300">
                        {String(cell.column)}
                      </td>
                      <td className="py-2.5 px-4 text-slate-300">
                        {imp?.isNumeric ? 'Column Mean' : 'Column Mode'}
                      </td>
                      <td className="py-2.5 px-4 font-mono font-bold text-cyan-300">
                        {imp?.meanValue ?? imp?.modeValue ?? '—'}
                      </td>
                      <td className="py-2.5 px-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                            isMissingImputed
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {isMissingImputed ? 'Replaced with Mean' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cleaning Summary Matrix (Section 14) */}
      {cleaningReport && (
        <div className="rounded-3xl border border-indigo-900/80 bg-gradient-to-br from-[#0B1536] via-[#09102A] to-[#060B1C] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Sparkles className="h-5 w-5" />
            <h3 className="text-xl font-extrabold text-white">
              Data Cleaning Complete Summary
            </h3>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Before vs After comparison of the student dataset
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* BEFORE Card */}
            <div className="rounded-2xl border border-rose-500/30 bg-rose-950/20 p-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-300">
                BEFORE CLEANING (Raw Data)
              </span>
              <div className="mt-4 space-y-3 font-mono text-sm">
                <div className="flex justify-between border-b border-rose-900/40 pb-2">
                  <span className="text-slate-400">Total Rows:</span>
                  <span className="font-bold text-white">{cleaningReport.before.totalRows}</span>
                </div>
                <div className="flex justify-between border-b border-rose-900/40 pb-2">
                  <span className="text-slate-400">Duplicate Rows:</span>
                  <span className="font-bold text-rose-400">{cleaningReport.before.duplicateRows}</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-slate-400">Missing Values:</span>
                  <span className="font-bold text-amber-400">{cleaningReport.before.missingValues}</span>
                </div>
              </div>
            </div>

            {/* AFTER Card */}
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-6 ring-2 ring-emerald-500/20">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
                AFTER CLEANING (Ready for ML)
              </span>
              <div className="mt-4 space-y-3 font-mono text-sm">
                <div className="flex justify-between border-b border-emerald-900/40 pb-2">
                  <span className="text-slate-400">Cleaned Rows:</span>
                  <span className="font-bold text-emerald-300">{cleaningReport.after.totalRows}</span>
                </div>
                <div className="flex justify-between border-b border-emerald-900/40 pb-2">
                  <span className="text-slate-400">Duplicate Rows:</span>
                  <span className="font-bold text-emerald-400">0 (Removed)</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-slate-400">Missing Values:</span>
                  <span className="font-bold text-emerald-400">0 (Imputed via Mean)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onNext}
              className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-indigo-500/25 transition-all hover:scale-105"
            >
              <span>NEXT → ANALYZE THE DATA</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
