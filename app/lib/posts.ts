
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import MdxImage from '@/components/MdxImage';
import Callout from '@/components/Callout';
import { cache } from 'react';
import { i18n, Locale } from '@/i18n-config';

// Helper function to calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  published?: boolean;
  category: string;
  image: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: React.ReactElement;
  readingTime: number;
  prevPost: { slug: string; title: string } | null;
  nextPost: { slug: string; title: string } | null;
}

export interface PostMeta {
  slug: string;
  frontmatter: PostFrontmatter;
  readingTime: number;
  lastModified?: string;
}

const contentDirectory = path.join(process.cwd(), 'content');

// Cached function to get all posts metadata
export const getAllPostsMetaCached = cache(async (lang: Locale = i18n.defaultLocale): Promise<PostMeta[]> => {
  const blogDirectory = path.join(contentDirectory, 'blog');
  const filenames = fs.readdirSync(blogDirectory);

  // 1. Get all unique slugs from filenames
  // Matches: slug.mdx, slug.en.mdx, etc.
  const uniqueSlugs = new Set<string>();
  filenames.forEach(filename => {
    if (!filename.endsWith('.mdx')) return;
    // Remove language extension if present (e.g. .en.mdx -> .en is removed?) No.
    // Pattern: [slug].[lang].mdx OR [slug].mdx
    // If [slug].mdx, it's default language.
    // If [slug].en.mdx, it's english.
    // Canonical slug is always [slug].

    let slug = filename.replace(/\.mdx$/, '');
    // Check if it ends with a known locale
    for (const locale of i18n.locales) {
      if (slug.endsWith(`.${locale}`)) {
        slug = slug.slice(0, - (locale.length + 1)); // remove .en
        break;
      }
    }
    uniqueSlugs.add(slug);
  });

  const posts: PostMeta[] = [];

  for (const slug of uniqueSlugs) {
    // Try to find the file for the requested language
    let filename = `${slug}.${lang}.mdx`;
    let filePath = path.join(blogDirectory, filename);

    // Fallback to default if localized file doesn't exist
    if (!fs.existsSync(filePath)) {
      // Try default file (usually slug.mdx)
      // Or try slug.id.mdx if default is 'id' and slug.mdx doesn't exist?
      // Assuming 'slug.mdx' is the default content (usually ID).
      filename = `${slug}.mdx`;
      filePath = path.join(blogDirectory, filename);
    }

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
      const { data, content } = matter(fileContent);
      const stats = fs.statSync(filePath);

      posts.push({
        slug: slug, // Use the canonical slug
        frontmatter: data as PostFrontmatter,
        readingTime: calculateReadingTime(content),
        lastModified: stats.mtime.toISOString(),
      });
    }
  }

  return posts
    .filter(post => post.frontmatter.published !== false)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
});

export async function getPostBySlug(slug: string, lang: Locale = i18n.defaultLocale): Promise<Post | null> {
  const blogDirectory = path.join(contentDirectory, 'blog');

  // Try localized file first
  let filePath = path.join(blogDirectory, `${slug}.${lang}.mdx`);

  if (!fs.existsSync(filePath)) {
    // Fallback to default file
    filePath = path.join(blogDirectory, `${slug}.mdx`);
  }
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
  const { content, data } = matter(fileContent);

  const { content: compiledContent } = await compileMDX({
    source: content,
    components: {
      img: MdxImage as React.ElementType,
      Callout,
    },
    options: { parseFrontmatter: false },
  });

  const { prevPost, nextPost } = await getAdjacentPosts(slug, lang);

  return {
    slug: slug,
    frontmatter: data as PostFrontmatter,
    content: compiledContent,
    readingTime: calculateReadingTime(content),
    prevPost,
    nextPost,
  };
}

export async function getAllPostsMeta({ limit, skip, lang = i18n.defaultLocale }: { limit?: number; skip?: number; lang?: Locale } = {}): Promise<{ posts: PostMeta[]; totalCount: number; }> {
    const allPosts = await getAllPostsMetaCached(lang);
    const totalCount = allPosts.length;

    let paginatedPosts = allPosts;
    if (skip !== undefined && limit !== undefined) {
        paginatedPosts = allPosts.slice(skip, skip + limit);
    }

    return {
        posts: paginatedPosts,
        totalCount,
    };
}


export async function getAdjacentPosts(slug: string, lang: Locale = i18n.defaultLocale): Promise<{ prevPost: { slug: string, title: string } | null, nextPost: { slug: string, title: string } | null }> {
  const allPosts = await getAllPostsMetaCached(lang);
  const currentPostIndex = allPosts.findIndex(post => post.slug === slug);

  if (currentPostIndex === -1) {
    return { prevPost: null, nextPost: null };
  }

  const prevPost = currentPostIndex > 0 ? {
    slug: allPosts[currentPostIndex - 1].slug,
    title: allPosts[currentPostIndex - 1].frontmatter.title,
  } : null;

  const nextPost = currentPostIndex < allPosts.length - 1 ? {
    slug: allPosts[currentPostIndex + 1].slug,
    title: allPosts[currentPostIndex + 1].frontmatter.title,
  } : null;

  return { prevPost, nextPost };
}

export async function getRelatedPosts(category: string, currentSlug: string, lang: Locale = i18n.defaultLocale): Promise<PostMeta[]> {
  const allPosts = await getAllPostsMetaCached(lang);
  return allPosts
    .filter(post => post.frontmatter.category === category && post.slug !== currentSlug)
    .slice(0, 3);
}
