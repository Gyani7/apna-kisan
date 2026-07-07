'use client';

import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import { FeedItemType } from "@/lib/types";

export function FeedItemActions({ item }: { item: FeedItemType }) {
    const getActionCounts = () => {
        switch(item.type) {
            case 'post':
                return { likes: item.likesCount, comments: item.commentsCount };
            case 'question':
                return { likes: 0, comments: item.answers.length };
            case 'reel':
                return { likes: 0, comments: 0 };
            case 'story':
                return { likes: 0, comments: 0 };
            default:
                return { likes: 0, comments: 0 };
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
