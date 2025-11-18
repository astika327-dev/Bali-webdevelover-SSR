import { MetadataRoute } from 'next';
import { getAllPostsMetaCached } from './lib/posts';
import { i18n } from '@/i18n-config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // 1. Get all blog posts
  const posts = await getAllPostsMetaCached();

  const postUrls = posts.flatMap((post) =>
    i18n.locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.lastModified || post.frontmatter.date),
      changeFrequency: 'monthly' as 'monthly',
      priority: 0.8,
    }))
  );

  // 2. Define static pages
  const staticPages = [
    '', // Home
    'about',
    'portfolio',
    'services',
    'contact',
    'blog',
    'privacy',
    'terms',
    'tensorflow',
  ];

  const staticUrls = staticPages.flatMap((page) =>
    i18n.locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page ? `/${page}` : ''}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as 'weekly',
      priority: page ? 0.7 : 1.0,
    }))
  );

  return [...staticUrls, ...postUrls];
}
