import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import googleTrends from 'google-trends-api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const trendsDataString = await googleTrends.dailyTrends({ geo: 'ID' });

    if (!trendsDataString.trim().startsWith('{')) {
      console.error('Received non-JSON response from Google Trends API');
      return NextResponse.json({ error: 'Failed to fetch valid data from Google Trends' }, { status: 502 });
    }

    const trendsData = JSON.parse(trendsDataString);
    const trendingSearches = trendsData.default.trendingSearchesDays[0].trendingSearches;

    const formattedTrends = trendingSearches.slice(0, 10).map((trend: any) => ({
      name: trend.title.query,
      traffic: trend.formattedTraffic,
    }));

    await kv.set('indonesia_trends', JSON.stringify(formattedTrends));

    return NextResponse.json({ message: 'Successfully updated trends data in KV store.' });
  } catch (error) {
    console.error('Error updating trends:', error);
    return NextResponse.json({ error: 'Failed to update trends data' }, { status: 500 });
  }
}
