import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/database.types';

export const createSupabaseClient = () => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
