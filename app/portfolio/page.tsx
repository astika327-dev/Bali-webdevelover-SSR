'use client';

import Image from 'next/image';
import { useState } from 'react';
import { portfolio } from 'content/config';
import Lightbox from 'components/Lightbox';
import { useLanguage } from '@/context/LanguageContext';

export default function PortfolioPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();


  const portfolioItems = [
    {
      key: 'portfolio.item1',
      image: portfolio[0].images[0],
      link: portfolio[0].link,
    },
    {
      key: 'portfolio.item2',
      image: portfolio[1].images[0],
      link: portfolio[1].link,
    },
    {
      key: 'portfolio.item3',
      image: portfolio[2].images[0],
      link: portfolio[2].link,
    },
  ];

  return (
    <section className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--brown)]">
        {t('portfolio.title')}
      </h1>
      <p className="text-[var(--brown)]/80 mt-2 max-w-2xl">
        {t('portfolio.description')}
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {portfolioItems.map((p, idx) => (
          <div
            key={p.key}
            className="rounded-2xl border border-[var(--tan)] bg-[var(--cream)] overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <button
              onClick={() => setOpenIndex(idx)}
              className="text-left w-full"
              aria-label={`Open gallery for ${t(`${p.key}.title`)}`}
            >
              <div className="relative aspect-[4/3]">
                <Image src={p.image} alt={t(`${p.key}.title`)} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-[var(--brown)]">{t(`${p.key}.title`)}</h2>
                <p className="text-sm text-[var(--brown)]/80 mt-1">{t(`${p.key}.description`)}</p>
              </div>
            </button>
          </div>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={portfolio[openIndex].images}
          title={t(`portfolio.item${openIndex + 1}.title`)}
          link={portfolio[openIndex].link}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}