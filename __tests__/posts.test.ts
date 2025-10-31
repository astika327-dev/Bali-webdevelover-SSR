
const getAdjacentPosts = (slug, allPosts) => {
  const currentPostIndex = allPosts.findIndex(post => post.slug === slug);

  if (currentPostIndex === -1) {
    return { prevPost: null, nextPost: null };
  }

  const nextPost = currentPostIndex > 0 ? {
    slug: allPosts[currentPostIndex - 1].slug,
    title: allPosts[currentPostIndex - 1].frontmatter.title,
  } : null;

  const prevPost = currentPostIndex < allPosts.length - 1 ? {
    slug: allPosts[currentPostIndex + 1].slug,
    title: allPosts[currentPostIndex + 1].frontmatter.title,
  } : null;

  return { prevPost, nextPost };
}


describe('getAdjacentPosts', () => {
  it('should return the correct previous and next posts', () => {
    const mockPosts = [
      { slug: 'post-3', frontmatter: { date: '2023-01-03', title: 'Post 3' } }, // Newest
      { slug: 'post-2', frontmatter: { date: '2023-01-02', title: 'Post 2' } }, // Current
      { slug: 'post-1', frontmatter: { date: '2023-01-01', title: 'Post 1' } }, // Oldest
    ];

    const { prevPost, nextPost } = getAdjacentPosts('post-2', mockPosts);

    // Correct expectations: Previous should be older, Next should be newer.
    expect(prevPost?.slug).toBe('post-1');
    expect(nextPost?.slug).toBe('post-3');
  });
});
