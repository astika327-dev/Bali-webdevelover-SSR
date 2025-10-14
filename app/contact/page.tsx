"use client";
import { useState } from "react";
import { contactSchema, type ContactPayload } from "@/lib/validation";

export default function ContactPage() {
  const [form, setForm] = useState<ContactPayload>({ name: "", email: "", whatsapp: undefined, message: "" });
  const [errors, setErrors] = useState<Record<keyof ContactPayload, string | undefined>>({
    name: undefined,
    email: undefined,
    whatsapp: undefined,
    message: undefined,
  });
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message?: string }>({
    type: "idle",
  });

  function updateField<K extends keyof ContactPayload>(key: K, value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: (key === "whatsapp" && value.trim() === "") ? undefined : value,
    }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending your message..." });

    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        whatsapp: fieldErrors.whatsapp?.[0],
        message: fieldErrors.message?.[0],
      });
      setStatus({ type: "error", message: "Please fix the highlighted fields." });
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus({ type: "error", message: data.error || "Something went wrong. Please try again." });
        return;
      }
      setStatus({ type: "success", message: "Thanks — we will reply within one business day." });
      setForm({ name: "", email: "", whatsapp: undefined, message: "" });
    } catch (error) {
      setStatus({ type: "error", message: "Network error. Please try again." });
    }
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const emailAddress = process.env.NEXT_PUBLIC_PUBLIC_EMAIL;

  return (
    <section className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Contact</h1>
      <p className="text-neutral-600 mt-2">Tell me about your project. I usually reply within a day.</p>
      <p className="text-neutral-500 mt-1" lang="id">
        Ceritakan kebutuhan websitemu. Kami membalas maksimal dalam 1 hari kerja.
      </p>

      <div className="grid md:grid-cols-2 gap-10 mt-8">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className={`w-full rounded-lg px-3 py-2 border ${errors.name ? "border-red-500 focus:border-red-500" : "border-neutral-300 focus:border-black"}`}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              required
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-xs text-red-600">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className={`w-full rounded-lg px-3 py-2 border ${errors.email ? "border-red-500 focus:border-red-500" : "border-neutral-300 focus:border-black"}`}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              required
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-600">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="whatsapp">
              WhatsApp Number
            </label>
            <input
              id="whatsapp"
              name="whatsapp"
              value={form.whatsapp ?? ""}
              onChange={(event) => updateField("whatsapp", event.target.value)}
              className={`w-full rounded-lg px-3 py-2 border ${errors.whatsapp ? "border-red-500 focus:border-red-500" : "border-neutral-300 focus:border-black"}`}
              aria-invalid={Boolean(errors.whatsapp)}
              aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
              placeholder="Optional"
            />
            {errors.whatsapp && (
              <p id="whatsapp-error" className="mt-1 text-xs text-red-600">
                {errors.whatsapp}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="message">
              Project details
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              className={`w-full rounded-lg px-3 py-2 border ${errors.message ? "border-red-500 focus:border-red-500" : "border-neutral-300 focus:border-black"}`}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              required
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-xs text-red-600">
                {errors.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="rounded-full bg-black text-white px-5 py-2 disabled:cursor-not-allowed disabled:bg-neutral-400"
            disabled={status.type === "loading"}
          >
            {status.type === "loading" ? "Sending…" : "Send Message"}
          </button>
          {status.type !== "idle" && status.message && (
            <div
              className={`text-sm ${status.type === "success" ? "text-emerald-600" : "text-red-600"}`}
              role={status.type === "error" ? "alert" : undefined}
            >
              {status.message}
            </div>
          )}
        </form>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl border">
            <div className="text-sm text-neutral-500">WhatsApp</div>
            {whatsappNumber ? (
              <a className="text-blue-600 underline" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
                Chat on WhatsApp
              </a>
            ) : (
              <p className="text-xs text-neutral-500">WhatsApp number coming soon. Add NEXT_PUBLIC_WHATSAPP_NUMBER.</p>
            )}
          </div>
          <div className="p-5 rounded-2xl border">
            <div className="text-sm text-neutral-500">Email</div>
            {emailAddress ? (
              <a className="text-blue-600 underline" href={`mailto:${emailAddress}`}>
                Send Email
              </a>
            ) : (
              <p className="text-xs text-neutral-500">Email channel unavailable. Set NEXT_PUBLIC_PUBLIC_EMAIL.</p>
            )}
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
