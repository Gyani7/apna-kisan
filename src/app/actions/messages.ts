'use server';

import { createSupabaseClient } from "@/lib/supabase/client";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";

export async function createConversation(recipientId: string) {
    const supabase = createSupabaseClient();
    const user = await getUser();

    if (!user) {
        return redirect("/login");
    }

    const { data: conversation, error } = await supabase
        .from("conversations")
        .insert([{ user_1: user.id, user_2: recipientId }])
        .select();

    if (error) {
        console.error("Error creating conversation", error);
        return;
    }

    redirect(`/messages/${conversation[0].id}`);
}
