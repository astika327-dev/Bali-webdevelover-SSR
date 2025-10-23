'use client';

import { useTranslations } from 'next-intl';

export default function TestPage() {
  const t = useTranslations('TestPage');

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
