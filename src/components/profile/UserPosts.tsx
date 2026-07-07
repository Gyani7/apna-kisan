
import PostCard, { PostCardProps } from "@/components/home/PostCard";

// Placeholder for user's posts
const userPosts: PostCardProps[] = [
  { id: 1, author: 'Vijay Kumar', time: '2 hours ago', content: 'Wheat crop is ready for harvest!', likes: 15, comments: 4, type: 'post' },
  { id: 2, author: 'Vijay Kumar', time: '1 day ago', content: 'Sharing my success story with organic farming.', likes: 32, comments: 7, type: 'story' },
];

export function UserPosts() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">My Posts</h2>
      <div className="flex flex-col gap-4">
        {userPosts.map(post => <PostCard key={post.id} {...post} />)}
      </div>
    </div>
  );
}