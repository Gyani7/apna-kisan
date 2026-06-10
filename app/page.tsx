import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';
import CreatePostCard from '@/components/CreatePostCard';
import PostCard from '@/components/PostCard';
import StoryCard from '@/components/StoryCard';
import StoriesBar from '@/components/StoriesBar';
import FarmingTipsCard from '@/components/FarmingTipsCard';
import AuthProvider from '@/components/AuthProvider';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { generateWebsiteSchema } from '@/lib/seo';
import { mapPostsToPostWithAuthor } from '@/lib/mappers';

export default async function HomePage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  );

  async function getPosts({ limit }: { limit: number }) {
      let query = supabase
          .from('posts')
          .select('*, author:profiles(*), likes_count:posts_likes(count), comments_count:posts_comments(count)')
          .order('created_at', { ascending: false })
          .limit(limit);
      const { data } = await query;
      return data;
  }

  async function getFeaturedStories(limit = 4) {
      const { data } = await supabase
          .from('posts')
          .select('*, author:profiles(*), likes_count:posts_likes(count), comments_count:posts_comments(count)')
          .eq('post_type', 'story')
          .eq('featured', true)
          .order('created_at', { ascending: false })
          .limit(limit);
      return data;
  }

  const [posts, featuredStories] = await Promise.all([
    getPosts({ limit: 20 }),
    getFeaturedStories(4),
  ]);

  const allPosts = mapPostsToPostWithAuthor(posts ?? []);
  const featuredData = mapPostsToPostWithAuthor(featuredStories ?? []);
  const feedPosts = allPosts.filter((p) => p.post_type === 'discussion' || p.post_type === 'question');

  return (
    <AuthProvider>
      <Header />
      <main className="pt-14 pb-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex gap-6">
            <LeftSidebar />

            <div className="flex-1 flex flex-col gap-4 min-w-0">
              {/* Hero Banner */}
              <div className="bg-gradient-to-r from-brand-600 to-brand-500 dark:from-brand-800 dark:to-brand-700 text-white rounded-2xl p-5 shadow-card">
                <h1 className="text-2xl font-bold">&#127806; Apna Kisan</h1>
                <p className="text-sm mt-1 opacity-90">Kisan Se Kisan Tak — Community, Knowledge, Growth</p>
              </div>

              <StoriesBar />
              <CreatePostCard />

              {/* Featured Stories */}
              {featuredData.length > 0 && (
                <section>
                  <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3">Featured Stories</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {featuredData.map((story) => (
                      <StoryCard key={story.id} story={story} featured />
                    ))}
                  </div>
                </section>
              )}

              <FarmingTipsCard />

              {/* Community Feed */}
              <section>
                <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3">Community Charcha</h2>
                <div className="flex flex-col gap-4">
                  {feedPosts.length === 0 ? (
                    <div className="card p-8 text-center">
                      <p className="text-gray-400 dark:text-gray-500">Abhi koi post nahi hai. Pehla post banayein!</p>
                    </div>
                  ) : (
                    feedPosts.map((post) => <PostCard key={post.id} post={post} />)
                  )}
                </div>
              </section>
            </div>

            <RightSidebar />
          </div>
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteSchema()) }}
      />

      <BottomNav />
    </AuthProvider>
  );
}
