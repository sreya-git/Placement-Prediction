import { NextResponse } from 'next/server';
import { DatasetService } from '@/lib/data-processing/dataset-service';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { records, supabaseConnected, isSampleFallback, missingRequiredColumns, error } =
      await DatasetService.fetchRawDataset();

    const stats = DatasetService.getDatasetStats(records, supabaseConnected, isSampleFallback);

    return NextResponse.json({
      success: true,
      records,
      stats,
      meta: {
        supabaseConnected,
        isSampleFallback,
        missingRequiredColumns,
        error: error || null,
      },
    });
  } catch (err: any) {
    console.error('API /api/dataset error:', err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Failed to fetch student dataset',
      },
      { status: 500 }
    );
  }
}
