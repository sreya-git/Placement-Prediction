import { getSupabaseServerClient } from '../supabase/server';
import {
  StudentRecord,
  CleanedStudentRecord,
  DatasetStats,
  DuplicateDetectionResult,
  DuplicateDetail,
  MissingValueDetectionResult,
  ColumnImputationDetail,
  MissingCellDetail,
  CleaningReport,
} from '../types/dataset';
import { RAW_STUDENT_SEED_DATA } from './seed-data';

export const REQUIRED_COLUMNS: (keyof StudentRecord)[] = [
  'dept',
  'year',
  'attendance_percentage',
  'study_hour',
  'mid_term_score',
  'final_score',
  'projects_completed',
  'backlogs',
  'placement_status',
];

export const NUMERICAL_COLUMNS: (keyof StudentRecord)[] = [
  'attendance_percentage',
  'study_hour',
  'mid_term_score',
  'final_score',
  'projects_completed',
  'backlogs',
];

export const CATEGORICAL_COLUMNS: (keyof StudentRecord)[] = [
  'dept',
  'year',
  'placement_status',
];

export class DatasetService {
  /**
   * Fetches raw student records dynamically from Supabase, or gracefully uses seed data if Supabase is unconfigured.
   */
  static async fetchRawDataset(): Promise<{
    records: StudentRecord[];
    supabaseConnected: boolean;
    isSampleFallback: boolean;
    missingRequiredColumns: string[];
    error?: string;
  }> {
    const supabase = getSupabaseServerClient();

    if (!supabase) {
      return {
        records: JSON.parse(JSON.stringify(RAW_STUDENT_SEED_DATA)),
        supabaseConnected: false,
        isSampleFallback: true,
        missingRequiredColumns: [],
      };
    }

    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.warn('Supabase query returned error, falling back to seed dataset:', error.message);
        return {
          records: JSON.parse(JSON.stringify(RAW_STUDENT_SEED_DATA)),
          supabaseConnected: false,
          isSampleFallback: true,
          missingRequiredColumns: [],
          error: error.message,
        };
      }

      if (!data || data.length === 0) {
        console.warn('Supabase table is empty, using seed dataset.');
        return {
          records: JSON.parse(JSON.stringify(RAW_STUDENT_SEED_DATA)),
          supabaseConnected: true,
          isSampleFallback: true,
          missingRequiredColumns: [],
          error: 'Table `students` was found but contains 0 rows. Using seed dataset.',
        };
      }

      // Check for required columns
      const firstRow = data[0];
      const missingCols = REQUIRED_COLUMNS.filter((col) => !(col in firstRow));

      if (missingCols.length > 0) {
        return {
          records: JSON.parse(JSON.stringify(RAW_STUDENT_SEED_DATA)),
          supabaseConnected: true,
          isSampleFallback: true,
          missingRequiredColumns: missingCols,
          error: `Missing required columns: ${missingCols.join(', ')}`,
        };
      }

      // Parse records ensuring numerical types
      const parsedRecords: StudentRecord[] = data.map((row: any) => ({
        id: row.id,
        dept: String(row.dept || '').trim(),
        year: String(row.year || '').trim(),
        attendance_percentage: row.attendance_percentage !== null && row.attendance_percentage !== undefined && row.attendance_percentage !== '' ? Number(row.attendance_percentage) : null,
        study_hour: row.study_hour !== null && row.study_hour !== undefined && row.study_hour !== '' ? Number(row.study_hour) : null,
        mid_term_score: row.mid_term_score !== null && row.mid_term_score !== undefined && row.mid_term_score !== '' ? Number(row.mid_term_score) : null,
        final_score: row.final_score !== null && row.final_score !== undefined && row.final_score !== '' ? Number(row.final_score) : null,
        projects_completed: row.projects_completed !== null && row.projects_completed !== undefined && row.projects_completed !== '' ? Number(row.projects_completed) : null,
        backlogs: row.backlogs !== null && row.backlogs !== undefined && row.backlogs !== '' ? Number(row.backlogs) : null,
        placement_status: String(row.placement_status || '').trim(),
      }));

