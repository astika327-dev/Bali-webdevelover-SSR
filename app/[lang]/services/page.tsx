import { getTranslation } from '../../../lib/getTranslation';
import { Locale, i18n } from '../../../i18n-config';
import { services } from '../../../content/config';
import type { Service } from '../../../content/config';
import {
  Rocket,
  Building2,
  CalendarCheck,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  type LucideProps,
} from 'lucide-react';
import type { Metadata } from 'next';

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

// Icon mapping
const iconMap: { [key: string]: React.ComponentType<LucideProps> } = {
  Rocket,
  Building2,
  CalendarCheck,
  ShoppingCart,
  Sparkles,
  TrendingUp,
};

/* =========================
   Services Page
   ========================= */
export default function ServicesPage({ params: { lang } }: { params: { lang: Locale } }) {
  const t = getTranslation(lang);

  return (
    <section className="container py-12 md:py-20">
      <header className="space-y-3 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--brown)]">
          {t('services.title')}
        </h1>
        <p className="text-[var(--brown)]/80">{t('services.subtitle')}</p>
      </header>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service: Service) => {
          const IconComponent = iconMap[service.icon];

          return (
            <div
              key={service.id}
              className="border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl p-6 flex flex-col items-start shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white/50 dark:bg-neutral-900/50"
            >
              <div className="p-3 rounded-full bg-[var(--tan)]/50 dark:bg-amber-900/50 border border-neutral-200/50 dark:border-neutral-700/50 mb-4">
                {IconComponent && <IconComponent className="w-7 h-7 text-amber-800 dark:text-amber-300" />}
              </div>

              <h3 className="text-xl font-semibold text-[var(--brown)] dark:text-neutral-200">
                {t(`services.${service.id}.title`)}
              </h3>
              <p className="text-[var(--brown)]/80 dark:text-neutral-400 mt-2 text-sm leading-relaxed flex-grow">
                {t(`services.${service.id}.description`)}
              </p>
              <p className="mt-4 text-lg font-semibold text-amber-900 dark:text-amber-400 bg-amber-100/50 dark:bg-amber-900/30 px-4 py-1.5 rounded-full">
                {service.price}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
