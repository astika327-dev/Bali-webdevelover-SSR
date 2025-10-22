import Parser from 'rss-parser';

// PERBAIKAN: Menggunakan domain .com yang baru
const TRENDS_URL = 'https://trends.google.com/trends/trendingsearches/daily/rss?geo=ID';

export interface TrendItem {
  title: string;
  link: string;
  source: string;
}

export async function getGoogleTrends(): Promise<TrendItem[]> {
  const parser = new Parser();

  try {
    console.log(`[DIAGNOSTIK] Mencoba mengambil data dari: ${TRENDS_URL}`);
    const feed = await parser.parseURL(TRENDS_URL);
    console.log('[DIAGNOSTIK] Berhasil mendapatkan data!');

    return feed.items.slice(0, 5).map(item => ({
      title: item.title || 'Judul tidak tersedia',
      link: item.link || '#',
      source: (item as any)['ht:news_item_source'] || 'Google Trends'
    }));

  } catch (error) {
    console.error("======================================================");
    console.error("!!! GAGAL MENGAMBIL DATA GOOGLE TRENDS !!!");
    console.error("======================================================");
    console.error("Pesan Error Lengkap:");
    console.error(error);
    console.error("======================================================");

    return [];
  }
}
