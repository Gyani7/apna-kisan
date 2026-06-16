import { notFound } from "next/navigation";
import { posts } from "#site/posts";
import { useMDXComponent } from "next-contentlayer/hooks";
import { components } from "@/components/mdx-components";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

export async function generateStaticParams(): Promise<PostPageProps["params"][]> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }

  const MDXContent = useMDXComponent(post.content);

  return (
    <article className="prose dark:prose-invert py-6">
      <h1 className="mb-2">{post.title}</h1>
      {post.description && (
        <p className="text-xl mt-0 text-muted-foreground">{post.description}</p>
      )}
      <hr className="my-4" />
      <MDXContent components={components} />
    </article>
  );
}
