'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Star } from 'lucide-react';
import Link from 'next/link';
import { cn } from '../../lib/utils';

type ServicePackage = {
  id: string;
  title: string;
  price: string;
  benefits: string[];
};

type ServiceCardProps = {
  pkg: ServicePackage;
  buttonText: string;
  lang: string;
  index: number;
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15, // Sedikit perlambat delay untuk efek yang lebih jelas
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

export default function ServiceCard({ pkg, buttonText, lang, index }: ServiceCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const isPopular = pkg.id === 'business';

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      className={cn(
        'relative flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/60 dark:bg-neutral-900/60 shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl',
        isPopular ? 'border-amber-600/50 dark:border-amber-500/50' : ''
      )}
    >
      {isPopular && (
        <div className="absolute top-0 right-5 -translate-y-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-1.5 text-sm font-semibold rounded-full flex items-center gap-2 shadow-lg shadow-amber-500/20">
          <Star className="w-4 h-4" />
          Most Popular
        </div>
      )}
      <div className="p-8">
        <h3 className="text-xl font-semibold text-[var(--brown)] dark:text-neutral-200">{pkg.title}</h3>
        <p className="mt-2 text-3xl font-bold text-[var(--brown)] dark:text-neutral-100">{pkg.price}</p>
        <p className="text-sm text-[var(--brown)]/70 dark:text-neutral-400">per project</p>
      </div>
      <div className="flex-grow p-8 pt-0 border-t border-neutral-200/60 dark:border-neutral-800/60">
        <ul className="space-y-4">
          {pkg.benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-1" />
              <span className="text-[var(--brown)]/90 dark:text-neutral-300">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-8 pt-0 mt-auto">
        <Link
          href={`/${lang}/contact?service=${pkg.id}`}
          className={cn(
            'block w-full text-center font-semibold py-3 rounded-lg transition-all duration-300',
            isPopular
              ? 'bg-gradient-to-r from-amber-700 to-amber-800 text-white hover:shadow-lg hover:shadow-amber-800/20 hover:scale-105'
              : 'bg-white/70 hover:bg-[var(--tan)]/50 text-[var(--brown)] border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800/50 dark:hover:bg-neutral-800'
          )}
        >
          {buttonText}
        </Link>
      </div>
    </motion.div>
  );
}
