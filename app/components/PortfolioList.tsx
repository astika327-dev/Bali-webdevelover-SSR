'use client';

import { portfolio } from '../../content/config';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '../../i18n-config';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';


type PortfolioListProps = {
  lang: Locale;
  viewCaseStudyText: string;
  comingSoonText: string;
};

export default function PortfolioList({ lang, viewCaseStudyText, comingSoonText }: PortfolioListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {portfolio.map((item, index) => (
                <div key={index} className="group">
                    <Carousel className="w-full rounded-xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800/80 mb-4 relative">
                        <CarouselContent>
                            {item.images.map((image, imgIndex) => (
                                <CarouselItem key={imgIndex}>
                                    <div className="relative aspect-video w-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
                                        <Image
                                            src={image}
                                            alt={`${item.title} screenshot ${imgIndex + 1}`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover object-top"
                                            priority={index < 2 && imgIndex === 0}
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Carousel>
                    <h3 className="text-xl font-semibold text-[var(--brown)] dark:text-neutral-200">{item.title}</h3>
                    <p className="text-[var(--brown)]/80 dark:text-neutral-400 mt-1 mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {item.stack && item.stack.map((tech) => (
                            <span key={tech} className="bg-neutral-200/60 dark:bg-neutral-800/60 text-sm text-[var(--brown)]/80 dark:text-neutral-300 px-2.5 py-1 rounded-md">
                                {tech}
                            </span>
                        ))}
                    </div>
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
