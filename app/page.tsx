import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { certificates, services, site, stats, clients } from "@/content/config";

const quickLinks = [
  {
    href: "/services",
    title: "Services",
    description: "Detail scopes, pricing ranges, and add-ons for hospitality and creative brands.",
  },
  {
    href: "/portfolio",
    title: "Portfolio",
    description: "See selected builds and UI explorations with notes on process and stack.",
  },
  {
    href: "/contact",
    title: "Project intake",
    description: "Share goals, brand context, and timeline preferences to receive a tailored plan.",
  },
];

export default function HomePage() {
  return (
    <section className="container space-y-16 py-12 md:py-20">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] md:items-start">
        <div>
          <p className="text-sm uppercase tracking-wider text-neutral-500">Independent Web Studio · Bali & Remote</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">{site.tagline}.</h1>
          <p className="mt-4 max-w-2xl text-neutral-700">{site.blurb}</p>
          <p className="mt-3 max-w-2xl text-neutral-600" lang="id">
            {site.taglineId}. {""}
            Kami membantu bisnis hospitality dan kreatif tampil berkelas internasional tanpa kehilangan karakter lokal.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-white"
            >
              Start a Project <ArrowRight size={18} />
            </Link>
            <Link href="/portfolio" className="inline-flex items-center gap-2 rounded-full border px-5 py-3">
              View Work
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--tan)] bg-white/80 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[var(--brown)]">How engagements are structured</h2>
          <ul className="mt-4 space-y-3 text-sm text-neutral-700">
            <li>
              <span className="font-medium text-[var(--brown)]">Collaborative kickoff.</span> We map success metrics, brand
              guardrails, dan kebutuhan konten sebelum desain dimulai.
            </li>
            <li>
              <span className="font-medium text-[var(--brown)]">Weekly check-ins.</span> Update progres rutin memastikan
              keputusan UI/UX selalu selaras dengan objektif bisnis Anda.
            </li>
            <li>
              <span className="font-medium text-[var(--brown)]">Launch & care.</span> Setelah go-live, kami bantu QA,
              dokumentasi, dan serah terima agar tim internal bisa mandiri.
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-[var(--brown)]">Focus areas</h2>
          <p className="mt-2 max-w-2xl text-[var(--brown)]/80">
            Polished marketing sites, conversion-first landing pages, dan micro app ringan untuk brand boutique yang ingin
            tampil profesional.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="rounded-2xl border bg-white/70 p-6">
              <div className="text-lg font-semibold text-[var(--brown)]">{service.title}</div>
              <p className="mt-2 text-neutral-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl border bg-[var(--cream)]/80 p-6">
            <div className="text-4xl font-semibold text-[var(--brown)]">{item.value}</div>
            <div className="mt-2 font-medium text-[var(--brown)]">{item.label}</div>
            <p className="mt-2 text-sm text-[var(--brown)]/70">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[var(--brown)]">Selected collaborators</h2>
            <p className="mt-2 max-w-2xl text-[var(--brown)]/80">
              Hospitality operators, SaaS founders, dan studio kreatif yang mempercayakan kami merancang pengalaman digital
              yang ringan namun bernilai tinggi.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--brown)] underline decoration-[var(--tan)] decoration-2 underline-offset-4"
          >
            View case notes <ArrowRight size={16} />
          </Link>
        </div>
        <div className="flex flex-wrap gap-3 text-sm font-medium text-[var(--brown)]/80">
          {clients.map((client) => (
            client.href ? (
              <a
                key={client.name}
                href={client.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--tan)] bg-white/60 px-4 py-2 transition hover:border-[var(--brown)]"
              >
                {client.name}
              </a>
            ) : (
              <span
                key={client.name}
                className="rounded-full border border-dashed border-[var(--tan)] bg-white/40 px-4 py-2"
              >
                {client.name}
              </span>
            )
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {quickLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-2xl border border-[var(--tan)] bg-white/70 p-6 transition hover:border-[var(--brown)]"
          >
            <div className="text-sm uppercase tracking-wide text-[var(--brown)]/60">{item.title}</div>
            <p className="mt-2 font-medium text-[var(--brown)]">{item.description}</p>
          </Link>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--brown)]">Certificates</h2>
        <p className="max-w-2xl text-[var(--brown)]/80">
          Verified credentials that showcase core web development expertise across responsive UI, accessibility, JavaScript,
          and performance.
        </p>
        <div className="flex flex-wrap gap-3">
          {certificates.map((certificate) => (
            <a
              key={certificate.title}
              href={certificate.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--brown)] bg-[var(--tan)]/30 px-4 py-2 text-sm font-medium text-[var(--brown)] transition hover:bg-[var(--tan)]/50"
            >
              {certificate.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
