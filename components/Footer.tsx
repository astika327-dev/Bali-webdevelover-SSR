import Link from 'next/link';
import { site } from '../content/config';
import { Locale } from '../i18n-config';
import { getTranslation } from '@/lib/getTranslation';

export default function Footer({ lang }: { lang: Locale }) {
  const t = getTranslation(lang);

  return (
    <footer className="border-t mt-16 bg-background text-foreground">
      <div className="container py-10 flex flex-col items-center text-center text-sm gap-4">
        <div>
          <div className="font-semibold text-lg">{site.company}</div>
          <p className="text-muted-foreground mt-1">{site.location}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <Link href={`/${lang}/services`}>{t('footer.links.services')}</Link>
          <Link href={`/${lang}/portfolio`}>{t('footer.links.portfolio')}</Link>
          <Link href={`/${lang}/about`}>{t('footer.links.about')}</Link>
          <Link href={`/${lang}/blog`}>{t('footer.links.blog')}</Link>
          <Link href={`/${lang}/contact`}>{t('footer.links.contact')}</Link>
          <Link href={`/${lang}/privacy`}>{t('footer.links.privacy')}</Link>
          <Link href={`/${lang}/terms`}>{t('footer.links.terms')}</Link>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container py-6 text-xs text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
          © {new Date().getFullYear()} {site.company}. {t('footer.description')}
        </div>
      </div>
    </footer>
  );
}
