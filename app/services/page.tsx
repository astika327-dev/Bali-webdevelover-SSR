'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Check } from "lucide-react";
import Link from 'next/link';

export default function ServicesPage() {
  const { t, translations } = useLanguage();

  const plans = [
    {
      key: 'services.plans.starter',
      badge: null,
    },
    {
      key: 'services.plans.growth',
      badge: t('services.plans.growth.badge'),
    },
    {
      key: 'services.plans.premium',
      badge: null,
    },
  ];

  const addons = [
    'services.addons.item1',
    'services.addons.item2',
    'services.addons.item3',
    'services.addons.item4',
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
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{t('services.title')}</h1>
      <p className="text-neutral-600 mt-2">{t('services.subtitle')}</p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {plans.map((p) => (
          <div key={p.key} className="rounded-2xl border bg-white/70 p-6 flex flex-col">
            {p.badge && <div className="text-xs self-start px-2 py-0.5 rounded-full bg-black text-white">{p.badge}</div>}
            <div className="mt-2">
              <div className="text-sm text-neutral-500">{t(`${p.key}.subtitle`)}</div>
              <h2 className="text-2xl font-semibold">{t(`${p.key}.name`)}</h2>
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
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold">{t('services.addons.title')}</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-4">
          {addons.map(a => (
            <div key={a} className="rounded-2xl border bg-white/70 p-5">
              <div className="font-semibold">{t(`${a}.title`)}</div>
              <p className="text-neutral-600 mt-2">{t(`${a}.desc`)}</p>
              <div className="text-sm mt-3">{t(`${a}.from`)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-sm text-neutral-600">
        <h3 className="font-semibold">{t('services.faq.title')}</h3>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          {faqItems.map(item => (
            <li key={item}>{t(item)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
