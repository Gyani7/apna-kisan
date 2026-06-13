import { Suspense } from 'react';
import PostCard from './PostCard';
import { getPosts } from '@/lib/actions/posts';
import { mapPostsToPostWithAuthor } from '@/lib/mappers';

async function Feed() {
  const posts = await getPosts({ limit: 20 });
  const allPosts = mapPostsToPostWithAuthor(posts ?? []);

  return (
    <div className="flex flex-col gap-4">
      {allPosts.length > 0 ? (
        allPosts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <div className="text-center text-gray-500 py-8">No posts yet. Be the first to share!</div>
      )}
    </div>
  );
}

export default function UnifiedGlobalFeed() {
  return (
    <section>
      <Suspense fallback={<div className="text-center py-8">Loading feed...</div>}>
        <Feed />
      </Suspense>
    </section>
  );
}
