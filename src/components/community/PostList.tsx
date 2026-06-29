
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Share2, Send } from 'lucide-react';

// A simple function to format time
function formatTime(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString(); // Or use a library like date-fns for "2h ago"
}

export async function PostList() {
  const supabase = createSupabaseServerClient();
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles (
        name,
        avatar_url
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return <p>Error loading posts.</p>;
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center text-premium-white/80 py-10">
        <h3 className="text-2xl font-bold">No posts yet</h3>
        <p>Be the first to share something with the community!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {posts.map((post: any) => (
        <Card key={post.id} className="card-glass bg-premium-green-dark/60 border-premium-gold/30 text-premium-white overflow-hidden">
          <CardHeader className="flex flex-row items-center space-x-4 p-4">
            <Avatar className="h-12 w-12 border-2 border-premium-gold/50">
              <AvatarImage src={post.profiles.avatar_url} alt={post.profiles.name} />
              <AvatarFallback>{post.profiles.name?.substring(0, 2) || 'U'}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-bold text-lg">{post.profiles.name || 'Anonymous'}</p>
                <p className="text-sm text-premium-white/60">{formatTime(post.created_at)}</p>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
            {/* Image display logic can be added here if post.image_url exists */}
            <div className="flex justify-between items-center text-premium-white/70 text-sm">
                {/* Like and comment counts would require more queries or database functions */}
                <span>0 Likes</span>
                <span>0 Comments</span>
            </div>
          </CardContent>
          <CardFooter className="p-2 border-t border-premium-gold/20">
            <div className="flex justify-around w-full">
                <Button variant="ghost" className="flex items-center space-x-2 text-premium-white/80 hover:text-premium-gold">
                    <Heart size={20} /><span>Like</span>
                </Button>                 <Button variant="ghost" className="flex items-center space-x-2 text-premium-white/80 hover:text-premium-gold">
                    <MessageCircle size={20} /><span>Comment</span>
                </Button>                 <Button variant="ghost" className="flex items-center space-x-2 text-premium-white/80 hover:text-premium-gold">
                    <Share2 size={20} /><span>Share</span>
                </Button>
            </div>
          </CardFooter>
           <div className="p-4 bg-black/20">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                    {/* This should be the current user's avatar */}
                    <AvatarImage src="" alt="You" />
                    <AvatarFallback>YOU</AvatarFallback>
                </Avatar>
                <Input
                    placeholder="Write a comment..."
                    className="bg-transparent border-b border-premium-gold/50 rounded-none focus:ring-0 text-white"
                />
                <Button variant="ghost" className="p-2 text-premium-gold hover:text-premium-gold-dark">
                    <Send size={20}/>
                </Button>
              </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
