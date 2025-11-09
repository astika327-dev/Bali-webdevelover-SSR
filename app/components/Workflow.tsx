'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, DraftingCompass, Rocket } from 'lucide-react';

type Step = {
  title: string;
  description: string;
};

type WorkflowProps = {
  data: {
    title: string;
    subtitle: string;
    steps: Step[];
  };
};

const icons = [
  <Target key={1} className="w-8 h-8 text-amber-800" />,
  <DraftingCompass key={2} className="w-8 h-8 text-amber-800" />,
  <Rocket key={3} className="w-8 h-8 text-amber-800" />,
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function Workflow({ data }: WorkflowProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div className="mt-24">
      <motion.div
        className="text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        ref={ref}
      >
        <h2 className="text-3xl font-semibold text-[var(--brown)] dark:text-neutral-200">
          {data.title}
        </h2>
        <p className="mt-2 text-[var(--brown)]/80 dark:text-neutral-400">
          {data.subtitle}
        </p>
      </motion.div>

      <motion.div
        className="mt-16 grid md:grid-cols-3 gap-12"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {data.steps.map((step, index) => (
          <motion.div key={index} className="flex flex-col items-center text-center" variants={itemVariants}>
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[var(--tan)]/50 mb-4 border border-[var(--tan)]">
              {icons[index]}
            </div>
            <h3 className="text-xl font-semibold text-[var(--brown)] dark:text-neutral-200 mb-2">
              {step.title}
            </h3>
            <p className="text-[var(--brown)]/80 dark:text-neutral-400 text-sm">
              {step.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
