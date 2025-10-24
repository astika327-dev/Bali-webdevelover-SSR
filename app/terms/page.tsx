'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function TermsPage() {
  const { t } = useLanguage();

  const terms = [
    'terms.item1',
    'terms.item2',
    'terms.item3',
    'terms.item4',
    'terms.item5',
    'terms.item6',
    'terms.item7',
  ];

  return (
    <section className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{t('terms.title')}</h1>
      <div className="prose max-w-none mt-4">
        <ol>
          {terms.map(term => (
            <li key={term}>
              <strong>{t(`${term}.title`)}.</strong> {t(`${term}.description`)}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}