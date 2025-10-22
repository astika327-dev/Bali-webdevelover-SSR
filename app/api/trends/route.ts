import { NextResponse } from 'next/server';
import { getTrendingNews, NewsItem } from '@/app/lib/trends';

export const dynamic = 'force-dynamic'; // Selalu ambil data terbaru

export async function GET() {
  try {
    const news: NewsItem[] = await getTrendingNews();

    if (news.length === 0) {
      return NextResponse.json({ message: 'Tidak ada berita yang ditemukan saat ini.' }, { status: 404 });
    }

    return NextResponse.json(news);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data berita dari server.' }, { status: 500 });
  }
}
