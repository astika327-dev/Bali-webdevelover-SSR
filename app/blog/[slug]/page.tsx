import { getAllPosts, getPostBySlug, getAdjacentPosts, getRelatedPosts } from "@/app/lib/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import CtaBanner from "@/app/components/CtaBanner";
import Balancer from "react-wrap-balancer";
import type { Metadata } from "next";
import PostNavigation from "@/app/components/PostNavigation";
import { formatDate } from "@/app/lib/utils";
import RelatedPosts from "@/app/components/RelatedPosts"; // Import RelatedPosts

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Artikel Tidak Ditemukan",
    };
  }
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [
        {
          url: post.frontmatter.image || "/images/blog/default-image.jpg",
          width: 1200,
          height: 630,
          alt: post.frontmatter.title,
        },
      ],
    },
  };
}


export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .map((post) => ({
      slug: post.slug,
    }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { prevPost, nextPost } = await getAdjacentPosts(params.slug);
  const { title, author, date, category, image } = post.frontmatter;
  const { readingTime } = post;

  // Fetch related posts
  const relatedPosts = await getRelatedPosts(category, params.slug);

  return (
    <div>
      {/* Header */}
      <div className="relative bg-gray-900 py-24 sm:py-32">
        {image && (
            <Image
                src={image}
                alt={`Gambar untuk artikel ${title}`}
                fill
                className="absolute inset-0 h-full w-full object-cover opacity-30"
                priority
            />
        )}
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
                <div className="text-base font-semibold uppercase tracking-wider text-purple-400">
                    {category}
                </div>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    <Balancer>{title}</Balancer>
                </h1>
                <div className="mt-6 flex justify-center items-center gap-x-4 text-gray-300">
                    <span>Oleh {author}</span>
                    <span className="opacity-50">•</span>
                    <time dateTime={date}>{formatDate(date)}</time>
                    <span className="opacity-50">•</span>
                    <span>{readingTime} menit baca</span>
                </div>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <article className="prose prose-lg mx-auto max-w-4xl">
            {post.content}
        </article>
        <div className="max-w-4xl mx-auto mt-16">
            <PostNavigation prevPost={prevPost} nextPost={nextPost} />
            <RelatedPosts posts={relatedPosts} />
            <CtaBanner />
        </div>
      </div>
    </div>
  );
}
