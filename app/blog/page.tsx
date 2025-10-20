import { getAllPostsMetadata } from 'app/lib/posts';
import { Metadata } from 'next';
import BlogListClient from './BlogListClient'; // <- Impor komponen client kita
import dynamicNext from 'next/dynamic';

const GoogleTrendsChart = dynamicNext(() => import('app/components/GoogleTrendsChart'), {
  ssr: false,
  loading: () => <p>Loading Trends...</p>,
});

// Metadata untuk SEO
export const metadata: Metadata = {
  title: 'Blog | Bali Web Develover',
  description: 'Artikel, panduan, dan wawasan terbaru seputar web development, SEO, dan optimasi performa.',
};

// Ini adalah Server Component, tugasnya hanya mengambil data
export default async function BlogPage() {
  // Ambil semua data di sisi server
  const allPosts = getAllPostsMetadata();

  return (
    <main className="min-h-screen" style={{backgroundColor: '#FBF9F6'}}>
      <div className="container mx-auto px-4 py-12 md:py-20">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{color: '#5C4033'}}>
            Resource Center
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Panduan, tips, dan wawasan terbaru seputar dunia web development dan optimasi digital.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
                {/* Serahkan data 'allPosts' ke komponen client */}
                <BlogListClient posts={allPosts} />
            </div>
            
            <aside className="lg:col-span-1">
                <div className="sticky top-24">
                    <GoogleTrendsChart />
                </div>
            </aside>
        </div>
      </div>
    </main>
  );
}

