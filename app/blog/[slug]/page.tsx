import { getAllPostsMetadata, getPostBySlug } from '@/app/lib/posts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { format, isValid } from 'date-fns';
import { id } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import CtaBanner from '@/app/components/CtaBanner';
import { getTrendingNews } from '@/app/lib/trends';
import TrendingNews from '@/app/components/TrendingNews';

type Props = {
  params: { slug: string };
};

// Fungsi untuk generate metadata SEO dinamis untuk setiap halaman artikel
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return { title: 'Artikel Tidak Ditemukan' };
  }
  return {
    title: `${post.frontmatter.title} | Bali Web Develover`,
    description: post.frontmatter.description,
    openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        // Menggunakan variabel lingkungan untuk base URL
        images: [`${process.env.NEXT_PUBLIC_BASE_URL}${post.frontmatter.image}`],
    }
  };
}

// Fungsi ini memberitahu Next.js halaman mana saja yang harus dibuat saat build
export async function generateStaticParams() {
  const posts = getAllPostsMetadata();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  // Jika getPostBySlug mengembalikan null, panggil notFound() untuk menampilkan halaman 404
  if (!post) {
    notFound();
  }

  // Ambil data berita terbaru
  const trendingTopics = await getTrendingNews();

  // Format tanggal dengan aman
  let formattedDate = '';
  if (post.frontmatter.date) {
    const dateObj = new Date(post.frontmatter.date);
    if(isValid(dateObj)){
        formattedDate = format(dateObj, 'EEEE, d MMMM yyyy', { locale: id });
    }
  }

  return (
    <article className="min-h-screen" style={{backgroundColor: '#FBF9F6'}}>
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="max-w-6xl mx-auto">
                 {/* Tombol kembali ke halaman blog utama */}
                 <Link href="/blog" className="text-amber-800 hover:text-amber-900 font-semibold mb-8 inline-block">&larr; Kembali ke semua artikel</Link>

                <div className="flex flex-col lg:flex-row lg:space-x-12">
                    {/* Kolom Utama: Konten Artikel */}
                    <div className="lg:w-2/3">
                        {/* Header Artikel */}
                        <header className="mb-8">
                            <p className="text-amber-800 font-semibold">{post.frontmatter.category}</p>
                            <h1 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight" style={{color: '#5C4033'}}>
                                {post.frontmatter.title}
                            </h1>
                            <p className="mt-4 text-gray-500 text-sm">{formattedDate}</p>
                        </header>

                        {/* Gambar Utama Artikel */}
                        <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-lg mb-8">
                            <Image
                                src={post.frontmatter.image}
                                alt={post.frontmatter.title}
                                fill
                                className="object-cover"
                                priority // Prioritaskan gambar utama untuk LCP
                            />
                        </div>

                        {/* Konten Artikel MDX yang di-render */}
                        <div className="prose prose-lg prose-headings:text-amber-900 prose-a:text-amber-800 prose-strong:text-gray-800 max-w-none">
                            {post.content}
                        </div>

                        {/* CTA Banner setelah konten artikel */}
                        <div className="mt-12">
                            <CtaBanner />
                        </div>
                    </div>

                    {/* Sidebar: Berita Terbaru */}
                    <aside className="lg:w-1/3 mt-12 lg:mt-0">
                        <div className="sticky top-24">
                           <TrendingNews topics={trendingTopics} />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    </article>
  );
}

