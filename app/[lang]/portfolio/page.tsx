import type { Metadata } from 'next';
import { getTranslation } from '../../../lib/getTranslation';
import { Locale, i18n } from '../../../i18n-config';
import PortfolioList from '../../../components/PortfolioList';

// Generate params for each language
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Generate metadata for the page
export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  const t = getTranslation(params.lang);
  return {
    title: t('portfolio.title'),
    description: t('portfolio.description'),
  };
}


/* =========================
   Portfolio Page
   ========================= */
export default function PortfolioPage({ params: { lang } }: { params: { lang: Locale } }) {
  const t = getTranslation(lang);

  return (
    <section className="container py-12 md:py-20">
      <header className="space-y-3 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--brown)]">
          {t('portfolio.title')}
        </h1>
        <p className="text-[var(--brown)]/80 max-w-2xl mx-auto">
          {t('portfolio.description')}
        </p>
      </header>

      <div className="mt-12">
        <PortfolioList
          lang={lang}
          viewCaseStudyText={t('portfolio.view_case_study')}
          comingSoonText={t('portfolio.coming_soon')}
        />
      </div>
    </section>
  );
}
