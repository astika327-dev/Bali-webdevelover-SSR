import { site } from "@/content/config";

export default function AboutPage() {
  return (
    <section className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">About</h1>

      <p className="text-neutral-700 mt-4 max-w-2xl">
        As an independent digital developer, I specialize in building clean, fast, and
        user-centric web experiences. My focus is on clarity, balance, and
        precision—ensuring every element on a page exists for a reason and serves a distinct purpose.
      </p>

      <p className="text-neutral-700 mt-4 max-w-2xl">
        My work blends modern web technologies with a deep focus on user experience (UX).
        This approach allows me to design systems that are minimal yet impactful, structured yet
        intuitive. I build digital products that don’t just look polished,
        but actually communicate, convert, and intuitively guide the user.
      </p>

      <p className="text-neutral-700 mt-4 max-w-2xl">
        Based in Bali and working remotely worldwide, I create solutions that merge logic,
        aesthetics, and intent—made for people, not algorithms.
      </p>

      <div className="mt-12 md:mt-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Core Competencies & Toolkit
        </h2>
        <p className="text-neutral-700 mt-4 max-w-2xl">
          To bring these ideas to life, I rely on a curated stack of modern,
          performance-oriented technologies.
        </p>

        {/* PENTING: Ganti daftar skill di bawah ini dengan keahlian Anda yang sebenarnya.
          Ini hanyalah contoh.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-6 max-w-3xl">
          <div>
            <h3 className="text-lg font-medium text-neutral-800">Languages & Frameworks</h3>
            <p className="text-neutral-700 mt-1">
              TypeScript, JavaScript (ES6+), React, Next.js, Node.js
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-neutral-800">Styling & UI</h3>
            <p className="text-neutral-700 mt-1">
              Tailwind CSS, Framer Motion, Radix UI, Shadcn/UI
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-neutral-800">Backend & Data</h3>
            <p className="text-neutral-700 mt-1">
              Headless CMS (Sanity, Strapi), PostgreSQL, Vercel, Docker
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-neutral-800">Design & Strategy</h3>
            <p className="text-neutral-700 mt-1">
              Figma, UI/UX Design, Performance Optimization, SEO
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}