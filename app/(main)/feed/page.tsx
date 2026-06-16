
import { CreatePost } from "@/components/common/CreatePost"
import { Post } from "@/components/common/Post"

export default function FeedPage() {
  return (
    <div>
      <CreatePost />
      <div className="mt-6 space-y-6">
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  )
}
