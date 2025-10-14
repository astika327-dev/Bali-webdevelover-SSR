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

export default function HomePage() {
  return (
    <section className="container py-12 md:py-20 space-y-16">
      <div>
        <p className="text-sm uppercase tracking-wider text-neutral-500">Independent Web Studio · Bali & Remote</p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mt-3">
          {site.tagline}.
        </h1>
        <p className="text-neutral-700 mt-4 max-w-2xl">{site.blurb}</p>
        <p className="text-neutral-600 mt-3 max-w-2xl" lang="id">
          {site.taglineId}. {""}
          Kami membantu bisnis hospitality dan kreatif tampil berkelas internasional tanpa kehilangan karakter lokal.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-black text-white"
          >
            Start a Project <ArrowRight size={18} />
          </Link>
          <Link href="/services" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border">
            View Services
          </Link>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="p-6 rounded-2xl border bg-white/70">
              <div className="font-semibold text-lg text-[var(--brown)]">{s.title}</div>
              <p className="text-neutral-600 mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="rounded-2xl border bg-[var(--cream)]/70 p-6">
            <div className="text-4xl font-semibold text-[var(--brown)]">{item.value}</div>
            <div className="mt-2 font-medium text-[var(--brown)]">{item.label}</div>
            <p className="mt-2 text-sm text-[var(--brown)]/70">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-[var(--brown)]">Trusted by boutique brands & founders</h2>
          <p className="text-[var(--brown)]/80 mt-2 max-w-2xl">
            Partnerships across hospitality, SaaS micro products, and creative studios. Every build is crafted with measurable
            goals and long-term maintainability.
          </p>
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
            {testimonials.map((testimonial) => (
              <blockquote
                key={testimonial.name}
                className="flex h-full flex-col justify-between rounded-2xl border bg-white/70 p-6"
              >
                <p className="text-sm text-neutral-700" lang={testimonial.locale}>
                  “{testimonial.quote}”
                </p>
                <footer className="mt-6 text-sm font-semibold text-[var(--brown)]">
                  <div>{testimonial.name}</div>
                  <div className="text-[var(--brown)]/70 font-normal">
                    {testimonial.role} · {testimonial.company}
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
                plan.badge ? 'border-[var(--brown)] shadow-[0_12px_40px_-20px_rgba(74,56,31,0.45)]' : 'border-[var(--tan)]'
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

