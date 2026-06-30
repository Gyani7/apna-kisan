import { Post, UserInfo } from '@/lib/types';
import { PostRow } from '@/lib/database.types';

export type RawPost = PostRow & {
  author: UserInfo;
};

export const toPost = (rawPost: RawPost): Post => {
  return {
    id: rawPost.id,
    userId: rawPost.user_id,
    title: rawPost.title,
    content: rawPost.content,
    imageUrl: rawPost.image_url,
    postType: rawPost.post_type,
    category: rawPost.category,
    tags: rawPost.tags,
    slug: rawPost.slug,
    excerpt: rawPost.excerpt,
    readTime: rawPost.read_time,
    isFeatured: rawPost.is_featured,
    likesCount: rawPost.likes_count,
    commentsCount: rawPost.comments_count,
    sharesCount: rawPost.shares_count,
    createdAt: rawPost.created_at,
    author: rawPost.author,
  };
};
