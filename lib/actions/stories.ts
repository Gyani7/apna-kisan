'use server';

import { createServerClient } from "@/utils/supabase/server";

export async function getStoryBySlug(slug: string) {
    const supabase = createServerClient();
    
    const { data: story, error } = await supabase
        .from('posts')
        .select(`
            *,
            author:profiles(*)
        `)
        .eq('slug', slug)
        .eq('post_type', 'story')
        .single();

    if (error) {
        console.error('Error fetching story:', error);
        return { data: null, error: "Story not found." };
    }

    return { data: story, error: null };
}
