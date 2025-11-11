'use client';

import { useState, useEffect, FormEvent, useRef } from 'react';
import { Send, Sparkles, Bot, X } from 'lucide-react';

// Tipe untuk pesan chat
type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
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
    if (isOpen && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  // Handler untuk mengirim pesan
  const handleSubmit = async (e: FormEvent<HTMLFormElement> | null = null, suggestedInput: string | null = null) => {
    if (e) e.preventDefault();
    const currentInput = suggestedInput || userInput;
    if (!currentInput.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: currentInput }];
    setMessages(newMessages);
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

      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      if (data.reply?.content) {
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
    handleSubmit(null, suggestion);
  };

  return (
    <>
      {/* Chat Window (Modal) */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-8 w-[calc(100%-2rem)] max-w-lg mx-auto rounded-xl bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 shadow-2xl z-50">
          <div className="relative p-4 sm:p-5">
            {/* Header */}
            <div className="flex justify-between items-center pb-3 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="bg-white dark:bg-neutral-900 text-amber-800 dark:text-amber-300 rounded-full p-2 shadow-md border border-neutral-200/50 dark:border-neutral-700/50">
                  <Sparkles size={22} />
                </div>
                <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">BaliWebDev AI</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-full text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition">
                <X size={20} />
              </button>
            </div>

            {/* Chat content */}
            <div ref={chatContainerRef} className="h-72 overflow-y-auto p-4 space-y-4 bg-neutral-100/50 dark:bg-neutral-800/20 my-4 rounded-lg">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs md:max-w-md p-3 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-amber-800 dark:bg-amber-600 text-white' : 'bg-white/80 dark:bg-neutral-800/80 text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-700/80'}`}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isAiLoading && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-2xl bg-gray-200 dark:bg-neutral-700 text-gray-800 dark:text-gray-200 animate-pulse">
                    <p className="text-sm italic">AI sedang mengetik...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Input form & suggestions */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3 justify-center">
                  <button onClick={() => handleSuggestionClick("Apa saja layanan yang ditawarkan?")} className="px-3 py-1.5 text-xs rounded-full bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 text-neutral-700/80 dark:text-neutral-300/80 hover:bg-neutral-100/40 dark:hover:bg-neutral-700/40 transition">Layanan</button>
                  <button onClick={() => handleSuggestionClick("Ceritakan tentang portofolio Anda")} className="px-3 py-1.5 text-xs rounded-full bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 text-neutral-700/80 dark:text-neutral-300/80 hover:bg-neutral-100/40 dark:hover:bg-neutral-700/40 transition">Portofolio</button>
                  <button onClick={() => handleSuggestionClick("Bagaimana pendekatan Anda terhadap SEO?")} className="px-3 py-1.5 text-xs rounded-full bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 text-neutral-700/80 dark:text-neutral-300/80 hover:bg-neutral-100/40 dark:hover:bg-neutral-700/40 transition">Tentang SEO</button>
              </div>
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Tanya tentang layanan..."
                  className="flex-grow p-3 rounded-full border border-neutral-300/80 dark:border-neutral-700/80 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-800 focus:outline-none transition"
                  disabled={isAiLoading}
                />
                <button
                  type="submit"
                  className="p-3 rounded-full bg-amber-800 dark:bg-amber-600 text-white hover:bg-opacity-90 disabled:bg-opacity-50 transition flex-shrink-0"
                  disabled={isAiLoading || !userInput.trim()}
                  aria-label="Kirim pesan"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:right-8 z-40 p-4 rounded-full bg-amber-800 dark:bg-amber-600 text-white shadow-lg hover:bg-opacity-90 transition transform hover:scale-110"
        aria-label="Open AI Chat"
      >
        <Bot size={24} />
      </button>
    </>
  );
}
