'use server';

import { createServer } from '@/lib/supabase/server';

// Define the shape of a community question
interface CommunityQuestion {
  id: string;
  created_at: string;
  category: string;
  question: string;
  name: string;
  state: string;
}

// Define the shape of the statistics object
interface AdminStats {
  totalUsers: number;
  pendingQuestions: number;
  pendingVerifications: number;
  recentQuestions: CommunityQuestion[];
  platformGrowth: {
    userEngagementIncrease: number;
    storageUsedPercentage: number;
  };
}

/**
 * Fetches administration statistics from the database.
 * @returns An object containing various statistics.
 */
export async function getStats(): Promise<AdminStats> {
  const supabase = createServer();

  const [
    { count: totalUsers },
    { count: pendingQuestions },
    { count: pendingVerifications },
    { data: recentQuestionsData },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('community_questions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('verification_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('community_questions').select('*').order('created_at', { ascending: false }).limit(5),
  ]);

  const recentQuestions: CommunityQuestion[] = recentQuestionsData || [];

  // Simulated data for platform growth and system health
  const platformGrowth = {
    userEngagementIncrease: 12, // Example static value
    storageUsedPercentage: 70, // Example static value
  };

  return {
    totalUsers: totalUsers || 0,
    pendingQuestions: pendingQuestions || 0,
    pendingVerifications: pendingVerifications || 0,
    recentQuestions,
    platformGrowth,
  };
}
