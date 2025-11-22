import type { Metadata } from 'next';
import { getTranslation, getRawTranslation } from '@/lib/getTranslation';
import { Locale, i18n } from '@/i18n-config';
import ContactClientPage from '@/app/components/ContactClientPage';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/contact`;
  const contactData = getRawTranslation(lang)('contact') as any;
  const languages = {} as Record<Locale, string> & { 'x-default': string };
  i18n.locales.forEach(locale => {
    languages[locale] = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/contact`;
  });
  languages['x-default'] = `${process.env.NEXT_PUBLIC_BASE_URL}/${i18n.defaultLocale}/contact`;

  return {
    title: contactData.meta.title,
    description: contactData.meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      url: canonicalUrl,
    }
  };
}

export default async function ContactPage(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
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
