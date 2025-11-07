import type { Metadata } from 'next';
import TensorflowDetector from '@/components/TensorflowDetector';
import { getTranslation } from '@/lib/getTranslation';
import { Locale, i18n } from '@/i18n-config';

// Generate params for each language
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Generate metadata for the page
export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  const t = getTranslation(params.lang);
  return {
    title: t('tensorflow.title'),
    description: t('tensorflow.description'),
  };
}


/* =========================
   TensorFlow Page
   ========================= */
export default function TensorFlowPage({ params: { lang } }: { params: { lang: Locale } }) {
  const t = getTranslation(lang);

  return (
    <section className="container max-w-4xl py-12 md:py-20">
      <header className="space-y-3 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--brown)]">
          {t('tensorflow.title')}
        </h1>
        <p className="text-[var(--brown)]/80 max-w-2xl mx-auto">
          {t('tensorflow.description')}
        </p>
      </header>

      <div className="mt-12">
        <TensorflowDetector
          loadModelText={t('tensorflow.load_model_text')}
          modelLoadedText={t('tensorflow.model_loaded_text')}
          selectImageText={t('tensorflow.select_image_text')}
          unsupportedFormatText={t('tensorflow.unsupported_format_text')}
        />
      </div>
    </section>
  );
}
