import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  poweredByHeader: false,
  generateEtags: false,
  compress: true,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  turbopack: {},

  async redirects() {
    return [
      {
        source: "/:file(.*\\.php|.*\\.env|.*\\.git|.*\\.bak|.*\\.old|.*\\.sql|.*\\.log)",
        destination: "/404",
        permanent: false
      },
      { source: "/backup/:path*",     destination: "/404", permanent: false },
      { source: "/config/:path*",     destination: "/404", permanent: false },
      { source: "/secret/:path*",     destination: "/404", permanent: false },
      { source: "/wp-admin/:path*",   destination: "/404", permanent: false },
      { source: "/wp-login.php",      destination: "/404", permanent: false },
      { source: "/phpmyadmin/:path*", destination: "/404", permanent: false },
      { source: "/admin/:path*",      destination: "/404", permanent: false },
      { source: "/.env",              destination: "/404", permanent: false },
      { source: "/.git/:path*",       destination: "/404", permanent: false },
      { source: "/server-status",     destination: "/404", permanent: false },
    ];
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin",  value: "https://n0hacks.com" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
          { key: "X-Powered-By",                value: "" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Powered-By",          value: "" },
          { key: "X-Frame-Options",        value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy",        value: "no-referrer" },
          { key: "X-DNS-Prefetch-Control", value: "off" },
          { key: "X-Vercel-Id",            value: "" },
          { key: "X-Vercel-Cache",         value: "" },
          { key: "X-Nextjs-Prerender",     value: "" },
          { key: "X-Nextjs-Stale-Time",    value: "" },
          { key: "X-Matched-Path",         value: "" },
          { key: "Server",                 value: "" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()"
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self'; frame-ancestors 'none';"
          }
        ],
      },
    ];
  },

};

export default nextConfig;