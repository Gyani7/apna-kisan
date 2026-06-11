import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse, type NextRequest } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)', // Protect all dashboard routes
  '/community(.*)', // Protect community engagement
  '/profile(.*)'    // Protect user profiles
]);

// --- DYNAMIC PRIVACY SANITIZER (V3.1) ---
// This function masks sensitive identifiers in logs and API responses.
function sanitizeRequest(request: NextRequest): NextRequest {
  const clonedUrl = request.nextUrl.clone();
  const sensitiveParams = ['aadhaar', 'pan', 'govtId'];

  for (const param of sensitiveParams) {
    if (clonedUrl.searchParams.has(param)) {
      const originalValue = clonedUrl.searchParams.get(param);
      console.log(`[Privacy Guard] Masking sensitive param: ${param} for request: ${clonedUrl.pathname}`);
      // Replace with a generic, non-reversible placeholder
      clonedUrl.searchParams.set(param, `[ID Masked: ${param.toUpperCase()}]`);
    }
  }
  
  // Return a new request object with the sanitized URL
  return new NextRequest(clonedUrl, request);
}

export default function(req: NextRequest, evt: any) {
  const sanitizedReq = sanitizeRequest(req);

  // Pass the sanitized request to the Clerk middleware for authentication
  return clerkMiddleware((auth, request) => {
    if (isProtectedRoute(request)) {
      auth().protect(); // Protect the route if it matches our defined criteria
    }
    return NextResponse.next();
  })(sanitizedReq, evt);
}

export const config = {
  matcher: [
    // Match all routes except for static assets and special Next.js paths
    '/((?!.*\\..*|_next).*)', 
    '/', 
    '/(api|trpc)(.*)'
  ],
};
