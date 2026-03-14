import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/private', '/_next/static', '/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin', '/private', '/_next/static', '/api/'],
      },
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
    sitemap: 'https://n0hacks.com/sitemap.xml',
    host: 'https://n0hacks.com',
  }
}