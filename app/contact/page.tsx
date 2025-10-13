"use client";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Sending...");
    const form = e.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    setStatus(data.ok ? "Thanks — I'll reply within a day." : data.error || "Something went wrong.");
    if (data.ok) form.reset();
  }

  return (
    <section className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Contact</h1>
      <p className="text-neutral-600 mt-2">Tell me about your project. I usually reply within a day.</p>

      <div className="grid md:grid-cols-2 gap-10 mt-8">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input name="name" required className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" name="email" required className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">WhatsApp Number</label>
            <input name="whatsapp" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Project details</label>
            <textarea name="message" rows={6} className="w-full border rounded-lg px-3 py-2" />
          </div>
          <button className="rounded-full bg-black text-white px-5 py-2">Send Message</button>
          {status && <div className="text-sm text-neutral-700">{status}</div>}
        </form>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl border">
            <div className="text-sm text-neutral-500">WhatsApp</div>
            <a className="text-blue-600 underline" href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}`} target="_blank">Chat on WhatsApp</a>
          </div>
          <div className="p-5 rounded-2xl border">
            <div className="text-sm text-neutral-500">Email</div>
            <a className="text-blue-600 underline" href={`mailto:${process.env.NEXT_PUBLIC_PUBLIC_EMAIL || ""}`}>Send Email</a>
          </div>
          <div className="p-5 rounded-2xl border">
            <div className="text-sm text-neutral-500">Based in</div>
            <div>Bali, Indonesia</div>
          </div>
        </div>
      </div>
    </section>
  );
}
