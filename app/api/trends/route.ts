import { NextResponse } from 'next/server';
import googleTrends from 'google-trends-api';

export async function GET() {
  console.log('API route /api/trends hit');
  try {
    console.log('Fetching daily trends for Indonesia...');
    const trends = await googleTrends.dailyTrends({ geo: 'ID' });
    console.log('Successfully fetched trends.');
    
    // Log the raw response to understand its structure
    // console.log('Raw trends data:', trends);

    const parsedTrends = JSON.parse(trends);
    console.log('Successfully parsed trends data.');

    return NextResponse.json(parsedTrends);
  } catch (error) {
    console.error('Error in /api/trends:', error);
    return NextResponse.json({ error: 'Failed to fetch Google Trends data' }, { status: 500 });
  }
}
