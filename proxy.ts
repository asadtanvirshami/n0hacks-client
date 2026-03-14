import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const response = NextResponse.next()

  // Remove headers that expose internal architecture
  response.headers.delete('x-powered-by')
  response.headers.delete('server')
  response.headers.delete('via')
  response.headers.delete('x-vercel-id')

  // Remove Next.js diagnostic headers
  response.headers.delete('x-nextjs-stale-time')
  response.headers.delete('x-nextjs-prerender')
  response.headers.delete('x-matched-path')
  response.headers.delete('x-vercel-cache')

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

export const config = {
  matcher: '/:path*',
}