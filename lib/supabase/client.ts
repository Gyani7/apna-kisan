import { createBrowserClient as _createBrowserClient } from "@supabase/auth-helpers-nextjs"

export const createBrowserClient = () =>
  _createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
