import { NextResponse } from 'next/server';
import googleTrends from 'google-trends-api';

export async function GET() {
  try {
    const trends = await googleTrends.dailyTrends({ geo: 'ID' });

    if (trends.trim().startsWith('<')) {
      console.error('Received HTML instead of JSON from Google Trends');
      return NextResponse.json({ error: 'Failed to fetch valid JSON from Google Trends' }, { status: 502 });
    }

    const parsedTrends = JSON.parse(trends);
    return NextResponse.json(parsedTrends);
  } catch (error) {
    console.error('Error in /api/trends:', error);
    return NextResponse.json({ error: 'Failed to fetch Google Trends data' }, { status: 500 });
  }
}
