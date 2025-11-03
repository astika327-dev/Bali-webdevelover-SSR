import BlogListClient from "./BlogListClient";
import { PostMeta } from "../lib/posts";


export default async function BlogList({ posts }: { posts: PostMeta[]}) {
  return <BlogListClient posts={posts} />;
}
