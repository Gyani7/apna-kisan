'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function createConversation(farmerId: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  // Check if a conversation already exists
  const { data: existingConversation, error: existingConversationError } = await supabase
    .rpc('get_conversation_between_users', { user_id_1: user.id, user_id_2: farmerId });

  if (existingConversationError) {
    console.error('Error checking for existing conversation:', existingConversationError);
    return;
  }

  if (existingConversation && existingConversation.length > 0) {
    return redirect(`/messages/${existingConversation[0].conversation_id}`);
  }

  // Create a new conversation
  const { data: newConversation, error: newConversationError } = await supabase
    .from('conversations')
    .insert({})
    .select('id')
    .single();

  if (newConversationError || !newConversation) {
    console.error('Error creating new conversation:', newConversationError);
    return;
  }

  // Add participants to the conversation
  const { error: participantsError } = await supabase.from('conversation_participants').insert([
    { conversation_id: newConversation.id, user_id: user.id },
    { conversation_id: newConversation.id, user_id: farmerId },
  ]);

  if (participantsError) {
    console.error('Error adding participants to conversation:', participantsError);
    // We should probably delete the conversation here
    return;
  }

  return redirect(`/messages/${newConversation.id}`);
}
