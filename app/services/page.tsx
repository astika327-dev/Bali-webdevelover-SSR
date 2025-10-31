'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Check } from "lucide-react";
import Link from 'next/link';
import FadeIn from '../components/FadeIn';

export default function ServicesPage() {
  const { t, translations } = useLanguage();

  const plans = [
    {
      key: 'services.plans.launchpad',
      badge: null,
    },
    {
      key: 'services.plans.digital_hq',
      badge: null,
    },
    {
      key: 'services.plans.booking_engine',
      badge: null,
    },
    {
      key: 'services.plans.headless_ecommerce',
      badge: null,
    },
    {
      key: 'services.plans.ai_powered',
      badge: null,
    },
    {
      key: 'services.plans.growth_retainer',
      badge: null,
    },
  ];

  const faqItems = [
    'services.faq.item1',
    'services.faq.item2',
    'services.faq.item3',
    'services.faq.item4',
  ];

  const getFeatures = (key: string): string[] => {
    const features = translations[`${key}.features`];
    return Array.isArray(features) ? features : [];
  };

  return (
    <section className="container py-12 md:py-16">
      <FadeIn>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{t('services.title')}</h1>
        <p className="text-neutral-600 mt-2">{t('services.subtitle')}</p>
      </FadeIn>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {plans.map((p, i) => (
          <FadeIn key={p.key} delay={0.2 * (i + 1)}>
            <div className="rounded-2xl border bg-white/70 p-6 flex flex-col h-full">
              {p.badge && <div className="text-xs self-start px-2 py-0.5 rounded-full bg-black text-white">{p.badge}</div>}
              <div className="mt-2">
                <div className="text-sm text-neutral-500">{t(`${p.key}.subtitle`)}</div>
              <h2 className="text-2xl font-semibold">{t(`${p.key}.name`)}</h2>
              <p className="text-neutral-600 mt-2">{t(`${p.key}.description`)}</p>
            </div>
            <div className="text-3xl font-semibold mt-4">{t(`${p.key}.price`)}</div>
            
            <ul className="mt-4 space-y-2 text-sm flex-1">
              {getFeatures(p.key).map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check size={16} className="mt-1" /> <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 text-sm text-neutral-600">{t(`${p.key}.eta`)}</div>
            
            <Link 
              href="/contact" 
              className="mt-6 rounded-full border px-4 py-2 text-center hover:bg-neutral-50"
            >
              {t(`${p.key}.cta`)}
            </Link>
            
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn className="mt-12 text-sm text-neutral-600" delay={0.6}>
        <h3 className="font-semibold">{t('services.faq.title')}</h3>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          {faqItems.map(item => (
            <li key={item}>{t(item)}</li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}
