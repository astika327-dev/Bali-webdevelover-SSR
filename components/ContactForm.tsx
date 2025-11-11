"use client";
import { useState, type FC, type InputHTMLAttributes } from "react";
import { contactSchema, type ContactPayload } from "@/lib/validation";
import { Mail, MessageSquare, MapPin, Loader2, Instagram, Facebook, Github } from "lucide-react";

// Reusable Input Field Component
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
  as?: "input" | "textarea";
  rows?: number;
}

const InputField: FC<InputFieldProps> = ({ id, label, error, as = "input", ...props }) => {
  const InputComponent = as;
  const commonClasses = "peer w-full rounded-lg px-3 py-2 border bg-transparent focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200";
  const errorClasses = "border-red-500 focus:border-red-500 focus:ring-red-500";
  const normalClasses = "border-neutral-300";

  return (
    <div className="relative">
      <InputComponent
        id={id}
        className={`${commonClasses} ${error ? errorClasses : normalClasses}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        placeholder=" "
        {...props}
      />
      <label
        htmlFor={id}
        className="absolute left-3 -top-2.5 text-xs text-neutral-500 bg-white px-1 transition-all duration-200 ease-in-out peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-black"
      >
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

// Main Contact Form Component
interface ContactFormProps {
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  submitButtonText: string;
  successMessage: string;
  errorMessage: string;
}

export const ContactForm: FC<ContactFormProps> = ({
  namePlaceholder,
  emailPlaceholder,
  messagePlaceholder,
  submitButtonText,
  successMessage,
  errorMessage,
}) => {
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
      setStatus({ type: "success", message: successMessage });
      setForm({ name: "", email: "", whatsapp: undefined, message: "" });
    } catch (error) {
      setStatus({ type: "error", message: errorMessage });
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <InputField
        id="name"
        label={namePlaceholder}
        name="name"
        value={form.name}
        onChange={(e) => updateField("name", e.target.value)}
        error={errors.name}
        required
      />
      <InputField
        id="email"
        label={emailPlaceholder}
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
        label={messagePlaceholder}
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
          className="inline-flex items-center justify-center rounded-full bg-amber-100 text-amber-900 px-6 py-2.5 font-medium hover:bg-amber-200 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500 transition-colors"
          disabled={status.type === "loading"}
        >
          {status.type === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            submitButtonText
          )}
        </button>
        {status.type !== "idle" && status.message && (
          <div className={`text-sm ${status.type === "success" ? "text-emerald-600" : "text-red-600"}`} role="alert">
            {status.message}
          </div>
        )}
      </div>
    </form>
  );
};
