'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n } from '../i18n-config';

export default function LanguageToggle() {
  const pathname = usePathname();

  const getLocalizedPath = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      {i18n.locales.map((locale) => {
        const isActive = pathname.startsWith(`/${locale}`);
        return (
          <Link
            key={locale}
            href={getLocalizedPath(locale)}
            className={`px-3 py-1 rounded-full transition ${
              isActive
                ? 'bg-neutral-200 dark:bg-neutral-700 font-semibold'
                : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
