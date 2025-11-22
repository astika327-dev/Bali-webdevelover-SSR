import type { Metadata } from 'next';
import { getAllPostsMeta } from '@/app/lib/posts';
import BlogList from '@/components/BlogList';
import { getTranslation } from '@/lib/getTranslation';
import { Locale, i18n } from '@/i18n-config';

// Generate params for each language
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Generate metadata for the page
export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  const t = getTranslation(params.lang);
  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${params.lang}/blog`;
  const languages = {} as Record<Locale, string> & { 'x-default': string };
  i18n.locales.forEach(locale => {
    languages[locale] = `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/blog`;
  });
  languages['x-default'] = `${process.env.NEXT_PUBLIC_BASE_URL}/${i18n.defaultLocale}/blog`;

  return {
    title: t('blog.title'),
    description: t('blog.description'),
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
  };
}


/* =========================
   Blog Page
   ========================= */
export default async function BlogPage({
  params: { lang },
  searchParams,
}: {
  params: { lang: Locale };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = typeof searchParams?.page === 'string' ? Number(searchParams.page) : 1;
  const limit = 5;
  const { posts, totalCount } = await getAllPostsMeta({ limit, skip: (page - 1) * limit, lang });
  const t = getTranslation(lang);

  return (
    <section className="container max-w-4xl py-12 md:py-20">
      <header className="space-y-3 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--brown)]">
          {t('blog.title')}
        </h1>
        <p className="text-[var(--brown)]/80 max-w-2xl mx-auto">
          {t('blog.description')}
        </p>
      </header>

      <div className="mt-12">
        <BlogList
          posts={posts}
          totalCount={totalCount}
          currentPage={page}
          limit={limit}
          lang={lang}
          searchPlaceholder={t('blog.search_placeholder')}
          seeMoreText={t('blog.see_more')}
          allCategoriesText={t('blog.all_categories')}
          pageText={t('blog.page')}
          ofText={t('blog.of')}
        />
      </div>
    </section>
  );
}
