import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import CreatePostCard from '@/components/CreatePostCard';
import PostCard from '@/components/PostCard';
import StoriesBar from '@/components/StoriesBar';
import FarmingTipsCard from '@/components/FarmingTipsCard';
import RightSidebar from '@/components/RightSidebar';
import { MOCK_POSTS } from '@/lib/mock-data';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-14 pb-20 min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex gap-6">
            {/* Main Feed */}
            <div className="flex-1 flex flex-col gap-4 min-w-0">
              <StoriesBar />
              <CreatePostCard />
              <FarmingTipsCard />

              <div className="flex flex-col gap-4">
                {MOCK_POSTS.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>

            {/* Right Sidebar (desktop only) */}
            <RightSidebar />
          </div>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
