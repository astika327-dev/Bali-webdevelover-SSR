'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type CtaProps = {
  lang: string;
  data: {
    title: string;
    description: string;
    button: string;
  };
};

export default function Cta({ lang, data }: CtaProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const fadeInAnimation = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className="mt-24 max-w-3xl mx-auto text-center p-8 rounded-2xl bg-[var(--tan)]/40 border border-[var(--tan)]"
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={fadeInAnimation}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-semibold text-[var(--brown)] dark:text-neutral-200">
        {data.title}
      </h2>
      <p className="mt-3 max-w-xl mx-auto text-[var(--brown)]/80 dark:text-neutral-400">
        {data.description}
      </p>
      <div className="mt-8">
        <Link
          href={`/${lang}/contact`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--brown)] text-[var(--cream)] hover:bg-opacity-90 transition-transform hover:scale-105"
        >
          {data.button} <ArrowRight size={18} />
        </Link>
      </div>
    </motion.div>
  );
}
