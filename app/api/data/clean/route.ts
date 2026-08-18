import { NextRequest, NextResponse } from 'next/server';
import { DatasetService } from '@/lib/data-processing/dataset-service';
import { StudentRecord } from '@/lib/types/dataset';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    let records: StudentRecord[] = [];
    const body = await request.json().catch(() => ({}));

    if (body && Array.isArray(body.records) && body.records.length > 0) {
      records = body.records;
    } else {
      const fetched = await DatasetService.fetchRawDataset();
      records = fetched.records;
    }

    // Run dynamic cleaning pipeline
    const cleaningReport = DatasetService.cleanDataset(records);

    return NextResponse.json({
      success: true,
      report: cleaningReport,
    });
  } catch (err: any) {
    console.error('API /api/data/clean error:', err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Data cleaning pipeline failed',
      },
      { status: 500 }
    );
  }
}
