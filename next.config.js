/** @type {import('next').NextConfig} */

// --- SECURITY & PRIVACY HEADERS (V3.1) ---
// Establish a robust Content Security Policy (CSP) to mitigate XSS attacks.
const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://img.clerk.com https://images.clerk.dev https://vzgxalloffaxbqisirbl.supabase.co;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;

const nextConfig = {
  // --- ASSET OPTIMIZATION (V3.1) ---
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'images.clerk.dev',
      },
      {
        protocol: 'https',
        hostname: 'vzgxalloffaxbqisirbl.supabase.co',
      },
    ],
  },
  // --- ENTERPRISE DEPLOYMENT HEADERS (V3.1) ---
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\s{2,}/g, ' ').trim(),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
