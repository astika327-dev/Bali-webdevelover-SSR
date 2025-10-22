'use client';
import { Analytics } from "@vercel/analytics/next"
import Link from 'next/link';
import type { Route } from 'next';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Send, Sparkles, Loader2 } from 'lucide-react';
import { certificates, services, site } from '../content/config';

/* =========================
   AI Widget (inline)
   ========================= */
type ChatMessage = { role: 'user' | 'assistant'; content: string };

const SUGGESTIONS = [
  'How do I speed up Core Web Vitals on my site?',
  'What stack fits a villa booking site in Bali?',
  'Give me quick on-page SEO wins.',
];

function AIWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hi, I'm your project copilot. Ask about performance, SEO, stack choices, or content structure.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const next = [...messages, { role: 'user', content: text.trim() } as ChatMessage];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-12) }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        const message = data?.error || `Request failed (${res.status})`;
        throw new Error(message);
      }

      const content = data?.reply?.content?.toString().trim();
      if (!content) {
        throw new Error('Assistant returned an empty reply.');
      }

      const warning = typeof data?.meta?.warning === 'string' ? data.meta.warning : null;
      const combined = warning ? `${content}\n\n(${warning})` : content;

      setMessages((m) => [...m, { role: 'assistant', content: combined }]);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unexpected error';
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content: `Sorry, the assistant couldn't reply. ${message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="rounded-2xl border border-[var(--tan)] bg-[var(--cream)]/90 p-6 shadow-sm"
      aria-label="AI Assistant"
    >
      <div className="flex items-center gap-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brown)] px-3 py-1 text-[var(--brown)]">
          <Sparkles size={16} />
          <span className="text-sm font-medium">AI Project BaliWebDev</span>
        </div>
        <span className="text-xs text-[var(--brown)]/70">Advises on performance, SEO, and stack</span>
      </div>

      {/* Chat area */}
      <div
        ref={listRef}
        className="mt-4 h-72 w-full overflow-y-auto rounded-xl border border-[var(--tan)] bg-white/70 p-4"
      >
        <div className="space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.role === 'user'
                  ? 'ml-auto max-w-[85%] rounded-2xl bg-[var(--tan)]/40 px-3 py-2 text-[var(--brown)]'
                  : 'mr-auto max-w-[85%] rounded-2xl border border-[var(--tan)] bg-[var(--cream)] px-3 py-2 text-[var(--brown)]'
              }
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="mr-auto inline-flex items-center gap-2 rounded-2xl border border-[var(--tan)] bg-[var(--cream)] px-3 py-2 text-[var(--brown)]">
              <Loader2 className="h-4 w-4 animate-spin" />
              Thinking…
            </div>
          )}
        </div>
      </div>

      {/* Suggestions */}
      <div className="mt-3 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => sendMessage(s)}
            className="rounded-full border border-[var(--brown)] bg-[var(--tan)]/30 px-3 py-1.5 text-xs text-[var(--brown)] hover:bg-[var(--tan)]/50 transition"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        className="mt-3 flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about SEO, performance, stack, content structure…"
          className="flex-1 min-w-0 rounded-xl border border-[var(--tan)] bg-white/70 px-3 py-2 text-[var(--brown)] placeholder:text-[var(--brown)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--tan)]"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="inline-flex flex-shrink-0 items-center gap-2 rounded-xl border border-[var(--brown)] bg-[var(--brown)] px-3 py-2 text-[var(--cream)] disabled:opacity-60"
        >
          <Send size={16} />
          Send
        </button>
      </form>

      <p className="mt-2 text-xs text-[var(--brown)]/60">
        Tips are AI-generated and may need expert review for regulated topics.
      </p>
    </section>
  );
}
/* =========================
   Home Page
   ========================= */
export default function HomePage() {
  return (
    <section className="container py-12 md:py-20 space-y-16">
      {/* Hero */}
      <div>
        <p className="text-sm uppercase tracking-wider text-[var(--brown)]/70">
          Independent Boutique Web Studio · Bali & Remote
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mt-3 text-[var(--brown)]">
          {site.tagline}.
        </h1>
        <p className="text-[var(--brown)]/80 mt-4 max-w-2xl">{site.blurb}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={'/contact' as Route}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--brown)] text-[var(--cream)] hover:bg-opacity-90 transition"
          >
            Start a Project <ArrowRight size={18} />
          </Link>
          <Link
            href={'/services' as Route}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--brown)] text-[var(--brown)] hover:bg-[var(--tan)]/40 transition"
          >
            View Services
          </Link>
        </div>

        {/* Services preview */}
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="p-6 rounded-2xl border border-[var(--tan)] bg-[var(--cream)]/80 shadow-sm hover:shadow-md transition"
            >
              <div className="font-semibold text-lg text-[var(--brown)]">{s.title}</div>
              <p className="text-[var(--brown)]/80 mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Widget (mengganti bagian harga) */}
      <AIWidget />

      {/* Certificates */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--brown)]">Certificates</h2>
        <p className="text-[var(--brown)]/80 max-w-2xl">
          Verified credentials covering responsive UI, accessibility, JavaScript, and performance.
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
