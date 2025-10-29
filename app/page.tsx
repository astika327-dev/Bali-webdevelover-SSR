'use client';
import Link from 'next/link';
import type { Route } from 'next';
import { ArrowRight, Send, Sparkles } from 'lucide-react';
import { useState, useEffect, FormEvent, useRef } from 'react';
import { certificates, services, site } from '../content/config';
import { useLanguage } from '../context/LanguageContext';

// Tipe untuk pesan chat
type Message = {
  role: 'user' | 'assistant';
  content: string;
};

/* =========================
   Home Page
   ========================= */
export default function HomePage() {
  const { t } = useLanguage();

  // State untuk AI Chat
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Halo! Saya BaliWebDev AI. Ada yang bisa saya bantu seputar pengembangan web atau layanan yang tersedia?",
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll ke pesan terakhir
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handler untuk mengirim pesan
  const handleSubmit = async (e: FormEvent<HTMLFormElement> | null = null, suggestedInput: string | null = null) => {
    if (e) e.preventDefault();
    const currentInput = suggestedInput || userInput;
    if (!currentInput.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: currentInput }];
    setMessages(newMessages);
    // Clear input only if it was not a suggestion click
    if (!suggestedInput) {
      setUserInput('');
    }
    setIsAiLoading(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();

      if (data.reply && data.reply.content) {
        setMessages([...newMessages, { role: 'assistant', content: data.reply.content }]);
      } else {
        throw new Error('Invalid AI response format');
      }

    } catch (error) {
      console.error("Failed to get AI response:", error);
      setMessages([...newMessages, { role: 'assistant', content: "Maaf, terjadi kesalahan. Silakan coba lagi." }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    // We don't set user input here because the form submission handles the message sending
    handleSubmit(null, suggestion);
  };

  return (
    <section className="container py-12 md:py-20 space-y-16">
      {/* Hero */}
      <div>
        <p className="text-sm uppercase tracking-wider text-[var(--brown)]/70">
          {t('hero.subtitle')}
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mt-3 text-[var(--brown)]">
          {t('hero.title')}
        </h1>
        <p className="text-[var(--brown)]/80 mt-4 max-w-2xl">{t('site.blurb')}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={'/contact' as Route}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--brown)] text-[var(--cream)] hover:bg-opacity-90 transition"
          >
            {t('home.start_project')} <ArrowRight size={18} />
          </Link>
          <Link
            href={'/services' as Route}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--brown)] text-[var(--brown)] hover:bg-[var(--tan)]/40 transition"
          >
            {t('home.view_services')}
          </Link>
        </div>

        {/* Services preview */}
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-[var(--tan)] bg-[var(--cream)]/80 shadow-sm hover:shadow-md transition">
            <div className="font-semibold text-lg text-[var(--brown)]">{t('services.custom_websites.title')}</div>
            <p className="text-[var(--brown)]/80 mt-2">{t('services.custom_websites.desc')}</p>
          </div>
          <div className="p-6 rounded-2xl border border-[var(--tan)] bg-[var(--cream)]/80 shadow-sm hover:shadow-md transition">
            <div className="font-semibold text-lg text-[var(--brown)]">{t('services.performance_seo.title')}</div>
            <p className="text-[var(--brown)]/80 mt-2">{t('services.performance_seo.desc')}</p>
          </div>
          <div className="p-6 rounded-2xl border border-[var(--tan)] bg-[var(--cream)]/80 shadow-sm hover:shadow-md transition">
            <div className="font-semibold text-lg text-[var(--brown)]">{t('services.care_maintenance.title')}</div>
            <p className="text-[var(--brown)]/80 mt-2">{t('services.care_maintenance.desc')}</p>
          </div>
        </div>
      </div>

      {/* AI Chat Widget */}
      <div className="relative mt-12 rounded-xl bg-white/60 border border-[var(--tan)] shadow-lg p-4 max-w-2xl mx-auto">
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[var(--brown)] text-white rounded-full p-3 shadow-md">
          <Sparkles size={24} />
        </div>
        <h3 className="text-xl font-bold text-[var(--brown)] mb-3 pt-4 text-center">BaliWebDev AI</h3>

        <div
          ref={chatContainerRef}
          className="h-72 overflow-y-auto p-4 space-y-4 rounded-lg border border-[var(--tan)]/50 bg-[var(--tan)]/20 mb-4"
        >
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-2xl shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-[var(--brown)] text-white'
                    : 'bg-white/80 text-[var(--brown)] border border-[var(--tan)]/80'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
          {isAiLoading && (
            <div className="flex justify-start">
              <div className="max-w-xs md:max-w-md p-3 rounded-2xl bg-gray-200 text-gray-800">
                <p className="text-sm italic">AI sedang mengetik...</p>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ketik pertanyaan Anda..."
            className="flex-grow p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-[var(--tan)] focus:outline-none transition"
            disabled={isAiLoading}
          />
          <button
            type="submit"
            className="p-3 rounded-full bg-[var(--brown)] text-white hover:bg-opacity-90 disabled:bg-opacity-50 transition"
            disabled={isAiLoading || !userInput.trim()}
          >
            <Send size={20} />
          </button>
        </form>
        <div className="flex flex-wrap gap-2 mt-3 justify-center">
          <button onClick={() => handleSuggestionClick("Apa saja layanan yang ditawarkan?")} className="px-3 py-1 text-xs rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition">Layanan yang ditawarkan</button>
          <button onClick={() => handleSuggestionClick("Bagaimana cara meningkatkan SEO website?")} className="px-3 py-1 text-xs rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition">Tanya soal SEO</button>
          <button onClick={() => handleSuggestionClick("Jelaskan tentang React.js")} className="px-3 py-1 text-xs rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition">Tanya soal Teknologi</button>
        </div>
      </div>

      {/* Certificates */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--brown)]">{t('home.certificates.title')}</h2>
        <p className="text-[var(--brown)]/80 max-w-2xl">
          {t('home.certificates.description')}
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
