import Link from "next/link";
import Image from "next/image";
import { PostMeta } from "@/app/lib/posts";
import { formatDate } from "@/lib/utils";
import { Locale } from "@/i18n-config";

interface BlogCardProps {
  post: PostMeta;
  isFeatured?: boolean;
  seeMoreText: string;
  lang: Locale;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, isFeatured = false, seeMoreText, lang }) => {
  const { title, date, category, image, description } = post.frontmatter;
  const { readingTime } = post;

  if (isFeatured) {
    return (
      <article className="group relative w-full transition-shadow duration-300 hover:shadow-xl rounded-lg">
        <Link href={`/${lang}/blog/${post.slug}`} className="block h-full">
          <div className="md:grid md:grid-cols-2 md:gap-8 items-center bg-[var(--cream)] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {image && (
              <div className="relative h-64 md:h-full ">
                <Image
                  src={image}
                  alt={`Gambar untuk ${title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-8 ">
              <div className="mb-3 text-xs uppercase text-purple-600 dark:text-purple-400 font-semibold tracking-wider">
                {category}
              </div>
              <h2 className="text-3xl font-bold text-[var(--brown)] mb-4 leading-tight group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                {title}
              </h2>
              <p className="text-[var(--brown)]/80 mb-4 line-clamp-3">
                {description}
              </p >
              <div className="text-sm text-gray-500 dark:text-gray-500">
                <span>{formatDate(date, lang)}</span>
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
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-[var(--cream)] shadow-sm transition-all duration-300 hover:shadow-lg">
      <Link href={`/${lang}/blog/${post.slug}`} className="block h-full">
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
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-purple-600 ">
              {category}
            </div>
            <h3 className="text-xl font-bold text-[var(--brown)] transition-colors duration-300 group-hover:text-purple-700">
              {title}
            </h3>
            <p className="mt-3 text-sm text-[var(--brown)]/80 line-clamp-3">
              {description}
            </p>
          </div>
          <div className="mt-4 text-xs text-[var(--brown)]/60 dark:text-[var(--brown)]/60">
            <span>{formatDate(date, lang)}</span>
            <span className="mx-2">&bull;</span>
            <span>{readingTime} menit baca</span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
