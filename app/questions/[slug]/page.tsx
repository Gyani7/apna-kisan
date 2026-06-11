import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/utils';
import { cookies } from 'next/headers';
import { generateQuestionSchema } from '@/lib/seo';
import { PostCard } from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowBigUp, ArrowBigDown, MessageSquare, CheckCircle2 } from 'lucide-react';
import type { Database } from '@/lib/database.types';

type Answer = Database['public']['Tables']['answers']['Row'] & {
  author: Database['public']['Tables']['profiles']['Row'] | null;
};

type Question = Database['public']['Tables']['questions']['Row'] & {
  author: Database['public']['Tables']['profiles']['Row'] | null;
  answers: Answer[];
};

// CORRECT: params is a direct object, not a Promise.
interface QuestionPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: QuestionPageProps): Promise<Metadata> {
  const { slug } = params; // CORRECT: Removed 'await'
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: question } = await supabase
    .from('questions')
    .select('title, content')
    .eq('slug', slug)
    .single();

  if (!question) return { title: 'Question Not Found' };

  return {
    title: `${question.title} | Apna Kisan Knowledge Hub`,
    description: question.content?.substring(0, 160),
    openGraph: {
      title: question.title,
      description: question.content?.substring(0, 160),
      type: 'article',
    },
  };
}

export default async function QuestionDetailPage({ params }: QuestionPageProps) {
  const { slug } = params; // CORRECT: Removed 'await'
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: question, error } = await supabase
    .from('questions')
    .select(`
      *,
      author:profiles(*),
      answers(*, author:profiles(*))
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single<Question>();

  if (error || !question) {
    notFound();
  }

  const jsonLd = generateQuestionSchema(question, question.answers);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-zinc-100">
            <Image
              src={question.author?.avatar_url || '/default-avatar.png'}
              alt={question.author?.full_name || 'Farmer'}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <Link href={`/profile/${question.author?.id}`} className="font-semibold hover:underline">
              {question.author?.full_name}
            </Link>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                {question.author?.reputation_level || 'Seed Farmer'}
              </Badge>
              <span className="text-xs text-zinc-500">
                {new Date(question.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
          {question.title}
        </h1>
        
        <div className="prose prose-zinc dark:prose-invert max-w-none mb-6">
          <p className="whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
            {question.content}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {/* COMPLIANT: Null-safe mapping with stable key */}
          {question.tags?.map((tag: string) => (
            <span key={tag} className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 border-t border-zinc-100 dark:border-zinc-800 pt-4">
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
            <Button variant="ghost" size="sm" className="hover:text-orange-600">
              <ArrowBigUp className="w-5 h-5" />
            </Button>
            <span className="px-2 font-bold text-sm">0</span>
            <Button variant="ghost" size="sm" className="hover:text-blue-600">
              <ArrowBigDown className="w-5 h-5" />
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageSquare className="w-4 h-4" />
            {/* COMPLIANT: Null-safe access */}
            {question.answers?.length || 0} Answers
          </Button>
        </div>
      </article>

      <section className="space-y-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          Expert Answers
          {/* COMPLIANT: Null-safe access */}
          <Badge variant="outline">{question.answers?.length || 0}</Badge>
        </h2>

        {question.answers?.length === 0 ? (
          <div className="text-center py-12 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700">
            <p className="text-zinc-500">No answers yet. Be the first to help this farmer!</p>
            <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">Answer this Question</Button>
          </div>
        ) : (
          /* COMPLIANT: Null-safe mapping with stable key */
          question.answers?.map((answer) => (
            <div key={answer.id} className={`p-6 rounded-xl border ${answer.is_best_answer ? 'border-green-500 bg-green-50/30 dark:bg-green-900/10' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900'}`}>
              {answer.is_best_answer && (
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-bold mb-3 uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  Best Answer
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 relative rounded-full overflow-hidden">
                  <Image
                    src={answer.author?.avatar_url || '/default-avatar.png'}
                    alt={answer.author?.full_name || 'User'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-sm">
                  <span className="font-bold">{answer.author?.full_name}</span>
                  <Badge variant="secondary" className="ml-2 text-[9px]">
                    {answer.author?.reputation_level}
                  </Badge>
                </div>
              </div>

              <div className="text-zinc-700 dark:text-zinc-300 mb-4 whitespace-pre-wrap">
                {answer.content}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><ArrowBigUp className="w-4 h-4" /></Button>
                  <span className="text-xs font-bold">0</span>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><ArrowBigDown className="w-4 h-4" /></Button>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
