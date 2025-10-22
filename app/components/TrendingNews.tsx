import { NewsItem } from 'app/lib/trends'; // Menggunakan path langsung

interface TrendingNewsProps {
  topics: NewsItem[];
}

export default function TrendingNews({ topics }: TrendingNewsProps) {
  if (!topics || topics.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-4 3H9m-4 0H5m14 0h.01M5 7h2m4 0h2" /></svg>
          Berita Teknologi Terbaru
        </h3>
        <p className="text-sm text-gray-500">Tidak ada berita yang bisa ditampilkan saat ini.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            {/* Ikon koran/berita */}
            <svg className="h-5 w-5 mr-2 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-4 3H9m-4 0H5m14 0h.01M5 7h2m4 0h2" /></svg>
            Berita Teknologi Terbaru
        </h3>
        <div className="space-y-4">
            {topics.map((topic, index) => (
                <a 
                  key={index} 
                  href={topic.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group block text-sm border-b border-gray-100 pb-2 last:border-b-0"
                >
                    <p className="font-semibold text-gray-700 group-hover:text-amber-800 transition-colors leading-snug">{topic.title}</p>
                </a>
            ))}
        </div>
    </div>
  );
}
