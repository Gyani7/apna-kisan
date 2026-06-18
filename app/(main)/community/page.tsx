'use client';

import { PostCard } from "@/components/community/PostCard";
import { CreatePostDialog } from "@/components/community/CreatePostDialog";
import { useState } from "react";

const initialPosts = [
  {
    id: 1,
    content: 'Just harvested my first batch of organic tomatoes! So proud of the result. 🍅',
    author: {
      full_name: 'Amit Patel',
      username: 'amitp',
      avatar_url: 'https://i.pravatar.cc/150?u=amitp',
    },
    created_at: '2024-07-20T10:00:00.000Z',
  },
  {
    id: 2,
    content: 'Looking for advice on dealing with pests for my wheat crop. Any suggestions? ',
    author: {
      full_name: 'Sunita Sharma',
      username: 'sunitas',
      avatar_url: 'https://i.pravatar.cc/150?u=sunitas',
    },
    created_at: '2024-07-19T15:30:00.000Z',
  },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState(initialPosts);

  const handlePostCreated = (newPost: any) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Community Feed</h1>
        <CreatePostDialog onPostCreated={handlePostCreated} />
      </div>
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
