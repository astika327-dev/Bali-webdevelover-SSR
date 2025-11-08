'use client';

import { portfolio } from '../../content/config';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '../../i18n-config';
import { useEffect, useState } from 'react';

type PortfolioListProps = {
  lang: Locale;
  viewCaseStudyText: string;
  comingSoonText: string;
};

export default function PortfolioList({ lang, viewCaseStudyText, comingSoonText }: PortfolioListProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Or a loading spinner
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {portfolio.map((item, index) => (
                <div key={index} className="group">
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80 mb-4">
                        <Image
                            src={item.images[0]}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--brown)] dark:text-neutral-200">{item.title}</h3>
                    <p className="text-[var(--brown)]/80 dark:text-neutral-400 mt-1">{item.description}</p>
                    <Link
                        href={item.link || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-[var(--brown)] dark:text-neutral-300 hover:underline mt-4 inline-block"
                    >
                        {item.link ? viewCaseStudyText : comingSoonText}
                    </Link>
                </div>
            ))}
        </div>
    );
}
