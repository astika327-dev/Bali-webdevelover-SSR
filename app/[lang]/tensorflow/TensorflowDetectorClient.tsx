'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Lightbulb, Rocket, ShieldCheck, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

interface Translations {
  how_to_use: { title: string; intro: string; sections: { title: string; points: string[] }[] };
  why: { title: string; body: string };
  privacy: { title: string; points: string[] };
  page: {
    title: string;
    description: string;
    ready_title: string;
    ready_description: string;
    start_button: string;
  }
}

export default function TensorflowDetectorClient({ translations }: { translations: Translations }) {
  const [showDetector, setShowDetector] = useState(false);

  return (
    <section className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{translations.page.title}</h1>
        <p className="text-neutral-700 dark:text-neutral-300 mt-4">
            {translations.page.description}
        </p>

        <div className="mt-8">
          {!showDetector ? (
            <div className="p-8 border-2 border-dashed rounded-lg text-center">
              <Cpu className="w-12 h-12 mx-auto text-neutral-400" />
              <p className="mt-4 font-semibold">{translations.page.ready_title}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                {translations.page.ready_description}
              </p>
              <Button onClick={() => setShowDetector(true)} className="mt-6">
                {translations.page.start_button}
              </Button>
            </div>
          ) : (
            <TensorflowDetector
              loadModelText="Loading model..."
              modelLoadedText="Model loaded."
              selectImageText="Select image"
              unsupportedFormatText="Unsupported format"
            />
          )}
        </div>
      </div>

      <div className="mt-20 pt-12 border-t max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-sm">
          {/* How to Use Card */}
          <div className="p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900 border dark:border-neutral-800 shadow-sm">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-blue-500"/>
              {translations.how_to_use.title}
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">{translations.how_to_use.intro}</p>
            {translations.how_to_use.sections.map((section, i) => (
              <div key={i} className="pt-2">
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">{section.title}</h4>
                <ul className="space-y-1 list-disc list-inside text-neutral-700 dark:text-neutral-300 mt-1">
                  {section.points.map((point, j) => <li key={j}>{point}</li>)}
                </ul>
              </div>
            ))}
          </div>

          {/* Why Card */}
          <div className="p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900 border dark:border-neutral-800 shadow-sm">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
              <Rocket className="w-5 h-5 text-purple-500"/>
              {translations.why.title}
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300">{translations.why.body}</p>
          </div>

          {/* Privacy Card */}
          <div className="p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900 border dark:border-neutral-800 shadow-sm">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-green-500"/>
              {translations.privacy.title}
            </h3>
            <ul className="space-y-2 list-disc list-inside text-neutral-700 dark:text-neutral-300">
                {translations.privacy.points.map((point, i) => <li key={i}>{point}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
