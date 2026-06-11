
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/database.types';

// --- TYPE DEFINITIONS FOR UNIFIED FEED ---

// Base Profile Type
type AuthorProfile = Pick<Database['public']['Tables']['profiles']['Row'], 'id' | 'username' | 'avatar_url' | 'full_name'> | null;

// Specific Post Types with Normalized Structure
export interface QuestionPost {
  id: string;
  type: 'question';
  title: string;
  content: string | null;
  created_at: string;
  slug: string;
  author: AuthorProfile;
  // Question-specific fields
  vote_count: number;
  answer_count: number;
}

export interface StoryPost {
  id: string;
  type: 'story';
  title: string;
  content: string | null;
  created_at: string;
  slug: string;
  author: AuthorProfile;
  // Story-specific fields
  thumbnail_url: string | null;
}

export interface ReelPost {
  id: string;
  type: 'reel';
  caption: string | null;
  video_url: string;
  created_at: string;
  author: AuthorProfile;
  // Reel-specific fields
  like_count: number;
}

// The final UnifiedPost type for the component
export type UnifiedPost = QuestionPost | StoryPost | ReelPost;

// --- SERVER ACTION FOR DATA FETCHING ---

export async function getUnifiedFeed(): Promise<{ data: UnifiedPost[]; error: string | null; }> {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
      },
    }
  );

  try {
    // 1. Fetch Questions
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select(`
        id, title, content, created_at, slug, vote_count, 
        answers ( id ),
        author:profiles ( id, username, avatar_url, full_name )
      `)
      .order('created_at', { ascending: false })
      .limit(20);

    if (questionsError) throw new Error(`Failed to fetch questions: ${questionsError.message}`);

    // 2. Fetch Stories (from 'posts' table)
    const { data: stories, error: storiesError } = await supabase
      .from('posts')
      .select(`
        id, title, content, created_at, slug, thumbnail_url,
        author:profiles ( id, username, avatar_url, full_name )
      `)
      // Assuming you have a way to distinguish stories, e.g., a 'type' column
      // .eq('post_type', 'story') 
      .order('created_at', { ascending: false })
      .limit(20);

    if (storiesError) throw new Error(`Failed to fetch stories: ${storiesError.message}`);
    
    // 3. Fetch Reels (assuming a 'reels' table)
    const { data: reels, error: reelsError } = await supabase
        .from('reels')
        .select(`
            id, caption, video_url, created_at, like_count,
            author:profiles(id, username, avatar_url, full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(20);

    if (reelsError) throw new Error(`Failed to fetch reels: ${reelsError.message}`);


    // --- NORMALIZE AND COMBINE DATA ---

    const normalizedQuestions: QuestionPost[] = (questions || []).map(q => ({
      id: q.id,
      type: 'question',
      title: q.title,
      content: q.content,
      created_at: q.created_at,
      slug: q.slug,
      author: q.author,
      vote_count: q.vote_count ?? 0,
      answer_count: Array.isArray(q.answers) ? q.answers.length : 0,
    }));

    const normalizedStories: StoryPost[] = (stories || []).map(s => ({
      id: s.id,
      type: 'story',
      title: s.title,
      content: s.content,
      created_at: s.created_at,
      slug: s.slug,
      author: s.author,
      thumbnail_url: s.thumbnail_url,
    }));
    
    const normalizedReels: ReelPost[] = (reels || []).map(r => ({
      id: r.id,
      type: 'reel',
      caption: r.caption,
      video_url: r.video_url,
      created_at: r.created_at,
      author: r.author,
      like_count: r.like_count ?? 0,
    }));


    const unifiedFeed: UnifiedPost[] = [...normalizedQuestions, ...normalizedStories, ...normalizedReels];

    // Sort the combined feed by date
    unifiedFeed.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return { data: unifiedFeed, error: null };

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    console.error("Error fetching unified feed:", errorMessage);
    return { data: [], error: errorMessage };
  }
}
