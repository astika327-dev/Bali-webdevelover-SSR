import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Clock } from 'lucide-react';
import Balancer from 'react-wrap-balancer';
import dynamic from 'next/dynamic';

import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/app/lib/posts';
import PostNavigation from '@/components/PostNavigation';
import SocialShareButtons from '@/components/SocialShareButtons';
import { getTranslation } from '@/lib/getTranslation';
import { Locale, i18n } from '@/i18n-config';
import { formatDate } from '@/lib/utils';
import CtaBanner from '@/components/CtaBanner';
import RelatedPosts from '@/components/RelatedPosts';

// Generate params for all languages and slugs
export async function generateStaticParams() {
  const posts = await getAllPosts();
  const params = i18n.locales.flatMap((locale) =>
    posts.map((post) => ({
      lang: locale,
      slug: post.slug,
    }))
  );
  return params;
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string; lang: Locale };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  const t = getTranslation(params.lang);

  const ogImage = `${process.env.NEXT_PUBLIC_BASE_URL}${post.frontmatter.image}`;

  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${params.lang}/blog/${params.slug}`;

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `/${params.lang}/blog/${params.slug}`,
      siteName: t('site.name'),
      images: [{ url: ogImage }],
      locale: params.lang,
      type: 'article',
      publishedTime: post.frontmatter.date,
      authors: [t('site.author')],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [ogImage],
    },
  };
}


/* =========================
   Blog Post Page
   ========================= */
const Comments = dynamic(() => import('@/components/Comments'), { ssr: false });

export default async function PostPage({ params }: { params: { slug: string; lang: Locale } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.frontmatter.category, params.slug);
  const t = getTranslation(params.lang);

  return (
    <article className="container max-w-3xl py-12 md:py-20">
      {/* Header */}
      <header className="space-y-4 text-center">
        <div className="uppercase text-sm tracking-wider text-[var(--brown)]/70">
          {post.frontmatter.category}
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--brown)]">
          <Balancer>{post.frontmatter.title}</Balancer>
        </h1>
        <div className="flex items-center justify-center gap-6 text-sm text-[var(--brown)]/80">
          <span>{formatDate(post.frontmatter.date, params.lang)}</span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {post.readingTime} {t('blog.reading_time')}
          </span>
        </div>
      </header>

      {/* Social Share Buttons */}
      <div className='my-8'>
        <SocialShareButtons
          url={`${process.env.NEXT_PUBLIC_BASE_URL}/${params.lang}/blog/${params.slug}`}
          title={post.frontmatter.title}
          text={t('blog.share_text')}
        />
      </div>


      {/* MDX Content */}
      <div className="prose prose-lg lg:prose-xl max-w-none prose-p:text-[var(--brown)]/90 prose-headings:text-[var(--brown)] prose-a:text-[var(--blue)] prose-strong:text-[var(--brown)] prose-blockquote:text-[var(--brown)]/80 prose-code:text-[var(--brown)]">
        {post.content}
      </div>

      <hr className="my-12 border-[var(--tan)]" />

      {/* Post Navigation */}
      <PostNavigation
        prevPost={post.prevPost}
        nextPost={post.nextPost}
        lang={params.lang}
        prevText={t('blog.prev_post')}
        nextText={t('blog.next_post')}
      />

      {/* Related Posts */}
      <RelatedPosts
        posts={relatedPosts}
        lang={params.lang}
        seeMoreText={t('blog.see_more')}
        title={t('blog.related_posts')}
      />

      {/* CTA Banner */}
      <CtaBanner
        lang={params.lang}
        title={t('cta.title')}
        description={t('cta.description')}
        buttonText={t('cta.button')}
      />

      {/* Comments */}
      <div className="mt-16">
        <Comments />
      </div>
    </article>
  );
}
