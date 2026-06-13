import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const sensitiveParams = ['aadhaar', 'pan', 'govtId'];

  for (const param of sensitiveParams) {
    if (url.searchParams.has(param)) {
      url.searchParams.set(param, `[ID Masked: ${param.toUpperCase()}]`);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};
