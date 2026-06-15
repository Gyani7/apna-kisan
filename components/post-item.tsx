import { Post } from "#site/content"
import Link from "next/link"

import { cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface PostItemProps {
    post: Post
}

export function PostItem({ post }: PostItemProps) {
    return (
        <article
            className="group relative flex flex-col space-y-2"
        >
            {post.image && (
                <img
                    src={post.image}
                    alt={post.title}
                    width={804}
                    height={452}
                    className="rounded-md border bg-muted transition-colors"
                />
            )}
            <h2 className="text-2xl font-extrabold">{post.title}</h2>
            {post.description && (
                <p className="text-muted-foreground">{post.description}</p>
            )}
            {post.date && (
                <p className="text-sm text-muted-foreground">
                    {formatDate(post.date)}
                </p>
            )}
            <Link href={post.slug} className="absolute inset-0">
                <span className="sr-only">View Article</span>
            </Link>
        </article>
    )
}
