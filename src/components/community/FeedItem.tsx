'use client';

import { FeedItemType } from "@/lib/types";
import { QuestionCard } from "./QuestionCard";
import { StoryCard } from "./StoryCard";
import { ReelCard } from "./ReelCard";
import { AuthorHeader } from "./AuthorHeader";
import { FeedItemActions } from "./FeedItemActions";
import { Card } from "@/components/ui/card";

export function FeedItem({ item }: { item: FeedItemType }) {
    const renderContent = () => {
        switch (item.type) {
            case 'question':
                return <QuestionCard question={item} />;
            case 'story':
                return <StoryCard story={item} />;
            case 'reel':
                return <ReelCard reel={item} />;
            default:
                return null;
        }
    };

    const createdAt = 'createdAt' in item ? item.createdAt : item.created_at;

    return (
        <Card className="overflow-hidden">
            <div className="p-4">
                <AuthorHeader author={item.author} createdAt={createdAt} />
            </div>
            {renderContent()}
            <div className="p-4 border-t">
                <FeedItemActions item={item} />
            </div>
        </Card>
    );
}
