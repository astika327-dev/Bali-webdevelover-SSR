'use client';

import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import Link from 'next/link';
import { cn } from '../../lib/utils';

type ServicePackage = {
  id: string;
  title: string;
  price: string;
  benefits: string[];
  popular?: boolean;
};

type ServiceCardProps = {
  pkg: ServicePackage;
  buttonText: string;
  lang: string;
  index: number;
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

export default function ServiceCard({ pkg, buttonText, lang, index }: ServiceCardProps) {
  const isPopular = pkg.id === 'business';

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      className={cn(
        'relative flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/50 dark:bg-neutral-900/50 shadow-md transition-transform duration-300 hover:scale-[1.02]',
        isPopular ? 'shadow-lg shadow-yellow-500/10' : ''
      )}
    >
      {isPopular && (
        <div className="absolute top-0 right-4 -translate-y-1/2 bg-yellow-400 text-yellow-900 px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1">
          <Star className="w-4 h-4" />
          Most Popular
        </div>
      )}
      <div className="p-8">
        <h3 className="text-xl font-semibold text-[var(--brown)] dark:text-neutral-200">{pkg.title}</h3>
        <p className="mt-2 text-3xl font-bold text-[var(--brown)] dark:text-neutral-100">{pkg.price}</p>
        <p className="text-sm text-[var(--brown)]/70 dark:text-neutral-400">per project</p>
      </div>
      <div className="flex-grow p-8 pt-0 border-neutral-200/80 dark:border-neutral-800/80">
        <ul className="space-y-4">
          {pkg.benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
              <span className="text-[var(--brown)]/90 dark:text-neutral-300">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-8 pt-0 mt-auto">
        <Link
          href={`/${lang}/contact?service=${pkg.id}`}
          className={cn(
            'block w-full text-center font-semibold py-3 rounded-lg border transition-colors duration-300',
            isPopular
              ? 'bg-[var(--brown)] text-white hover:bg-opacity-90 border-transparent'
              : 'bg-[var(--cream)] hover:bg-[var(--tan)] text-[var(--brown)] border-neutral-300 dark:border-neutral-700'
          )}
        >
          {buttonText}
        </Link>
      </div>
    </motion.div>
  );
}
