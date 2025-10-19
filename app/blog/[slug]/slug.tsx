import { getAllPostsMetadata, getPostBySlug } from '@/app/lib/posts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { format, isValid } from 'date-fns';
import { id } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: { slug: string };
};

// ... fungsi generateMetadata ...

// FUNGSI KUNCI UNTUK MENGHINDARI 404
export async function generateStaticParams() {
  const posts = getAllPostsMetadata();
  // Ini akan menghasilkan daftar seperti [{ slug: 'artikel-pertama' }, { slug: 'apa-itu-api' }]
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }
  
  // ... sisa kode Anda untuk menampilkan halaman ...
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
            <div className="max-w-3xl mx-auto">
                <Link href="/blog" className="text-amber-800 hover:text-amber-900 font-semibold mb-6 inline-block">&larr; Kembali ke semua artikel</Link>
                
                <header className="mb-8">
                    <p className="text-amber-800 font-semibold">{post.frontmatter.category}</p>
                    <h1 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight" style={{color: '#5C4033'}}>
                        {post.frontmatter.title}
                    </h1>
                    <p className="mt-4 text-gray-500 text-sm">{formattedDate}</p>
                </header>
                
                <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-lg mb-8">
                    <Image 
                        src={post.frontmatter.image} 
                        alt={post.frontmatter.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="prose prose-lg prose-headings:text-amber-900 prose-a:text-amber-800 prose-strong:text-gray-800 max-w-none">
                    {post.content}
                </div>
            </div>
        </div>
    </article>
  );
}

