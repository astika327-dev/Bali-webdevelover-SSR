import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { certificates, services, site } from "@/content/config";

export default function HomePage() {
  return (
    <section className="container py-12 md:py-20">
      <p className="text-sm uppercase tracking-wider text-neutral-500">Independent Studio Web in Bali</p>
      <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mt-3">
        {site.tagline}.
      </h1>
      <p className="text-neutral-700 mt-4 max-w-2xl">
        {site.blurb}
      </p>

      <div className="mt-6 flex gap-3">
        <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black text-white">
          Start a Project <ArrowRight size={18} />
        </Link>
        <Link href="/services" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border">
          View Services
        </Link>
      </div>

      <div className="mt-14 grid md:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.title} className="p-6 rounded-2xl border bg-white/70">
            <div className="font-semibold">{s.title}</div>
            <p className="text-neutral-600 mt-2">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
  <h2 className="text-xl font-semibold text-[var(--brown)]">Certificates</h2>
  <p className="text-[var(--brown)]/80 mt-2 mb-4">
    Verified credentials that showcase core web-development expertise.
  </p>

  <div className="flex flex-wrap gap-3">
    {certificates.map((c) => (
      <a
        key={c.title}
        href={c.href}
        target="_blank"
        rel="noreferrer"
        className="px-4 py-2 rounded-full border border-[var(--brown)] 
                   text-[var(--brown)] bg-[var(--tan)]/30 hover:bg-[var(--tan)]/50 
                   text-sm font-medium transition"
      >
        {c.title}
      </a>
    ))}
  </div>
</div>
    </section>
  );
}

