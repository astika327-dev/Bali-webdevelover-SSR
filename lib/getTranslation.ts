import 'server-only';
import fs from 'fs';
import path from 'path';

const publicDirectory = path.join(process.cwd(), 'public');

/**
 * Memuat dan mem-parsing file JSON terjemahan dari direktori public/locales.
 * Fungsi ini ditandai sebagai 'server-only' untuk mencegah penggunaannya di komponen klien.
 * @param {string} lang - Kode bahasa (misalnya, 'en', 'id').
 * @returns {Record<string, any>} Objek terjemahan.
 */
export function getTranslation(lang: string): Record<string, any> {
  try {
    const filePath = path.join(publicDirectory, 'locales', `${lang}.json`);

    if (!fs.existsSync(filePath)) {
      console.warn(`File terjemahan tidak ditemukan untuk bahasa: ${lang}. Kembali ke bahasa Inggris.`);
      const fallbackPath = path.join(publicDirectory, 'locales', 'en.json');
      const fileContents = fs.readFileSync(fallbackPath, 'utf8');
      return JSON.parse(fileContents);
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Gagal memuat file terjemahan:', error);
    try {
      const fallbackPath = path.join(publicDirectory, 'locales', 'en.json');
      const fileContents = fs.readFileSync(fallbackPath, 'utf8');
      return JSON.parse(fileContents);
    } catch (fallbackError) {
      console.error('Gagal memuat file terjemahan fallback (en.json):', fallbackError);
      return {};
    }
  }
}
