import BlogListClient from "./BlogListClient";
import { PostMeta } from "@/app/lib/posts";
import { Locale } from "@/i18n-config";

interface BlogListProps {
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

export default async function BlogList({
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
}: BlogListProps) {
  return <BlogListClient
    posts={posts}
    totalCount={totalCount}
    currentPage={currentPage}
    limit={limit}
    lang={lang}
    searchPlaceholder={searchPlaceholder}
    seeMoreText={seeMoreText}
    allCategoriesText={allCategoriesText}
    pageText={pageText}
    ofText={ofText}
  />;
}
