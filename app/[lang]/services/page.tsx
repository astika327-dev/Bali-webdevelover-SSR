import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { services } from '@/content/config';
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
    title: t('services.title'),
    description: t('services.description'),
  };
}


/* =========================
   Services Page
   ========================= */
export default function ServicesPage({ params: { lang } }: { params: { lang: Locale } }) {
  const t = getTranslation(lang);

  return (
    <section className="container py-12 md:py-20">
      <header className="space-y-3 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--brown)]">
          {t('services.title')}
        </h1>
        <p className="text-[var(--brown)]/80 max-w-2xl mx-auto">
          {t('services.description')}
        </p>
      </header>

      <div className="mt-12 space-y-12">
        {services.map((service) => (
          <div key={service.id} className="grid md:grid-cols-2 gap-8 items-center">
            {/* Service Description */}
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-[var(--brown)]">
                {t(`services.${service.id}.title`)}
              </h2>
              <p className="text-[var(--brown)]/80">
                {t(`services.${service.id}.desc`)}
              </p>
              <ul className="space-y-2">
                {service.features.map((featureKey) => (
                  <li key={featureKey} className="flex items-start gap-3">
                    <Check size={18} className="text-[var(--blue)] mt-1 shrink-0" />
                    <span className="text-[var(--brown)]/90">
                      {t(`services.features.${featureKey}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Tiers */}
            <div className="grid sm:grid-cols-2 gap-4">
              {service.tiers.map((tier) => (
                <div key={tier.id} className="p-6 rounded-2xl border border-[var(--tan)] bg-white/50 shadow-sm">
                  <h3 className="text-lg font-semibold text-[var(--brown)]">
                    {t(`services.tiers.${tier.id}.name`)}
                  </h3>
                  <p className="text-sm text-[var(--brown)]/70 mt-1">
                    {t(`services.tiers.${tier.id}.desc`)}
                  </p>
                  <div className="text-3xl font-bold text-[var(--brown)] mt-4">
                    {tier.price}
                    {tier.priceSuffix && (
                      <span className="text-base font-normal text-[var(--brown)]/70">
                        {t(tier.priceSuffix)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
