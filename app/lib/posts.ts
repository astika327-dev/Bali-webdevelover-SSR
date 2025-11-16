
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import MdxImage from '@/components/MdxImage';
import Callout from '@/components/Callout';
import { cache } from 'react';

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
export const getAllPostsMetaCached = cache(async (): Promise<PostMeta[]> => {
  const blogDirectory = path.join(contentDirectory, 'blog');
  const filenames = fs.readdirSync(blogDirectory);

  const postsMeta = filenames.map((filename) => {
    const filePath = path.join(blogDirectory, filename);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
    const { data, content } = matter(fileContent);
    const stats = fs.statSync(filePath);

    return {
      slug: filename.replace(/\.mdx$/, ''),
      frontmatter: data as PostFrontmatter,
      readingTime: calculateReadingTime(content),
      lastModified: stats.mtime.toISOString(),
    };
  });

  return postsMeta
    .filter(post => post.frontmatter.published !== false)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
});

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const realSlug = slug.replace(/\.mdx$/, '');
  const filePath = path.join(contentDirectory, 'blog', `${realSlug}.mdx`);
  
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

  const { prevPost, nextPost } = await getAdjacentPosts(realSlug);

  return {
    slug: realSlug,
    frontmatter: data as PostFrontmatter,
    content: compiledContent,
    readingTime: calculateReadingTime(content),
    prevPost,
    nextPost,
  };
}

export async function getAllPostsMeta({ limit, skip }: { limit?: number; skip?: number; } = {}): Promise<{ posts: PostMeta[]; totalCount: number; }> {
    const allPosts = await getAllPostsMetaCached();
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


export async function getAdjacentPosts(slug: string): Promise<{ prevPost: { slug: string, title: string } | null, nextPost: { slug: string, title: string } | null }> {
  const allPosts = await getAllPostsMetaCached();
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

export async function getRelatedPosts(category: string, currentSlug: string): Promise<PostMeta[]> {
  const allPosts = await getAllPostsMetaCached();
  return allPosts
    .filter(post => post.frontmatter.category === category && post.slug !== currentSlug)
    .slice(0, 3);
}
