import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/404', '/_next/'],
      },
    ],
    sitemap: 'https://n0hacks.com/sitemap.xml',
    host: 'https://n0hacks.com',
  }
}