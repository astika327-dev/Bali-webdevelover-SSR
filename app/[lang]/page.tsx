import Link from 'next/link';
import Image from 'next/image';
import type { Route } from 'next';
import { ArrowRight, MoveRight, Globe, Zap, HeartHandshake } from 'lucide-react';
import type { Metadata } from 'next';
import { certificates, portfolio } from '@/content/config';
import { getTranslation } from '@/lib/getTranslation';
import { Locale, i18n } from '@/i18n-config';

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const t = getTranslation(params.lang);
  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${params.lang}`;

  return {
    title: t('site.title'),
    description: t('site.blurb'),
    alternates: {
      canonical: canonicalUrl,
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
export default function HomePage({ params: { lang } }: { params: { lang: Locale } }) {
  const t = getTranslation(lang);

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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--brown)] tracking-tight">
              {t('home.portfolio.title')}
            </h2>
            <p className="text-[var(--brown)]/80 mt-1 max-w-2xl">
              {t('home.portfolio.description')}
            </p>
          </div>
          <Link
            href={`/${lang}/portfolio` as Route}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--brown)] text-[var(--brown)] hover:bg-[var(--tan)]/40 transition"
          >
            {t('home.portfolio.view_all')} <MoveRight size={18} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {portfolio.slice(0, 3).map((p) => (
            <a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-[4/3] rounded-2xl border border-[var(--tan)] bg-white/80 overflow-hidden shadow-sm hover:shadow-lg transition">
                <Image
                  src={p.images[0]}
                  alt={p.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="mt-3">
                <h3 className="font-semibold text-lg text-[var(--brown)] group-hover:text-opacity-80 transition">
                  {p.title}
                </h3>
                <p className="text-[var(--brown)]/80 mt-1 text-sm">{p.description}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center sm:hidden">
          <Link
            href={`/${lang}/portfolio` as Route}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--brown)] text-[var(--brown)] hover:bg-[var(--tan)]/40 transition"
          >
            {t('home.portfolio.view_all')} <MoveRight size={18} />
          </Link>
        </div>
      </div>

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
