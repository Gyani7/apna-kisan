import { CreatePost } from "@/components/community/CreatePost";
import { PostList } from "@/components/community/PostList";
import { TrendingTopics } from "@/components/community/TrendingTopics";

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <CreatePost />
          <div className="mt-8">
            <PostList />
          </div>
        </div>
        <div>
          <TrendingTopics />
        </div>
      </div>
    </div>
  );
}
