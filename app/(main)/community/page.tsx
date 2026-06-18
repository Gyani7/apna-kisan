
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from "@/components/PageHeader";
import { Shell } from "@/components/shell";
import { getFeed } from "@/lib/actions/feed";
import { CreatePostDialog } from "@/components/community/CreatePostDialog";
import { Feed } from "@/components/community/Feed";

export default async function CommunityPage() {
  const { data: initialPosts, error } = await getFeed(1, 10);

  if (error) {
    return <div>Error loading feed: {error}</div>;
  }

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Community Feed</PageHeaderHeading>
        <PageHeaderDescription>
          Connect with other farmers, ask questions, and share your knowledge.
        </PageHeaderDescription>
      </PageHeader>
      <div className="flex justify-end mb-4">
        <CreatePostDialog />
      </div>
      <Feed items={initialPosts || []} />
    </Shell>
  );
}
