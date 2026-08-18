import { NextResponse } from 'next/server';
import { LogisticRegressionEngine } from '@/lib/ml/logistic-regression';

export const dynamic = 'force-dynamic';

export async function GET() {
  const status = LogisticRegressionEngine.getStatus();
  return NextResponse.json({
    success: true,
    ...status,
  });
}
