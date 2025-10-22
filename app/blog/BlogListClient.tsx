"use client";

import { useState, useMemo } from 'react';
import type { Post } from '@/app/lib/posts';
import SearchBar from '@/app/components/SearchBar';
import FilterTabs from '@/app/components/FilterTabs';
import BlogCard from '@/app/components/BlogCard';

interface BlogListClientProps {
  posts: Post[];
}

export default function BlogListClient({ posts }: BlogListClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const postCategories = new Set(posts.map(p => p.frontmatter.category).filter(Boolean));
    postCategories.delete('All');
    return ['All', ...Array.from(postCategories)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const { frontmatter } = post;
      const matchesCategory = activeCategory === 'All' || frontmatter.category === activeCategory;

      const titleMatch = (frontmatter.title ?? '').toLowerCase().includes(searchQuery.toLowerCase());
      const descriptionMatch = (frontmatter.description ?? '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSearch = titleMatch || descriptionMatch;

      return matchesCategory && matchesSearch;
    });
  }, [posts, searchQuery, activeCategory]);

  return (
    <div>
      <div className="mb-10 flex flex-col md:flex-row gap-6 items-center justify-between">
          <SearchBar onSearch={setSearchQuery} />
          <FilterTabs 
            categories={categories} 
            activeCategory={activeCategory} 
            onFilter={setActiveCategory} 
          />
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard
                key={post.slug}
                post={post}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500 col-span-full">
          <p>Tidak ada artikel yang cocok dengan pencarian Anda.</p>
        </div>
      )}
    </div>
  );
}
