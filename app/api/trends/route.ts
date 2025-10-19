import { NextResponse } from 'next/server';
// Menggunakan path alias dan nama fungsi yang benar
import { getDailyTrends, Trend } from 'app/lib/trends'; 

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Menggunakan nama fungsi yang benar: getDailyTrends
        const trends: Trend[] = await getDailyTrends();
        
        if (trends.length === 0) {
            return NextResponse.json({ message: 'Tidak ada data tren ditemukan saat ini.' }, { status: 404 });
        }

        return NextResponse.json(trends);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Gagal mengambil data tren dari server.' }, { status: 500 });
    }
}

