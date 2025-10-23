'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import type { Route } from 'next';
import { ArrowRight } from 'lucide-react';
import { certificates, services, site } from '../../content/config'; // Adjusted path

/* =========================
   Home Page
   ========================= */
export default function HomePage({ params }: { params: { lang: string } }) {
  const t = useTranslations('HomePage');

  return (
    <section className="container py-12 md:py-20 space-y-16">
      {/* Hero */}
      <div>
        <p className="text-sm uppercase tracking-wider text-[var(--brown)]/70">
          {t('heroSubtitle')}
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mt-3 text-[var(--brown)]">
          {site.tagline}.
        </h1>
        <p className="text-[var(--brown)]/80 mt-4 max-w-2xl">{site.blurb}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/${params.lang}/contact` as Route}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--brown)] text-[var(--cream)] hover:bg-opacity-90 transition"
          >
            {t('startProject')} <ArrowRight size={18} />
          </Link>
          <Link
            href={`/${params.lang}/services` as Route}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--brown)] text-[var(--brown)] hover:bg-[var(--tan)]/40 transition"
          >
            {t('viewServices')}
          </Link>
        </div>

        {/* Services preview */}
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="p-6 rounded-2xl border border-[var(--tan)] bg-[var(--cream)]/80 shadow-sm hover:shadow-md transition"
            >
              <div className="font-semibold text-lg text-[var(--brown)]">{s.title}</div>
              <p className="text-[var(--brown)]/80 mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certificates */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--brown)]">{t('certificatesTitle')}</h2>
        <p className="text-[var(--brown)]/80 max-w-2xl">
          {t('certificatesDescription')}
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
