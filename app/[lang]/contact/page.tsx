import type { Metadata } from 'next';
import { getTranslation, getRawTranslation } from '@/lib/getTranslation';
import { Locale } from '@/i18n-config';
import ContactClientPage from '@/app/components/ContactClientPage';

export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${params.lang}/contact`;
  const contactData = getRawTranslation(params.lang)('contact') as any;
  return {
    title: contactData.meta.title,
    description: contactData.meta.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      url: canonicalUrl,
    }
  };
}

export default function ContactPage({ params: { lang } }: { params: { lang: Locale } }) {
  const t = getTranslation(lang);
  const contactData = getRawTranslation(lang)('contact') as any;

  // Pre-fetch form translations on the server
  const formTranslations = {
    namePlaceholder: t('contact.form.name_placeholder'),
    emailPlaceholder: t('contact.form.email_placeholder'),
    messagePlaceholder: t('contact.form.message_placeholder'),
    submitButtonText: t('contact.form.submit_button'),
    successMessage: t('contact.form.success_message'),
    errorMessage: t('contact.form.error_message'),
  };

  return <ContactClientPage lang={lang} contactData={contactData} formTranslations={formTranslations} />;
}
