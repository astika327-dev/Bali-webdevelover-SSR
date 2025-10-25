"use client";

import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

type AiResponse = {
  text: string;
  meta?: {
    warnings?: string[];
  };
};

const AiWidget = () => {
  const [response, setResponse] = useState<AiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAiResponse = async () => {
      try {
        const res = await fetch('/api/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // You can send a payload here if your API needs it
                prompt: "Berikan saya beberapa saran singkat tentang pengembangan web.",
            }),
        });
        if (!res.ok) {
          throw new Error('Gagal mengambil respons AI');
        }
        const data: AiResponse = await res.json();
        setResponse(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAiResponse();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-md">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
        <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
        BaliWebDev AI Assistant
      </h3>

      {isLoading && (
        <p className="text-sm text-gray-500 dark:text-gray-400">Memuat saran...</p>
      )}

      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
      )}

      {response && (
        <div>
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{response.text}</p>
            {response.meta?.warnings && response.meta.warnings.length > 0 && (
                <div className="mt-4 text-xs text-yellow-600 dark:text-yellow-500 border-l-2 border-yellow-500 pl-2">
                    {response.meta.warnings.map((warning, index) => (
                        <p key={index}>{warning}</p>
                    ))}
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default AiWidget;
