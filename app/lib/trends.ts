import Parser from 'rss-parser';

// URL RSS feed resmi dari Google Trends Indonesia
const TRENDS_URL = 'https://trends.google.co.id/trends/trendingsearches/daily/rss?geo=ID';

// Definisikan tipe data untuk hasil tren agar sesuai dengan komponen Anda
export interface TrendItem {
  title: string;
  link: string;
  source: string;
}

// Ganti nama fungsi menjadi lebih deskriptif
export async function getGoogleTrends(): Promise<TrendItem[]> {
  // Gunakan rss-parser yang sudah kita install
  const parser = new Parser();

  try {
    // Ambil dan parse data dari URL RSS
    const feed = await parser.parseURL(TRENDS_URL);
    
    // Ambil 5 item teratas dan format datanya
    return feed.items.slice(0, 5).map(item => ({
      title: item.title || 'Judul tidak tersedia',
      link: item.link || '#',
      // 'ht:news_item_source' adalah properti spesifik dari RSS feed Google
      source: (item as any)['ht:news_item_source'] || 'Google Trends'
    }));
    
  } catch (error) {
    console.error("Gagal mengambil Google Trends via RSS:", error);
    // Kembalikan array kosong jika terjadi error
    return [];
  }
}
