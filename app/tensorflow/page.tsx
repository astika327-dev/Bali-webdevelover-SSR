'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Lightbulb, Rocket, ShieldCheck, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [showDetector, setShowDetector] = useState(false);

  // Data di-hardcode untuk sementara untuk memperbaiki build
  const howToUseData = {
    title: 'How to Use',
    intro: 'Follow these steps to get started:',
    sections: [
      { title: 'Step 1', points: ['Point A', 'Point B'] },
      { title: 'Step 2', points: ['Point C'] }
    ]
  };
  const whyData = {
    title: 'Why This Matters',
    body: 'This technology is important for various reasons.'
  };
  const privacyData = {
    title: 'Your Privacy',
    points: ['Privacy point 1', 'Privacy point 2']
  };

  return (
    <section className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Real-Time Object Detection</h1>
        <p className="text-neutral-700 dark:text-neutral-300 mt-4">
          This demo uses the COCO-SSD model to detect objects. To optimize performance, the AI library and model
          will only be loaded after you press the button below.
        </p>

        <div className="mt-8">
          {!showDetector ? (
            <div className="p-8 border-2 border-dashed rounded-lg text-center">
              <Cpu className="w-12 h-12 mx-auto text-neutral-400" />
              <p className="mt-4 font-semibold">AI Detection Feature Ready to Load</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Press the button to download the model (~35MB) and start the component.
              </p>
              <Button onClick={() => setShowDetector(true)} className="mt-6">
                Start Object Detection
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
