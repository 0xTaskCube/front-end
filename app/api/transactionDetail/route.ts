import { getTransactionDetail } from '@/lib/utils/okxApiHelper';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const accountId = searchParams.get('accountId');
  const orderId = searchParams.get('orderId');

  if (!accountId || !orderId) {
    return NextResponse.json({ error: 'Missing accountId or orderId' }, { status: 400 });
  }

  try {
    const result = await getTransactionDetail(accountId, orderId);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching transaction details:', errorMessage);
    return NextResponse.json({ error: 'Failed to fetch transaction details' }, { status: 500 });
  }
}
