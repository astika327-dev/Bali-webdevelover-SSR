'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Lightbulb, Rocket, ShieldCheck, Cpu } from 'lucide-react';

// Lazy load the TensorflowDetector component
const TensorflowDetector = dynamic(() => import('@/components/TensorflowDetector'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-neutral-50 dark:bg-neutral-900 min-h-[300px]">
      <p className="mt-4 text-lg font-semibold">Preparing AI engine...</p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">Loading detection component.</p>
    </div>
  ),
});

// Define a type for the translations prop
type Translations = {
  page: {
    title: string;
    description: string;
    ready_title: string;
    ready_description: string;
    start_button: string;
    load_model_text: string;
    model_loaded_text: string;
    select_image_text: string;
    unsupported_format_text: string;
  };
  how_to_use: {
    title: string;
    intro: string;
    sections: { title: string; points: string[] }[];
  };
  why: {
    title: string;
    body: string;
  };
  privacy: {
    title: string;
    points: string[];
  };
};

/* =========================
   TensorFlow Page Client Component
   ========================= */
export default function TensorflowPageClient({ translations: t }: { translations: Translations }) {
  const [showDetector, setShowDetector] = useState(false);

  return (
    <section className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--brown)]">
          {t.page.title}
        </h1>
        <p className="text-[var(--brown)]/80 mt-4 max-w-2xl mx-auto">
          {t.page.description}
        </p>
      </div>

      <div className="mt-12 max-w-4xl mx-auto">
        {!showDetector ? (
          <div className="p-8 border-2 border-dashed rounded-lg text-center bg-neutral-50/50 dark:bg-neutral-900/50">
            <Cpu className="w-12 h-12 mx-auto text-neutral-400" />
            <p className="mt-4 font-semibold text-xl text-[var(--brown)]">
              {t.page.ready_title}
            </p>
            <p className="text-sm text-[var(--brown)]/80 mt-1">
              {t.page.ready_description}
            </p>
            <Button onClick={() => setShowDetector(true)} className="mt-6">
              {t.page.start_button}
            </Button>
          </div>
        ) : (
          <TensorflowDetector
            loadModelText={t.page.load_model_text}
            modelLoadedText={t.page.model_loaded_text}
            selectImageText={t.page.select_image_text}
            unsupportedFormatText={t.page.unsupported_format_text}
          />
        )}
      </div>

      <div className="mt-20 pt-12 border-t max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-sm">
          {/* How to Use Card */}
          <div className="p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900 border dark:border-neutral-800 shadow-sm">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-3 text-[var(--brown)]">
              <Lightbulb className="w-5 h-5 text-blue-500" />
              {t.how_to_use.title}
            </h3>
            <p className="text-[var(--brown)]/80 mb-4">{t.how_to_use.intro}</p>
            {t.how_to_use.sections.map((section, i) => (
              <div key={i} className="pt-2">
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">{section.title}</h4>
                <ul className="space-y-1 list-disc list-inside text-[var(--brown)]/80 mt-1">
                  {section.points.map((point, j) => <li key={j}>{point}</li>)}
                </ul>
              </div>
            ))}
          </div>

          {/* Why Card */}
          <div className="p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900 border dark:border-neutral-800 shadow-sm">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-3 text-[var(--brown)]">
              <Rocket className="w-5 h-5 text-purple-500" />
              {t.why.title}
            </h3>
            <p className="text-[var(--brown)]/80">{t.why.body}</p>
          </div>

          {/* Privacy Card */}
          <div className="p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900 border dark:border-neutral-800 shadow-sm">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-3 text-[var(--brown)]">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              {t.privacy.title}
            </h3>
            <ul className="space-y-2 list-disc list-inside text-[var(--brown)]/80">
              {t.privacy.points.map((point, i) => <li key={i}>{point}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
