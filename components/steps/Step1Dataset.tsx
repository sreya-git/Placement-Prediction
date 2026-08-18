'use client';

import React, { useState } from 'react';
import {
  StudentRecord,
  DatasetStats,
} from '@/lib/types/dataset';
import {
  Database,
  ArrowRight,
  Search,
  SlidersHorizontal,
  Info,
  Layers,
  AlertTriangle,
  Copy,
  Table as TableIcon,
} from 'lucide-react';

interface Step1DatasetProps {
  records: StudentRecord[];
  stats: DatasetStats;
  loading: boolean;
  onNext: () => void;
}

export const Step1Dataset: React.FC<Step1DatasetProps> = ({
  records,
  stats,
  loading,
  onNext,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12;

  // Filter records
  const filteredRecords = records.filter((r) => {
    const matchesDept = selectedDept === 'ALL' || r.dept === selectedDept;
    const matchesSearch =
      searchTerm === '' ||
      r.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.year.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.placement_status.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedRecords = filteredRecords.slice(startIndex, startIndex + rowsPerPage);

  const departments = ['ALL', 'CSE', 'IT', 'ECE', 'EEE', 'ME', 'CE'];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Concept */}
      <div className="rounded-3xl border border-indigo-900/60 bg-gradient-to-r from-[#0B122C] to-[#080D20] p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center space-x-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-300">
              <Database className="h-3.5 w-3.5" />
              <span>Step 01 / 06 — Raw Data Discovery</span>
            </span>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
              Meet Your Data
            </h2>
            <p className="mt-2 text-base text-slate-300 max-w-3xl">
              “Each row represents one student. Each column tells us something about that student.”
            </p>
          </div>

          <button
            onClick={onNext}
            className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:scale-105 hover:shadow-cyan-500/25"
          >
            <span>NEXT → CLEAN THE DATA</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Dynamic Statistics Cards */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/40 p-4 transition-transform hover:-translate-y-1">
            <span className="text-xs font-mono font-medium text-indigo-300">Total Students (Rows)</span>
            <div className="mt-2 text-3xl font-extrabold text-white">
              {loading ? '...' : stats.totalStudents}
            </div>
            <p className="mt-1 text-[11px] text-slate-400">Total records loaded</p>
          </div>

          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/40 p-4 transition-transform hover:-translate-y-1">
            <span className="text-xs font-mono font-medium text-cyan-300">Total Features (Columns)</span>
            <div className="mt-2 text-3xl font-extrabold text-white">
              {loading ? '...' : stats.totalFeatures}
            </div>
            <p className="mt-1 text-[11px] text-slate-400">Attributes per student</p>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-950/40 p-4 transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-medium text-amber-300">Missing Values</span>
              <AlertTriangle className="h-4 w-4 text-amber-400" />
            </div>
            <div className="mt-2 text-3xl font-extrabold text-amber-300">
              {loading ? '...' : stats.missingValues}
            </div>
            <p className="mt-1 text-[11px] text-amber-400/80">Empty cells requiring mean</p>
          </div>

          <div className="rounded-2xl border border-rose-500/20 bg-rose-950/40 p-4 transition-transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-medium text-rose-300">Duplicate Rows</span>
              <Copy className="h-4 w-4 text-rose-400" />
            </div>
            <div className="mt-2 text-3xl font-extrabold text-rose-400">
              {loading ? '...' : stats.duplicateRows}
            </div>
            <p className="mt-1 text-[11px] text-rose-400/80">Redundant records to remove</p>
          </div>
        </div>

        {/* 1st Year Pedagogical Concept Cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-start space-x-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">What is a Row?</h4>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                “One student's information.” A single horizontal record holding all measurements for that specific student.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
              <TableIcon className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">What is a Column (Feature)?</h4>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                “One type of information about the student.” Attributes like department, attendance %, study hours, scores, and placement status.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Dataset Table */}
      <div className="rounded-3xl border border-slate-800/80 bg-[#090F26] p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-2">
            <TableIcon className="h-5 w-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Live Student Records Table</h3>
            <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs text-slate-400">
              {filteredRecords.length} records
            </span>
          </div>

          {/* Search & Department Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search department, year..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-xl border border-slate-700 bg-slate-900/80 py-1.5 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center space-x-1 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80 p-1 text-xs">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => {
                    setSelectedDept(dept);
                    setCurrentPage(1);
                  }}
                  className={`rounded-lg px-2.5 py-1 font-medium transition-all ${
                    selectedDept === dept
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Table View */}
        <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0D1636] uppercase text-slate-300 font-mono">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Dept</th>
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Attendance %</th>
                <th className="py-3 px-4">Study Hr/Day</th>
                <th className="py-3 px-4">Mid-Term</th>
                <th className="py-3 px-4">Final Score</th>
                <th className="py-3 px-4">Projects</th>
                <th className="py-3 px-4">Backlogs</th>
                <th className="py-3 px-4">Placement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-[#070D22]/60">
              {displayedRecords.map((row, idx) => {
                const globalIndex = startIndex + idx + 1;
                const hasMissing =
                  row.attendance_percentage == null ||
                  row.study_hour == null ||
                  row.mid_term_score == null ||
                  row.final_score == null ||
                  row.projects_completed == null;

                return (
                  <tr
                    key={row.id ?? `row-${globalIndex}`}
                    className={`transition-colors hover:bg-slate-800/40 ${
                      hasMissing ? 'bg-amber-950/20' : ''
                    }`}
                  >
                    <td className="py-2.5 px-4 font-mono text-slate-500">{globalIndex}</td>
                    <td className="py-2.5 px-4 font-semibold text-cyan-300">{row.dept}</td>
                    <td className="py-2.5 px-4 text-slate-300">{row.year}</td>
                    
                    {/* Attendance */}
                    <td className="py-2.5 px-4 font-mono">
                      {row.attendance_percentage != null ? (
                        <span className="text-slate-200">{row.attendance_percentage}%</span>
                      ) : (
                        <span className="rounded bg-amber-500/20 px-2 py-0.5 text-amber-300 font-bold">
                          MISSING
                        </span>
                      )}
                    </td>

                    {/* Study Hours */}
                    <td className="py-2.5 px-4 font-mono">
                      {row.study_hour != null ? (
                        <span className="text-slate-200">{row.study_hour} hrs</span>
                      ) : (
                        <span className="rounded bg-amber-500/20 px-2 py-0.5 text-amber-300 font-bold">
                          MISSING
                        </span>
                      )}
                    </td>

                    {/* Mid-term */}
                    <td className="py-2.5 px-4 font-mono">
                      {row.mid_term_score != null ? (
                        <span className="text-slate-200">{row.mid_term_score}</span>
                      ) : (
                        <span className="rounded bg-amber-500/20 px-2 py-0.5 text-amber-300 font-bold">
                          MISSING
                        </span>
                      )}
                    </td>

                    {/* Final Score */}
                    <td className="py-2.5 px-4 font-mono">
                      {row.final_score != null ? (
                        <span className="text-slate-200">{row.final_score}</span>
                      ) : (
                        <span className="rounded bg-amber-500/20 px-2 py-0.5 text-amber-300 font-bold">
                          MISSING
                        </span>
                      )}
                    </td>

                    {/* Projects */}
                    <td className="py-2.5 px-4 font-mono">
                      {row.projects_completed != null ? (
                        <span className="text-slate-200">{row.projects_completed}</span>
                      ) : (
                        <span className="rounded bg-amber-500/20 px-2 py-0.5 text-amber-300 font-bold">
                          MISSING
                        </span>
                      )}
                    </td>

                    {/* Backlogs */}
                    <td className="py-2.5 px-4 font-mono">
                      {row.backlogs != null ? (
                        <span
                          className={`font-semibold ${
                            row.backlogs > 0 ? 'text-rose-400' : 'text-emerald-400'
                          }`}
                        >
                          {row.backlogs}
                        </span>
                      ) : (
                        <span className="rounded bg-amber-500/20 px-2 py-0.5 text-amber-300 font-bold">
                          MISSING
                        </span>
                      )}
                    </td>

                    {/* Placement Status */}
                    <td className="py-2.5 px-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          row.placement_status === 'Placed'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : row.placement_status === 'Not Placed'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {row.placement_status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination & Next Action */}
        <div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-xs text-slate-400">
            Showing <span className="text-white font-mono">{startIndex + 1}</span> to{' '}
            <span className="text-white font-mono">
              {Math.min(startIndex + rowsPerPage, filteredRecords.length)}
            </span>{' '}
            of <span className="text-white font-mono">{filteredRecords.length}</span> students
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
            >
              Previous
            </button>
            <span className="text-xs font-mono text-slate-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
