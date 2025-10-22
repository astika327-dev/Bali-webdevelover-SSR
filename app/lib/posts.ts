import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';

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

  // Filter out null posts and unpublished posts, and assert the type
  return posts.filter((post): post is Post =>
    post !== null && post.frontmatter.published !== false
  );
}
