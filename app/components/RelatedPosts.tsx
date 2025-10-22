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
    <div className="mt-16">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
        Artikel Terkait Lainnya
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            post={{
              slug: post.slug,
              frontmatter: post.frontmatter,
              readingTime: post.readingTime,
              content: <></> // content is not needed for the card view
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
