import { getTranslation } from '@/lib/getTranslation';
import { Locale, i18n } from '@/i18n-config';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Metadata {
    const t = getTranslation(lang);
    const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/terms`;
    const languages = {} as Record<Locale, string> & { 'x-default': string };
    i18n.locales.forEach(locale => {
        languages[locale] = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/terms`;
    });
    languages['x-default'] = `${process.env.NEXT_PUBLIC_BASE_URL}/${i18n.defaultLocale}/terms`;

    return {
        title: t('terms.title'),
        alternates: {
            canonical: canonicalUrl,
            languages,
        },
    };
}

export default function TermsPage({ params: { lang } }: { params: { lang: Locale } }) {
  const t = getTranslation(lang);

  const terms = [
    'terms.item1',
    'terms.item2',
    'terms.item3',
    'terms.item4',
    'terms.item5',
    'terms.item6',
    'terms.item7',
  ];

  return (
    <section className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{t('terms.title')}</h1>
      <div className="prose max-w-none mt-4">
        <ol>
          {terms.map(term => (
            <li key={term}>
              <strong>{t(`${term}.title`)}.</strong> {t(`${term}.description`)}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
