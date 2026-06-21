'use client';

import { useState } from 'react';

interface Answer {
  id: string;
  text: string;
  upvotes: number;
}

interface AnswersProps {
  answers: Answer[];
}

const Answers = ({ answers }: AnswersProps) => {
  const [sortedAnswers, setSortedAnswers] = useState(answers.sort((a, b) => b.upvotes - a.upvotes));

  const handleUpvote = (id: string) => {
    setSortedAnswers(
      sortedAnswers.map((answer) => (answer.id === id ? { ...answer, upvotes: answer.upvotes + 1 } : answer))
    );
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Answers</h2>
      <div className="space-y-4">
        {sortedAnswers.map((answer) => (
          <div key={answer.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p>{answer.text}</p>
            <div className="flex items-center justify-end mt-2">
              <button
                onClick={() => handleUpvote(answer.id)}
                className="flex items-center space-x-2 text-gray-500 hover:text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a1 1 0 01-1-1V6.414l-2.293 2.293a1 1 0 11-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 6.414V17a1 1 0 01-1 1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{answer.upvotes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Answers;
