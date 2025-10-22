import { getAllPosts, getPostBySlug, getAdjacentPosts } from "@/app/lib/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import CtaBanner from "@/app/components/CtaBanner";
import Balancer from "react-wrap-balancer";
import type { Metadata } from "next";
import PostNavigation from "@/app/components/PostNavigation";

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

  return (
    <div className="container mx-auto px-4 py-8 lg:py-16">
      <article className="prose prose-lg mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md dark:bg-slate-50">
        <header className="mb-8 not-prose">
            <span className="mb-4 inline-block rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-800 dark:bg-purple-900 dark:text-purple-300">
              {category}
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white lg:text-5xl">
              <Balancer>{title}</Balancer>
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-500 dark:text-gray-400">
              <span>Oleh {author}</span>
              <span className="hidden sm:inline">•</span>
              <time dateTime={date}>{date}</time>
              <span className="hidden sm:inline">•</span>
              <span>{readingTime} menit baca</span>
            </div>
          </header>

          {image && (
            <div className="my-8 rounded-lg overflow-hidden not-prose">
              <Image
                src={image}
                alt={`Gambar untuk artikel ${title}`}
                width={1200}
                height={630}
                className="w-full object-cover"
                priority
              />
            </div>
          )}

          {post.content}

        </article>
        <div className="max-w-4xl mx-auto">
            <PostNavigation prevPost={prevPost} nextPost={nextPost} />
            <CtaBanner />
        </div>
    </div>
  );
}
