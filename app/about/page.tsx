import { getTranslation } from '@/lib/getTranslation';

export default function AboutPage() {
  const t = getTranslation('id');

  const getText = (key: string): string => {
    return t[key] || key;
  };

  return (
    <section className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{getText('about.title')}</h1>

      <p className="text-neutral-700 dark:text-neutral-300 mt-4 max-w-2xl">
        {getText('about.p1')}
      </p>

      <p className="text-neutral-700 dark:text-neutral-300 mt-4 max-w-2xl">
        {getText('about.p2')}
      </p>

      <p className="text-neutral-700 dark:text-neutral-300 mt-4 max-w-2xl">
        {getText('about.p3')}
      </p>

      <div className="mt-12 md:mt-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {getText('about.competencies.title')}
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 mt-4 max-w-2xl">
          {getText('about.competencies.p1')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-6 max-w-3xl">
          <div>
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">{getText('about.competencies.languages.title')}</h3>
            <p className="text-neutral-700 dark:text-neutral-300 mt-1">
              {getText('about.competencies.languages.p1')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">{getText('about.competencies.styling.title')}</h3>
            <p className="text-neutral-700 dark:text-neutral-300 mt-1">
              {getText('about.competencies.styling.p1')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">{getText('about.competencies.backend.title')}</h3>
            <p className="text-neutral-700 dark:text-neutral-300 mt-1">
              {getText('about.competencies.backend.p1')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">{getText('about.competencies.design.title')}</h3>
            <p className="text-neutral-700 dark:text-neutral-300 mt-1">
              {getText('about.competencies.design.p1')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
