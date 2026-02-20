import { MetadataRoute } from 'next'
import { sanityFetch } from '@/lib/sanity/client'
import { SITE_URL } from '@/lib/data/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    '', '/about', '/our-story', '/leadership', '/contact', '/faqs', '/gallery',
    '/privacy', '/terms', '/eco', '/qehs-policy', '/fleet', '/finances',
    '/safety', '/infrastructure', '/awards', '/community', '/projects',
    '/locations', '/press-releases', '/human-resources', '/waste-management',
    '/oil-and-gas', '/public-health', '/mining', '/transport', '/training',
    '/blog', '/services', '/careers', '/careers/jobs', '/reviews',
  ]

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1.0 : path === '/about' ? 0.9 : 0.7,
  }))

  let blogEntries: MetadataRoute.Sitemap = []
  let serviceEntries: MetadataRoute.Sitemap = []
  let jobEntries: MetadataRoute.Sitemap = []

  try {
    const posts = await sanityFetch<{ slug: string; publishedAt: string }[]>(
      `*[_type == "blogPost" && status == "published"]{ "slug": slug.current, publishedAt }`
    )
    blogEntries = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch {
    /* Sanity not configured yet */
  }

  try {
    const services = await sanityFetch<{ slug: string }[]>(
      `*[_type == "service" && status == "active"]{ "slug": slug.current }`
    )
    serviceEntries = services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  } catch {
    /* Sanity not configured yet */
  }

  try {
    const jobs = await sanityFetch<{ slug: string }[]>(
      `*[_type == "job" && isActive == true]{ "slug": slug.current }`
    )
    jobEntries = jobs.map((j) => ({
      url: `${SITE_URL}/careers/jobs/${j.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }))
  } catch {
    /* Sanity not configured yet */
  }

  return [...staticEntries, ...blogEntries, ...serviceEntries, ...jobEntries]
}
