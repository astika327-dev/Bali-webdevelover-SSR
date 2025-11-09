'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  data: {
    title: string;
    items: FaqItem[];
  };
};

export default function FaqAccordion({ data }: FaqAccordionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const fadeInAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="mt-24 max-w-3xl mx-auto"
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={fadeInAnimation}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-semibold text-center text-[var(--brown)] dark:text-neutral-200 mb-8">
        {data.title}
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {data.items.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={index} className="border-b border-[var(--tan)]">
            <AccordionTrigger className="text-left text-lg font-medium text-[var(--brown)] dark:text-neutral-200 hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-[var(--brown)]/80 dark:text-neutral-400 pt-1 pb-4">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  );
}
