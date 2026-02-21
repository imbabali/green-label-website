import type { Metadata } from 'next'
import Hero from '@/components/shared/Hero'
import PostCard from '@/components/blog/PostCard'
import Pagination from '@/components/shared/Pagination'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import { generatePageMetadata } from '@/lib/utils/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { blogListQuery, blogCategoriesQuery, blogTagsQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import Link from 'next/link'
import EmptyState from '@/components/shared/EmptyState'

export const revalidate = 60

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Blog',
    description: 'Latest news, articles, and insights on waste management, environmental sustainability, and Green Label Services updates.',
    path: '/blog',
  })
}

const POSTS_PER_PAGE = 9

// ---------------------------------------------------------------------------
// Fallback data — shown when Sanity CMS has no blog content
// ---------------------------------------------------------------------------

const fallbackCategories = [
  { name: 'Medical Waste', slug: 'medical-waste', postCount: 2 },
  { name: 'Oil & Gas', slug: 'oil-and-gas', postCount: 1 },
  { name: 'Company News', slug: 'company-news', postCount: 2 },
  { name: 'Sustainability', slug: 'sustainability', postCount: 1 },
]

const fallbackPosts = [
  {
    title: 'Best Practices for Medical Waste Disposal in Healthcare Facilities',
    slug: 'best-practices-medical-waste-disposal',
    excerpt: 'Learn the essential guidelines for proper medical waste segregation, storage, and disposal to protect healthcare workers and the environment.',
    featuredImage: '/images/gallery/img1.jpg',
    publishedAt: '2025-12-15',
    category: { name: 'Medical Waste', slug: 'medical-waste' },
    author: { name: 'Green Label Services' },
    tags: [{ name: 'Healthcare', slug: 'healthcare' }, { name: 'Safety', slug: 'safety' }],
  },
  {
    title: 'Understanding Oil & Gas Waste Management Regulations in East Africa',
    slug: 'oil-gas-waste-regulations-east-africa',
    excerpt: 'A comprehensive overview of the regulatory framework governing oil and gas waste management across the East African region.',
    featuredImage: '/images/gallery/img3.jpg',
    publishedAt: '2025-11-28',
    category: { name: 'Oil & Gas', slug: 'oil-and-gas' },
    author: { name: 'Green Label Services' },
    tags: [{ name: 'Regulations', slug: 'regulations' }, { name: 'Oil & Gas', slug: 'oil-gas' }],
  },
  {
    title: 'Green Label Services Expands Operations to Western Uganda',
    slug: 'expansion-western-uganda',
    excerpt: 'We are proud to announce the expansion of our waste management services to Mbarara, Fort Portal, and surrounding districts in western Uganda.',
    featuredImage: '/images/offices/office2.jpg',
    publishedAt: '2025-11-10',
    category: { name: 'Company News', slug: 'company-news' },
    author: { name: 'Green Label Services' },
    tags: [{ name: 'Expansion', slug: 'expansion' }],
  },
  {
    title: 'How Proper Sharps Disposal Prevents Needlestick Injuries',
    slug: 'sharps-disposal-needlestick-prevention',
    excerpt: 'Needlestick injuries remain a leading occupational hazard in healthcare. Learn how proper sharps disposal protocols can significantly reduce risk.',
    featuredImage: '/images/training/training1.jpg',
    publishedAt: '2025-10-22',
    category: { name: 'Medical Waste', slug: 'medical-waste' },
    author: { name: 'Green Label Services' },
    tags: [{ name: 'Healthcare', slug: 'healthcare' }, { name: 'Training', slug: 'training' }],
  },
  {
    title: 'Green Label Training Academy Certifies 2,000th Graduate',
    slug: 'training-academy-2000th-graduate',
    excerpt: 'A major milestone as the Green Label Training Academy certifies its 2,000th waste management professional, strengthening environmental safety across Uganda.',
    featuredImage: '/images/training/training3.jpg',
    publishedAt: '2025-09-15',
    category: { name: 'Company News', slug: 'company-news' },
    author: { name: 'Green Label Services' },
    tags: [{ name: 'Training', slug: 'training' }, { name: 'Milestone', slug: 'milestone' }],
  },
  {
    title: 'The Role of Waste Management in Uganda\'s Sustainability Goals',
    slug: 'waste-management-sustainability-goals',
    excerpt: 'How responsible waste management practices contribute to Uganda\'s national development plan and the United Nations Sustainable Development Goals.',
    featuredImage: '/images/gallery/img4.jpg',
    publishedAt: '2025-08-20',
    category: { name: 'Sustainability', slug: 'sustainability' },
    author: { name: 'Green Label Services' },
    tags: [{ name: 'SDGs', slug: 'sdgs' }, { name: 'Environment', slug: 'environment' }],
  },
]

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

