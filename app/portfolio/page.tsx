'use client';

import Image from 'next/image';
import { useState } from 'react';
import { portfolio } from 'content/config';
import Lightbox from 'components/Lightbox';

export default function PortfolioPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const active = openIndex !== null ? portfolio[openIndex] : null;

  return (
    <section className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--brown)]">
        Portfolio
      </h1>
      <p className="text-[var(--brown)]/80 mt-2 max-w-2xl">
        Selected works that highlight clean UI, solid performance, and results-driven builds.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {portfolio.map((p, idx) => (
          <div
            key={p.title}
            className="rounded-2xl border border-[var(--tan)] bg-[var(--cream)] overflow-hidden shadow-sm hover:shadow-md transition"
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
                <h2 className="font-semibold text-[var(--brown)]">{p.title}</h2>
                <p className="text-sm text-[var(--brown)]/80 mt-1">{p.description}</p>
              </div>
            </button>
          </div>
        ))}
      </div>

      {active && (
        <Lightbox
          images={active.images}
          title={active.title}
          link={active.link}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}
