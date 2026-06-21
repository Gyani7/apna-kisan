'use client';

import { Answer } from '@/lib/types';
import { AuthorHeader } from './AuthorHeader';

export function AnswerList({ answers }: { answers: Answer[] }) {
  if (!answers || answers.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8 border rounded-lg">
        <p>No answers yet. Be the first to help!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {answers.map((answer) => (
        <div key={answer.id} className="bg-card p-4 rounded-lg shadow-sm">
          <AuthorHeader author={answer.author} createdAt={answer.created_at} />
          <div className="prose dark:prose-invert max-w-none mt-4">
            <p>{answer.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