      return {
        records: parsedRecords,
        supabaseConnected: true,
        isSampleFallback: false,
        missingRequiredColumns: [],
      };
    } catch (err: any) {
      console.error('Error connecting to Supabase:', err);
      return {
        records: JSON.parse(JSON.stringify(RAW_STUDENT_SEED_DATA)),
        supabaseConnected: false,
        isSampleFallback: true,
        missingRequiredColumns: [],
        error: err?.message || 'Connection failed',
      };
    }
  }

  /**
   * Computes dynamic dataset statistics.
   */
  static getDatasetStats(
    records: StudentRecord[],
    supabaseConnected: boolean = false,
    isSampleFallback: boolean = false
  ): DatasetStats {
    const totalStudents = records.length;
    const totalFeatures = REQUIRED_COLUMNS.length;

    let missingValues = 0;
    const departmentCounts: Record<string, number> = {};
    const placementCounts: Record<string, number> = {};

    records.forEach((row) => {
      // Dept count
      if (row.dept) {
        departmentCounts[row.dept] = (departmentCounts[row.dept] || 0) + 1;
      }
      // Placement count
      if (row.placement_status) {
        placementCounts[row.placement_status] = (placementCounts[row.placement_status] || 0) + 1;
      }
      // Check missing
      REQUIRED_COLUMNS.forEach((col) => {
        const val = row[col];
        if (val === null || val === undefined || (typeof val === 'number' && isNaN(val)) || val === '') {
          missingValues++;
        }
      });
    });

    const duplicateResult = this.detectDuplicates(records);

    return {
      totalStudents,
      totalFeatures,
      missingValues,
      duplicateRows: duplicateResult.duplicateCount,
      columns: REQUIRED_COLUMNS.map(String),
      departmentCounts,
      placementCounts,
      isSampleFallback,
      supabaseConnected,
    };
  }

  /**
   * Creates a string fingerprint for duplicate comparison (ignoring DB id and timestamp).
   */
  private static getRecordFingerprint(record: StudentRecord): string {
    return [
      record.dept,
      record.year,
      record.attendance_percentage,
      record.study_hour,
      record.mid_term_score,
      record.final_score,
      record.projects_completed,
      record.backlogs,
      record.placement_status,
    ].join('__');
  }

  /**
   * Dynamically detects duplicate rows.
   */
  static detectDuplicates(records: StudentRecord[]): DuplicateDetectionResult {
    const seenMap = new Map<string, number>();
    const duplicates: DuplicateDetail[] = [];
    const uniqueRecords: StudentRecord[] = [];

    records.forEach((record, idx) => {
      const fingerprint = this.getRecordFingerprint(record);
      if (seenMap.has(fingerprint)) {
        const firstIdx = seenMap.get(fingerprint)!;
        duplicates.push({
          originalIndex: idx,
          record,
          duplicateOfIndex: firstIdx,
        });
      } else {
        seenMap.set(fingerprint, idx);
        uniqueRecords.push(record);
      }
    });

    return {
      hasDuplicates: duplicates.length > 0,
      duplicateCount: duplicates.length,
      originalCount: records.length,
      uniqueCount: uniqueRecords.length,
      duplicates,
      uniqueRecords,
    };
  }

  /**
   * Removes duplicate rows dynamically.
   */
  static removeDuplicates(records: StudentRecord[]): StudentRecord[] {
    return this.detectDuplicates(records).uniqueRecords;
  }

  /**
   * Dynamically detects missing values and calculates exact mean (for numbers) or mode (for categories).
   */
  static detectMissingValues(records: StudentRecord[]): MissingValueDetectionResult {
    const missingCells: MissingCellDetail[] = [];
    const imputations: Record<string, ColumnImputationDetail> = {};

    // Initialize imputation stats for each column
    REQUIRED_COLUMNS.forEach((col) => {
      const isNum = NUMERICAL_COLUMNS.includes(col);
      imputations[col] = {
        column: col,
        isNumeric: isNum,
        missingCount: 0,
        availableCount: 0,
        sum: 0,
      };
    });

    // Scan records
    records.forEach((row, rowIdx) => {
      REQUIRED_COLUMNS.forEach((col) => {
        const val = row[col];
        const isMissing =
          val === null ||
          val === undefined ||
          (typeof val === 'number' && isNaN(val)) ||
          val === '';

        if (isMissing) {
          missingCells.push({
            rowIndex: rowIdx,
            column: col,
            studentDept: row.dept || 'Unknown',
            studentYear: row.year || 'Unknown',
          });
          imputations[col].missingCount += 1;
        } else {
          imputations[col].availableCount = (imputations[col].availableCount || 0) + 1;
          if (imputations[col].isNumeric) {
            imputations[col].sum = (imputations[col].sum || 0) + Number(val);
          }
        }
      });
    });

    // Calculate mean for numerical & mode for categorical
    Object.keys(imputations).forEach((colKey) => {
      const detail = imputations[colKey];
      if (detail.missingCount > 0) {
        if (detail.isNumeric && detail.availableCount && detail.availableCount > 0) {
          const mean = (detail.sum || 0) / detail.availableCount;
          detail.meanValue = Number(mean.toFixed(1)); // Rounded to 1 decimal place
          detail.formulaSteps = [
            `Sum of available values = ${(detail.sum || 0).toFixed(1)}`,
            `Count of available values = ${detail.availableCount}`,
            `Mean = ${(detail.sum || 0).toFixed(1)} / ${detail.availableCount} = ${detail.meanValue}`,
          ];
        } else {
          // Calculate Mode for categorical
          const freqMap: Record<string, number> = {};
          records.forEach((r) => {
            const v = String((r as any)[colKey] || '').trim();
            if (v) {
              freqMap[v] = (freqMap[v] || 0) + 1;
            }
          });
          let maxCount = 0;
          let modeVal = 'Unknown';
          Object.entries(freqMap).forEach(([k, count]) => {
            if (count > maxCount) {
              maxCount = count;
              modeVal = k;
            }
          });
          detail.modeValue = modeVal;
          detail.formulaSteps = [
            `Most frequent value (Mode) = "${modeVal}" (appeared ${maxCount} times)`,
          ];
        }
      }
    });

    return {
      hasMissingValues: missingCells.length,
      totalMissingCells: missingCells.length,
      missingCells,
      imputations,
    };
  }

  /**
   * Imputes missing values with Column Mean for numerical and Mode for categorical.
   */
  static imputeMissingValues(records: StudentRecord[]): {
    cleanedRecords: CleanedStudentRecord[];
    imputations: Record<string, ColumnImputationDetail>;
  } {
    const missingDetection = this.detectMissingValues(records);
    const { imputations } = missingDetection;

    const cleanedRecords: CleanedStudentRecord[] = records.map((record) => {
      const copy: any = { ...record };

      NUMERICAL_COLUMNS.forEach((col) => {
        const val = copy[col];
        const isMissing =
          val === null ||
          val === undefined ||
          (typeof val === 'number' && isNaN(val)) ||
          val === '';

        if (isMissing) {
          copy[col] = imputations[col]?.meanValue ?? 0;
        } else {
          copy[col] = Number(val);
        }
      });

      CATEGORICAL_COLUMNS.forEach((col) => {
        const val = copy[col];
        const isMissing = val === null || val === undefined || val === '';
        if (isMissing) {
          copy[col] = imputations[col]?.modeValue ?? 'Unknown';
        } else {
          copy[col] = String(val);
        }
      });

      return copy as CleanedStudentRecord;
    });

    return {
      cleanedRecords,
      imputations,
    };
  }

  /**
   * Complete end-to-end cleaning pipeline.
   */
  static cleanDataset(rawRecords: StudentRecord[]): CleaningReport {
    // 1. Initial detection
    const beforeStats = this.getDatasetStats(rawRecords);
    const duplicates = this.detectDuplicates(rawRecords);
    const missingInfo = this.detectMissingValues(rawRecords);

    const traces: any[] = [];

    // 2. Remove duplicates
    const uniqueRecords = this.removeDuplicates(rawRecords);
    traces.push({
      step: 'DUPLICATE_REMOVAL',
      description: `Detected and removed ${duplicates.duplicateCount} duplicate rows. Working rows: ${rawRecords.length} → ${uniqueRecords.length}.`,
      beforeCount: rawRecords.length,
      afterCount: uniqueRecords.length,
      details: duplicates.duplicates,
    });

    // 3. Handle missing values
    const { cleanedRecords, imputations } = this.imputeMissingValues(uniqueRecords);
    traces.push({
      step: 'MEAN_IMPUTATION',
      description: `Replaced ${missingInfo.totalMissingCells} missing numerical cells with exact calculated column means.`,
      beforeCount: missingInfo.totalMissingCells,
      afterCount: 0,
      details: imputations,
    });

    // 4. Final verification
    const afterStats = this.getDatasetStats(cleanedRecords as any);

    return {
      before: {
        totalRows: beforeStats.totalStudents,
        duplicateRows: beforeStats.duplicateRows,
        missingValues: beforeStats.missingValues,
      },
      after: {
        totalRows: afterStats.totalStudents,
        duplicateRows: 0,
        missingValues: 0,
      },
      traces,
      cleanedRecords,
    };
  }
}
