'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '../../lib/utils';

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonLink?: string;
  buttonText?: string;
  isMotion?: boolean;
}

const cardVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1], // easeOut equivalent cubic-bezier
    },
  },
};

export default function ContactCard({
  icon,
  title,
  description,
  buttonLink,
  buttonText,
  isMotion = true,
}: ContactCardProps) {
  const cardContent = (
    <div
      className={cn(
        'p-6 rounded-2xl border bg-white/60 dark:bg-neutral-900/60 shadow-lg transition-shadow hover:shadow-xl',
        buttonLink ? 'border-[var(--tan)]' : 'border-transparent'
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 text-amber-800 dark:text-amber-300 w-12 h-12 bg-[var(--tan)]/50 rounded-full flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[var(--brown)] dark:text-neutral-200">{title}</h3>
          <p className="text-[var(--brown)]/80 dark:text-neutral-400 mt-1 text-sm">{description}</p>
        </div>
      </div>
      {buttonLink && buttonText && (
        <div className="mt-6">
          <Link
            href={buttonLink}
            target={buttonLink.startsWith('http') ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="block w-full text-center px-4 py-2.5 bg-white border border-neutral-300 rounded-lg text-[var(--brown)] font-semibold hover:bg-neutral-100/50 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700/50 transition-colors"
          >
            {buttonText}
          </Link>
        </div>
      )}
    </div>
  );

  if (isMotion) {
    return (
      <motion.div variants={cardVariants}>
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
}
