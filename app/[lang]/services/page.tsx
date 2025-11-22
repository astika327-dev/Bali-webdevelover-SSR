import { getTranslation, getRawTranslation } from '../../../lib/getTranslation';
import { Locale, i18n } from '../../../i18n-config';
import type { Metadata } from 'next';
import ServiceCard from '../../components/ServiceCard';
import ServicesHeader from '../../components/ServicesHeader';
import Workflow from '../../components/Workflow';
import FaqAccordion from '../../components/FaqAccordion';
import Cta from '../../components/Cta';

// Generate params for each language
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = getTranslation(lang);
  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/services`;
  const languages = {} as Record<Locale, string> & { 'x-default': string };
  i18n.locales.forEach(locale => {
    languages[locale] = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/services`;
  });
  languages['x-default'] = `${process.env.NEXT_PUBLIC_BASE_URL}/${i18n.defaultLocale}/services`;

  return {
    title: t('services.title'),
    description: t('services.subtitle'),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      url: canonicalUrl,
    }
  };
}

/* =========================
   Services Page
   ========================= */
export default async function ServicesPage(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const t = getTranslation(lang);
  const getRawT = getRawTranslation(lang);
  const servicePackages = getRawT('services.packages') || [];
  const workflowData = getRawT('services.workflow');
  const faqData = getRawT('services.faq');
  const ctaData = getRawT('cta');
  const buttonText = t('services.button_text');

  return (
    <section className="container py-12 md:py-20">
      <ServicesHeader title={t('services.title')} subtitle={t('services.subtitle')} />

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

      {workflowData && <Workflow data={workflowData} />}

      {faqData && faqData.items && <FaqAccordion data={faqData} />}

      {ctaData && <Cta lang={lang} data={ctaData} />}
    </section>
  );
}
