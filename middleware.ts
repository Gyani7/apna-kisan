import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // 1. Check if the user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth';
    return NextResponse.redirect(url);
  }

  // 2. Fetch the user's role from the 'profiles' table
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  // 3. If role is NOT 'admin', redirect to 403 or Access Denied
  if (error || profile?.role !== 'admin') {
    const url = req.nextUrl.clone();
    url.pathname = '/403'; // Ensure you have this page or use rewrite
    return NextResponse.rewrite(url);
  }

  return res;
}

// 5. Only apply this middleware to the '/admin/:path*' routes
export const config = {
  matcher: ['/admin/:path*'],
};