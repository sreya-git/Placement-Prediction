import { NextResponse } from 'next/server';
import { DatasetService } from '@/lib/data-processing/dataset-service';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { records, supabaseConnected, isSampleFallback } =
      await DatasetService.fetchRawDataset();

    const stats = DatasetService.getDatasetStats(records, supabaseConnected, isSampleFallback);

    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Failed to compute dataset stats',
      },
      { status: 500 }
    );
  }
}
