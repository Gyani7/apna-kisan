
import { ForumPost } from "@/components/common/ForumPost"
import { Button } from "@/components/ui/button"

export default function CommunityPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Community Forum</h1>
        <Button>Create Post</Button>
      </div>
      <div className="space-y-4">
        <ForumPost />
        <ForumPost />
        <ForumPost />
      </div>
    </div>
  )
}
