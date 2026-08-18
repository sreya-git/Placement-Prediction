// ==============================================================================
// DATA SCIENCE LAB - TYPES DEFINITION
// ==============================================================================

export interface StudentRecord {
  id?: number | string;
  dept: string;
  year: string;
  attendance_percentage: number | null | undefined;
  study_hour: number | null | undefined;
  mid_term_score: number | null | undefined;
  final_score: number | null | undefined;
  projects_completed: number | null | undefined;
  backlogs: number | null | undefined;
  placement_status: string;
}

export interface CleanedStudentRecord {
  id?: number | string;
  dept: string;
  year: string;
  attendance_percentage: number;
  study_hour: number;
  mid_term_score: number;
  final_score: number;
  projects_completed: number;
  backlogs: number;
  placement_status: string;
}

export interface DatasetStats {
  totalStudents: number;
  totalFeatures: number;
  missingValues: number;
  duplicateRows: number;
  columns: string[];
  departmentCounts: Record<string, number>;
  placementCounts: Record<string, number>;
  isSampleFallback: boolean;
  supabaseConnected: boolean;
}

export interface DuplicateDetail {
  originalIndex: number;
  record: StudentRecord;
  duplicateOfIndex: number;
}

export interface DuplicateDetectionResult {
  hasDuplicates: boolean;
  duplicateCount: number;
  originalCount: number;
  uniqueCount: number;
  duplicates: DuplicateDetail[];
  uniqueRecords: StudentRecord[];
}

export interface MissingCellDetail {
  rowIndex: number;
  column: keyof StudentRecord;
  studentDept: string;
  studentYear: string;
}

export interface ColumnImputationDetail {
  column: keyof StudentRecord;
  isNumeric: boolean;
  missingCount: number;
  sum?: number;
  availableCount?: number;
  meanValue?: number;
  modeValue?: string;
  sampleValues?: number[];
  formulaSteps?: string[];
}

export interface MissingValueDetectionResult {
  hasMissingValues: number;
  totalMissingCells: number;
  missingCells: MissingCellDetail[];
  imputations: Record<string, ColumnImputationDetail>;
}

export interface CleaningStepTrace {
  step: 'DUPLICATE_REMOVAL' | 'MEAN_IMPUTATION' | 'MODE_IMPUTATION';
  description: string;
  beforeCount: number;
  afterCount: number;
  details: any;
}

export interface CleaningReport {
  before: {
    totalRows: number;
    duplicateRows: number;
    missingValues: number;
  };
  after: {
    totalRows: number;
    duplicateRows: number;
    missingValues: number;
  };
  traces: CleaningStepTrace[];
  cleanedRecords: CleanedStudentRecord[];
}

export interface AnalysisQuestionResult {
  id: string;
  question: string;
  answer: string | number;
  unit?: string;
  detail: string;
  badge?: string;
  context: string;
}

export interface AnalysisSummary {
  highestScoreDept: { dept: string; avgScore: number };
  averageAttendance: number;
  studentsWithBacklogs: { count: number; percentage: number };
  mostStudentsDept: { dept: string; count: number; percentage: number };
  averageStudyHours: number;
  totalAnalyzed: number;
  questions: AnalysisQuestionResult[];
}

export interface ChartDataSets {
  avgFinalScoreByDept: { dept: string; avgFinalScore: number; studentCount: number }[];
  attendanceVsFinalScore: { attendance: number; finalScore: number; dept: string; placement: string; studyHour: number }[];
  studentsByDept: { dept: string; count: number; percentage: number }[];
  backlogDistribution: { backlogs: string; count: number; percentage: number }[];
  studyHoursVsFinalScore: { studyHour: number; finalScore: number; dept: string; placement: string }[];
}

export interface ConfusionMatrix {
  truePositive: number;
  falsePositive: number;
  trueNegative: number;
  falseNegative: number;
}

export interface ModelMetrics {
  accuracy: number;
  trainCount: number;
  testCount: number;
  confusionMatrix: ConfusionMatrix;
  precision: number;
  recall: number;
  f1Score: number;
  featureWeights: { feature: string; weight: number; impact: 'positive' | 'negative' | 'neutral' }[];
  bias: number;
  epochsRun: number;
  finalLoss: number;
  trainedAt: string;
  categories: {
    departments: string[];
    years: string[];
  };
}

export interface ModelStatus {
  status: 'NOT_TRAINED' | 'TRAINING' | 'READY' | 'ERROR';
  metrics?: ModelMetrics | null;
  message?: string;
  lastTrained?: string;
}

export interface PredictionInput {
  dept: string;
  year: string;
  attendance_percentage: number;
  study_hour: number;
  mid_term_score: number;
  final_score: number;
  projects_completed: number;
  backlogs: number;
}

export interface PredictionResult {
  prediction: 'LIKELY PLACED' | 'NOT LIKELY TO BE PLACED';
  isPlaced: boolean;
  probability: number;
  confidencePercentage: number;
  rawScore: number;
  inputProfile: PredictionInput;
  featureContributions: {
    feature: string;
    label: string;
    value: any;
    contribution: number;
    direction: 'positive' | 'negative' | 'neutral';
    insight: string;
  }[];
  explanation: string;
  disclaimer: string;
  evaluatedAt: string;
}
