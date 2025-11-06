'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '../../context/LanguageContext';
import { Lightbulb, Rocket, ShieldCheck, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Helper to safely get nested translation keys
const getTranslation = (translations: any, key: string): any => {
    return key.split('.').reduce((obj, k) => (obj && obj[k] !== 'undefined') ? obj[k] : undefined, translations);
};

// Lazy load the TensorflowDetector component
const TensorflowDetector = dynamic(() => import('../components/TensorflowDetector'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-neutral-50 dark:bg-neutral-900 min-h-[300px]">
      <p className="mt-4 text-lg font-semibold">Mempersiapkan mesin AI...</p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">Komponen deteksi sedang dimuat.</p>
    </div>
  ),
});

export default function TensorflowPage() {
  const { translations } = useLanguage();
  const [showDetector, setShowDetector] = useState(false);

  // Safely get translation data for all cards
  const howToUseData = getTranslation(translations, 'tensorflow.how_to_use') || { title: 'How to Use', intro: '', sections: [] };
  const whyData = getTranslation(translations, 'tensorflow.why') || { title: 'Why This Matters', body: '' };
  const privacyData = getTranslation(translations, 'tensorflow.privacy') || { title: 'Your Privacy', points: [] };

  return (
    <section className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Deteksi Objek Real-Time</h1>
        <p className="text-neutral-700 dark:text-neutral-300 mt-4">
          Demo ini menggunakan model COCO-SSD untuk mendeteksi objek. Untuk mengoptimalkan performa, library AI dan model
          hanya akan dimuat setelah Anda menekan tombol di bawah ini.
        </p>

        <div className="mt-8">
          {!showDetector ? (
            <div className="p-8 border-2 border-dashed rounded-lg text-center">
              <Cpu className="w-12 h-12 mx-auto text-neutral-400" />
              <p className="mt-4 font-semibold">Fitur Deteksi AI Siap Dimuat</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Tekan tombol untuk mengunduh model (~35MB) dan memulai komponen.
              </p>
              <Button onClick={() => setShowDetector(true)} className="mt-6">
                Mulai Deteksi Objek
              </Button>
            </div>
          ) : (
            <TensorflowDetector />
          )}
        </div>
      </div>

      <div className="mt-20 pt-12 border-t max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-sm">
          {/* How to Use Card */}
          <div className="p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900 border dark:border-neutral-800 shadow-sm">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-blue-500"/>
              {howToUseData.title}
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">{howToUseData.intro}</p>
            {howToUseData.sections.map((section: { title: string, points: string[] }, i: number) => (
              <div key={i} className="pt-2">
                <h4 className="font-semibold text-neutral-800 dark:text-neutral-200">{section.title}</h4>
                <ul className="space-y-1 list-disc list-inside text-neutral-700 dark:text-neutral-300 mt-1">
                  {section.points.map((point: string, j: number) => <li key={j}>{point}</li>)}
                </ul>
              </div>
            ))}
          </div>

          {/* Why Card */}
          <div className="p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900 border dark:border-neutral-800 shadow-sm">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
              <Rocket className="w-5 h-5 text-purple-500"/>
              {whyData.title}
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300">{whyData.body}</p>
          </div>

          {/* Privacy Card */}
          <div className="p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900 border dark:border-neutral-800 shadow-sm">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-green-500"/>
              {privacyData.title}
            </h3>
            <ul className="space-y-2 list-disc list-inside text-neutral-700 dark:text-neutral-300">
                {privacyData.points.map((point: string, i: number) => <li key={i}>{point}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
