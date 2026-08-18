'use client';

import React, { useState, useEffect } from 'react';
import {
  StudentRecord,
  CleanedStudentRecord,
  DatasetStats,
  DuplicateDetail,
  MissingValueDetectionResult,
  CleaningReport,
  AnalysisSummary,
  ChartDataSets,
  ModelMetrics,
  PredictionInput,
  PredictionResult,
} from '@/lib/types/dataset';
import { Header } from '@/components/ui/Header';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { HeroLanding } from '@/components/landing/HeroLanding';
import { Step1Dataset } from '@/components/steps/Step1Dataset';
import { Step2Duplicates } from '@/components/steps/Step2Duplicates';
import { Step3MissingValues } from '@/components/steps/Step3MissingValues';
import { Step4Analysis } from '@/components/steps/Step4Analysis';
import { Step5Visualization } from '@/components/steps/Step5Visualization';
import { Step6MachineLearning } from '@/components/steps/Step6MachineLearning';
import { Step7Prediction } from '@/components/steps/Step7Prediction';
import { Step8FinalSummary } from '@/components/steps/Step8FinalSummary';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function DataScienceLabApp() {
  // Navigation State
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 = Landing, 1-7 = Steps, 8 = Final Summary
  const [maxUnlockedStep, setMaxUnlockedStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pipeline Data State
  const [rawRecords, setRawRecords] = useState<StudentRecord[]>([]);
  const [stats, setStats] = useState<DatasetStats>({
    totalStudents: 0,
    totalFeatures: 9,
    missingValues: 0,
    duplicateRows: 0,
    columns: [],
    departmentCounts: {},
    placementCounts: {},
    isSampleFallback: true,
    supabaseConnected: false,
  });

  // Cleaning States
  const [duplicates, setDuplicates] = useState<DuplicateDetail[]>([]);
  const [uniqueRecords, setUniqueRecords] = useState<StudentRecord[]>([]);
  const [isDuplicatesRemoved, setIsDuplicatesRemoved] = useState<boolean>(false);

  const [missingDetection, setMissingDetection] = useState<MissingValueDetectionResult>({
    hasMissingValues: 0,
    totalMissingCells: 0,
    missingCells: [],
    imputations: {},
  });
  const [isMissingImputed, setIsMissingImputed] = useState<boolean>(false);
  const [cleanedRecords, setCleanedRecords] = useState<CleanedStudentRecord[]>([]);
  const [cleaningReport, setCleaningReport] = useState<CleaningReport | null>(null);

  // Analytics & Charts States
  const [analysis, setAnalysis] = useState<AnalysisSummary | null>(null);
  const [charts, setCharts] = useState<ChartDataSets | null>(null);

  // ML State
  const [modelMetrics, setModelMetrics] = useState<ModelMetrics | null>(null);

  // Fetch initial raw dataset from API on load
  const loadInitialDataset = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/dataset');
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch dataset');
      }

      setRawRecords(data.records);
      setStats(data.stats);

      // Trigger server-side clean to prepare initial detection structures
      const cleanRes = await fetch('/api/data/clean', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ records: data.records }),
      });
      const cleanData = await cleanRes.json();

      if (cleanData.success && cleanData.report) {
        setCleaningReport(cleanData.report);
        const dupTrace = cleanData.report.traces.find(
          (t: any) => t.step === 'DUPLICATE_REMOVAL'
        );
        if (dupTrace) {
          setDuplicates(dupTrace.details || []);
        }

        const impTrace = cleanData.report.traces.find(
          (t: any) => t.step === 'MEAN_IMPUTATION'
        );
        if (impTrace) {
          setMissingDetection({
            hasMissingValues: data.stats.missingValues,
            totalMissingCells: data.stats.missingValues,
            missingCells: [],
            imputations: impTrace.details || {},
          });
        }
      }
    } catch (err: any) {
      console.error('Error loading dataset:', err);
      setError(err?.message || 'Failed to initialize dataset');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialDataset();
  }, []);

  // Step Navigators
  const goToStep = (step: number) => {
    setCurrentStep(step);
    if (step > maxUnlockedStep && step <= 6) {
      setMaxUnlockedStep(step);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartJourney = () => {
    goToStep(1);
  };

  const handleRemoveDuplicates = () => {
    setIsDuplicatesRemoved(true);
    if (cleaningReport) {
      // Find unique count
      const dupCount = duplicates.length;
      const filtered = rawRecords.slice(0, rawRecords.length - dupCount);
      setUniqueRecords(filtered);
    }
    setMaxUnlockedStep((prev) => Math.max(prev, 3));
  };

  const handleImputeMissingValues = async () => {
    setIsMissingImputed(true);
    if (cleaningReport) {
      setCleanedRecords(cleaningReport.cleanedRecords);
    }
    setMaxUnlockedStep((prev) => Math.max(prev, 4));

    // Fetch analysis and charts in parallel for smooth transitions
    try {
      const [analysisRes, chartsRes] = await Promise.all([
        fetch('/api/analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cleanedRecords: cleaningReport?.cleanedRecords || [],
          }),
        }),
        fetch('/api/charts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cleanedRecords: cleaningReport?.cleanedRecords || [],
          }),
        }),
      ]);

      const aData = await analysisRes.json();
      const cData = await chartsRes.json();

      if (aData.success) setAnalysis(aData.analysis);
      if (cData.success) setCharts(cData.charts);
    } catch (e) {
      console.error('Failed to prefetch analysis/charts:', e);
    }
  };

  const handleTrainModel = async () => {
    try {
      const res = await fetch('/api/model/train', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cleanedRecords: cleanedRecords.length > 0 ? cleanedRecords : cleaningReport?.cleanedRecords || [],
        }),
      });
      const data = await res.json();
      if (data.success && data.metrics) {
        setModelMetrics(data.metrics);
        setMaxUnlockedStep((prev) => Math.max(prev, 6));
      }
    } catch (e) {
      console.error('Training error:', e);
    }
  };

  const handlePredict = async (input: PredictionInput): Promise<PredictionResult | null> => {
    try {
      const res = await fetch('/api/model/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (data.success && data.result) {
        return data.result;
      }
      return null;
    } catch (e) {
      console.error('Prediction API call failed:', e);
      return null;
    }
  };

  const handleResetPipeline = () => {
    setIsDuplicatesRemoved(false);
    setIsMissingImputed(false);
    setModelMetrics(null);
    setCurrentStep(1);
    setMaxUnlockedStep(1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#050914] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <Header
        supabaseConnected={stats.supabaseConnected}
        isSampleFallback={stats.isSampleFallback}
        onReset={handleResetPipeline}
        onGoHome={() => setCurrentStep(0)}
        currentStep={currentStep}
      />

      {/* Progress Bar (Visible when in journey) */}
      <ProgressBar
        currentStep={currentStep > 6 ? 6 : currentStep}
        maxUnlockedStep={maxUnlockedStep}
        onSelectStep={(step) => goToStep(step)}
      />

      {/* Main Dynamic View Area */}
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Error Banner if any */}
          {error && (
            <div className="mb-6 flex items-center justify-between rounded-2xl border border-rose-500/40 bg-rose-950/40 p-4 text-xs text-rose-300">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
              <button
                onClick={loadInitialDataset}
                className="flex items-center space-x-1 underline hover:text-white"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Retry</span>
              </button>
            </div>
          )}

          {/* STEP 0: LANDING PAGE */}
          {currentStep === 0 && (
            <HeroLanding
              onStartJourney={handleStartJourney}
              totalStudents={stats.totalStudents}
              supabaseConnected={stats.supabaseConnected}
            />
          )}

          {/* STEP 1: MEET YOUR DATA */}
          {currentStep === 1 && (
            <Step1Dataset
              records={rawRecords}
              stats={stats}
              loading={loading}
              onNext={() => goToStep(2)}
            />
          )}

          {/* STEP 2: REMOVE DUPLICATES */}
          {currentStep === 2 && (
            <Step2Duplicates
              rawRecords={rawRecords}
              duplicates={duplicates}
              onRemoveDuplicates={handleRemoveDuplicates}
              isDuplicatesRemoved={isDuplicatesRemoved}
              uniqueRecords={uniqueRecords}
              onNext={() => goToStep(3)}
            />
          )}

          {/* STEP 3: MISSING VALUES & MEAN IMPUTATION */}
          {currentStep === 3 && (
            <Step3MissingValues
              uniqueRecords={uniqueRecords}
              missingDetection={missingDetection}
              cleaningReport={cleaningReport}
              onImputeMissingValues={handleImputeMissingValues}
              isMissingImputed={isMissingImputed}
              onNext={() => goToStep(4)}
            />
          )}

          {/* STEP 4: DATA ANALYSIS */}
          {currentStep === 4 && (
            <Step4Analysis
              analysis={analysis}
              loading={loading}
              onNext={() => goToStep(5)}
            />
          )}

          {/* STEP 5: VISUALIZATION */}
          {currentStep === 5 && (
            <Step5Visualization
              charts={charts}
              loading={loading}
              onNext={() => goToStep(6)}
            />
          )}

          {/* STEP 6: MACHINE LEARNING TRAINING */}
          {currentStep === 6 && (
            <Step6MachineLearning
              onTrainModel={handleTrainModel}
              metrics={modelMetrics}
              loading={loading}
              onNext={() => goToStep(7)}
            />
          )}

          {/* STEP 7: PREDICTION SIMULATOR */}
          {currentStep === 7 && (
            <Step7Prediction
              onPredict={handlePredict}
              onNext={() => goToStep(8)}
            />
          )}

          {/* STEP 8: FINAL SUMMARY */}
          {currentStep === 8 && (
            <Step8FinalSummary
              onTryAnother={() => goToStep(7)}
              onRestart={() => {
                handleResetPipeline();
                setCurrentStep(0);
              }}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#040710] py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Data Science Lab • Interactive Engineering Education Platform</span>
          <span>Deployable with Vercel + Supabase ONLY • Pure TypeScript ML</span>
        </div>
      </footer>
    </div>
  );
}
