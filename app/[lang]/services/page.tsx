import { getTranslation, getRawTranslation } from '../../../lib/getTranslation';
import { Locale, i18n } from '../../../i18n-config';
import type { Metadata } from 'next';
import ServiceCard from '../../components/ServiceCard';

// Generate params for each language
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Generate metadata for the page
export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  const t = getTranslation(params.lang);
  return {
    title: t('services.title'),
    description: t('services.subtitle'),
  };
}

/* =========================
   Services Page
   ========================= */
export default function ServicesPage({ params: { lang } }: { params: { lang: Locale } }) {
  const t = getTranslation(lang);
  const getRawT = getRawTranslation(lang);
  const servicePackages = getRawT('services.packages') || [];
  const buttonText = t('services.button_text');

  return (
    <section className="container py-12 md:py-20">
      <header className="space-y-3 text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--brown)] dark:text-neutral-100">
          {t('services.title')}
        </h1>
        <p className="text-lg text-[var(--brown)]/80 dark:text-neutral-400">
          {t('services.subtitle')}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(servicePackages) &&
          servicePackages.map((pkg, index) => (
            <ServiceCard
              key={pkg.id}
              pkg={pkg}
              buttonText={buttonText}
              lang={lang}
              index={index}
            />
          ))}
      </div>
    </section>
  );
}
