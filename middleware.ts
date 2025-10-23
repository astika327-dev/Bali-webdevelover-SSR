import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supportedLangs, defaultLang } from './constants/langs';

const PUBLIC_FILE = /\\.(.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Paths to ignore
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/blog') ||
    pathname.startsWith('/static') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = supportedLangs.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect if there is no locale
  const locale = req.headers.get('accept-language')?.split(',')[0]?.split('-')[0] || defaultLang;
  const resolvedLocale = supportedLangs.includes(locale) ? locale : defaultLang;

  req.nextUrl.pathname = `/${resolvedLocale}${pathname}`;
  return NextResponse.redirect(req.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|blog|static).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
