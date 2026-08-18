import { NextRequest, NextResponse } from 'next/server';
import { LogisticRegressionEngine } from '@/lib/ml/logistic-regression';
import { DatasetService } from '@/lib/data-processing/dataset-service';
import { PredictionInput } from '@/lib/types/dataset';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing prediction input payload.',
        },
        { status: 400 }
      );
    }

    // Input validation
    const {
      dept,
      year,
      attendance_percentage,
      study_hour,
      mid_term_score,
      final_score,
      projects_completed,
      backlogs,
    } = body;

    if (!dept || !year) {
      return NextResponse.json(
        {
          success: false,
          error: 'Department and Year are required fields.',
        },
        { status: 400 }
      );
    }

    const input: PredictionInput = {
      dept: String(dept).trim(),
      year: String(year).trim(),
      attendance_percentage: Number(attendance_percentage ?? 75),
      study_hour: Number(study_hour ?? 4),
      mid_term_score: Number(mid_term_score ?? 60),
      final_score: Number(final_score ?? 65),
      projects_completed: Number(projects_completed ?? 2),
      backlogs: Number(backlogs ?? 0),
    };

    // Check if model is trained. If not, auto-train on cleaned dataset
    let activeModel = LogisticRegressionEngine.getActiveModel();
    if (!activeModel) {
      const { records } = await DatasetService.fetchRawDataset();
      const report = DatasetService.cleanDataset(records);
      await LogisticRegressionEngine.train(report.cleanedRecords);
      activeModel = LogisticRegressionEngine.getActiveModel();
    }

    if (!activeModel) {
      return NextResponse.json(
        {
          success: false,
          error: 'Model is not trained yet. Please visit the "Train ML" step first.',
        },
        { status: 400 }
      );
    }

    // Run prediction
    const predictionResult = LogisticRegressionEngine.predict(input);

    return NextResponse.json({
      success: true,
      result: predictionResult,
    });
  } catch (err: any) {
    console.error('API /api/model/predict error:', err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Prediction failed on server',
      },
      { status: 500 }
    );
  }
}
