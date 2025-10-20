import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const trends = await kv.get('indonesia_trends');
    if (!trends) {
      return NextResponse.json({ error: 'Trends data not found' }, { status: 404 });
    }
    return NextResponse.json(trends);
  } catch (error) {
    console.error('Error fetching trends from KV:', error);
    return NextResponse.json({ error: 'Failed to fetch trends data from KV' }, { status: 500 });
  }
}
