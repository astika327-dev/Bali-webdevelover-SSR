'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function Comments() {
  const { theme } = useTheme();

  return (
    <div className="mt-16">
      <Giscus
        id="comments"
        repo="astika327-dev/bali-web-comments"
        repoId="R_kgDOQMeXNg"
        category="General"
        categoryId="DIC_kwDOQMeXNs4CxRsZ"
        mapping="title"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme === 'dark' ? 'dark' : 'light'}
        lang="id"
        loading="lazy"
      />
    </div>
  );
}
