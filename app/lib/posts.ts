import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';

// Path ke folder konten Anda
const postsDirectory = path.join(process.cwd(), 'content/blog');

// Tipe data untuk metadata artikel
export type PostMetadata = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  featured: boolean;
  image: string;
  readingTime: number;
};

// Fungsi menghitung waktu baca
function getReadingTime(content: string): number {
  const wpm = 225; // Words per minute
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
}

// Fungsi untuk mendapatkan SEMUA metadata artikel
export function getAllPostsMetadata(): PostMetadata[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        readingTime: getReadingTime(content),
        ...(data as { [key: string]: any }),
      } as PostMetadata;
    });

  // Urutkan artikel dari yang terbaru
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Fungsi untuk mendapatkan SATU artikel berdasarkan slug
export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
      return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Kompilasi MDX di server
  const { content, frontmatter } = await compileMDX<{ title: string; date: string; description: string; image: string; category: string; }>({
    source: fileContents,
    options: { parseFrontmatter: true }
  });

  return { content, frontmatter, slug };
}

