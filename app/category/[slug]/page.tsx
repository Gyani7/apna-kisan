import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import PostCard from '@/components/PostCard';
import AuthProvider from '@/components/AuthProvider';
import { createClient } from '@/lib/supabase/utils';
import { cookies } from 'next/headers';
import { CATEGORIES } from '@/lib/types';
import { generatePageMeta } from '@/lib/seo';
import { mapPostsToPostWithAuthor, RawPost } from '@/lib/mappers';
import type { Metadata } from 'next';

async function getPosts({ category, limit }: { category: string; limit: number }) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    let query = supabase
        .from('posts')
        .select('*, profiles(*), likes_count:posts_likes(count), comments_count:posts_comments(count)')
        .order('created_at', { ascending: false })
        .limit(limit);

    if (category) {
        query = query.eq('category', category);
    }
    const { data } = await query;
    return data as RawPost[];
}

// CORRECT: params is a direct object, not a Promise.
interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params; // CORRECT: Removed 'await'
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return { title: 'Category Not Found' };
  return generatePageMeta({
    title: `${cat.nameHi} - ${cat.name}`,
    description: cat.description,
    path: `/category/${slug}`,
  });
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = params; // CORRECT: Removed 'await'
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const rawPosts = await getPosts({ category: slug, limit: 20 });
  // COMPLIANT: Null-safe handling of the fetched data before mapping.
  const typedPosts = mapPostsToPostWithAuthor(rawPosts ?? []);

  return (
    <AuthProvider>
      <Header />
      <main className="pt-14 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 py-4">
          {/* Category Header */}
          <div className="card p-6 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{category.icon}</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{category.nameHi}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">{category.name} — {category.description}</p>
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="flex flex-col gap-4">
            {typedPosts.length === 0 ? (
              <div className="card p-8 text-center">
                <p className="text-gray-400 dark:text-gray-500">Is category mein abhi koi post nahi hai</p>
              </div>
            ) : (
              // COMPLIANT: Mapping is null-safe and uses a stable, unique key.
              typedPosts.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>
        </div>
      </main>
      <BottomNav />
    </AuthProvider>
  );
}
