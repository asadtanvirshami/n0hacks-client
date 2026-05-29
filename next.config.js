/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  
  // Optimization
  // Note: Next.js 15 handles most optimization automatically.
  
  experimental: {
    // Leave this available for future package-import optimization.
  },
  
  // Security headers configuration
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          // Prevent MIME type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Prevent clickjacking attacks
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Enable XSS protection in older browsers
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Control referrer information
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Restrict browser features
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), usb=(), payment=(), interest-cohort=()",
          },
          // Content Security Policy
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; " +
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://*.google-analytics.com; " +
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; " +
              "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; " +
              "img-src 'self' data: https: blob:; " +
              "connect-src 'self' https://*.resend.com https://*.google-analytics.com https://cdn.jsdelivr.net https://api.github.com; " +
              "media-src 'self' https:; " +
              "object-src 'none'; " +
              "frame-ancestors 'none'; " +
              "base-uri 'self'; " +
              "form-action 'self';",
          },
          // HSTS will be set in middleware for HTTPS
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
      // Cache busting for assets
      {
        source: "/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects configuration
  redirects: async () => {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
    ];
  },

  // Image optimization - Auto convert to WebP/AVIF
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.n0hacks.com",
      },
      {
        protocol: "https",
        hostname: "n0hacks.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  // Webpack configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            default: false,
            vendors: false,
            vendor: {
              filename: "chunks/vendor.js",
              test: /node_modules/,
              name: "vendor",
              chunks: "all",
              priority: 10,
            },
          },
        },
      };
    }
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);

