
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';

// The middleware is used to refresh the user's session before loading Server Component routes
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session }} = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  // --- Advanced Route Protection ---

  // Redirect authenticated users from any /auth path to home
  if (session && pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // For unauthenticated users, protect all routes except the defined public ones.
  if (!session) {
    const isPublicPath = 
      pathname === '/' ||
      pathname.startsWith('/auth') ||
      pathname.startsWith('/explore') ||
      pathname.startsWith('/community') ||
      pathname.startsWith('/reels') ||
      pathname.startsWith('/category') ||
      pathname.startsWith('/profile') ||
      pathname.startsWith('/questions') ||
      pathname.startsWith('/story');

    if (!isPublicPath) {
      // Redirect to the login page, preserving the intended destination for after login
      const redirectUrl = new URL('/auth', req.url);
      redirectUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
