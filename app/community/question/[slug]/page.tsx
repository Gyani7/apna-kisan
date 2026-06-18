'use client';

import { getQuestionBySlug } from '@/lib/actions/questions';
import { useEffect, useState } from 'react';
import { AuthorHeader } from '@/components/community/AuthorHeader';
import { AnswerForm } from '@/components/community/AnswerForm';
import { AnswerList } from '@/components/community/AnswerList';
import { notFound } from 'next/navigation';
import { Question } from '@/lib/types';

export default function QuestionPage({ params }: { params: { slug: string } }) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      getQuestionBySlug(params.slug).then(({ data, error }) => {
        if (error || !data) {
          notFound();
        }
        setQuestion(data as Question);
        setIsLoading(false);
      });
    }
  }, [params.slug]);

  if (isLoading) {
    return <div className="container max-w-3xl mx-auto py-8 text-center">Loading...</div>;
  }

  if (!question) {
    return null; // notFound() will have already been called
  }

  return (
    <div className="container max-w-3xl mx-auto py-8">
        <div className="bg-card p-6 rounded-lg shadow-md mb-6">
            <AuthorHeader author={question.author} createdAt={question.created_at} />
            <div className="mt-4">
                <h1 className="text-3xl font-bold mb-4">{question.title}</h1>
                <div className="prose dark:prose-invert max-w-none">
                    <p>{question.content}</p>
                </div>
            </div>
        </div>

        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Answers</h2>
            <AnswerList answers={question.answers} />
        </div>
        
        <div>
            <h2 className="text-2xl font-bold mb-4">Your Answer</h2>
            <AnswerForm questionId={Number(question.id)} />
        </div>
    </div>
  );
}
