
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // For debugging
  console.log(`[Middleware] Path: ${pathname}, Token: ${token ? 'present' : 'absent'}`);

  const protectedRoutes = [
    '/dashboard',
    '/profile',
    '/messages',
    '/sell',
    '/create',
    '/community/create',
    '/community/ask',
    '/community/create-reel',
    '/community/share-story',
    '/my-products',
    '/admin',
    '/my-products/edit',
  ];

  const authRoutes = ['/login', '/register', '/otp'];
  
  const publicDynamicRoutePatterns = [
    /^\/village\/[^/]+$/,
    /^\/state\/[^/]+$/,
    /^\/district\/[^/]+$/,
    /^\/blog\/[^/]+$/,
    /^\/community\/question\/[^/]+$/,
    /^\/community\/reel\/[^/]+$/,
    /^\/community\/story\/[^/]+$/,
    /^\/market\/product\/[^/]+$/,
  ];

  const isPublicRoute = publicDynamicRoutePatterns.some((pattern) => pattern.test(pathname));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isPublicRoute) {
    console.log(`[Middleware] Path ${pathname} is a dynamic public route. Allowing access.`);
    return NextResponse.next();
  }

  if (token) {
    if (isAuthRoute) {
      console.log('[Middleware] User is authenticated but on an auth route. Redirecting to /dashboard.');
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    console.log('[Middleware] User is authenticated. Allowing access.');
    return NextResponse.next();
  }

  if (!token) {
    if (isProtectedRoute) {
      console.log(`[Middleware] User is not authenticated and trying to access a protected route (${pathname}). Redirecting to /login.`);
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  console.log(`[Middleware] Path ${pathname} is not protected. Allowing access for unauthenticated user.`);
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|static|favicon.ico|sw.js|manifest.json|robots.txt|.*\\.png$).*)',
  ],
};
