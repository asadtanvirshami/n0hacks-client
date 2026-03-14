// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://n0hacks.com', lastModified: new Date(), priority: 1.0 },
    { url: 'https://n0hacks.com/services', lastModified: new Date(), priority: 0.8 },
    { url: 'https://n0hacks.com/about', lastModified: new Date(), priority: 0.7 },
    { url: 'https://n0hacks.com/contact', lastModified: new Date(), priority: 0.9 },
  ]
}