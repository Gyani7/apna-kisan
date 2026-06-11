
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  const { pathname } = request.nextUrl;

  // --- Advanced Route Protection ---

  // Redirect authenticated users from any /auth path to home
  if (session && pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // For unauthenticated users, protect all routes except the defined public ones.
  if (!session) {
    // Define public path prefixes
    const publicPrefixes = [
      '/auth',
      '/explore',
      '/community',
      '/reels',
      '/category',
      '/profile',
      '/questions',
      '/story',
    ];

    // Check if the path is public
    const isPublicPath = 
      pathname === '/' || 
      publicPrefixes.some(prefix => pathname.startsWith(prefix));

    if (!isPublicPath) {
      // Redirect to the login page, preserving the intended destination for after login
      const redirectUrl = new URL('/auth', request.url);
      redirectUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return response;
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
