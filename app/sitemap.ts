import { MetadataRoute } from 'next';
import { getAllPostsMeta } from './lib/posts'; // Assuming this function exists
import { supportedLangs } from '../constants/langs';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bali-webdevelover.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Localized static pages
  const staticPages = [
    '', // Home
    '/about',
    '/services',
    '/portfolio',
    '/contact',
    '/privacy',
    '/terms',
  ];

  const localizedRoutes: MetadataRoute.Sitemap = [];
  staticPages.forEach((page) => {
    supportedLangs.forEach((lang) => {
      localizedRoutes.push({
        url: `${siteUrl}/${lang}${page}`,
        lastModified: new Date(),
        // alternates are handled by Next.js metadata API in each page layout
      });
    });
  });

  // Blog posts (single-language)
  const { posts } = await getAllPostsMeta();
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
  }));

  // Blog index page
  const blogIndexRoute = {
    url: `${siteUrl}/blog`,
    lastModified: new Date(),
  };

  return [...localizedRoutes, ...blogRoutes, blogIndexRoute];
}
