'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { portfolio } from '@/content/config';
import { MoveRight, LayoutTemplate } from 'lucide-react';

type PortfolioHomeProps = {
  lang: string;
  dictionary: {
    [key: string]: string;
  };
};

export default function PortfolioHome({ lang, dictionary }: PortfolioHomeProps) {
  const featuredPortfolio = portfolio.filter(p =>
    p.title === 'U2CleanPro' ||
    p.title === 'PromptCraft' ||
    p.title === 'Personal Site — astika.is-a.dev'
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--brown)] tracking-tight">
            {dictionary.title}
          </h2>
          <p className="text-[var(--brown)]/80 mt-1 max-w-2xl">
            {dictionary.description}
          </p>
        </div>
        <Link
          href={`/${lang}/portfolio` as Route}
          className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--brown)] text-[var(--brown)] hover:bg-[var(--tan)]/40 transition"
        >
          {dictionary.view_all} <MoveRight size={18} />
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {featuredPortfolio.map((p) => (
          <a
            key={p.title}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="relative aspect-[4/3] rounded-2xl border border-[var(--tan)] bg-neutral-100 dark:bg-neutral-900 overflow-hidden shadow-sm hover:shadow-lg transition flex items-center justify-center">
              <LayoutTemplate className="w-12 h-12 text-neutral-300 dark:text-neutral-700" />
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
            {dictionary.view_all} <MoveRight size={18} />
        </Link>
      </div>
    </div>
  );
}
