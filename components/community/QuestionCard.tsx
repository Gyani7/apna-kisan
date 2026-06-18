'use client';

import Link from "next/link";
import { Question } from "@/lib/types";

export function QuestionCard({ question }: { question: Question }) {
  return (
    <div className="px-4 pb-4">
        <Link href={`/community/question/${question.slug}`}>
            <h3 className="text-lg font-semibold hover:underline mb-2">{question.title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-3">
            {question.content}
        </p>
    </div>
  );
}