interface Props {
  searchParams: Promise<{ page?: string; category?: string; tag?: string; q?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Math.max(1, parseInt(params.page || '1', 10))
  const start = (page - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  let posts: any[] = []
  let total = 0
  let categories: any[] = []
  let tags: any[] = []

  try {
    const [blogData, catsData, tagsData] = await Promise.all([
      sanityFetch<{ posts: any[]; total: number }>({
        query: blogListQuery,
        params: {
          category: params.category || '',
          tag: params.tag || '',
          search: params.q || '',
          start,
          end,
        },
      }),
      sanityFetch<any[]>({ query: blogCategoriesQuery }),
      sanityFetch<any[]>({ query: blogTagsQuery }),
    ])
    posts = blogData.posts || []
    total = blogData.total || 0
    categories = catsData || []
    tags = tagsData || []
  } catch {
    // Sanity not configured — use fallbacks
  }

  // Use fallbacks when CMS has no data
  const displayPosts = posts.length > 0 ? posts.map((p: any) => ({
    title: p.title,
    slug: p.slug?.current || p.slug,
    excerpt: p.excerpt || '',
    featuredImage: p.featuredImage ? urlFor(p.featuredImage).width(600).url() : undefined,
    category: p.category ? { name: p.category.name, slug: p.category.slug?.current || p.category.slug } : undefined,
    author: p.author ? { name: p.author.name } : undefined,
    publishedAt: p.publishedAt,
    tags: p.tags?.map((t: any) => ({ name: t.name, slug: t.slug?.current || t.slug })),
  })) : fallbackPosts

  const displayCategories = categories.length > 0 ? categories : fallbackCategories
  const displayTotal = posts.length > 0 ? total : fallbackPosts.length
  const totalPages = Math.ceil(displayTotal / POSTS_PER_PAGE)

  return (
    <>
      <Hero backgroundImage="/images/gallery/img3.jpg"
        heading="Blog & News"
        subheading="Latest Insights on Waste Management"
        variant="fullWidth"
      />

      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          {displayCategories.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              <Link
                href="/blog"
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  !params.category ? 'bg-brand-green text-white shadow-md shadow-brand-green/20' : 'bg-white text-gray-700 shadow-sm hover:bg-gray-50'
                }`}
              >
                All
              </Link>
              {displayCategories.map((cat: any) => (
                <Link
                  key={cat.slug?.current || cat.slug}
                  href={`/blog/category/${cat.slug?.current || cat.slug}`}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    params.category === (cat.slug?.current || cat.slug)
                      ? 'bg-brand-green text-white shadow-md shadow-brand-green/20'
                      : 'bg-white text-gray-700 shadow-sm hover:bg-gray-50'
                  }`}
                >
                  {cat.name} ({cat.postCount})
                </Link>
              ))}
            </div>
          )}

          {/* Search bar — glass style */}
          <form action="/blog/search" method="get" className="mb-10">
            <div className="relative mx-auto max-w-xl">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                name="q"
                defaultValue={params.q || ''}
                placeholder="Search articles..."
                className="w-full rounded-2xl border border-gray-200 bg-white/80 py-3 pl-12 pr-4 text-sm shadow-md backdrop-blur-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              />
            </div>
          </form>

          {/* Posts Grid */}
          {displayPosts.length > 0 ? (
            <ScrollRevealSection>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {displayPosts.map((post: any, index: number) => (
                  <div key={post.slug} className={`reveal reveal-up stagger-${Math.min(index + 1, 6)}`}>
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            </ScrollRevealSection>
          ) : (
            <EmptyState
              icon="fa-solid fa-newspaper"
              title="No posts found"
              description="Check back soon for new articles."
              actionLabel="View all posts"
              actionHref="/blog"
            />
          )}

          <Pagination currentPage={page} totalPages={totalPages} basePath="/blog" />
        </div>
      </section>
    </>
  )
}
