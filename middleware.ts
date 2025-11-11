import { NextRequest, NextResponse } from 'next/server';
import parser from 'accept-language-parser';

const supportedLanguages = ['en', 'id'];
const defaultLanguage = 'id';

// Fungsi untuk mendapatkan bahasa yang disukai dari header
function getPreferredLanguage(request: NextRequest): string {
  const langHeader = request.headers.get('accept-language');
  if (!langHeader) {
    return defaultLanguage;
  }
  const languages = parser.parse(langHeader);
  for (const lang of languages) {
    if (supportedLanguages.includes(lang.code)) {
      return lang.code;
    }
  }
  return defaultLanguage;
}

const PUBLIC_FILE = /\.(.*)$/; // Regex untuk mendeteksi file statis

export function middleware(request: NextRequest) {
  // Lewati request untuk file statis
  if (PUBLIC_FILE.test(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Cek apakah path sudah memiliki awalan bahasa yang didukung
  const pathnameHasLocale = supportedLanguages.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next(); // Tidak perlu melakukan apa-apa jika sudah ada locale
  }

  // Jika tidak ada locale, deteksi bahasa yang disukai dan alihkan
  const preferredLanguage = getPreferredLanguage(request);
  const newPath = `/${preferredLanguage}${pathname}`;

  // Buat URL baru dengan locale yang benar dan pertahankan query params
  const newUrl = new URL(newPath, request.url);
  return NextResponse.redirect(newUrl);
}

// Konfigurasi matcher untuk menentukan path mana yang akan dijalankan middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     *
     * We will let the middleware function itself handle static files.
     */
    '/((?!api|_next/static|_next/image).*)',
  ],
};
