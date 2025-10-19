import { TrendItem } from '@/app/lib/trends'; // Pastikan path import ini benar

// 1. Definisikan tipe untuk props yang akan diterima
interface TrendingNewsProps {
  topics: TrendItem[];
}

// 2. Gunakan tipe props tersebut di dalam function
export default function TrendingNews({ topics }: TrendingNewsProps) {
  // Jangan render apapun jika tidak ada data topik
  if (!topics || topics.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            {/* Ikon petir */}
            <svg className="h-6 w-6 mr-2 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            Sedang Tren di Indonesia
        </h3>
        <div className="space-y-3">
            {topics.map((topic, index) => (
                <a 
                  key={index} 
                  href={topic.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group block text-sm"
                >
                    <p className="font-semibold text-gray-700 group-hover:text-amber-800 transition-colors">{topic.title}</p>
                    <p className="text-xs text-gray-500">{topic.source}</p>
                </a>
            ))}
        </div>
    </div>
  );
}
