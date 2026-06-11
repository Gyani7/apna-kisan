'use server';

import { createClient } from '@/lib/supabase/utils';
import { cookies } from 'next/headers';

export async function getPosts({ limit }: { limit: number }) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
        .from('posts')
        .select('*, author:profiles(*), likes_count:posts_likes(count), comments_count:posts_comments(count)')
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
    return data;
}

export async function getFeaturedStories(limit = 4) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
        .from('posts')
        .select('*, author:profiles(*), likes_count:posts_likes(count), comments_count:posts_comments(count)')
        .eq('post_type', 'story')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching featured stories:', error);
        return [];
    }
    return data;
}
