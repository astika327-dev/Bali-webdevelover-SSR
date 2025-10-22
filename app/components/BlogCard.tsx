import Link from "next/link";
import Image from "next/image";
import { Post } from "@/app/lib/posts";
import { formatDate } from "@/app/lib/utils";

interface BlogCardProps {
  post: Post;
  isFeatured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, isFeatured = false }) => {
  const { title, date, category, image, description } = post.frontmatter;
  const { readingTime } = post;

  if (isFeatured) {
    return (
      <article className="group relative w-full transition-shadow duration-300 hover:shadow-xl rounded-lg">
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="md:grid md:grid-cols-2 md:gap-8 items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {image && (
              <div className="relative h-64 md:h-full">
                <Image
                  src={image}
                  alt={`Gambar untuk ${title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-8">
              <div className="mb-3 text-xs uppercase text-purple-600 dark:text-purple-400 font-semibold tracking-wider">
                {category}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                {title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {description}
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-500">
                <span>{formatDate(date)}</span>
                <span className="mx-2">&bull;</span>
                <span>{readingTime} menit baca</span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
       <Link href={`/blog/${post.slug}`} className="block">
        {image && (
            <div className="relative h-48 w-full overflow-hidden">
            <Image
                src={image}
                alt={`Gambar thumbnail untuk ${title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            {category}
          </div>
          <Link href={`/blog/${post.slug}`} className="mt-1 block">
            <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-purple-700 dark:text-white dark:group-hover:text-purple-400">
              {title}
            </h3>
          </Link>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {description}
          </p>
        </div>
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-500">
            <span>{formatDate(date)}</span>
            <span className="mx-2">&bull;</span>
            <span>{readingTime} menit baca</span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
