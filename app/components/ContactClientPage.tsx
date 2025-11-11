'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import ContactCard from '@/app/components/ContactCard';
import { Mail, MessageSquare, MapPin, Instagram, Facebook, Github } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

type FormTranslations = {
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submitButtonText: string;
  successMessage: string;
  errorMessage: string;
};

interface ContactClientPageProps {
  lang: string;
  contactData: any;
  formTranslations: FormTranslations;
}

export default function ContactClientPage({ lang, contactData, formTranslations }: ContactClientPageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const socialIcons = {
    instagram: <Instagram size={24} />,
    facebook: <Facebook size={24} />,
    github: <Github size={24} />,
  };

  return (
    <section className="container max-w-4xl py-12 md:py-20">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--brown)] dark:text-neutral-100">
          {contactData.header.title}
        </h1>
        <p className="mt-4 text-lg text-[var(--brown)]/80 dark:text-neutral-400 max-w-2xl mx-auto">
          {contactData.header.subtitle}
        </p>
      </motion.div>

      <motion.div
        ref={ref}
        className="grid md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <ContactCard
          icon={<Mail size={24} />}
          title={contactData.email.title}
          description={contactData.email.description}
          buttonLink={`mailto:${contactData.email.address}`}
          buttonText={contactData.email.button}
        />
        <ContactCard
          icon={<MessageSquare size={24} />}
          title={contactData.whatsapp.title}
          description={contactData.whatsapp.description}
          buttonLink={contactData.whatsapp.url}
          buttonText={contactData.whatsapp.button}
        />
      </motion.div>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-neutral-900/60 shadow-lg border border-[var(--tan)]">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 text-amber-800 dark:text-amber-300 w-12 h-12 bg-[var(--tan)]/50 rounded-full flex items-center justify-center">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[var(--brown)] dark:text-neutral-200">{contactData.office.title}</h3>
              <p className="text-[var(--brown)]/80 dark:text-neutral-400 mt-1 text-sm">{contactData.office.line1} - {contactData.office.line2}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-[var(--brown)] dark:text-neutral-200">
          {contactData.social.title}
        </h2>
        <div className="flex justify-center items-center space-x-4 mt-6">
          {Object.entries(contactData.social.links).map(([key, href]) => (
            <Link
              key={key}
              href={href as string}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/70 border border-neutral-300 rounded-full text-[var(--brown)] hover:bg-[var(--tan)]/50 dark:bg-neutral-800/50 dark:border-neutral-700 dark:hover:bg-neutral-800 transition-colors"
            >
              {socialIcons[key as keyof typeof socialIcons]}
            </Link>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <header className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--brown)] dark:text-neutral-100">
            {contactData.form.title}
          </h2>
          <p className="text-[var(--brown)]/80 max-w-2xl mx-auto">
            {contactData.form.description}
          </p>
        </header>

        <div className="mt-12 max-w-2xl mx-auto">
          <ContactForm {...formTranslations} />
        </div>
      </motion.div>
    </section>
  );
}
