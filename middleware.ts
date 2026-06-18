import { middleware } from '@/utils/supabase/middleware';

export default middleware;

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/ (API routes)
     * - auth/ (auth routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/|auth/).*)',
  ],
};
