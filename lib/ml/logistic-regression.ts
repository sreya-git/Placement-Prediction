import {
  CleanedStudentRecord,
  ModelMetrics,
  ConfusionMatrix,
  PredictionInput,
  PredictionResult,
} from '../types/dataset';

export interface ScalerParams {
  mean: Record<string, number>;
  std: Record<string, number>;
}

export interface TrainedModelWeights {
  weights: Record<string, number>;
  bias: number;
  featureNames: string[];
  scaler: ScalerParams;
  categories: {
    departments: string[];
    years: string[];
  };
  metrics: ModelMetrics;
  trainedAt: string;
}

// PRNG for reproducible 80/20 train/test split
function createPrng(seed: number = 42) {
  let s = seed;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class LogisticRegressionEngine {
  private static activeModel: TrainedModelWeights | null = null;
  private static isTraining: boolean = false;

  private static DEPARTMENTS = ['CSE', 'IT', 'ECE', 'EEE', 'ME', 'CE'];
  private static YEARS = ['1st', '2nd', '3rd', '4th'];
  private static NUMERIC_FEATURES = [
    'attendance_percentage',
    'study_hour',
    'mid_term_score',
    'final_score',
    'projects_completed',
    'backlogs',
  ];

  /**
   * Sigmoid activation function
   */
  private static sigmoid(z: number): number {
    if (z > 40) return 1;
    if (z < -40) return 0;
    return 1 / (1 + Math.exp(-z));
  }

  /**
   * Fits standard scaler on numeric features
   */
  private static fitScaler(records: CleanedStudentRecord[]): ScalerParams {
    const mean: Record<string, number> = {};
    const std: Record<string, number> = {};

    this.NUMERIC_FEATURES.forEach((feature) => {
      const values = records.map((r) => Number((r as any)[feature]) || 0);
      const sum = values.reduce((acc, v) => acc + v, 0);
      const m = sum / values.length;
      mean[feature] = m;

      const variance =
        values.reduce((acc, v) => acc + Math.pow(v - m, 2), 0) / values.length;
      std[feature] = Math.sqrt(variance) || 1; // Avoid division by zero
    });

    return { mean, std };
  }

  /**
   * Encodes a single student record into a vectorized numerical feature array
   */
  public static encodeFeatures(
    record: {
      dept: string;
      year: string;
      attendance_percentage: number;
      study_hour: number;
      mid_term_score: number;
      final_score: number;
      projects_completed: number;
      backlogs: number;
    },
    scaler: ScalerParams
  ): { vector: number[]; featureNames: string[] } {
    const vector: number[] = [];
    const featureNames: string[] = [];

    // 1. Normalized Numeric Features
    this.NUMERIC_FEATURES.forEach((feat) => {
      const rawVal = Number((record as any)[feat]) || 0;
      const m = scaler.mean[feat] || 0;
      const s = scaler.std[feat] || 1;
      const normalized = (rawVal - m) / s;
      vector.push(normalized);
      featureNames.push(feat);
    });

    // 2. One-hot encoded Department
    this.DEPARTMENTS.forEach((d) => {
      const isMatch = record.dept.toUpperCase().trim() === d ? 1 : 0;
      vector.push(isMatch);
      featureNames.push(`dept_${d}`);
    });

    // 3. One-hot encoded Year
    this.YEARS.forEach((y) => {
      const isMatch = record.year.trim().toLowerCase() === y.toLowerCase() ? 1 : 0;
      vector.push(isMatch);
      featureNames.push(`year_${y}`);
    });

    return { vector, featureNames };
  }

  /**
   * Trains the Logistic Regression model on the server
   */
  public static async train(records: CleanedStudentRecord[]): Promise<ModelMetrics> {
    if (!records || records.length < 10) {
      throw new Error('At least 10 cleaned student records are required for training.');
    }

    this.isTraining = true;

    try {
      // 1. Reproducible Shuffle & Split (80% Train, 20% Test)
      const prng = createPrng(1337);
      const shuffled = [...records].sort(() => prng() - 0.5);

      const trainSplitIndex = Math.floor(shuffled.length * 0.8);
      const trainRecords = shuffled.slice(0, trainSplitIndex);
      const testRecords = shuffled.slice(trainSplitIndex);

      // 2. Fit Scaler strictly on training records (prevent data leakage)
      const scaler = this.fitScaler(trainRecords);

      // 3. Build Training Vectors
      const X_train: number[][] = [];
      const y_train: number[] = [];
      let featureNames: string[] = [];

      trainRecords.forEach((r) => {
        const { vector, featureNames: names } = this.encodeFeatures(r, scaler);
        X_train.push(vector);
        featureNames = names;
        // Target: 1 for Placed, 0 for Not Placed / Not Eligible
        const isPlaced = r.placement_status.toLowerCase().trim() === 'placed' ? 1 : 0;
        y_train.push(isPlaced);
      });

      const numSamples = X_train.length;
      const numFeatures = featureNames.length;

      // 4. Initialize Weights and Bias
      const weights: number[] = new Array(numFeatures).fill(0);
      let bias = 0;

      // Hyperparameters
      const learningRate = 0.12;
      const epochs = 450;
      const lambda = 0.01; // L2 regularization parameter

      // 5. Batch Gradient Descent Loop
      let finalLoss = 0;
      for (let epoch = 0; epoch < epochs; epoch++) {
        const dW = new Array(numFeatures).fill(0);
        let dB = 0;
        let epochLoss = 0;

        for (let i = 0; i < numSamples; i++) {
          const xi = X_train[i];
          const yi = y_train[i];

          // Compute z = w*x + b
          let z = bias;
          for (let j = 0; j < numFeatures; j++) {
            z += weights[j] * xi[j];
          }

          const yHat = this.sigmoid(z);
          const error = yHat - yi;

          // Accumulate gradients
          for (let j = 0; j < numFeatures; j++) {
            dW[j] += error * xi[j];
          }
          dB += error;

          // Loss accumulation (Binary Cross-Entropy)
          const eps = 1e-12;
          epochLoss += -(yi * Math.log(yHat + eps) + (1 - yi) * Math.log(1 - yHat + eps));
        }

        // Apply regularization and update weights
        for (let j = 0; j < numFeatures; j++) {
          const regGradient = (lambda / numSamples) * weights[j];
          weights[j] -= learningRate * (dW[j] / numSamples + regGradient);
        }
        bias -= learningRate * (dB / numSamples);
        finalLoss = epochLoss / numSamples;
      }

      // 6. Evaluate on Unseen Test Dataset (20%)
      const confusionMatrix: ConfusionMatrix = {
        truePositive: 0,
        falsePositive: 0,
        trueNegative: 0,
        falseNegative: 0,
      };

      testRecords.forEach((r) => {
        const { vector } = this.encodeFeatures(r, scaler);
        let z = bias;
        for (let j = 0; j < numFeatures; j++) {
          z += weights[j] * vector[j];
        }
        const probability = this.sigmoid(z);
        const predictedClass = probability >= 0.5 ? 1 : 0;
        const actualClass = r.placement_status.toLowerCase().trim() === 'placed' ? 1 : 0;

        if (predictedClass === 1 && actualClass === 1) {
          confusionMatrix.truePositive++;
        } else if (predictedClass === 1 && actualClass === 0) {
          confusionMatrix.falsePositive++;
        } else if (predictedClass === 0 && actualClass === 0) {
          confusionMatrix.trueNegative++;
        } else {
          confusionMatrix.falseNegative++;
        }
      });

      const totalTest = testRecords.length;
      const correct = confusionMatrix.truePositive + confusionMatrix.trueNegative;
      const accuracy = Number(((correct / totalTest) * 100).toFixed(1));

      const precisionDenom = confusionMatrix.truePositive + confusionMatrix.falsePositive;
      const precision = precisionDenom > 0 ? Number(((confusionMatrix.truePositive / precisionDenom) * 100).toFixed(1)) : 0;

      const recallDenom = confusionMatrix.truePositive + confusionMatrix.falseNegative;
      const recall = recallDenom > 0 ? Number(((confusionMatrix.truePositive / recallDenom) * 100).toFixed(1)) : 0;

      const f1Score = (precision + recall) > 0 ? Number(((2 * (precision * recall)) / (precision + recall)).toFixed(1)) : 0;

      // Build feature weights mapping
      const featureWeightMap: Record<string, number> = {};
      const featureWeightsSummary = featureNames.map((name, idx) => {
        const w = Number(weights[idx].toFixed(3));
        featureWeightMap[name] = w;
        return {
          feature: name,
          weight: w,
          impact: (w > 0.05 ? 'positive' : w < -0.05 ? 'negative' : 'neutral') as 'positive' | 'negative' | 'neutral',
        };
      }).sort((a, b) => Math.abs(b.weight) - Math.abs(a.weight));

      const metrics: ModelMetrics = {
        accuracy,
        trainCount: trainRecords.length,
        testCount: testRecords.length,
        confusionMatrix,
        precision,
        recall,
        f1Score,
        featureWeights: featureWeightsSummary,
        bias: Number(bias.toFixed(3)),
        epochsRun: epochs,
        finalLoss: Number(finalLoss.toFixed(4)),
        trainedAt: new Date().toISOString(),
        categories: {
          departments: this.DEPARTMENTS,
          years: this.YEARS,
        },
      };

      // Store in memory singleton
      this.activeModel = {
        weights: featureWeightMap,
        bias,
        featureNames,
        scaler,
        categories: {
          departments: this.DEPARTMENTS,
          years: this.YEARS,
        },
        metrics,
        trainedAt: new Date().toISOString(),
      };

      return metrics;
    } finally {
      this.isTraining = false;
    }
  }

  /**
   * Retrieves the currently active trained model
   */
  public static getActiveModel(): TrainedModelWeights | null {
    return this.activeModel;
  }

  /**
   * Checks if model is ready or training
   */
  public static getStatus(): { status: 'NOT_TRAINED' | 'TRAINING' | 'READY'; metrics: ModelMetrics | null } {
    if (this.isTraining) {
      return { status: 'TRAINING', metrics: null };
    }
    if (this.activeModel) {
      return { status: 'READY', metrics: this.activeModel.metrics };
    }
    return { status: 'NOT_TRAINED', metrics: null };
  }

  /**
   * Resets active model (e.g. if dataset changes)
   */
  public static resetModel(): void {
    this.activeModel = null;
  }

  /**
   * Executes inference on a student profile using the trained model
   */
  public static predict(input: PredictionInput): PredictionResult {
    const model = this.activeModel;
    if (!model) {
      throw new Error('Model is not trained yet. Please train the model first.');
    }

    // Apply the exact same encoding and scaling
    const { vector, featureNames } = this.encodeFeatures(input, model.scaler);

    let z = model.bias;
    const contributions: {
      feature: string;
      label: string;
      value: any;
      contribution: number;
      direction: 'positive' | 'negative' | 'neutral';
      insight: string;
    }[] = [];

    const friendlyNames: Record<string, string> = {
      attendance_percentage: 'Attendance Rate',
      study_hour: 'Daily Study Hours',
      mid_term_score: 'Mid-Term Exam Score',
      final_score: 'Final Exam Score',
      projects_completed: 'Projects Completed',
      backlogs: 'Active Backlogs',
    };

    featureNames.forEach((featName, idx) => {
      const weight = model.weights[featName] || 0;
      const featVal = vector[idx];
      const contrib = weight * featVal;
      z += contrib;

      if (this.NUMERIC_FEATURES.includes(featName)) {
        const raw = (input as any)[featName];
        let insight = '';
        if (featName === 'final_score' && raw >= 75) insight = 'High final score significantly elevates placement probability.';
        else if (featName === 'backlogs' && raw > 0) insight = 'Backlogs create substantial negative pressure on placement eligibility.';
        else if (featName === 'attendance_percentage' && raw >= 85) insight = 'Strong attendance provides consistent positive correlation.';
        else if (featName === 'projects_completed' && raw >= 3) insight = 'Multiple practical projects enhance candidate profile.';
        else insight = `Observed value: ${raw}`;

        contributions.push({
          feature: featName,
          label: friendlyNames[featName] || featName,
          value: raw,
          contribution: Number(contrib.toFixed(2)),
          direction: contrib > 0.05 ? 'positive' : contrib < -0.05 ? 'negative' : 'neutral',
          insight,
        });
      }
    });

    const probability = this.sigmoid(z);
    const isPlaced = probability >= 0.5;
    const confidencePercentage = Number((isPlaced ? probability * 100 : (1 - probability) * 100).toFixed(1));

    let explanation = isPlaced
      ? `Based on the trained Logistic Regression patterns, this student demonstrates strong academic indicators (Probability: ${(probability * 100).toFixed(1)}%). Key positive contributors include ${contributions.filter(c => c.direction === 'positive').map(c => c.label).slice(0, 2).join(' and ') || 'balanced metrics'}.`
      : `Based on the trained Logistic Regression patterns, the model identifies areas needing reinforcement (Probability: ${(probability * 100).toFixed(1)}%). Lower scores or presence of backlogs weigh heavily against immediate placement likelihood.`;

    return {
      prediction: isPlaced ? 'LIKELY PLACED' : 'NOT LIKELY TO BE PLACED',
      isPlaced,
      probability: Number(probability.toFixed(3)),
      confidencePercentage,
      rawScore: Number(z.toFixed(3)),
      inputProfile: input,
      featureContributions: contributions.sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution)),
      explanation,
      disclaimer:
        'This is an educational prediction based on patterns in the sample dataset. It is not a guarantee of a student\'s actual placement outcome.',
      evaluatedAt: new Date().toISOString(),
    };
  }
}
