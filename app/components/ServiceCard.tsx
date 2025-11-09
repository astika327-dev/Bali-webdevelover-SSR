'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';

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
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      className="flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/50 dark:bg-neutral-900/50 shadow-lg"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[var(--brown)] dark:text-neutral-200">{pkg.title}</h3>
        <p className="mt-2 text-3xl font-bold text-[var(--brown)] dark:text-neutral-100">{pkg.price}</p>
        <p className="text-sm text-[var(--brown)]/70 dark:text-neutral-400">per project</p>
      </div>
      <div className="flex-grow p-6 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <ul className="space-y-3">
          {pkg.benefits.map((benefit, i) => (
            <li key={i} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-[var(--brown)]/90 dark:text-neutral-300">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6">
        <Link
          href={`/${lang}/contact?service=${pkg.id}`}
          className="block w-full text-center bg-[var(--cream)] hover:bg-[var(--tan)] text-[var(--brown)] font-semibold py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 transition-colors duration-300"
        >
          {buttonText}
        </Link>
      </div>
    </motion.div>
  );
}
