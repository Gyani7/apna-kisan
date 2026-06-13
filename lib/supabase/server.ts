
import { createServer } from "./utils";
import type { Database } from "../database.types";
import type { RawPost } from "../mappers";

// Storage bucket names
export const BUCKETS = {
  avatars: "avatars",
  posts: "posts",
  stories: "stories",
  reels: "reels",
} as const;

type Buckets = (typeof BUCKETS)[keyof typeof BUCKETS];

// Upload file to storage bucket
export async function uploadFile(
  bucket: Buckets,
  path: string,
  file: File,
): Promise<string | null> {
  const supabase = createServer();
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true, cacheControl: "3600" });
  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export function getPublicUrl(bucket: Buckets, path: string): string {
  const supabase = createServer();
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

// Profile helpers
export async function getProfile(
  userId: string,
): Promise<Database["public"]["Tables"]["profiles"]["Row"] | null> {
  const supabase = createServer();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return data;
}

export async function updateProfile(
  userId: string,
  updates: Database["public"]["Tables"]["profiles"]["Update"],
) {
  const supabase = createServer();
  const payload = { ...updates, updated_at: new Date().toISOString() };
  const { data, error } = await supabase
    .from("profiles")
    .update(payload)
    .eq("id", userId)
    .select()
    .single();
  return { data, error };
}

// Post helpers
export async function getPostBySlug(slug: string): Promise<RawPost | null> {
  const supabase = createServer();
  const { data } = await supabase
    .from("posts")
    .select(
      "*, profiles:user_id(username, full_name, avatar_url, reputation, badge, location)",
    )
    .eq("slug", slug)
    .single();
  return data as RawPost | null;
}

export async function createPost(
  post: Database["public"]["Tables"]["posts"]["Insert"],
) {
  const supabase = createServer();
  const { data, error } = await supabase
    .from("posts")
    .insert(post)
    .select(
      "*, profiles:user_id(username, full_name, avatar_url, reputation, badge, location)",
    )
    .single();
  return { data: data as RawPost | null, error };
}

export async function deletePost(postId: string) {
  const supabase = createServer();
  const { error } = await supabase.from("posts").delete().eq("id", postId);
  return { error };
}

// Like helpers
export async function toggleLike(postId: string, userId: string) {
  const supabase = createServer();
  const { data: existing } = await supabase
    .from("likes")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();
  if (existing) {
    const { error } = await supabase.from("likes").delete().eq("id", existing.id);
    return { liked: false, error };
  }
  const { error } = await supabase
    .from("likes")
    .insert({ post_id: postId, user_id: userId });
  return { liked: true, error };
}

export async function isLikedByUser(postId: string, userId: string) {
  const supabase = createServer();
  const { data } = await supabase
    .from("likes")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();
  return !!data;
}

// Bookmark helpers
export async function toggleBookmark(postId: string, userId: string) {
  const supabase = createServer();
  const { data: existing } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();
  if (existing) {
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", existing.id);
    return { bookmarked: false, error };
  }
  const { error } = await supabase
    .from("bookmarks")
    .insert({ post_id: postId, user_id: userId });
  return { bookmarked: true, error };
}

// Comment helpers
export interface CommentWithAuthor {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles: {
    username: string;
    full_name: string | null;
    avatar_url: string | null;
    badge: string;
  } | null;
}

export async function getComments(
  postId: string,
): Promise<CommentWithAuthor[] | null> {
  const supabase = createServer();
  const { data } = await supabase
    .from("comments")
    .select("*, profiles:user_id(username, full_name, avatar_url, badge)")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });
  return data as CommentWithAuthor[] | null;
}

export async function addComment(
  postId: string,
  userId: string,
  content: string,
): Promise<{ data: CommentWithAuthor | null; error: Error | null }> {
  const supabase = createServer();
  const { data, error } = await supabase
    .from("comments")
    .insert({ post_id: postId, user_id: userId, content })
    .select("*, profiles:user_id(username, full_name, avatar_url, badge)")
    .single();
  return { data: data as CommentWithAuthor | null, error: error as any };
}

// Follow helpers
export async function toggleFollow(followerId: string, followingId: string) {
  const supabase = createServer();
  const { data: existing } = await supabase
    .from("followers")
    .select("id")
    .eq("follower_id", followerId)
    .eq("following_id", followingId)
    .maybeSingle();
  if (existing) {
    const { error } = await supabase
      .from("followers")
      .delete()
      .eq("id", existing.id);
    return { following: false, error };
  }
  const { error } = await supabase
    .from("followers")
    .insert({ follower_id: followerId, following_id: followingId });
  return { following: true, error };
}

export async function isFollowing(followerId: string, followingId: string) {
  const supabase = createServer();
  const { data } = await supabase
    .from("followers")
    .select("id")
    .eq("follower_id", followerId)
    .eq("following_id", followingId)
    .maybeSingle();
  return !!data;
}

// Notification helpers
export async function getNotifications(userId: string, limit = 20) {
  const supabase = createServer();
  const { data } = await supabase
    .from("notifications")
    .select("*, actor:actor_id(username, full_name, avatar_url)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  return data;
}

export async function markNotificationsRead(userId: string) {
  const supabase = createServer();
  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("user_id", userId)
    .eq("is_read", false);
  return { error };
}

export async function getUnreadCount(userId: string) {
  const supabase = createServer();
  const { count } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("is_read", false);
  return count ?? 0;
}

// Stories helpers
export async function getActiveStories() {
  const supabase = createServer();
  const { data } = await supabase
    .from("stories")
    .select("*, profiles:user_id(username, full_name, avatar_url)")
    .gte(
      "created_at",
      new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    )
    .order("created_at", { ascending: false });
  return data;
}

export async function createStory(
  userId: string,
  mediaUrl: string,
  mediaType: string,
) {
  const supabase = createServer();
  const { data, error } = await supabase
    .from("stories")
    .insert({ user_id: userId, media_url: mediaUrl, media_type: mediaType })
    .select()
    .single();
  return { data, error };
}

// Reels helpers
export async function getReels(limit = 20, offset = 0) {
  const supabase = createServer();
  const { data } = await supabase
    .from("reels")
    .select("*, profiles:user_id(username, full_name, avatar_url, badge)")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);
  return data;
}

// Mandi rates helpers
export async function getMandiRates() {
  const supabase = createServer();
  const { data } = await supabase
    .from("mandi_rates")
    .select("*")
    .order("updated_at", { ascending: false });
  return data;
}

// Farming tips helpers
export async function getFarmingTips() {
  const supabase = createServer();
  const { data } = await supabase
    .from("farming_tips")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });
  return data;
}

// Leaderboard
export async function getLeaderboard(limit = 10) {
  const supabase = createServer();
  const { data } = await supabase
    .from("profiles")
    .select("id, username, full_name, avatar_url, reputation, badge, posts_count")
    .order("reputation", { ascending: false })
    .limit(limit);
  return data;
}
