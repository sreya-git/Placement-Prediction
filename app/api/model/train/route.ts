import { NextRequest, NextResponse } from 'next/server';
import { DatasetService } from '@/lib/data-processing/dataset-service';
import { LogisticRegressionEngine } from '@/lib/ml/logistic-regression';
import { CleanedStudentRecord } from '@/lib/types/dataset';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    let cleanedRecords: CleanedStudentRecord[] = [];

    if (body && Array.isArray(body.cleanedRecords) && body.cleanedRecords.length > 0) {
      cleanedRecords = body.cleanedRecords;
    } else {
      const { records } = await DatasetService.fetchRawDataset();
      const report = DatasetService.cleanDataset(records);
      cleanedRecords = report.cleanedRecords;
    }

    // Train the Logistic Regression Model
    const metrics = await LogisticRegressionEngine.train(cleanedRecords);

    return NextResponse.json({
      success: true,
      message: 'Model trained successfully on server',
      metrics,
    });
  } catch (err: any) {
    console.error('API /api/model/train error:', err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Model training failed on server',
      },
      { status: 500 }
    );
  }
}
