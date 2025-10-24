'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyPage() {
  const { t } = useLanguage();

  return (
    <section className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{t('privacy.title')}</h1>
      <div className="prose max-w-none mt-4">
        <p>{t('privacy.p1')}</p>
        <p>{t('privacy.p2')}</p>
      </div>
    </section>
  );
}