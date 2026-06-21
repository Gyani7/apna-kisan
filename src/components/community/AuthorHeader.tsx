'use client';

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from 'date-fns';

interface AuthorProps {
  username: string;
  full_name?: string;
  avatar_url?: string;
}

export function AuthorHeader({ author, createdAt }: { author: AuthorProps, createdAt: string }) {
    return (
        <div className="flex items-center gap-3">
            <Link href={`/profile/${author.username}`}>
                <Avatar>
                    <AvatarImage src={author.avatar_url} />
                    <AvatarFallback>{author.full_name?.charAt(0)}</AvatarFallback>
                </Avatar>
            </Link>
            <div>
                <Link href={`/profile/${author.username}`} className="font-semibold hover:underline">
                    {author.full_name}
                </Link>
                <p className="text-xs text-muted-foreground">
                    Posted {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                </p>
            </div>
        </div>
    );
}
