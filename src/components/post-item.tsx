import Link from "next/link"

import { Post } from "@/types/post"
import { cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "./ui/button"

interface PostItemProps extends React.HTMLAttributes<HTMLDivElement> {
  post: Post
}

export function PostItem({ post, ...props }: PostItemProps) {
  return (
    <article
      className={cn("group relative flex flex-col space-y-2", props.className)}
    >
      {post.date && (
        <time dateTime={post.date} className="block text-sm text-muted-foreground">
          {formatDate(post.date)}
        </time>
      )}
      <h2 className="text-2xl font-extrabold">{post.title}</h2>
      <Link href={post.slug} className={cn(buttonVariants({ variant: "link" }), "px-0")}>
        Read More
      </Link>
    </article>
  )
}
