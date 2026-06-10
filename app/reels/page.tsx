import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import ReelsFeed from './ReelsFeed'; // Client component for the UI

// Strictly typed data structure for each reel, ensuring type safety.
export type ReelData = {
  id: string;
  created_at: string;
  video_url: string;
  caption: string | null;
  likes_count: number | null;
  comments_count: number | null;
  user: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  } | null;
  village: {
    id: number;
    name: string | null;
  } | null;
  comments: {
    id: string;
    content: string;
    created_at: string;
    user: {
        full_name: string | null;
    } | null
  }[];
  user_has_liked_reel: boolean;
};

// Next.js 15 Server Component: Responsible for data fetching and passing to the client.
export default async function ReelsPage() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
      },
    }
  );

  let reels: ReelData[] = [];
  let fetchError: string | null = null;

  try {
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch reels data with joins for user, village, and comments.
    const { data: reelsData, error } = await supabase
      .from('reels')
      .select(`
        id,
        created_at,
        video_url,
        caption,
        likes_count,
        comments_count,
        user:profiles(id, full_name, avatar_url),
        village:villages(id, name),
        comments:reel_comments(id, content, created_at, user:profiles(full_name))
      `)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }
    
    if (reelsData) {
      let likedReelIds = new Set();
      if (user) {
          const reelIds = reelsData.map(r => r.id);
          // Fetch the likes for the current user for the loaded reels
          const { data: likesData, error: likesError } = await supabase
              .from('reel_likes')
              .select('reel_id')
              .in('reel_id', reelIds)
              .eq('user_id', user.id);

          if (likesError) {
              // Data Masking: Log the internal error without exposing sensitive details
              console.error("Reels Fetch Likes Error: [User ID Masked]", { message: likesError.message });
          } else if (likesData) {
              likedReelIds = new Set(likesData.map(l => l.reel_id));
          }
      }

      // Map over the reels data to add the `user_has_liked_reel` property.
      reels = reelsData.map(reel => ({
        ...reel,
        comments: reel.comments ?? [], // Ensure comments is always an array for safety
        user_has_liked_reel: likedReelIds.has(reel.id)
      })) as ReelData[];
    }

  } catch (e: any) {
    // Data Masking: Log the error for debugging without exposing internals.
    console.error('Reels Fetch Error: [Database Query Redacted]', { message: e.message });
    fetchError = 'Could not load reels at this time.';
  }

  // Pass the safely fetched and augmented data to the client component.
  return <ReelsFeed serverReels={reels} fetchError={fetchError} />;
}
