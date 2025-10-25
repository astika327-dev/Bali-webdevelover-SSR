'use client';

import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const AiWidget = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResponse = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/ai');
        if (!res.ok) {
          throw new Error('Failed to fetch AI response');
        }
        const data = await res.json();

        // Handle both possible response structures
        if (data.text) {
          setResponse(data.text);
        } else if (data.reply && data.reply.content) {
          setResponse(data.reply.content);
        } else {
          throw new Error('Invalid AI response format');
        }

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
        // Set fallback message on error
        setResponse("Maaf, koneksi ke AI sedang sibuk. Silakan coba lagi nanti.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResponse();
  }, []);

  return (
    <div className="relative mt-12 rounded-xl bg-[var(--cream)] border border-[var(--tan)] shadow-lg p-6 max-w-2xl mx-auto text-center">
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[var(--brown)] text-white rounded-full p-3">
        <Sparkles size={24} />
      </div>
      <h3 className="text-xl font-bold text-[var(--brown)] mb-3 pt-4">Saran Cerdas dari AI</h3>
      <p className="text-md text-[var(--tan)] italic min-h-[48px] flex items-center justify-center">
        {isLoading ? 'Memuat saran...' : response}
      </p>
    </div>
  );
};

export default AiWidget;
