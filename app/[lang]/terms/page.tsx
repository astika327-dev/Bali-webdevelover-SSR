import { getRawTranslation } from '@/lib/getTranslation';
import { Locale, i18n } from '@/i18n-config';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Metadata {
    const t = getRawTranslation(lang);
    const title = t('terms.title') as string;
    const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/terms`;
    const languages = {} as Record<Locale, string> & { 'x-default': string };
    i18n.locales.forEach(locale => {
        languages[locale] = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/terms`;
    });
    languages['x-default'] = `${process.env.NEXT_PUBLIC_BASE_URL}/${i18n.defaultLocale}/terms`;

    return {
        title,
        alternates: {
            canonical: canonicalUrl,
            languages,
        },
    };
}

type TermsSection = {
  title: string;
  content: string | string[];
};

export default function TermsPage({ params: { lang } }: { params: { lang: Locale } }) {
  const t = getRawTranslation(lang);
  const terms = t('terms') as { title: string; last_updated: string; sections: TermsSection[] };

  return (
    <section className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{terms.title}</h1>
      <p className="text-muted-foreground mt-2">{terms.last_updated}</p>
      <div className="prose max-w-none mt-6 dark:prose-invert">
        {terms.sections.map((section, index) => (
          <div key={index} className="mt-4">
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">{section.title}</h2>
            {Array.isArray(section.content) ? (
              <ol className="list-decimal pl-6">
                {section.content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            ) : (
              <p>{section.content}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
