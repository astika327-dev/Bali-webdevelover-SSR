import Link from 'next/link';
import type { Route } from 'next';
import { ArrowRight, Globe, Zap, HeartHandshake } from 'lucide-react';
import type { Metadata } from 'next';
import { certificates } from '@/content/config';
import { getTranslation, getRawTranslation } from '@/lib/getTranslation';
import { Locale, i18n } from '@/i18n-config';
import PortfolioHome from '../components/PortfolioHome';

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = getTranslation(lang);
  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}`;
  const languages = {} as Record<Locale, string> & { 'x-default': string };
  i18n.locales.forEach(locale => {
    languages[locale] = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}`;
  });
  languages['x-default'] = `${process.env.NEXT_PUBLIC_BASE_URL}/${i18n.defaultLocale}`;

  return {
    title: t('site.title'),
    description: t('site.blurb'),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: t('site.title'),
      description: t('site.blurb'),
      url: canonicalUrl,
    },
    twitter: {
      title: t('site.title'),
      description: t('site.blurb'),
    },
  };
}

/* =========================
   Home Page (Server Component)
   ========================= */
export default async function HomePage(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const t = getTranslation(lang);
  const homeDictionary = getRawTranslation(lang)('home') as { [key: string]: any };

  return (
    <section className="container py-12 md:py-20 space-y-16">
      {/* Hero */}
      <div>
        <p className="text-sm uppercase tracking-wider text-[var(--brown)]/70">
          {t('hero.subtitle')}
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mt-3 text-[var(--brown)]">
          {t('hero.title')}
        </h1>
        <p className="text-[var(--brown)]/80 mt-4 max-w-2xl">{t('site.blurb')}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/${lang}/contact` as Route}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--brown)] text-[var(--cream)] hover:bg-opacity-90 transition"
          >
            {t('home.start_project')} <ArrowRight size={18} />
          </Link>
          <Link
            href={`/${lang}/services` as Route}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--brown)] text-[var(--brown)] hover:bg-[var(--tan)]/40 transition"
          >
            {t('home.view_services')}
          </Link>
        </div>

        {/* Services preview */}
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-[var(--tan)] bg-white/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <Globe size={32} className="text-amber-800/80 mb-3" />
            <h3 className="font-semibold text-lg text-[var(--brown)]">{t('services.custom_websites.title')}</h3>
            <p className="text-[var(--brown)]/80 mt-2 text-sm">{t('services.custom_websites.desc')}</p>
          </div>
          <div className="p-6 rounded-2xl border-[var(--tan)] bg-white/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <Zap size={32} className="text-amber-800/80 mb-3" />
            <h3 className="font-semibold text-lg text-[var(--brown)]">{t('services.performance_seo.title')}</h3>
            <p className="text-[var(--brown)]/80 mt-2 text-sm">{t('services.performance_seo.desc')}</p>
          </div>
          <div className="p-6 rounded-2xl border-[var(--tan)] bg-white/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <HeartHandshake size={32} className="text-amber-800/80 mb-3" />
            <h3 className="font-semibold text-lg text-[var(--brown)]">{t('services.care_maintenance.title')}</h3>
            <p className="text-[var(--brown)]/80 mt-2 text-sm">{t('services.care_maintenance.desc')}</p>
          </div>
        </div>
      </div>

      {/* Featured Portfolio */}
      <PortfolioHome lang={lang} dictionary={homeDictionary.portfolio} />

      {/* Certificates */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--brown)]">{t('home.certificates.title')}</h2>
        <p className="text-[var(--brown)]/80 max-w-2xl">
          {t('home.certificates.description')}
        </p>

        <div className="flex flex-wrap gap-3">
          {certificates.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full border border-[var(--brown)] text-[var(--brown)] bg-[var(--tan)]/30 hover:bg-[var(--tan)]/50 text-sm font-medium transition"
            >
              {c.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
