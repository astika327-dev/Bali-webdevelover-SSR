import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import MdxImage from '../components/MdxImage';
import Callout from '../components/Callout';

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
  image: string; // Add image back
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: React.ReactElement;
  readingTime: number; // Add readingTime
}

const contentDirectory = path.join(process.cwd(), 'content');

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

  return {
    slug: realSlug,
    frontmatter: data as PostFrontmatter,
    content: compiledContent,
    readingTime: calculateReadingTime(content), // Calculate and add reading time
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const blogDirectory = path.join(contentDirectory, 'blog');
  const filenames = fs.readdirSync(blogDirectory);

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      return getPostBySlug(filename);
    })
  );

  // Filter out null posts and unpublished posts, sort by date, and assert the type
  return posts
    .filter((post): post is Post =>
      post !== null && post.frontmatter.published !== false
    )
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export interface PostMeta {
  slug: string;
  frontmatter: PostFrontmatter;
  readingTime: number;
}

// Helper to get only metadata for performance
export async function getAllPostsMeta({ limit, skip }: { limit?: number; skip?: number; } = {}): Promise<{ posts: PostMeta[]; totalCount: number; }> {
    const blogDirectory = path.join(contentDirectory, 'blog');
    const filenames = fs.readdirSync(blogDirectory);

    const postsMeta = filenames.map((filename) => {
        const filePath = path.join(blogDirectory, filename);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
        const { data, content } = matter(fileContent);

        return {
            slug: filename.replace(/\.mdx$/, ''),
            frontmatter: data as PostFrontmatter,
            readingTime: calculateReadingTime(content),
        };
    });

    const sortedPosts = postsMeta
        .filter(post => post.frontmatter.published !== false)
        .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

    const totalCount = sortedPosts.length;

    let paginatedPosts = sortedPosts;
    if (skip !== undefined && limit !== undefined) {
        paginatedPosts = sortedPosts.slice(skip, skip + limit);
    }

    return {
        posts: paginatedPosts,
        totalCount,
    };
}


export async function getAdjacentPosts(slug: string): Promise<{ prevPost: { slug: string, title: string } | null, nextPost: { slug: string, title: string } | null }> {
  const { posts: allPosts } = await getAllPostsMeta();
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
  const { posts: allPosts } = await getAllPostsMeta();
  return allPosts
    .filter(post => post.frontmatter.category === category && post.slug !== currentSlug)
    .slice(0, 3);
}
