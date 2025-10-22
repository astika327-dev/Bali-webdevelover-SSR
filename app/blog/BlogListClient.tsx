"use client"; // <-- Ini SANGAT PENTING

import { useState, useMemo } from 'react';
import type { PostMetadata } from 'app/lib/posts';
import SearchBar from 'app/components/SearchBar';
import FilterTabs from 'app/components/FilterTabs';
import BlogCard from 'app/components/BlogCard';
import CtaBanner from 'app/components/CtaBanner';

// Terima 'posts' sebagai prop dari server
interface BlogListClientProps {
  posts: PostMetadata[];
}

export default function BlogListClient({ posts }: BlogListClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Ambil kategori unik dari semua post
  const categories = useMemo(() => {
    // new Set() secara otomatis membuang duplikat
    return [...new Set(posts.map(p => p.category))];
  }, [posts]);

  // Filter artikel berdasarkan state search dan filter yang aktif
  const filteredPosts = useMemo(() => {
  return posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    
    // Gunakan '??' untuk memberikan nilai default string kosong jika title/description tidak ada
    const titleMatch = (post.title ?? '').toLowerCase().includes(searchQuery.toLowerCase());
    const descriptionMatch = (post.description ?? '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSearch = titleMatch || descriptionMatch;
    
    return matchesCategory && matchesSearch;
  });
}, [posts, searchQuery, activeCategory]);

  return (
    <div>
      {/* Kontrol untuk Search dan Filter */}
      <div className="mb-10 flex flex-col md:flex-row gap-6 items-center justify-between">
          <SearchBar onSearch={setSearchQuery} />
          <FilterTabs 
            categories={categories} 
            activeCategory={activeCategory} 
            onFilter={setActiveCategory} 
          />
      </div>

      {/* Grid untuk menampilkan semua kartu artikel */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500 col-span-full">
          <p>Tidak ada artikel yang cocok dengan pencarian Anda.</p>
        </div>
      )}

      {/* Menambahkan CTA Banner di bagian bawah */}
      <div className="mt-20">
        <CtaBanner />
      </div>
    </div>
  );
}