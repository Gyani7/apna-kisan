
import { createSupabaseServerClient } from "@/lib/supabase/server";
import PostCard from "./PostCard";

export async function PostList() {
  const supabase = createSupabaseServerClient();
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles (
        full_name,
        username,
        avatar_url
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return <p>Error loading posts.</p>;
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        <h3 className="text-2xl font-bold">No posts yet</h3>
        <p>Be the first to share something with the community!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
