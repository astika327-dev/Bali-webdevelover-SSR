import { getAllPosts } from "@/app/lib/posts";
import BlogListClient from "./BlogListClient";
import { compareDesc } from "date-fns";

export default async function BlogList() {
  const allPosts = await getAllPosts();
  const posts = allPosts
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .sort((a, b) =>
      compareDesc(new Date(a.frontmatter.date), new Date(b.frontmatter.date))
    );

  return <BlogListClient posts={posts} />;
}
