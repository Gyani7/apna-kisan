'use client';

import { CreatePostForm } from '@/components/community/CreatePostForm';

export default function CreatePostPage() {
    return (
        <div className="container max-w-2xl mx-auto py-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Create a new post</h1>
                <p className="text-muted-foreground">
                    Share your knowledge, stories, or a short video with the community.
                </p>
            </div>
            <CreatePostForm />
        </div>
    );
}
