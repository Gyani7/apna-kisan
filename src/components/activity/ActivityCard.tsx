'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp } from "lucide-react";

interface ActivityCardProps {
    username: string;
    avatarUrl: string;
    activityText: string;
    timestamp: string;
    likes: number;
    isLiked: boolean;
}

export function ActivityCard({ username, avatarUrl, activityText, timestamp, likes, isLiked }: ActivityCardProps) {
    return (
        <div className="bg-[#1E293B]/60 p-4 rounded-2xl space-y-3">
            <div className="flex items-center space-x-3">
                <Avatar>
                    <AvatarImage src={avatarUrl} alt={username} />
                    <AvatarFallback>{username[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-bold">{username}</p>
                    <p className="text-gray-400 text-sm">{timestamp}</p>
                </div>
            </div>
            <p>{activityText}</p>
            <div className="flex items-center space-x-2">
                <button className={`p-1 rounded-full ${isLiked ? "bg-blue-500/50" : "bg-gray-600/50"}`}>
                    <ThumbsUp size={16}/>
                </button>
                <span>{likes}</span>
            </div>
        </div>
    )
}