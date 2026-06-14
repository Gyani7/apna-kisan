import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getQuestion } from '@/lib/actions/question';
import { Eye, MessageCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Answers from '@/components/Answers';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default async function QuestionPage({ params }: any) {
  const question = await getQuestion(params.slug);

  if (!question) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button variant="secondary">Back</Button>
        </Link>
        <Link href={`/q/${question.slug}?answer=true`}>
          <Button>Answer</Button>
        </Link>
      </div>

      <div className="mt-10 flex items-start gap-4">
        <div className="hidden flex-col gap-4 md:flex">
          <div className="flex flex-col items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm">{question.views}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm">{question.answers.length}</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Eye className="h-5 w-5" />
            <span className="text-sm">{question.upvotes}</span>
          </div>
        </div>
        <div className="w-full rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Link href={`/u/${question.author.username}`}>
              <Avatar>
                <AvatarImage src={question.author.avatar_url} />
                <AvatarFallback>{question.author.name[0]}</AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex flex-col">
              <Link href={`/u/${question.author.username}`}>
                <p className="text-sm font-medium">{question.author.name}</p>
              </Link>
              <p className="text-sm text-gray-500">
                @{question.author.username}
              </p>
            </div>
          </div>

          <h1 className="mt-4 text-2xl font-bold">{question.title}</h1>
          <p className="mt-2 text-gray-500">{question.body}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {question.tags.map((tag: any) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-10" />

      <Answers answers={question.answers} />
    </div>
  );
}
