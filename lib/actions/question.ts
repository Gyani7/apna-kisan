'use server';

import { createClient } from '@/lib/supabase/utils';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export async function getQuestion(slug: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: question, error } = await supabase
    .from('questions')
    .select(`
      *,
      author:profiles!inner(*),
      answers(*, author:profiles!inner(*))
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .limit(1)
    .maybeSingle();

  if (error || !question) {
    notFound();
  }

  const normalizedQuestion = {
    ...question,
    author: Array.isArray(question.author) ? question.author[0] : question.author,
    answers: question.answers.map(answer => ({
      ...answer,
      author: Array.isArray(answer.author) ? answer.author[0] : answer.author,
    })),
  };

  return normalizedQuestion;
}
