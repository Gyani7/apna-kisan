'use client';

import { useEffect, useState } from 'react';
import { getRecommendedQuestions } from '@/lib/actions/recommendations';
import Link from 'next/link';
import { Lightbulb } from 'lucide-react';

interface Recommendation {
  id: string;
  question: string;
  similarity: number;
}

interface RecommendedQuestionsProps {
  questionText: string;
  userState: string;
  currentQuestionId: string;
}

export default function RecommendedQuestions({ questionText, userState, currentQuestionId }: RecommendedQuestionsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      setIsLoading(true);
      const result = await getRecommendedQuestions(questionText, userState);
      if (result.success) {
        // Filter out the current question from the recommendations
        const filteredRecs = result.recommendations.filter(rec => rec.id !== currentQuestionId);
        setRecommendations(filteredRecs || []);
      }
      setIsLoading(false);
    }

    fetchRecommendations();
  }, [questionText, userState, currentQuestionId]);

  if (isLoading) {
    return <div className="p-4 text-center text-sm text-gray-500">Loading related content...</div>;
  }

  if (recommendations.length === 0) {
    return null; // Don't render the component if there are no recommendations
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mt-8">
      <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2 mb-3">
        <Lightbulb size={20} className="text-yellow-500"/>
        Related Questions in {userState}
      </h3>
      <ul className="space-y-3">
        {recommendations.map(rec => (
          <li key={rec.id}>
            <Link href={`/community/question/${rec.id}`}>
              <p className="font-semibold text-blue-600 hover:underline">
                {rec.question}
              </p>
              <span className="text-xs text-gray-500">Similarity: {Math.round(rec.similarity * 100)}%</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
