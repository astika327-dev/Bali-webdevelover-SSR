import { getAllPostsMetadata } from 'app/lib/posts';
import { getTrendingNews } from 'app/lib/trends';
import { Metadata } from 'next';
import BlogListClient from './BlogListClient'; // <- Impor komponen client kita
import TrendingNews from 'app/components/TrendingNews';

// Metadata untuk SEO
export const metadata: Metadata = {
  title: 'Blog | Bali Web Develover',
  description: 'Artikel, panduan, dan wawasan terbaru seputar web development, SEO, dan optimasi performa.',
};

// Ini adalah Server Component, tugasnya hanya mengambil data
export default async function BlogPage() {
  // Ambil semua data di sisi server
  const allPosts = getAllPostsMetadata();
  const trendingTopics = await getTrendingNews();

  return (
    <main className="min-h-screen" style={{backgroundColor: '#FBF9F6'}}>
      <div className="container mx-auto px-4 py-12 md:py-20">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{color: '#5C4033'}}>
            Wawasan & Artikel Terbaru
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Jelajahi panduan, tips, dan artikel mendalam dari kami seputar dunia web development, teknologi, dan strategi digital.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
                {/* Serahkan data 'allPosts' ke komponen client */}
                <BlogListClient posts={allPosts} />
            </div>
            
            <aside className="lg:col-span-1">
                <div className="sticky top-24">
                    <TrendingNews topics={trendingTopics} />
                </div>
            </aside>
        </div>
      </div>
    </main>
  );
}

