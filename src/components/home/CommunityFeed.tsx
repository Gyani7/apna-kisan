
import { PostCard } from "./PostCard";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from 'react';

const initialPosts = [
    { id: 1, author: 'Vijay Kumar', time: '2 hours ago', content: 'Wheat crop is ready for harvest!', likes: 15, comments: 4, type: 'post' },
    { id: 2, author: 'Sunita Devi', time: '5 hours ago', content: 'What is the best fertilizer for cotton?', likes: 8, comments: 12, type: 'question' },
    { id: 3, author: 'Ramesh Singh', time: '1 day ago', content: 'Sharing my success story with organic farming.', likes: 32, comments: 7, type: 'story' },
  ];

const morePosts = [
    { id: 4, author: 'Geeta Verma', time: '2 days ago', content: 'New government scheme for solar pumps.', likes: 25, comments: 9, type: 'story' },
    { id: 5, author: 'Anil Yadav', time: '3 days ago', content: 'How to protect crops from locusts?', likes: 12, comments: 18, type: 'question' },
];

export function CommunityFeed() {
  const [posts, setPosts] = useState(initialPosts);

  const loadMore = useCallback(() => {
    setPosts(prev => [...prev, ...morePosts]);
  }, []);

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Community Feed</h2>
      <div className="flex flex-col gap-4">
        {posts.map(post => <PostCard key={post.id} {...post} />)}
      </div>
      <div className="text-center mt-6">
        <Button onClick={loadMore}>Load More</Button>
      </div>
    </div>
  );
}