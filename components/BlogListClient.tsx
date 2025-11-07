"use client";

import { useState, useMemo } from 'react';
import type { PostMeta } from '@/app/lib/posts';
import SearchBar from '@/components/SearchBar';
import FilterTabs from '@/components/FilterTabs';
import BlogCard from '@/components/BlogCard';
import { Locale } from '@/i18n-config';
import PaginationControls from './PaginationControls';


interface BlogListClientProps {
  posts: PostMeta[];
  totalCount: number;
  currentPage: number;
  limit: number;
  lang: Locale;
  searchPlaceholder: string;
  seeMoreText: string;
  allCategoriesText: string;
  pageText: string;
  ofText: string;
}

export default function BlogListClient({
  posts,
  totalCount,
  currentPage,
  limit,
  lang,
  searchPlaceholder,
  seeMoreText,
  allCategoriesText,
  pageText,
  ofText
}: BlogListClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(allCategoriesText);

  const categories = useMemo(() => {
    const postCategories = new Set(posts.map(p => p.frontmatter.category).filter(Boolean));
    postCategories.delete(allCategoriesText);
    return [allCategoriesText, ...Array.from(postCategories)];
  }, [posts, allCategoriesText]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const { frontmatter } = post;
      const matchesCategory = activeCategory === allCategoriesText || frontmatter.category === activeCategory;

      const titleMatch = (frontmatter.title ?? '').toLowerCase().includes(searchQuery.toLowerCase());
      const descriptionMatch = (frontmatter.description ?? '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSearch = titleMatch || descriptionMatch;

      return matchesCategory && matchesSearch;
    });
  }, [posts, searchQuery, activeCategory, allCategoriesText]);

  return (
    <div>
      <div className="mb-10 flex flex-col md:flex-row gap-6 items-center justify-between">
          <SearchBar onSearch={setSearchQuery} placeholder={searchPlaceholder} />
          <FilterTabs 
            categories={categories} 
            activeCategory={activeCategory} 
            onFilter={setActiveCategory}
            lang={lang}
          />
      </div>

      {filteredPosts.length > 0 ? (
        <div>
          {/* Featured Post */}
          <div className="mb-12">
            <BlogCard
              key={filteredPosts[0].slug}
              post={filteredPosts[0]}
              isFeatured={true}
              seeMoreText={seeMoreText}
              lang={lang}
            />
          </div>

          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post) => (
              <BlogCard
                  key={post.slug}
                  post={post}
                  seeMoreText={seeMoreText}
                  lang={lang}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500 col-span-full">
          <p>Tidak ada artikel yang cocok dengan pencarian Anda.</p>
        </div>
      )}
       <div className="mt-12">
        <PaginationControls
          totalCount={totalCount}
          currentPage={currentPage}
          limit={limit}
          lang={lang}
          pageText={pageText}
          ofText={ofText}
        />
      </div>
    </div>
  );
}
