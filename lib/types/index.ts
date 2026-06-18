export type Profile = {
    id: string;
    username: string;
    avatar_url: string;
    full_name: string;
};

export type Question = {
    id: number;
    type: 'question';
    title: string;
    content: string;
    created_at: string;
    slug: string;
    vote_count: number;
    answers: { count: number }[];
    author: Profile;
};

export type Story = {
    id: number;
    type: 'story';
    title: string;
    content: string;
    created_at: string;
    slug: string;
    thumbnail_url: string;
    author: Profile;
};

export type Reel = {
    id: number;
    type: 'reel';
    caption: string;
    video_url: string;
    created_at: string;
    like_count: number;
    author: Profile;
};

export type FeedItemType = Question | Story | Reel;