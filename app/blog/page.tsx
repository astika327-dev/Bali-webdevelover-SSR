import { getAllPosts } from "@/app/lib/posts";
import BlogListClient from "./BlogListClient";
import CtaBanner from "@/app/components/CtaBanner";
import Balancer from "react-wrap-balancer";
import { compareDesc } from 'date-fns';
import { Metadata } from "next";
<<<<<<< HEAD
import { site } from "@/content/config";

export const metadata: Metadata = {
  title: `Blog | ${site.company}`,
  description: `Jelajahi analisis mendalam, tren teknologi, dan wawasan dari tim ${site.company}.`,
  openGraph: {
    title: `Blog | ${site.company}`,
    description: `Jelajahi analisis mendalam, tren teknologi, dan wawasan dari tim ${site.company}.`,
    url: "/blog",
    images: [
      {
        url: "/app/ogimg.png",
        width: 1200,
        height: 630,
        alt: `Blog ${site.company}`,
=======

export const metadata: Metadata = {
  title: "Blog | Wawasan & Artikel Terbaru",
  description: "Jelajahi analisis mendalam, tren teknologi, dan strategi startup dari tim kami di blog Samsul.dev.",
  openGraph: {
    title: "Blog | Wawasan & Artikel Terbaru",
    description: "Jelajahi analisis mendalam, tren teknologi, dan strategi startup dari tim kami di blog Samsul.dev.",
    url: "/blog",
    images: [
      {
        url: "/images/og-image-blog.jpg",
        width: 1200,
        height: 630,
        alt: "Blog Samsul.dev",
>>>>>>> ef8b9085a1d0660daf2bc0890e74ca14d897431e
      },
    ],
  },
};

export default async function BlogPage() {
  const allPosts = await getAllPosts();
  const posts = allPosts
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .sort((a, b) =>
      compareDesc(new Date(a.frontmatter.date), new Date(b.frontmatter.date))
    );

  return (
    <div>
<<<<<<< HEAD
      <div className="py-24 sm:py-32 bg-[var(--cream)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[var(--brown)] sm:text-6xl">
              <Balancer>Wawasan & Artikel Terbaru</Balancer>
            </h1>
            <p className="mt-6 text-lg leading-8 text-[var(--brown)]/80">
=======
      <div className="py-24 sm:py-32 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
              <Balancer>Wawasan & Artikel Terbaru</Balancer>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
>>>>>>> ef8b9085a1d0660daf2bc0890e74ca14d897431e
              <Balancer>
                Jelajahi analisis mendalam, tren teknologi, dan strategi startup dari tim kami.
              </Balancer>
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <BlogListClient posts={posts} />
        <CtaBanner />
      </div>
    </div>
  );
}
