import type { PostWithAuthor, Author } from '@/lib/types';
import type { PostRow } from '@/lib/database.types';

export interface RawPost extends PostRow {
  profiles: Author | null;
}

const defaultAuthor: Author = {
  id: '0',
  username: 'anonymous',
  full_name: 'Anonymous',
  avatar_url: '/default-avatar.png',
};

export function mapPostToPostWithAuthor(p: RawPost): PostWithAuthor {
  return {
    id: p.id.toString(),
    user_id: p.user_id,
    title: p.title,
    content: p.content,
    image_url: p.image_url,
    post_type: p.post_type as PostWithAuthor['post_type'],
    category: p.category,
    tags: p.tags,
    slug: p.slug,
    excerpt: p.excerpt,
    read_time: p.read_time,
    is_featured: p.is_featured,
    likes_count: p.likes_count,
    comments_count: p.comments_count,
    shares_count: p.shares_count,
    created_at: p.created_at,
    author: p.profiles || defaultAuthor,
  };
}

export function mapPostsToPostWithAuthor(posts: (RawPost | null)[]): PostWithAuthor[] {
  return posts.filter((p): p is RawPost => p != null).map(mapPostToPostWithAuthor);
}
