
import { getFeed } from "@/lib/actions/feed";
import { CreatePostDialog } from "@/components/community/CreatePostDialog";
import { Feed } from "@/components/community/Feed";

export default async function CommunityPage() {
  const { data: initialPosts, error } = await getFeed(1, 10);

  if (error) {
    return <div>Error loading feed: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Community Feed</h1>
        <CreatePostDialog />
      </div>
      <Feed items={initialPosts || []} />
    </div>
  );
}
