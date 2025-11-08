import { getTranslation } from '../../../lib/getTranslation';
import { Locale, i18n } from '../../../i18n-config';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';

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
  const faqTitle = t('services.faq.title') as string;
  const faqItems = t('services.faq.items') as unknown as string[];

  return (
    <section className="container py-12 md:py-20">
      {/* Service Card */}
      <div className="max-w-md mx-auto border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl p-8 shadow-lg bg-white/50 dark:bg-neutral-900/50">
        <div className="flex items-center gap-4">
          <Check className="w-6 h-6 text-green-500" />
          <h2 className="text-xl font-semibold text-[var(--brown)] dark:text-neutral-200">
            {t('services.card.title')}
          </h2>
        </div>
        <p className="text-[var(--brown)]/80 dark:text-neutral-400 mt-2 ml-10">
          {t('services.card.subtitle')}
        </p>
        <Link href={`/${lang}/contact`}>
          <a className="mt-6 block w-full text-center bg-[var(--cream)] hover:bg-[var(--tan)] text-[var(--brown)] font-semibold py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 transition-colors duration-300">
            {t('services.button_text')}
          </a>
        </Link>
      </div>

      {/* FAQ Section */}
      <div className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-[var(--brown)] dark:text-neutral-200">
          {faqTitle}
        </h2>
        <ul className="mt-8 space-y-4 text-left">
          {faqItems.map((item: string, index: number) => (
            <li key={index} className="text-[var(--brown)]/90 dark:text-neutral-300 leading-relaxed">
              <span className="font-semibold">•</span> {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
