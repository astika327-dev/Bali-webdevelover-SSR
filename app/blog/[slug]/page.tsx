import { getAllPosts, getPostBySlug, getAdjacentPosts, getRelatedPosts } from "@/app/lib/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import CtaBanner from "@/app/components/CtaBanner";
import Balancer from "react-wrap-balancer";
import type { Metadata } from "next";
import PostNavigation from "@/app/components/PostNavigation";
import { formatDate } from "@/app/lib/utils";
import { site } from "@/content/config";
import RelatedPosts from "@/app/components/RelatedPosts"; // Import RelatedPosts
import SocialShareButtons from "@/app/components/SocialShareButtons";
import Comments from "@/app/components/Comments";

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
          url: post.frontmatter.image || "/images/blog/default-image.png",
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bali-webdevelover.com';

  const JsonLd = () => {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${siteUrl}/blog/${params.slug}`,
      },
      headline: title,
      description: post.frontmatter.description,
      image: `${siteUrl}${image || '/ogimg.png'}`,
      author: {
        '@type': 'Person',
        name: author || site.company,
      },
      publisher: {
        '@type': 'Organization',
        name: site.company,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/icon.png`,
        },
      },
      datePublished: new Date(date).toISOString(),
      dateModified: new Date(date).toISOString(), // Asumsi tanggal modifikasi sama dengan tanggal publikasi
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Blog',
          item: `${siteUrl}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: title,
          item: `${siteUrl}/blog/${params.slug}`,
        },
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </>
    );
  };

  return (
    <>
      <JsonLd />
      {/* Header */}
      <div className="relative bg-neutral-50 dark:bg-neutral-900 py-24 sm:py-32">
        {image && (
            <Image
                src={image}
                alt={`Gambar untuk artikel ${title}`}
                fill
                className="absolute inset-0 h-full w-full object-cover opacity-10 dark:opacity-20"
                priority
            />
        )}
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
                <div className="text-base font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                    {category}
                </div>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-6xl">
                    <Balancer>{title}</Balancer>
                </h1>
                <div className="mt-6 flex justify-center items-center gap-x-4 text-neutral-700 dark:text-neutral-300">
                    <span>Oleh {author || site.company}</span>
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
          <div className="relative mx-auto max-w-4xl">
              <article className="prose prose-lg">
                  {post.content}
              </article>
              {/* Social Share Buttons */}
              <SocialShareButtons title={title} slug={params.slug} />
              <Comments />
              <div className="mt-16">
                  <PostNavigation prevPost={prevPost} nextPost={nextPost} />
                  <RelatedPosts posts={relatedPosts} />
                  <CtaBanner />
              </div>
          </div>
      </div>
    </>
  );
}
