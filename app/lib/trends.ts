
import Parser from 'rss-parser';

const CNN_TECH_RSS = 'https://www.cnnindonesia.com/teknologi/rss';

export interface NewsItem {
  title: string;
  link: string;
  isoDate?: string;
}

export async function getTrendingNews(): Promise<NewsItem[]> {
  const parser = new Parser();

  try {
    console.log(`[DIAGNOSTIK] Mencoba mengambil data dari: ${TRENDS_URL}`);
    const feed = await parser.parseURL(TRENDS_URL);
    console.log('[DIAGNOSTIK] Berhasil mendapatkan data!');

    return feed.items.slice(0, 5).map(item => ({
      title: item.title || 'Judul tidak tersedia',
      link: item.link || '#',
      isoDate: item.isoDate,
    }));

  } catch (error) {
    console.error("======================================================");
    console.error("!!! GAGAL MENGAMBIL BERITA DARI RSS FEED !!!");
    console.error("======================================================");
    console.error("URL:", CNN_TECH_RSS);
    console.error("Pesan Error Lengkap:");
    console.error(error);
    console.error("======================================================");

    return [];
  }
}
