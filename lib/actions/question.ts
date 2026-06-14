'use server';

import { createServer } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export async function getQuestions() {
  const supabase = createServer();

  const { data: questions, error } = await supabase
    .from('questions')
    .select(
      `
      *,
      author:profiles!author(*)
    `,
    )
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const normalizedQuestions = questions.map((question) => ({
    ...question,
    author: Array.isArray(question.author) ? question.author[0] : question.author,
  }));

  return normalizedQuestions;
}

export async function getQuestion(slug: string) {
  const supabase = createServer();

  const { data: question, error } = await supabase
    .from('questions')
    .select(
      `
      *,
      author:profiles!author(*),
      answers(*, author:profiles!author(*))
    `,
    )
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
    answers: question.answers.map((answer) => ({
      ...answer,
      author: Array.isArray(answer.author) ? answer.author[0] : answer.author,
    })),
  };

  return normalizedQuestion;
}
