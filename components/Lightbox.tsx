'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  images: string[];
  title: string;
  link: string;
  initialIndex?: number;
  onClose: () => void;
};

export default function Lightbox({ images, title, link, initialIndex = 0, onClose }: Props) {
  const [i, setI] = useState(initialIndex);

  const prev = useCallback(() => setI(v => (v - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setI(v => (v + 1) % images.length), [images.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl bg-[var(--cream)] text-[var(--brown)] rounded-2xl overflow-hidden shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--tan)]">
          <div className="font-semibold">{title}</div>
          <div className="flex items-center gap-2">
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="text-sm px-3 py-1.5 rounded-full border border-[var(--brown)] hover:bg-[var(--tan)]/40"
            >
              View project
            </a>
            <button
              aria-label="Close"
              onClick={onClose}
              className="px-3 py-1.5 rounded-full border border-[var(--brown)] hover:bg-[var(--tan)]/40"
            >
              Close
            </button>
          </div>
        </div>

        <div className="relative aspect-[16/9] bg-black">
          <Image
            src={images[i]}
            alt={`${title} – screenshot ${i + 1}`}
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 1024px, 100vw"
            priority={i === 0}
          />
          {/* controls */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/80 hover:bg-white text-black transition"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-white/80 hover:bg-white text-black transition"
          >
            <ChevronRight size={22} />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-white/90 bg-black/40 px-2 py-1 rounded-full">
            {i + 1} / {images.length}
          </div>
        </div>

        {/* thumbs */}
        <div className="p-3 flex gap-2 overflow-x-auto bg-[var(--cream)]">
          {images.map((src, idx) => (
            <button
              key={src + idx}
              onClick={() => setI(idx)}
              aria-label={`Go to image ${idx + 1}`}
              className={`relative h-16 w-24 rounded-lg overflow-hidden border ${i === idx ? 'border-[var(--brown)]' : 'border-[var(--tan)]'}`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="96px" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
