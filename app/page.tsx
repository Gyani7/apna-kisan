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
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Main Feed */}
            <div className="flex-1 flex flex-col gap-4 min-w-0">

              {/* Hero Banner */}
              <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-2xl p-5 shadow">
                <h1 className="text-2xl font-bold">
                  🌾 Apna Kisan
                </h1>
                <p className="text-sm mt-1 opacity-90">
                  Kisan Se Kisan Tak
                </p>
              </div>

              <StoriesBar />

              <CreatePostCard />

              {/* Nearby Farmers */}
              <div className="bg-white rounded-2xl shadow-sm p-4">
                <h2 className="font-bold text-lg mb-3">
                  📍 Nearby Farmers
                </h2>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>🚜 Mahesh Gurjar</span>
                    <span className="text-green-600">8 KM Away</span>
                  </div>

                  <div className="flex justify-between">
                    <span>🌾 Ramesh Kumar</span>
                    <span className="text-green-600">12 KM Away</span>
                  </div>

                  <div className="flex justify-between">
                    <span>🥔 Suresh Singh</span>
                    <span className="text-green-600">18 KM Away</span>
                  </div>
                </div>
              </div>

              {/* Trending Questions */}
              <div className="bg-white rounded-2xl shadow-sm p-4">
                <h2 className="font-bold text-lg mb-3">
                  🔥 Trending Questions
                </h2>

                <div className="space-y-3">
                  <div className="border-b pb-2">
                    ❓ Gehu me peele daag aa rahe hain
                    <div className="text-sm text-gray-500">
                      23 Answers
                    </div>
                  </div>

                  <div className="border-b pb-2">
                    ❓ Sarso me kaunsa spray kare?
                    <div className="text-sm text-gray-500">
                      17 Answers
                    </div>
                  </div>

                  <div>
                    ❓ Tractor ka mileage kaise badhaye?
                    <div className="text-sm text-gray-500">
                      31 Answers
                    </div>
                  </div>
                </div>
              </div>

              <FarmingTipsCard />

              {/* Feed Posts */}
              <div className="flex flex-col gap-4">
                {MOCK_POSTS.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

            </div>

            {/* Desktop Sidebar */}
            <RightSidebar />
          </div>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
