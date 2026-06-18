import { Suspense } from 'react';
import PostCard from './PostCard';
import { getFeed } from '@/lib/actions/feed';

async function Feed() {
  const { data: posts, error } = await getFeed(1, 20);

  if (error) {
    return <div className="text-center text-red-500 py-8">Error loading feed.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {posts && posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post as any} />)
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
