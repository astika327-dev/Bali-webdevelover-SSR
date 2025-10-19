import { NextResponse } from 'next/server';
// Perbaikan: Menggunakan nama fungsi dan tipe yang benar dari file lib/trends.ts
import { getGoogleTrends, TrendItem } from '@/app/lib/trends'; 

export const dynamic = 'force-dynamic'; // Selalu ambil data terbaru

export async function GET() {
  try {
    // Perbaikan: Memanggil fungsi getGoogleTrends()
    const trends: TrendItem[] = await getGoogleTrends();
    
    if (trends.length === 0) {
      return NextResponse.json({ message: 'Tidak ada data tren ditemukan saat ini.' }, { status: 404 });
    }

    return NextResponse.json(trends);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data tren dari server.' }, { status: 500 });
  }
}
