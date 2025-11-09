import type { Metadata } from 'next';
import { getTranslation, getRawTranslation } from '../../../lib/getTranslation';
import { Locale, i18n } from '@/i18n-config';
import TensorflowPageClient from './TensorflowPageClient';

// Generate params for each language
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Generate metadata for the page
export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  const t = getTranslation(params.lang);
  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${params.lang}/tensorflow`;
  return {
    title: t('tensorflow.page.title'),
    description: t('tensorflow.page.description'),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      url: canonicalUrl,
    }
  };
}

/* =========================
   TensorFlow Page (Server Component)
   ========================= */
export default function TensorFlowPage({ params: { lang } }: { params: { lang: Locale } }) {
  // Fetch all required translations on the server.
  const t = getRawTranslation(lang);
  const translations = {
    page: t('tensorflow.page'),
    how_to_use: t('tensorflow.how_to_use'),
    why: t('tensorflow.why'),
    privacy: t('tensorflow.privacy'),
  };

  // Pass the translations object to the client component.
  return <TensorflowPageClient translations={translations} />;
}
