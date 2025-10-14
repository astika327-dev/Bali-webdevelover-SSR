import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import {
  certificates,
  services,
  site,
  plans,
  stats,
  testimonials,
  clients,
} from "@/content/config";

const quickLinks = [
  {
    href: "/services",
    title: "Services",
    description:
      "Detail scopes, pricing ranges, and add-ons for hospitality and creative brands.",
  },
  {
    href: "/portfolio",
    title: "Portfolio",
    description:
      "See selected builds and UI explorations with notes on process and stack.",
  },
  {
    href: "/contact",
    title: "Project intake",
    description:
      "Share goals, brand context, and timeline preferences to receive a tailored plan.",
  },
];

export default function HomePage() {
  return (
    <section className="container space-y-16 py-12 md:py-20">
      {/* Hero + How we work */}
      <div className="grid gap-10 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] md:items-start">
        <div>
          <p className="text-sm uppercase tracking-wider text-neutral-500">
            Independent Web Studio · Bali & Remote
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
            {site.tagline}.
          </h1>
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
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border px-5 py-3"
            >
              View Services
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--tan)] bg-white/80 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[var(--brown)]">
            How engagements are structured
          </h2>
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

      {/* Focus areas / Services */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-[var(--brown)]">Focus areas</h2>
          <p className="mt-2 max-w-2xl text-[var(--brown)]/80">
            Polished marketing sites, conversion-first landing pages, dan micro app ringan untuk brand boutique yang ingin
            tampil profesional.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl border bg-white/70 p-6">
              <div className="text-lg font-semibold text-[var(--brown)]">{s.title}</div>
              <p className="mt-2 text-neutral-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl border bg-[var(--cream)]/80 p-6">
            <div className="text-4xl font-semibold text-[var(--brown)]">{item.value}</div>
            <div className="mt-2 font-medium text-[var(--brown)]">{item.label}</div>
            <p className="mt-2 text-sm text-[var(--brown)]/70">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Collaborators + Clients */}
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
          {clients.map((client) =>
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
          )}
        </div>
      </div>

      {/* Testimonials or private references */}
      {testimonials.length > 0 ? (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-[var(--brown)]">Client testimonials</h2>
            <p className="text-[var(--brown)]/80 mt-2 max-w-2xl">
              Real feedback from ongoing retainers and launch projects. Kami bekerja langsung dengan decision maker untuk
              memastikan hasil akhir sesuai strategi brand.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="flex h-full flex-col justify-between rounded-2xl border bg-white/70 p-6"
              >
                <p className="text-sm text-neutral-700" lang={t.locale}>
                  “{t.quote}”
                </p>
                <footer className="mt-6 text-sm font-semibold text-[var(--brown)]">
                  <div>{t.name}</div>
                  <div className="text-[var(--brown)]/70 font-normal">
                    {t.role} · {t.company}
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-[var(--brown)]">Client results</h2>
            <p className="text-[var(--brown)]/80 mt-2 max-w-2xl">
              Testimoni publik masih dalam proses. Hubungi kami untuk melihat studi kasus, demo proyek, atau berbicara langsung
              dengan klien aktif kami.
            </p>
          </div>
          <div className="rounded-2xl border bg-white/70 p-6">
            <p className="text-sm text-neutral-700">
              Kami menyiapkan dokumentasi proyek dan referensi yang bisa dibagikan secara privat setelah Anda menghubungi tim
              kami.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--brown)] px-4 py-2 text-sm font-medium text-[var(--brown)] transition hover:bg-[var(--tan)]/40"
            >
              Request references <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}

      {/* Popular engagements / Plans */}
      <div className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[var(--brown)]">Popular engagements</h2>
            <p className="text-[var(--brown)]/80 mt-2 max-w-2xl">
              Transparent pricing with deliverables, revisions, and maintenance baked in. Pilih paket yang paling cocok dengan
              fase bisnis Anda, atau kombinasikan dengan add-on khusus industri hospitality.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--brown)] underline decoration-[var(--tan)] decoration-2 underline-offset-4"
          >
            See full service menu <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex h-full flex-col rounded-2xl border bg-white/80 p-6 shadow-sm ${
                plan.badge
                  ? "border-[var(--brown)] shadow-[0_12px_40px_-20px_rgba(74,56,31,0.45)]"
                  : "border-[var(--tan)]"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm uppercase tracking-wide text-[var(--brown)]/70">{plan.subtitle}</div>
                  <h3 className="text-2xl font-semibold text-[var(--brown)]">{plan.name}</h3>
                </div>
                {plan.badge && (
                  <span className="rounded-full bg-[var(--brown)] px-3 py-1 text-xs font-semibold text-[var(--cream)]">
                    {plan.badge}
                  </span>
                )}
              </div>
              <div className="mt-3 text-3xl font-semibold text-[var(--brown)]">{plan.price}</div>
              <p className="mt-2 text-sm text-neutral-600">{plan.eta}</p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                {plan.features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 text-[var(--brown)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--brown)] px-4 py-2 text-sm font-medium text-[var(--brown)] transition hover:bg-[var(--tan)]/40"
              >
                {plan.cta} <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
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

      {/* Certificates */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--brown)]">Certificates</h2>
        <p className="text-[var(--brown)]/80 max-w-2xl">
          Verified credentials that showcase core web development expertise across responsive UI, accessibility, JavaScript, and
          performance.
        </p>
        <div className="flex flex-wrap gap-3">
          {certificates.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full border border-[var(--brown)] text-[var(--brown)] bg-[var(--tan)]/30 hover:bg-[var(--tan)]/50 text-sm font-medium transition"
            >
              {c.title}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
