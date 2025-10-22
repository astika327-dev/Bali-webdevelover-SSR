
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
    console.log(`[DIAGNOSTIK] Mengambil berita dari: ${CNN_TECH_RSS}`);
    const feed = await parser.parseURL(CNN_TECH_RSS);
    console.log('[DIAGNOSTIK] Berhasil mendapatkan berita dari RSS Feed.');
    
    // Ambil 5 berita teratas dan format datanya
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
    
    // Kembalikan array kosong jika terjadi galat agar tidak menghentikan build
    return []; 
  }
}
