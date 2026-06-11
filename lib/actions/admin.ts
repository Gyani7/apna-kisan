'use server';

import { createClient } from '@/lib/supabase/utils';
import { cookies } from 'next/headers';

interface CommunityQuestion {
  id: string;
  created_at: string;
  category: string;
  question: string;
  name: string;
  state: string;
}

export async function getStats() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const [
        { count: totalUsers },
        { count: pendingQuestions },
        { count: pendingVerifications },
        { data: recentQuestionsData }
    ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('community_questions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('verification_requests').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('community_questions').select('*').order('created_at', { ascending: false }).limit(5)
    ]);

    const recentQuestions: CommunityQuestion[] = recentQuestionsData || [];

    // Simulated data for platform growth and system health
    const platformGrowth = {
        userEngagementIncrease: 12,
        storageUsedPercentage: 70,
    };

    return {
        totalUsers: totalUsers || 0,
        pendingQuestions: pendingQuestions || 0,
        pendingVerifications: pendingVerifications || 0,
        recentQuestions,
        platformGrowth,
    };
}
