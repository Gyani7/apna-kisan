import { allPosts } from '@/lib/content/posts';
import Link from 'next/link';

export default function PostsPage() {
  return (
    <div className="prose dark:prose-invert">
      <h1>All Posts</h1>
      {allPosts.map((post) => (
        <article key={post.slug}>
          <h2>
            <Link href={`/posts/${post.slugAsParams}`}>{post.title}</Link>
          </h2>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}
    </div>
  );
}
