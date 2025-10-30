'use client';

import Image from 'next/image';
import { useState } from 'react';
import { portfolio } from 'content/config';
import Lightbox from 'components/Lightbox';
import { useLanguage } from '@/context/LanguageContext';
import dynamic from 'next/dynamic';

const FadeIn = dynamic(() => import('../components/FadeIn'), { ssr: false });

export default function PortfolioPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <section className="container py-12 md:py-16">
      <FadeIn>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--brown)]">
          {t('portfolio.title')}
        </h1>
        <p className="text-[var(--brown)]/80 mt-2 max-w-2xl">
          {t('portfolio.description')}
        </p>
      </FadeIn>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {portfolio.map((p, idx) => (
          <FadeIn key={p.link} delay={0.2 * (idx + 1)}>
            <div
              className="rounded-2xl border border-[var(--tan)] bg-[var(--cream)] overflow-hidden shadow-sm hover:shadow-md transition h-full"
            >
              <button
                onClick={() => setOpenIndex(idx)}
              className="text-left w-full"
              aria-label={`Open gallery for ${p.title}`}
            >
              <div className="relative aspect-[4/3]">
                <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-[var(--brown)] leading-tight">{p.title}</h2>
                <p className="text-sm text-[var(--brown)]/80 mt-1 line-clamp-2">{p.description}</p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} // Mencegah lightbox terbuka saat tombol ini diklik
                  className="inline-block text-sm font-semibold text-[var(--orange)] hover:text-[var(--orange-dark)] mt-3"
                >
                  Kunjungi Situs &rarr;
                </a>
              </div>
            </button>
            </div>
          </FadeIn>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={portfolio[openIndex].images}
          title={portfolio[openIndex].title}
          link={portfolio[openIndex].link}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}