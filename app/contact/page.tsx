"use client";
import { useState, type FC, type InputHTMLAttributes } from "react";
import { contactSchema, type ContactPayload } from "@/lib/validation";
import { Mail, MessageSquare, MapPin, Loader2, Instagram, Facebook } from "lucide-react"; // <-- ICON BARU DITAMBAHKAN

// -----------------------------------------------------------------------------
// Reusable Input Field Component (TIDAK ADA PERUBAHAN)
// -----------------------------------------------------------------------------
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
  as?: "input" | "textarea";
  rows?: number;
}

const InputField: FC<InputFieldProps> = ({ id, label, error, as = "input", ...props }) => {
  const InputComponent = as;
  const commonClasses = "w-full rounded-lg px-3 py-2 border bg-transparent focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200";
  const errorClasses = "border-red-500 focus:border-red-500 focus:ring-red-500";
  const normalClasses = "border-neutral-300";

  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" htmlFor={id}>
        {label}
      </label>
      <InputComponent
        id={id}
        className={`${commonClasses} ${error ? errorClasses : normalClasses}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};


// -----------------------------------------------------------------------------
// Reusable Contact Info Card Component (TIDAK ADA PERUBAHAN)
// -----------------------------------------------------------------------------
interface ContactInfoCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const ContactInfoCard: FC<ContactInfoCardProps> = ({ icon, title, children }) => (
  <div className="flex items-start gap-4 p-5 rounded-2xl border bg-white/70">
    <div className="flex-shrink-0 w-8 h-8 mt-1 text-neutral-600">{icon}</div>
    <div>
      <h3 className="font-semibold text-neutral-800">{title}</h3>
      <div className="text-sm text-neutral-600 mt-1">{children}</div>
    </div>
  </div>
);


// -----------------------------------------------------------------------------
// Main Contact Page Component (PERUBAHAN DI SINI)
// -----------------------------------------------------------------------------
export default function ContactPage() {
  const [form, setForm] = useState<ContactPayload>({ name: "", email: "", whatsapp: undefined, message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactPayload, string | undefined>>>({});
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message?: string }>({ type: "idle" });

  function updateField<K extends keyof ContactPayload>(key: K, value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: (key === "whatsapp" && value.trim() === "") ? undefined : value,
    }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ type: "loading" });

    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        whatsapp: fieldErrors.whatsapp?.[0],
        message: fieldErrors.message?.[0],
      });
      setStatus({ type: "error", message: "Please review the form and correct any errors." });
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
        setStatus({ type: "error", message: data.error || "An unexpected error occurred. Please try again." });
        return;
      }
      setStatus({ type: "success", message: "Thank you! We'll get back to you within one business day." });
      setForm({ name: "", email: "", whatsapp: undefined, message: "" });
    } catch (error) {
      setStatus({ type: "error", message: "A network error occurred. Please check your connection." });
    }
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const emailAddress = process.env.NEXT_PUBLIC_PUBLIC_EMAIL;
  
  // --- Ganti dengan URL profil media sosial Anda ---
  const instagramUrl = "https://instagram.com/baliwebdevelover";
  const facebookUrl = "https://facebook.com/share/17df5guFcR/";

  return (
    <section className="container py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Let's Start a Conversation</h1>
        <p className="text-neutral-600 mt-4 text-lg">
          Have a project in mind or just want to say hello? Fill out the form below or reach out to us through one of our contact channels.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mt-12 max-w-6xl mx-auto">
        <form onSubmit={onSubmit} className="space-y-5">
          <InputField
            id="name"
            label="Full Name"
            name="name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            error={errors.name}
            required
          />
          <InputField
            id="email"
            label="Email Address"
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            error={errors.email}
            required
          />
          <InputField
            id="whatsapp"
            label="WhatsApp Number"
            name="whatsapp"
            value={form.whatsapp ?? ""}
            onChange={(e) => updateField("whatsapp", e.target.value)}
            error={errors.whatsapp}
            placeholder="Optional, e.g., +62 812 3456 7890"
          />
          <InputField
            id="message"
            label="Tell us about your project"
            as="textarea"
            name="message"
            rows={6}
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            error={errors.message}
            required
          />

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-2.5 font-medium disabled:cursor-not-allowed disabled:bg-neutral-400 transition-colors"
              disabled={status.type === "loading"}
            >
              {status.type === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
            {status.type !== "idle" && status.message && (
              <div className={`text-sm ${status.type === "success" ? "text-emerald-600" : "text-red-600"}`} role="alert">
                {status.message}
              </div>
            )}
          </div>
        </form>

        <div className="space-y-4">
          <ContactInfoCard icon={<Mail size={24} />} title="Email">
            {emailAddress ? (
              <>
                <p className="mb-3">Get in touch via email for detailed inquiries.</p>
                {/* --- PERUBAHAN DESAIN TOMBOL EMAIL --- */}
                <a className="inline-block text-sm font-medium text-black bg-white border border-neutral-300 rounded-full px-4 py-2 hover:bg-neutral-50 transition-colors" href={`mailto:${emailAddress}`}>
                  {emailAddress}
                </a>
              </>
            ) : (
              <span className="text-xs">Email address is not configured.</span>
            )}
          </ContactInfoCard>
          
          <ContactInfoCard icon={<MessageSquare size={24} />} title="WhatsApp">
            {whatsappNumber ? (
              <>
                <p className="mb-3">For a faster response, chat with us directly.</p>
                 {/* --- PERUBAHAN DESAIN TOMBOL WHATSAPP --- */}
                <a className="inline-block text-sm font-medium text-black bg-white border border-neutral-300 rounded-full px-4 py-2 hover:bg-neutral-50 transition-colors" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
                  Chat on WhatsApp
                </a>
              </>
            ) : (
              <span className="text-xs">WhatsApp is not configured.</span>
            )}
          </ContactInfoCard>
          
          <ContactInfoCard icon={<MapPin size={24} />} title="Our Office">
            Bali, Indonesia <br />
            (Remote-first company)
          </ContactInfoCard>

          {/* --- BAGIAN BARU: SOCIAL MEDIA --- */}
          <div className="pt-4">
            <h3 className="font-semibold text-neutral-800">Find Us Elsewhere</h3>
            <div className="flex items-center gap-3 mt-3">
              <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 rounded-full border bg-white/70 hover:bg-neutral-100 transition-colors">
                <Instagram size={20} className="text-neutral-600" />
              </a>
              <a href={facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook" className="p-2 rounded-full border bg-white/70 hover:bg-neutral-100 transition-colors">
                <Facebook size={20} className="text-neutral-600" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
