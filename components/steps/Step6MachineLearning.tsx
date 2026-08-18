'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ModelMetrics } from '@/lib/types/dataset';
import {
  Binary,
  ArrowRight,
  Cpu,
  Sparkles,
  Zap,
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BarChart,
  RefreshCw,
} from 'lucide-react';

interface Step6MachineLearningProps {
  onTrainModel: () => Promise<void>;
  metrics: ModelMetrics | null;
  loading: boolean;
  onNext: () => void;
}

export const Step6MachineLearning: React.FC<Step6MachineLearningProps> = ({
  onTrainModel,
  metrics,
  loading,
  onNext,
}) => {
  const [trainingPhase, setTrainingPhase] = useState<number>(0);
  const [isAnimatingTraining, setIsAnimatingTraining] = useState<boolean>(false);
  const [trainingMessage, setTrainingMessage] = useState<string>('Ready to train');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Training stage messages per spec
  const STAGES = [
    { progress: 20, msg: 'Reading cleaned student data...' },
    { progress: 40, msg: 'Preparing and standardizing numerical features...' },
    { progress: 60, msg: 'Finding statistical patterns with gradient descent...' },
    { progress: 80, msg: 'Learning weights from student records...' },
    { progress: 100, msg: 'Evaluating predictions on unseen test records...' },
  ];

  // Particle Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; color: string }[] = [];

    const colors = ['#6366F1', '#06B6D4', '#A855F7', '#10B981', '#F59E0B'];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 3 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Center processor core
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.beginPath();
      ctx.arc(centerX, centerY, 35, 0, Math.PI * 2);
      ctx.fillStyle = isAnimatingTraining ? 'rgba(99, 102, 241, 0.25)' : 'rgba(15, 23, 42, 0.6)';
      ctx.fill();
      ctx.strokeStyle = isAnimatingTraining ? '#06B6D4' : '#334155';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw & update particles
      particles.forEach((p) => {
        if (isAnimatingTraining) {
          // Attract towards center processor
          const dx = centerX - p.x;
          const dy = centerY - p.y;
          p.vx += dx * 0.002;
          p.vy += dy * 0.002;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Bounce on edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = isAnimatingTraining ? 10 : 2;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAnimatingTraining]);

  const handleStartTraining = async () => {
    setIsAnimatingTraining(true);
    setTrainingPhase(0);

    // Simulate multi-stage visual progression
    for (let i = 0; i < STAGES.length; i++) {
      setTrainingPhase(STAGES[i].progress);
      setTrainingMessage(STAGES[i].msg);
      await new Promise((res) => setTimeout(res, 650));
    }

    await onTrainModel();
    setIsAnimatingTraining(false);
    setTrainingMessage('MODEL READY!');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="rounded-3xl border border-indigo-900/60 bg-gradient-to-r from-[#0B122C] to-[#080D20] p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center space-x-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-purple-300">
              <Binary className="h-3.5 w-3.5" />
              <span>Step 05 / 06 — Machine Learning: Binary Logistic Regression</span>
            </span>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
              Let&apos;s Teach a Machine
            </h2>
            <p className="mt-2 text-base text-slate-300 max-w-3xl">
              “Until now, we were analyzing existing data. Now we will teach a computer to learn mathematical patterns from student records.”
            </p>
          </div>

          {metrics ? (
            <button
              onClick={onNext}
              className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:scale-105"
            >
              <span>NEXT → PREDICT A STUDENT</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleStartTraining}
              disabled={isAnimatingTraining}
              className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-500/30 transition-all duration-200 hover:scale-105 disabled:opacity-50"
            >
              <Cpu className="h-4 w-4" />
              <span>{isAnimatingTraining ? 'TRAINING IN PROGRESS...' : 'TRAIN MY MODEL'}</span>
            </button>
          )}
        </div>

        {/* Model Architecture Diagram */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-4 font-mono text-xs">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-center">
            <span className="text-slate-400">INPUT FEATURES</span>
            <div className="mt-1 font-bold text-white">8 Dimensions</div>
            <p className="mt-0.5 text-[10px] text-slate-500">Dept, Year, Scores, Backlogs</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-center">
            <span className="text-slate-400">DATA SPLIT</span>
            <div className="mt-1 font-bold text-cyan-300">80% Train / 20% Test</div>
            <p className="mt-0.5 text-[10px] text-slate-500">Deterministic Seed</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-center">
            <span className="text-slate-400">ALGORITHM</span>
            <div className="mt-1 font-bold text-indigo-300">Logistic Regression</div>
            <p className="mt-0.5 text-[10px] text-slate-500">Sigmoid: 1 / (1 + e^-z)</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-center">
            <span className="text-slate-400">TARGET LABEL</span>
            <div className="mt-1 font-bold text-emerald-300">Placement Status</div>
            <p className="mt-0.5 text-[10px] text-slate-500">Placed (1) vs Other (0)</p>
          </div>
        </div>
      </div>

      {/* Visually Impressive AI Particle Training Box */}
      <div className="rounded-3xl border border-indigo-900/80 bg-gradient-to-b from-[#0B1536] to-[#070D22] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cpu className="h-5 w-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white">
              {isAnimatingTraining
                ? 'Your Future Predictor Is Building…'
                : metrics
                ? '✨ Your Model Is Ready!'
                : 'Interactive AI Training Simulator'}
            </h3>
          </div>

          {metrics && (
            <button
              onClick={handleStartTraining}
              disabled={isAnimatingTraining}
              className="flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Retrain Model</span>
            </button>
          )}
        </div>

        {/* Visual Particle Stage */}
        <div className="mt-6 relative flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/80 p-6 overflow-hidden">
          <canvas
            ref={canvasRef}
            width={500}
            height={200}
            className="w-full max-w-[500px] h-[200px]"
          />

          {/* Central Progress Banner */}
          <div className="mt-4 w-full max-w-md space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">{trainingMessage}</span>
              <span className="font-bold text-cyan-300">
                {metrics && !isAnimatingTraining ? '100%' : `${trainingPhase}%`}
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-900 overflow-hidden border border-slate-800">
              <div
                style={{ width: `${metrics && !isAnimatingTraining ? 100 : trainingPhase}%` }}
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-500 shadow-lg shadow-cyan-500/30"
              />
            </div>
          </div>

          {!metrics && !isAnimatingTraining && (
            <div className="mt-6">
              <button
                onClick={handleStartTraining}
                className="flex items-center space-x-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-indigo-500"
              >
                <Zap className="h-4 w-4 text-cyan-300" />
                <span>START TRAINING MODEL NOW</span>
              </button>
            </div>
          )}
        </div>

        {/* Model Results Showcase (Section 23) */}
        {metrics && (
          <div className="mt-8 space-y-6 animate-fadeIn">
            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/30 p-5 ring-2 ring-cyan-500/20">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                  Model Test Accuracy
                </span>
                <div className="mt-2 text-4xl font-extrabold text-white">
                  {metrics.accuracy}%
                </div>
                <p className="mt-1 text-xs text-cyan-300/80">
                  Evaluated on {metrics.testCount} unseen test students
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <span className="text-xs font-mono font-medium text-slate-400">
                  Dataset Partition
                </span>
                <div className="mt-2 text-2xl font-bold text-white">
                  {metrics.trainCount} Train / {metrics.testCount} Test
                </div>
                <p className="mt-1 text-xs text-slate-400">80% Training • 20% Testing</p>
              </div>

              <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/30 p-5">
                <span className="text-xs font-mono font-medium text-indigo-300">
                  Precision & Recall
                </span>
                <div className="mt-2 text-2xl font-bold text-white">
                  {metrics.precision}% / {metrics.recall}%
                </div>
                <p className="mt-1 text-xs text-indigo-300/80">F1 Score: {metrics.f1Score}%</p>
              </div>
            </div>

            {/* Explanation Quote */}
            <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/20 p-4 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-cyan-300">Understanding Accuracy: </span>
              “Accuracy tells us how often the model predicted the correct placement status for the unseen test students. No real-world machine learning model is 100% perfect, but it identifies strong statistical tendencies.”
            </div>

            {/* Confusion Matrix Table */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <h4 className="text-sm font-bold text-white mb-3">
                Confusion Matrix (Test Evaluation):
              </h4>
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 text-center">
                  <span className="text-emerald-400 font-bold text-lg">
                    {metrics.confusionMatrix.truePositive}
                  </span>
                  <div className="text-slate-400 mt-1">True Positives (Correctly Placed)</div>
                </div>

                <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-3 text-center">
                  <span className="text-rose-400 font-bold text-lg">
                    {metrics.confusionMatrix.falsePositive}
                  </span>
                  <div className="text-slate-400 mt-1">False Positives (Predicted Placed, but wasn&apos;t)</div>
                </div>

                <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-3 text-center">
                  <span className="text-rose-400 font-bold text-lg">
                    {metrics.confusionMatrix.falseNegative}
                  </span>
                  <div className="text-slate-400 mt-1">False Negatives (Missed Placements)</div>
                </div>

                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 text-center">
                  <span className="text-emerald-400 font-bold text-lg">
                    {metrics.confusionMatrix.trueNegative}
                  </span>
                  <div className="text-slate-400 mt-1">True Negatives (Correctly Unplaced)</div>
                </div>
              </div>
            </div>

            {/* Action to Predict */}
            <div className="flex justify-end pt-4">
              <button
                onClick={onNext}
                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-indigo-500/25 transition-all hover:scale-105"
              >
                <span>NEXT → TEST PREDICTIONS LIVE</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
