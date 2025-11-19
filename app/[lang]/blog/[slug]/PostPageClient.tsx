'use client';

import { useRef } from 'react';
import Balancer from 'react-wrap-balancer';
import dynamic from 'next/dynamic';
import { Clock } from 'lucide-react';

import { PostMeta } from '@/app/lib/posts';
import PostNavigation from '@/components/PostNavigation';
import SocialShareButtons from '@/components/SocialShareButtons';
import { formatDate } from '@/lib/utils';
import CtaBanner from '@/components/CtaBanner';
import RelatedPosts from '@/components/RelatedPosts';
import SpeechPlayer from '@/components/SpeechPlayer';
import { Locale } from '@/i18n-config';

const Comments = dynamic(() => import('@/components/Comments'), { ssr: false });

interface PostPageClientProps {
  post: any;
  relatedPosts: PostMeta[];
  lang: Locale;
  translations: {
    readingTime: string;
    shareText: string;
    prevPost: string;
    nextPost: string;
    seeMore: string;
    relatedPosts: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
  };
}

export default function PostPageClient({ post, relatedPosts, lang, translations }: PostPageClientProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <article className="container max-w-3xl py-12 md:py-20">
      <header className="space-y-4 text-center">
        <div className="uppercase text-sm tracking-wider text-[var(--brown)]/70">
          {post.frontmatter.category}
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--brown)]">
          <Balancer>{post.frontmatter.title}</Balancer>
        </h1>
        <div className="flex items-center justify-center gap-6 text-sm text-[var(--brown)]/80">
          <span>{formatDate(post.frontmatter.date, lang)}</span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {post.readingTime} {translations.readingTime}
          </span>
        </div>
      </header>

      <div className='my-8'>
        <SocialShareButtons
          url={`/${lang}/blog/${post.slug}`}
          title={post.frontmatter.title}
          text={translations.shareText}
        />
      </div>

      <div
        ref={contentRef}
        className="prose prose-lg lg:prose-xl max-w-none prose-p:text-[var(--brown)]/90 prose-headings:text-[var(--brown)] prose-a:text-[var(--blue)] prose-strong:text-[var(--brown)] prose-blockquote:text-[var(--brown)]/80 prose-code:text-[var(--brown)]"
      >
        {post.content}
      </div>

      <hr className="my-12 border-[var(--tan)]" />

      <PostNavigation
        prevPost={post.prevPost}
        nextPost={post.nextPost}
        lang={lang}
        prevText={translations.prevPost}
        nextText={translations.nextPost}
      />

      <RelatedPosts
        posts={relatedPosts}
        lang={lang}
        seeMoreText={translations.seeMore}
        title={translations.relatedPosts}
      />

      <CtaBanner
        lang={lang}
        title={translations.ctaTitle}
        description={translations.ctaDescription}
        buttonText={translations.ctaButton}
      />

      <div className="mt-16">
        <Comments />
      </div>

      <SpeechPlayer contentRef={contentRef} lang={lang} />
    </article>
  );
}
