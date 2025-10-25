import { PostMeta } from "@/app/lib/posts";
import BlogCard from "./BlogCard";

interface RelatedPostsProps {
  posts: PostMeta[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 ">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
        Artikel Terkait Lainnya
      </h2>
      <div className="flex overflow-x-auto gap-4">
         {posts.map((post) => (
          <div className="w-80 shrink-0"> <BlogCard
            key={post.slug}
            post={{
              slug: post.slug,
              frontmatter: post.frontmatter,
              readingTime: post.readingTime,
              content: <></> // content is not needed for the card view
            }}
          /></div>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
