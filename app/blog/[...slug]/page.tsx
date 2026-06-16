import { notFound } from 'next/navigation';
import { allPosts } from '@/lib/content/posts';
import { MDXContent } from '@/components/mdx-components';

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps['params']) {
  const slug = params?.slug?.join('/');
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    return null;
  }

  return post;
}

export async function generateStaticParams(): Promise<PostPageProps['params'][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <article className="prose dark:prose-invert">
      <h1>{post.title}</h1>
      {post.description && <p className="text-xl">{post.description}</p>}
      <hr />
      <MDXContent code={post.body} />
    </article>
  );
}
