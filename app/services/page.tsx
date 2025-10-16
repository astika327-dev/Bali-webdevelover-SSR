import { addons, plans } from "@/content/config";
import { Check } from "lucide-react";
import Link from 'next/link'; // 1. Impor komponen Link

export default function ServicesPage() {
  return (
    <section className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Pricing Plans</h1>
      <p className="text-neutral-600 mt-2">Built for founders, villas, cafés, MSMEs, and growing brands.</p>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {plans.map((p) => (
          <div key={p.name} className="rounded-2xl border bg-white/70 p-6 flex flex-col">
            {p.badge && <div className="text-xs self-start px-2 py-0.5 rounded-full bg-black text-white">{p.badge}</div>}
            <div className="mt-2">
              <div className="text-sm text-neutral-500">{p.subtitle}</div>
              <h2 className="text-2xl font-semibold">{p.name}</h2>
            </div>
            <div className="text-3xl font-semibold mt-4">{p.price}</div>
            <ul className="mt-4 space-y-2 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check size={16} className="mt-1" /> <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-sm text-neutral-600">{p.eta}</div>
            
            {/* --- BAGIAN YANG DIPERBAIKI --- */}
            <Link 
              href="/contact" 
              className="mt-6 rounded-full border px-4 py-2 text-center hover:bg-neutral-50"
            >
              {p.cta}
            </Link>
            {/* --------------------------- */}
            
          </div>
        ))}
      </div>

      {/* ... sisa kode Anda tetap sama ... */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold">Add-ons</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-4">
          {addons.map(a => (
            <div key={a.title} className="rounded-2xl border bg-white/70 p-5">
              <div className="font-semibold">{a.title}</div>
              <p className="text-neutral-600 mt-2">{a.desc}</p>
              <div className="text-sm mt-3">{a.from}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-sm text-neutral-600">
        <h3 className="font-semibold">FAQ</h3>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>All plans include design, build, on‑page SEO, and basic analytics. Domain/hosting and paid third‑party tools are billed separately unless specified in a proposal.</li>
          <li>Each plan includes the stated revision rounds. Additional rounds or scope changes can be added as extras.</li>
          <li>Payments are typically split 50% to start and 50% on launch. Timelines adjust once content is finalized.</li>
          <li>Care Plan includes small content updates, uptime checks, and scheduled backups. Bigger features are quoted separately.</li>
        </ul>
      </div>
    </section>
  );
}