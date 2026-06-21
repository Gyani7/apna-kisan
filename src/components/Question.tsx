import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Eye, MessageCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Question({ question }: any) {
  return (
    <div className="rounded-lg border p-4">
      <div className="grid grid-cols-12">
        <div className="col-span-12 flex flex-col gap-4 md:col-span-1">
          <div className="flex items-center gap-2 md:flex-col">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm">{question.views}</span>
          </div>
          <div className="flex items-center gap-2 md:flex-col">
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm">{question.answers.length}</span>
          </div>
          <div className="flex items-center gap-2 md:flex-col">
            <Eye className="h-5 w-5" />
            <span className="text-sm">{question.upvotes}</span>
          </div>
        </div>
        <div className="col-span-12 mt-4 md:col-span-11 md:mt-0">
          <Link href={`/q/${question.slug}`}>
            <h2 className="text-xl font-bold">{question.title}</h2>
          </Link>
          <div className="mt-2 flex items-center gap-2">
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
          <p className="mt-4 text-gray-500">{question.body}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {question.tags.map((tag: any) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
