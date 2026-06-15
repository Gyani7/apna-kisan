'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

export async function getQuestions() {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

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
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

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

export async function addAnswer(question_id: string, answer: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('You must be logged in to answer a question.');
  }

  const { data, error } = await supabase
    .from('answers')
    .insert([
      {
        question_id,
        content: answer,
        author: session.user.id,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
