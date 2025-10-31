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
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-200">
          {t('portfolio.title')}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2 max-w-2xl">
          {t('portfolio.description')}
        </p>
      </FadeIn>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {portfolio.map((p, idx) => (
          <FadeIn key={p.link} delay={0.2 * (idx + 1)}>
            <div
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 overflow-hidden shadow-sm hover:shadow-md transition h-full"
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
                <h2 className="font-semibold text-neutral-800 dark:text-neutral-200 leading-tight">{p.title}</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-2">{p.description}</p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} // Mencegah lightbox terbuka saat tombol ini diklik
                  className="inline-block text-sm font-semibold text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 mt-3"
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