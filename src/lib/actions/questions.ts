'use server';

import { createServerClient } from "@/utils/supabase/server";

export async function getQuestionBySlug(slug: string) {
    const supabase = createServerClient();
    
    const { data: question, error } = await supabase
        .from('questions')
        .select(`
            *,
            author:profiles(*),
            answers:answers(*, author:profiles(*))
        `)
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching question:', error);
        return { data: null, error: "Question not found." };
    }

    return { data: question, error: null };
}
