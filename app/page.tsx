import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';
import CreatePostCard from '@/components/CreatePostCard';
import StoryCard from '@/components/StoryCard';
import StoriesBar from '@/components/StoriesBar';
import FarmingTipsCard from '@/components/FarmingTipsCard';
import AuthProvider from '@/components/AuthProvider';
import UnifiedGlobalFeed from '@/components/UnifiedGlobalFeed';
import { generateWebsiteSchema } from '@/lib/seo';
import { mapPostsToPostWithAuthor } from '@/lib/mappers';
import { getFeaturedStories } from '@/lib/actions/posts';

export default async function HomePage() {
  const featuredStories = await getFeaturedStories(4);
  const featuredData = mapPostsToPostWithAuthor(featuredStories ?? []);

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
                <h1 className="text-2xl font-bold">🚜 Apna Kisan</h1>
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
              <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-3">Community Charcha</h2>
              <UnifiedGlobalFeed />
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
