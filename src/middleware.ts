import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const protectedRoutes = [
    '/dashboard',
    '/profile',
    '/sell',
    '/messages',
    '/my-products',
    '/admin',
  ];

  const authRoutes = ['/login', '/register', '/otp'];

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (token) {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sw.js).*)',
  ],
};
