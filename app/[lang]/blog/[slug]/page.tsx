import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllPostsMetaCached, getPostBySlug, getRelatedPosts } from '@/app/lib/posts';
import { getTranslation } from '@/lib/getTranslation';
import { Locale, i18n } from '@/i18n-config';
import PostPageClient from './PostPageClient'; // Import the new client component

// Generate params for all languages and slugs
export async function generateStaticParams() {
  const posts = await getAllPostsMetaCached();
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
  params: Promise<{ slug: string; lang: Locale }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const post = await getPostBySlug(slug, lang);
  if (!post) return {};

  const t = getTranslation(lang);

  const ogImage = `${process.env.NEXT_PUBLIC_BASE_URL}${post.frontmatter.image}`;

  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/blog/${slug}`;
  const languages = {} as Record<Locale, string> & { 'x-default': string };
  i18n.locales.forEach(locale => {
    languages[locale] = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/blog/${slug}`;
  });
  languages['x-default'] = `${process.env.NEXT_PUBLIC_BASE_URL}/${i18n.defaultLocale}/blog/${slug}`;

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `/${lang}/blog/${slug}`,
      siteName: t('site.name'),
      images: [{ url: ogImage }],
      locale: lang,
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
   Blog Post Page (Server Component)
   ========================= */
export default async function PostPage(props: { params: Promise<{ slug: string; lang: Locale }> }) {
  const { slug, lang } = await props.params;
  const post = await getPostBySlug(slug, lang);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.frontmatter.category, slug, lang);
  const t = getTranslation(lang);

  const translations = {
    readingTime: t('blog.reading_time'),
    shareText: t('blog.share_text'),
    prevPost: t('blog.prev_post'),
    nextPost: t('blog.next_post'),
    seeMore: t('blog.see_more'),
    relatedPosts: t('blog.related_posts'),
    ctaTitle: t('cta.title'),
    ctaDescription: t('cta.description'),
    ctaButton: t('cta.button'),
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  const postUrl = `${baseUrl}/${lang}/blog/${slug}`;
  const imageUrl = `${baseUrl}${post.frontmatter.image}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    description: post.frontmatter.description,
    image: imageUrl,
    url: postUrl,
    author: {
      '@type': 'Person',
      name: t('site.author'),
    },
    publisher: {
      '@type': 'Organization',
      name: t('site.name'),
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icon.png`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostPageClient
        post={post}
        relatedPosts={relatedPosts}
        lang={lang}
        translations={translations}
      />
    </>
  );
}
