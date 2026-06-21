
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl

  const protectedPaths = [
    '/dashboard',
    '/community/create',
    '/market/sell',
    '/profile',
    '/loan-application',
    '/farm-analytics',
  ];

  const isProtectedRoute = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtectedRoute) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (name) => req.cookies.get(name)?.value,
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // Implement a modal or redirect to a specific login page
      // For now, redirecting to the root.
      return NextResponse.redirect(`${origin}/`);
    }
  }

  return NextResponse.next();
}
