import Link from "next/link";
import Image from "next/image";
import { Post } from "@/app/lib/posts";

interface BlogCardProps {
  post: Post;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const { title, date, category, image, description } =
    post.frontmatter;
  const { readingTime } = post;

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 shadow-md transition-shadow duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
      {image && (
        <Link href={`/blog/${post.slug}`} className="block shrink-0">
          <Image
            src={image}
            alt={`Gambar thumbnail untuk ${title}`}
            width={400}
            height={200}
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      )}
      <div className="flex flex-1 flex-col justify-between bg-white p-6 dark:bg-gray-800">
        <div className="flex-1">
          <div className="mb-2 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-600 dark:bg-purple-900 dark:text-purple-300">
              {category}
            </span>
            <time dateTime={date}>{date}</time>
          </div>
          <Link href={`/blog/${post.slug}`} className="mt-2 block">
            <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
              {title}
            </h3>
          </Link>
          <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {readingTime} menit baca
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center font-medium text-indigo-600 transition-colors duration-300 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Baca Selengkapnya
            <svg
              className="ml-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
