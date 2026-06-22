
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Share2, Send } from 'lucide-react';

export function PostList() {
  // Expanded mock data for a richer feed
  const posts = [
    {
      id: 1,
      user: {
        name: "Vijay Singh",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704a",
      },
      time: "2h ago",
      content: "Harvested my first batch of organic tomatoes today! The yield is fantastic. Big thanks to this community for the advice on pest control. #organicfarming #tomatoharvest",
      image: "/post-image-1.jpg", 
      likes: 128,
      comments: 23,
    },
    {
      id: 2,
      user: {
        name: "Rani Devi",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704b",
      },
      time: "5h ago",
      content: "Facing some issues with yellow rust in my wheat crop. Has anyone tried the new bio-fungicide that was discussed last week? Looking for reviews before I purchase.",
      image: null,
      likes: 72,
      comments: 15,
    },
     {
      id: 3,
      user: {
        name: "Sunil Kumar",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704c",
      },
      time: "1d ago",
      content: "The new drone sprayer is a game-changer! Covered 5 acres in less than an hour. Highly recommend it for larger farms.",
      image: "/post-image-2.jpg",
      likes: 250,
      comments: 45,
    },
  ];

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <Card key={post.id} className="card-glass bg-premium-green-dark/60 border-premium-gold/30 text-premium-white overflow-hidden">
          <CardHeader className="flex flex-row items-center space-x-4 p-4">
            <Avatar className="h-12 w-12 border-2 border-premium-gold/50">
              <AvatarImage src={post.user.avatar} alt={post.user.name} />
              <AvatarFallback>{post.user.name.substring(0,2)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-bold text-lg">{post.user.name}</p>
                <p className="text-sm text-premium-white/60">{post.time}</p>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
            {post.image && (
                <div className="rounded-lg overflow-hidden border-2 border-premium-gold/30 mb-4">
                    <img src={post.image} alt={`Post by ${post.user.name}`} className="w-full h-auto object-cover" />
                </div>
            )}
            <div className="flex justify-between items-center text-premium-white/70 text-sm">
                <span>{post.likes} Likes</span>
                <span>{post.comments} Comments</span>
            </div>
          </CardContent>
          <CardFooter className="p-2 border-t border-premium-gold/20">
            <div className="flex justify-around w-full">
                <Button variant="ghost" className="flex items-center space-x-2 text-premium-white/80 hover:text-premium-gold">
                    <Heart size={20} /><span>Like</span>
                </Button>
                 <Button variant="ghost" className="flex items-center space-x-2 text-premium-white/80 hover:text-premium-gold">
                    <MessageCircle size={20} /><span>Comment</span>
                </Button>
                 <Button variant="ghost" className="flex items-center space-x-2 text-premium-white/80 hover:text-premium-gold">
                    <Share2 size={20} /><span>Share</span>
                </Button>
            </div>
          </CardFooter>
          <div className="p-4 bg-black/20">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
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
