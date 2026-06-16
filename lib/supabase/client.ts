import { createBrowserClient as _createBrowserClient } from '@supabase/ssr';
import { env } from '../env';

export const createBrowserClient = () =>
  _createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
