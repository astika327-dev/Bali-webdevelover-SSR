'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <section className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{t('about.title')}</h1>

      <p className="text-neutral-700 dark:text-neutral-300 mt-4 max-w-2xl">
        {t('about.p1')}
      </p>

      <p className="text-neutral-700 dark:text-neutral-300 mt-4 max-w-2xl">
        {t('about.p2')}
      </p>

      <p className="text-neutral-700 dark:text-neutral-300 mt-4 max-w-2xl">
        {t('about.p3')}
      </p>

      <div className="mt-12 md:mt-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {t('about.competencies.title')}
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 mt-4 max-w-2xl">
          {t('about.competencies.p1')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-6 max-w-3xl">
          <div>
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">{t('about.competencies.languages.title')}</h3>
            <p className="text-neutral-700 dark:text-neutral-300 mt-1">
              {t('about.competencies.languages.p1')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">{t('about.competencies.styling.title')}</h3>
            <p className="text-neutral-700 dark:text-neutral-300 mt-1">
              {t('about.competencies.styling.p1')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">{t('about.competencies.backend.title')}</h3>
            <p className="text-neutral-700 dark:text-neutral-300 mt-1">
              {t('about.competencies.backend.p1')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">{t('about.competencies.design.title')}</h3>
            <p className="text-neutral-700 dark:text-neutral-300 mt-1">
              {t('about.competencies.design.p1')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
