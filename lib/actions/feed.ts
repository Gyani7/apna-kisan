'use server';

import { createServer } from '@/lib/supabase/server';
import type { Database } from '@/lib/database.types';

// --- TYPE DEFINITIONS FOR UNIFIED FEED ---

/** Base profile type for post authors. */
type AuthorProfile = Pick<Database['public']['Tables']['profiles']['Row'], 'id' | 'username' | 'avatar_url' | 'full_name'> | null;

/** Represents a question in the unified feed. */
export interface QuestionPost {
  id: string;
  type: 'question';
  title: string;
  content: string | null;
  created_at: string;
  slug: string;
  author: AuthorProfile;
  vote_count: number;
  answer_count: number;
}

/** Represents a story in the unified feed. */
export interface StoryPost {
  id: string;
  type: 'story';
  title: string;
  content: string | null;
  created_at: string;
  slug: string;
  author: AuthorProfile;
  thumbnail_url: string | null;
}

/** Represents a reel in the unified feed. */
export interface ReelPost {
  id: string;
  type: 'reel';
  caption: string | null;
  video_url: string;
  created_at: string;
  author: AuthorProfile;
  like_count: number;
}

/** A union type representing any possible item in the unified feed. */
export type UnifiedPost = QuestionPost | StoryPost | ReelPost;

/**
 * Fetches and combines data from multiple sources (questions, stories, reels)
 * into a single, time-sorted feed for display on the main community page.
 * @returns A promise that resolves to an object containing the unified feed data or an error message.
 */
export async function getUnifiedFeed(): Promise<{ data: UnifiedPost[]; error: string | null; }> {
  const supabase = createServer();

  try {
    // --- STEP 1: Fetch all data sources in parallel ---

    const [questionsResult, storiesResult, reelsResult] = await Promise.all([
      supabase
        .from('questions')
        .select(`id, title, content, created_at, slug, vote_count, answers(id), author:profiles!inner(id, username, avatar_url, full_name)`)
        .order('created_at', { ascending: false })
        .limit(20),
      supabase
        .from('posts')
        .select(`id, title, content, created_at, slug, thumbnail_url, author:profiles!inner(id, username, avatar_url, full_name)`)
        .eq('post_type', 'story')
        .order('created_at', { ascending: false })
        .limit(20),
      supabase
        .from('reels')
        .select(`id, caption, video_url, created_at, like_count, author:profiles!inner(id, username, avatar_url, full_name)`)
        .order('created_at', { ascending: false })
        .limit(20)
    ]);

    if (questionsResult.error) throw new Error(`Failed to fetch questions: ${questionsResult.error.message}`);
    if (storiesResult.error) throw new Error(`Failed to fetch stories: ${storiesResult.error.message}`);
    if (reelsResult.error) throw new Error(`Failed to fetch reels: ${reelsResult.error.message}`);

    // --- STEP 2: Normalize each data type into the UnifiedPost format ---

    const normalizedQuestions: QuestionPost[] = (questionsResult.data || []).map(q => ({
      id: q.id,
      type: 'question',
      title: q.title,
      content: q.content,
      created_at: q.created_at,
      slug: q.slug,
      author: Array.isArray(q.author) ? (q.author[0] ?? null) : q.author,
      vote_count: q.vote_count ?? 0,
      answer_count: Array.isArray(q.answers) ? q.answers.length : 0,
    }));

    const normalizedStories: StoryPost[] = (storiesResult.data || []).map(s => ({
      id: s.id,
      type: 'story',
      title: s.title,
      content: s.content,
      created_at: s.created_at,
      slug: s.slug,
      author: Array.isArray(s.author) ? (s.author[0] ?? null) : s.author,
      thumbnail_url: s.thumbnail_url,
    }));
    
    const normalizedReels: ReelPost[] = (reelsResult.data || []).map(r => ({
      id: r.id,
      type: 'reel',
      caption: r.caption,
      video_url: r.video_url,
      created_at: r.created_at,
      author: Array.isArray(r.author) ? (r.author[0] ?? null) : r.author,
      like_count: r.like_count ?? 0,
    }));

    // --- STEP 3: Combine, sort, and return the final feed ---

    const unifiedFeed: UnifiedPost[] = [...normalizedQuestions, ...normalizedStories, ...normalizedReels];
    unifiedFeed.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return { data: unifiedFeed, error: null };

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred while fetching the feed.';
    console.error("Error fetching unified feed:", errorMessage);
    return { data: [], error: errorMessage };
  }
}
