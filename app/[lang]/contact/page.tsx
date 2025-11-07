import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
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
    title: t('contact.title'),
    description: t('contact.description'),
  };
}


/* =========================
   Contact Page
   ========================= */
export default function ContactPage({ params: { lang } }: { params: { lang: Locale } }) {
  const t = getTranslation(lang);

  return (
    <section className="container max-w-3xl py-12 md:py-20">
      <header className="space-y-3 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--brown)]">
          {t('contact.title')}
        </h1>
        <p className="text-[var(--brown)]/80 max-w-2xl mx-auto">
          {t('contact.description')}
        </p>
      </header>

      <div className="mt-12">
        <ContactForm
          namePlaceholder={t('contact.form.name_placeholder')}
          emailPlaceholder={t('contact.form.email_placeholder')}
          messagePlaceholder={t('contact.form.message_placeholder')}
          submitButtonText={t('contact.form.submit_button')}
          successMessage={t('contact.form.success_message')}
          errorMessage={t('contact.form.error_message')}
        />
      </div>
    </section>
  );
}
