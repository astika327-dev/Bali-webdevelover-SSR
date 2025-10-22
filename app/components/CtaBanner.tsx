"use client";
import Link from 'next/link';

export default function CtaBanner() {
  return (
    <div className="rounded-2xl p-8 my-12" style={{
      backgroundColor: '#F5F5DC', // Warna beige muda yang lembut
      border: '1px solid #E5E7EB'
    }}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold tracking-tight" style={{ color: '#5C4033' }}>
          Punya Proyek atau Ide?
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Mari kita diskusikan bagaimana kami bisa membantu Anda mewujudkan proyek web impian Anda. Dari blog sederhana hingga platform yang kompleks, kami siap membantu.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block rounded-lg px-8 py-3 text-base font-semibold text-white transition-transform duration-300 hover:scale-105"
          style={{
            backgroundColor: '#8B4513', // SaddleBrown
            boxShadow: '0 4px 14px 0 rgba(139, 69, 19, 0.3)'
          }}
        >
          Hubungi Kami
        </Link>
      </div>
    </div>
  );
}
