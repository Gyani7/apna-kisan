'use server';

import { createServer } from '@/lib/supabase/server';
import type { Database } from '@/lib/database.types';

// --- TYPE DEFINITIONS ---

// Represents the structure of a Profile, embedded as the author in a Post.
type Profile = Pick<Database['public']['Tables']['profiles']['Row'], 'id' | 'username' | 'avatar_url' | 'full_name'>;

// Represents a Post with embedded author, likes, and comments count.
export type Post = Database['public']['Tables']['posts']['Row'] & {
  author: Profile | null;
  likes_count: [{ count: number }];
  comments_count: [{ count: number }];
};


// --- DATA FETCHING FUNCTIONS ---

/**
 * Fetches a list of the latest posts.
 * @param {object} params - The parameters for the function.
 * @param {number} params.limit - The maximum number of posts to fetch.
 * @returns {Promise<Post[]>} A promise that resolves to an array of posts.
 * Returns an empty array if there's an error.
 */
export async function getPosts({ limit }: { limit: number }): Promise<Post[]> {
  const supabase = createServer();

  const { data, error } = await supabase
    .from('posts')
    .select('*, author:profiles(*), likes_count:posts_likes(count), comments_count:posts_comments(count)')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching posts:', error.message);
    // In a real app, you might want to handle this more gracefully, but for now, we return empty.
    return [];
  }

  return data as Post[];
}

/**
 * Fetches a list of featured stories.
 * @param {number} [limit=4] - The maximum number of featured stories to fetch.
 * @returns {Promise<Post[]>} A promise that resolves to an array of featured stories.
 * Returns an empty array if there's an error.
 */
export async function getFeaturedStories(limit = 4): Promise<Post[]> {
  const supabase = createServer();

  const { data, error } = await supabase
    .from('posts')
    .select('*, author:profiles(*), likes_count:posts_likes(count), comments_count:posts_comments(count)')
    .eq('post_type', 'story')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured stories:', error.message);
    return [];
  }

  return data as Post[];
}
