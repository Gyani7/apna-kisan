'use client';

import Link from "next/link";
import Image from "next/image";
import { Story } from "@/lib/types";

export function StoryCard({ story }: { story: Story }) {
  return (
    <div>
        <Link href={`/community/story/${story.slug}`}>
            <div className="aspect-video relative overflow-hidden">
                <Image 
                    src={story.thumbnail_url} 
                    alt={story.title} 
                    layout="fill"
                    objectFit="cover"
                    className="hover:scale-105 transition-transform duration-300"
                />
            </div>
        </Link>
        <div className="p-4">
            <Link href={`/community/story/${story.slug}`}>
                <h3 className="text-lg font-semibold hover:underline mb-2">{story.title}</h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-2">
                {story.content}
            </p>
        </div>
    </div>
  );
}
