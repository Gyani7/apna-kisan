import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { VALID_ROUTES } from '@/lib/routes';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is valid
  if (!VALID_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except for the API, Next.js internal routes, and static files
    '/((?!api|_next/static|_next/image|favicon.ico)._)',
  ],
};
