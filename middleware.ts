import { NextRequest, NextResponse } from "next/server";

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10;
const RATE_LIMIT_MAX_REQUESTS_LOGIN = 5;

// In-memory store for rate limiting (in production, use Redis)
const ipRequestMap = new Map<string, number[]>();

/**
 * Rate limiter middleware
 * Tracks requests per IP and blocks if limit exceeded
 */
function rateLimit(
  ip: string | null,
  maxRequests: number = RATE_LIMIT_MAX_REQUESTS
): boolean {
  const identifier = ip || "unknown";
  const now = Date.now();
  const requests = ipRequestMap.get(identifier) || [];

  // Filter out old requests outside the time window
  const recentRequests = requests.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );

  // Check if limit exceeded
  if (recentRequests.length >= maxRequests) {
    return false;
  }

  // Add current request
  recentRequests.push(now);
  ipRequestMap.set(identifier, recentRequests);

  return true;
}

/**
 * Main middleware function
 * Adds security headers and implements rate limiting
 */
export function middleware(request: NextRequest): NextResponse {
  const response = NextResponse.next();

  // Extract client IP
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

  // 1. Security Headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), usb=()"
  );

  // 2. HSTS (HTTP Strict Transport Security)
  if (request.nextUrl.protocol === "https:") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
  }

  // 3. Rate limiting for API endpoints
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const maxRequests =
      request.nextUrl.pathname === "/api/auth/login"
        ? RATE_LIMIT_MAX_REQUESTS_LOGIN
        : RATE_LIMIT_MAX_REQUESTS;

    if (!rateLimit(ip, maxRequests)) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          status: 429,
        },
        { status: 429 }
      );
    }
  }

  // 4. CORS validation for API
  if (request.method === "OPTIONS") {
    const origin = request.headers.get("origin");
    const allowedOrigins = [
      "https://n0hacks.com",
      "https://www.n0hacks.com",
      "http://localhost:3000",
      "http://localhost:3001",
    ];

    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin);
      response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      response.headers.set("Access-Control-Max-Age", "86400");
    }
  }

  // 5. Remove powered-by header
  response.headers.delete("X-Powered-By");
  response.headers.delete("Server");

  return response;
}

/**
 * Configure which routes the middleware applies to
 * Exclude static assets and Next.js internals
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/trpc (tRPC endpoint - handle separately)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon file)
     * - robots.txt
     * - sitemap.xml
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)",
  ],
};
