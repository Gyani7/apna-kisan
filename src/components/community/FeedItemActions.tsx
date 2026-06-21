'use client';

import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import { FeedItemType } from "@/lib/types";

export function FeedItemActions({ item }: { item: FeedItemType }) {
    const getActionCounts = () => {
        switch(item.type) {
            case 'question':
                return { likes: item.likes_count, comments: item.answers.length };
            case 'reel':
                return { likes: item.likes_count, comments: 0 }; // Assuming reels don't have comments for now
            default:
                return { likes: 0, comments: 0 }; // Stories might not have likes/comments yet
        }
    }

    const { likes, comments } = getActionCounts();

    return (
        <div className="flex justify-between items-center text-muted-foreground">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4" />
                <span>{likes} Likes</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>{comments} Comments</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
            </Button>
        </div>
    );
}
