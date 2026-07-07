
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal, HelpCircle, BookOpen, MessageSquareText } from "lucide-react";

export interface PostCardProps {
    id: number;
    author: string;
    time: string;
    content: string;
    likes: number;
    comments: number;
    type: 'post' | 'question' | 'story';
}

const typeDetails = {
    post: { icon: MessageSquareText, color: 'text-blue-500', label: 'Charcha' },
    question: { icon: HelpCircle, color: 'text-green-500', label: 'Sawaal' },
    story: { icon: BookOpen, color: 'text-purple-500', label: 'Kahani' }
};

export default function PostCard({ author, time, content, likes, comments, type }: PostCardProps) {
    const { icon: Icon, color, label } = typeDetails[type];

  return (
    <div className="glass-card p-4 rounded-2xl">
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
                <Avatar>
                <AvatarImage src={`/placeholder-user.jpg`} />
                <AvatarFallback>{author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                <p className="font-bold">{author}</p>
                <p className="text-xs text-muted-foreground">{time}</p>
                </div>
            </div>
            <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-5 h-5" />
            </Button>
        </div>

        <div className="flex items-center gap-2 my-3 text-sm">
            <Icon className={`w-4 h-4 ${color}`} />
            <span className={`font-semibold ${color}`}>{label}</span>
        </div>

        <p className="my-2">{content}</p>
        
        <div className="flex justify-between items-center mt-4 text-muted-foreground">
            <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <ThumbsUp className="w-5 h-5" />
                    <span>{likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>{comments}</span>
                </Button>
            </div>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
            </Button>
      </div>
    </div>
  );
}