import { getAllPostsMetadata } from 'app/lib/posts';
import { Metadata } from 'next';
import BlogListClient from './BlogListClient'; // <- Impor komponen client kita

// Metadata untuk SEO
export const metadata: Metadata = {
  title: 'Blog | Bali Web Develover',
  description: 'Artikel, panduan, dan wawasan terbaru seputar web development, SEO, dan optimasi performa.',
};

// Ini adalah Server Component, tugasnya hanya mengambil data
export default function BlogPage() {
  // Ambil semua data di sisi server
  const allPosts = getAllPostsMetadata();

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

        <div className="max-w-4xl mx-auto">
          {/* Serahkan data 'allPosts' ke komponen client */}
          <BlogListClient posts={allPosts} />
        </div>
      </div>
    </main>
  );
}

