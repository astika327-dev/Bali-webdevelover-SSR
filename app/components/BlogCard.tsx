"use client";

import Link from 'next/link';
import Image from 'next/image';
import { format, isValid } from 'date-fns';
import { id } from 'date-fns/locale';
import type { Route } from 'next';

// Definisi tipe data lokal untuk memutus hubungan ke file server
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

interface BlogCardProps {
  post: PostMetadata;
}

export default function BlogCard({ post }: BlogCardProps) {
  let formattedDate = '';
  if (post.date) {
    const dateObj = new Date(post.date);
    if (isValid(dateObj)) {
      formattedDate = format(dateObj, 'd MMMM yyyy', { locale: id });
    }
  }

  return (
    <Link 
      // Perbaikan: gunakan URL yang sudah di-resolve (hindari '/blog/[slug]' literal)
      href={`/blog/${post.slug}` as Route}
      className="group block overflow-hidden rounded-2xl border bg-white border-gray-200/50 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
    >
      <div className="relative h-48 w-full">
        <Image
          src={post.image}
          alt={`Gambar thumbnail untuk ${post.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/D2B48C/5C4033?text=Gambar'; }}
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{backgroundColor: '#F5F5DC', color: '#5C4033'}}>
            {post.category}
          </span>
          <span>{post.readingTime} min baca</span>
        </div>
        <h3 className="mt-4 text-xl font-bold text-gray-800 transition-colors duration-200 group-hover:text-amber-900" style={{color: '#8B4513'}}>
          {post.title}
        </h3>
        <p className="mt-2 text-gray-600 line-clamp-2">
          {post.description}
        </p>
        {formattedDate && (
          <p className="mt-4 text-xs text-gray-400">
            {formattedDate}
          </p>
        )}
      </div>
    </Link>
  );
}