'use server';

import { createServerClient } from "@/utils/supabase/server";

export async function getReelById(id: string) {
    const supabase = createServerClient();
    
    const { data: reel, error } = await supabase
        .from('reels')
        .select(`
            *,
            author:profiles(*)
        `)
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching reel:', error);
        return { data: null, error: "Reel not found." };
    }

    return { data: reel, error: null };
}
