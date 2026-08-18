import { NextRequest, NextResponse } from 'next/server';
import { DatasetService } from '@/lib/data-processing/dataset-service';
import { AnalysisService } from '@/lib/analytics/analysis-service';
import { CleanedStudentRecord } from '@/lib/types/dataset';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { records } = await DatasetService.fetchRawDataset();
    const { cleanedRecords } = DatasetService.cleanDataset(records);
    const analysis = AnalysisService.generateAnalysis(cleanedRecords);

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Failed to compute analysis',
      },
      { status: 500 }
    );
  }
}

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

    const analysis = AnalysisService.generateAnalysis(cleanedRecords);

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Failed to compute analysis from provided data',
      },
      { status: 500 }
    );
  }
}
