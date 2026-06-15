import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Heart, MessageCircle, Share2, Bookmark, ArrowLeft, Tag } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import AuthProvider from '@/components/AuthProvider';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { generatePageMeta, generateArticleSchema } from '@/lib/seo';
import { mapPostToPostWithAuthor } from '@/lib/mappers';
import { timeAgo, formatCount } from '@/lib/types';
import type { Metadata } from 'next';
import type { Database } from '@/lib/database.types';

type Post = Database['public']['Tables']['posts']['Row'] & {
  author: Database['public']['Tables']['profiles']['Row'] | null;
};

async function getPostBySlug(slug: string) {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const { data } = await supabase
    .from('posts')
    .select('*, author:profiles(*), likes_count:posts_likes(count), comments_count:posts_comments(count)')
    .eq('slug', slug)
    .single<Post>();
  return data;
}

// CORRECT: params is a direct object, not a Promise.
interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params; // CORRECT: Removed 'await'
  const story = await getPostBySlug(slug);
  if (!story) return { title: 'Story Not Found' };

  return generatePageMeta({
    title: story.title ?? 'Story',
    description: story.excerpt ?? story.content.slice(0, 160),
    path: `/story/${slug}`,
    image: story.image_url ?? undefined,
    type: 'article',
  });
}

export default async function StoryPage({ params }: Props) {
  const { slug } = params; // CORRECT: Removed 'await'
  const rawStory = await getPostBySlug(slug);

  if (!rawStory) notFound();

  const story = mapPostToPostWithAuthor(rawStory);
  const author = story.author;
  const authorName = author?.full_name ?? author?.username ?? 'Kisan';
  const schema = generateArticleSchema({
    title: story.title ?? '',
    description: story.excerpt ?? story.content.slice(0, 160),
    url: `https://apnakisan.in/story/${slug}`,
    image: story.image_url ?? undefined,
    authorName,
    publishedAt: story.created_at,
    modifiedAt: story.updated_at,
  });

  return (
    <AuthProvider>
      <Header />
      <main className="pt-14 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <article className="max-w-2xl mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-brand-600 dark:text-brand-400 font-medium hover:underline mb-4">
            <ArrowLeft size={14} />Wapas Jaayein
          </Link>

          {story.image_url && (
            <div className="relative w-full aspect-[16/9] bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden mb-6">
              <Image src={story.image_url} alt={story.title ?? ''} fill className="object-cover" sizes="672px" priority />
            </div>
          )}

          <div className="flex items-center gap-2 mb-3">
            {story.category && <Link href={`/category/${story.category}`} className="badge bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400">{story.category}</Link>}
            <span className="badge bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">Story</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">{story.title}</h1>

          <div className="flex items-center gap-3 mb-6">
            <Link href={`/profile/${story.user_id}`}>
              {author?.avatar_url ? (
                <Image src={author.avatar_url} alt="" width={48} height={48} className="rounded-full object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold">{authorName?.[0] ?? 'K'}</div>
              )}
            </Link>
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">{authorName}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                {author?.location && <span className="flex items-center gap-0.5"><MapPin size={10} />{author.location}</span>}
                {story.read_time && <span className="flex items-center gap-0.5"><Clock size={10} />{story.read_time} min</span>}
                <span>{timeAgo(story.created_at)}</span>
              </div>
            </div>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{story.content}</p>
          </div>

          {/* COMPLIANT: Check for array existence and length before mapping */}
          {story.tags && story.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {story.tags.map((tag) => (
                <Link key={tag} href={`/community?q=${tag}`} className="badge bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-brand-50 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  <Tag size={10} className="mr-1" />#{tag}
                </Link>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between py-4 border-t border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-5">
              <button className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors">
                <Heart size={20} /><span className="text-sm font-medium">{formatCount(story.likes_count)}</span>
              </button>
              <button className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                <MessageCircle size={20} /><span className="text-sm font-medium">{formatCount(story.comments_count)}</span>
              </button>
              <button className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                <Share2 size={20} />
              </button>
            </div>
            <button className="text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              <Bookmark size={20} />
            </button>
          </div>
        </article>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <BottomNav />
    </AuthProvider>
  );
}
