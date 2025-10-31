
import Link from 'next/link';

interface PostLink {
  slug: string;
  title: string;
}

interface PostNavigationProps {
  prevPost: PostLink | null;
  nextPost: PostLink | null;
}

const PostNavigation: React.FC<PostNavigationProps> = ({ prevPost, nextPost }) => {
  if (!prevPost && !nextPost) {
    return null;
  }

  return (
    <nav className="my-12 flex flex-col sm:flex-row justify-between gap-8 border-t border-gray-200 dark:border-gray-700 pt-8">
      <div className="flex-1 text-left">
        {nextPost && (
          <Link href={`/blog/${nextPost.slug}`} className="group px-4 py-3 block border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="text-sm text-gray-500 dark:text-gray-400">‹ Artikel Selanjutnya</span>
            <p className="mt-1 font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">{nextPost.title}</p>
          </Link>
        )}
      </div>
      <div className="flex-1 text-right">
        {prevPost && (
          <Link href={`/blog/${prevPost.slug}`} className="group px-4 py-3 block border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="text-sm text-gray-500 dark:text-gray-400">Artikel Sebelumnya ›</span>
            <p className="mt-1 font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">{prevPost.title}</p>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default PostNavigation;
