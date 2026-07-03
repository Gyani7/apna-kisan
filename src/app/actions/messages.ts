'use server';

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function createConversation(recipientId: string) {
  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/login");
  }

  const user = session.user;

  const { data, error } = await supabase
    .from("conversations")
    .select("id")
    .or(`user1.eq.${user.id},user2.eq.${user.id}`)
    .or(`user1.eq.${recipientId},user2.eq.${recipientId}`)
    .single();

  const conversation = data as any;

  if (conversation) {
    return redirect(`/messages/${conversation.id}`);
  }

  const { data: newConversationData, error: newConversationError } = await supabase
    .from("conversations")
    .insert([{ user1: user.id, user2: recipientId }] as any)
    .select("id")
    .single();
  
  const newConversation = newConversationData as any;

  if (newConversationError) {
    console.error("Error creating conversation:", newConversationError);
    return { error: "Could not create conversation." };
  }

  if (newConversation) {
    redirect(`/messages/${newConversation.id}`);
  }
}
