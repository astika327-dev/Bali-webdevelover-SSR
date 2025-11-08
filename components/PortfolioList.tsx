'use client';

import Image from 'next/image';
import { useState } from 'react';
import { portfolio } from '../content/config';
import Lightbox from './Lightbox';
import { Locale } from '../i18n-config';

interface PortfolioListProps {
  lang: Locale;
  viewCaseStudyText: string;
  comingSoonText: string;
}

export default function PortfolioList({ lang, viewCaseStudyText, comingSoonText }: PortfolioListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {portfolio.map((p, idx) => (
          <div
            key={p.link}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 overflow-hidden shadow-sm hover:shadow-md transition h-full"
          >
            <button
              onClick={() => setOpenIndex(idx)}
              className="text-left w-full"
              aria-label={`Open gallery for ${p.title}`}
            >
              <div className="relative aspect-[4/3]">
                <Image src={p.images[0]} alt={p.title} width={400} height={300} className="object-cover w-full h-full" />
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
                  {viewCaseStudyText} &rarr;
                </a>
              </div>
            </button>
          </div>
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
    </>
  );
}
