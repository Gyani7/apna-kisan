import { notFound } from "next/navigation"

import { posts } from "#site/content"
import { Mdx } from "@/components/mdx-components"

import "@/styles/mdx.css"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"

interface PostPageProps {
    params: {
        slug: string[]
    }
}

async function getPostFromParams(params: PostPageProps["params"]) {
    const slug = params?.slug?.join("/")
    const post = posts.find((post) => post.slugAsParams === slug)

    if (!post) {
        null
    }

    return post
}

export async function generateMetadata({
    params,
}: PostPageProps): Promise<Metadata> {
    const post = await getPostFromParams(params)

    if (!post) {
        return {}
    }

    const ogSearchParams = new URLSearchParams()
    ogSearchParams.set("title", post.title)

    return {
        title: post.title,
        description: post.description,
        authors: {
            name: siteConfig.author
        },
    }
}

export async function generateStaticParams(): Promise<
    PostPageProps["params"][]
> {
    return posts.map((post) => ({ slug: post.slugAsParams.split("/") }))
}

export default async function PostPage({ params }: PostPageProps) {
    const post = await getPostFromParams(params)

    if (!post || !post.published) {
        notFound()
    }

    return (
        <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
            <h1 className="mb-2">{post.title}</h1>
            {
                post.description ? <p className="text-xl mt-0 text-muted-foreground">{post.description}</p> : null
            }
            <hr className="my-4" />
            <Mdx code={post.body} />
        </article>
    )
}
