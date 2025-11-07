import Link from 'next/link';
import type { Route } from 'next';
import { ArrowRight } from 'lucide-react';
import { certificates } from '@/content/config';
import dynamic from 'next/dynamic';
import { getTranslation } from '@/lib/getTranslation';
import { Locale, i18n } from '@/i18n-config';

const AiChatWidget = dynamic(() => import('@/components/AiChatWidget'), {
  ssr: false,
});

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

/* =========================
   Home Page (Server Component)
   ========================= */
export default function HomePage({ params: { lang } }: { params: { lang: Locale } }) {
  const t = getTranslation(lang);

  return (
    <section className="container py-12 md:py-20 space-y-16">
      {/* Hero */}
      <div>
        <p className="text-sm uppercase tracking-wider text-muted-foreground">
          {t('hero.subtitle')}
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mt-3 text-foreground">
          {t('hero.title')}
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl">{t('site.blurb')}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/${lang}/contact` as Route}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground hover:bg-opacity-90 transition"
          >
            {t('home.start_project')} <ArrowRight size={18} />
          </Link>
          <Link
            href={`/${lang}/services` as Route}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-primary text-primary hover:bg-secondary transition"
          >
            {t('home.view_services')}
          </Link>
        </div>

        {/* Services preview */}
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border bg-card shadow-sm hover:shadow-md transition">
            <div className="font-semibold text-lg text-foreground">{t('services.custom_websites.title')}</div>
            <p className="text-muted-foreground mt-2">{t('services.custom_websites.desc')}</p>
          </div>
          <div className="p-6 rounded-2xl border bg-card shadow-sm hover:shadow-md transition">
            <div className="font-semibold text-lg text-foreground">{t('services.performance_seo.title')}</div>
            <p className="text-muted-foreground mt-2">{t('services.performance_seo.desc')}</p>
          </div>
          <div className="p-6 rounded-2xl border bg-card shadow-sm hover:shadow-md transition">
            <div className="font-semibold text-lg text-foreground">{t('services.care_maintenance.title')}</div>
            <p className="text-muted-foreground mt-2">{t('services.care_maintenance.desc')}</p>
          </div>
        </div>
      </div>

      {/* AI Chat Widget */}
      <AiChatWidget />

      {/* Certificates */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">{t('home.certificates.title')}</h2>
        <p className="text-muted-foreground max-w-2xl">
          {t('home.certificates.description')}
        </p>

        <div className="flex flex-wrap gap-3">
          {certificates.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full border border-primary text-primary bg-secondary/60 hover:bg-secondary/80 text-sm font-medium transition"
            >
              {c.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
