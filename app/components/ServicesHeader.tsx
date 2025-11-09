'use client';

import { motion } from 'framer-motion';

type ServicesHeaderProps = {
  title: string;
  subtitle: string;
};

export default function ServicesHeader({ title, subtitle }: ServicesHeaderProps) {
  const fadeInAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      className="space-y-3 text-center max-w-3xl mx-auto mb-16"
      initial="initial"
      animate="animate"
      transition={{ staggerChildren: 0.2 }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--brown)] dark:text-neutral-100"
        variants={fadeInAnimation}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>
      <motion.p
        className="text-lg text-[var(--brown)]/80 dark:text-neutral-400"
        variants={fadeInAnimation}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {subtitle}
      </motion.p>
    </motion.header>
  );
}
