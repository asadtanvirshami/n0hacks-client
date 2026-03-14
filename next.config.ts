import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // Reduce framework fingerprinting
  poweredByHeader: false,
  generateEtags: false,
  compress: true,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,

  // Strip version strings from bundle to reduce fingerprinting
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {

      // Deterministic module/chunk IDs — harder to fingerprint build
      config.optimization.moduleIds = 'deterministic'
      config.optimization.chunkIds = 'deterministic'

      // Strip version strings from library bundles
      config.module.rules.push({
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: [
          {
            loader: 'string-replace-loader',
            options: {
              multiple: [
                { search: /three@[\d.]+/g,          replace: 'three' },
                { search: /lenis@[\d.]+/g,           replace: 'lenis' },
                { search: /"next":"[\d.^~]+"/g,      replace: '"next":"x"' },
                { search: /framer-motion@[\d.]+/g,   replace: 'framer-motion' },
                { search: /gsap@[\d.]+/g,            replace: 'gsap' },
              ]
            }
          }
        ]
      })
    }
    return config
  },

  async redirects() {
    return [

      // Block sensitive files
      {
        source: "/:file(.*\\.php|.*\\.env|.*\\.git|.*\\.bak|.*\\.old|.*\\.sql|.*\\.log)",
        destination: "/404",
        permanent: false
      },

      // Block common recon directories
      { source: "/backup/:path*",      destination: "/404", permanent: false },
      { source: "/config/:path*",      destination: "/404", permanent: false },
      { source: "/secret/:path*",      destination: "/404", permanent: false },

      // Block automated scanners
      { source: "/wp-admin/:path*",    destination: "/404", permanent: false },
      { source: "/wp-login.php",       destination: "/404", permanent: false },
      { source: "/phpmyadmin/:path*",  destination: "/404", permanent: false },
      { source: "/admin/:path*",       destination: "/404", permanent: false },
      { source: "/.env",               destination: "/404", permanent: false },
      { source: "/.git/:path*",        destination: "/404", permanent: false },
      { source: "/server-status",      destination: "/404", permanent: false },

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
        { key: "X-Powered-By",             value: "" },
        { key: "X-Frame-Options",           value: "DENY" },
        { key: "X-Content-Type-Options",    value: "nosniff" },
        { key: "Referrer-Policy",           value: "no-referrer" },
        { key: "X-DNS-Prefetch-Control",    value: "off" },

        // ← AÑADE ESTOS — son los que siguen filtrando
        { key: "X-Vercel-Id",              value: "" },
        { key: "X-Vercel-Cache",           value: "" },
        { key: "X-Nextjs-Prerender",       value: "" },
        { key: "X-Nextjs-Stale-Time",      value: "" },
        { key: "X-Matched-Path",           value: "" },
        { key: "Server",                   value: "" },

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
  ]
},

};

export default nextConfig;