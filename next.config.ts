import type { NextConfig } from "next";

// 🔹 Ultimate darknet mode configuration for Next.js
const nextConfig: NextConfig = {
  // 🔹 Redirect sensitive files and directories to 404 silently
  async redirects() {
    return [
      { source: '/:file(.*\\.php|.*\\.env|.*\\.git|.*\\.bak|.*\\.old)', destination: '/404', permanent: false },
      { source: '/backup/:path*', destination: '/404', permanent: false },
      { source: '/config/:path*', destination: '/404', permanent: false },
      { source: '/secret/:path*', destination: '/404', permanent: false },
    ];
  },

  // 🔹 Add security headers
  async headers() {
    return [
      {
        // 🔹 CORS restricted to your domain for API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://n0hacks.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
      {
        // 🔹 Security headers for all other routes
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },           // Prevent clickjacking
          { key: 'X-Content-Type-Options', value: 'nosniff' },// Prevent content sniffing
          { key: 'Referrer-Policy', value: 'no-referrer' },   // Prevent referrer leaks
        ],
      },
    ];
  },
};

export default nextConfig;
