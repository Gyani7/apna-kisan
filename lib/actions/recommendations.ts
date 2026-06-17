'use server';

import { createClient } from '@/utils/supabase/server';

// --- MOCK EMBEDDING SERVICE ---
// In a real application, this would be a call to an embedding model like OpenAI's text-embedding-ada-002.
async function getMockEmbedding(text: string): Promise<number[]> {
  console.log(`Generating mock embedding for: "${text.substring(0, 50)}..."`);
  // Create a deterministic, high-dimensional vector from the text.
  const vector = Array(1536).fill(0);
  for (let i = 0; i < text.length; i++) {
    vector[i % 1536] += text.charCodeAt(i);
  }
  // Normalize the vector (simple version)
  const norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  return vector.map(v => v / norm);
}

/**
 * Generates an embedding for a community question and updates the record.
 * This should be triggered after a new question is approved and inserted.
 */
export async function generateAndUpdateEmbedding(questionId: string, questionText: string) {
  const supabase = createClient();
  const embedding = await getMockEmbedding(questionText);

  const { error } = await supabase
    .from('community_questions')
    .update({ embedding: embedding as any })
    .eq('id', questionId);

  if (error) {
    console.error(`Failed to update embedding for question ${questionId}:`, error);
    return { success: false, message: error.message };
  }

  return { success: true };
}

/**
 * Fetches recommended questions based on semantic similarity and user's state.
 */
export async function getRecommendedQuestions(questionText: string, userState: string) {
  const supabase = createClient();
  const queryEmbedding = await getMockEmbedding(questionText);

  const { data: questions, error } = await supabase.rpc('match_questions', {
    query_embedding: queryEmbedding as any,
    match_threshold: 0.7, // Adjust this threshold based on testing
    match_count: 5,
    user_state: userState,
  });

  if (error) {
    console.error('Error fetching recommendations:', error);
    return { success: false, recommendations: [], message: error.message };
  }

  return { success: true, recommendations: questions };
}
