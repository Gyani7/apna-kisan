'use server';

import { createServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createAnswer(questionId: number, content: string) {
    const supabase = createServerClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, message: "You must be logged in to answer a question." };
    }

    if (!content || content.trim().length < 10) {
        return { success: false, message: "Answer must be at least 10 characters." };
    }

    try {
        const { error } = await supabase.from('answers').insert({
            content,
            question_id: questionId,
            author_id: user.id
        });

        if (error) throw error;

        // Find the question slug to revalidate the correct path
        const { data: question } = await supabase
            .from('questions')
            .select('slug')
            .eq('id', questionId)
            .single();
        
        if (question) {
            revalidatePath(`/community/question/${question.slug}`);
        }

        return { success: true, message: "Answer submitted successfully." };

    } catch (error: any) {
        return { success: false, message: `Failed to submit answer: ${error.message}` };
    }
}
