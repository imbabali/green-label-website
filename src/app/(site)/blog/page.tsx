import type { Metadata } from 'next'
import Hero from '@/components/shared/Hero'
import PostCard from '@/components/blog/PostCard'
import Pagination from '@/components/shared/Pagination'
import { generatePageMetadata } from '@/lib/utils/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { blogListQuery, blogCategoriesQuery, blogTagsQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import Link from 'next/link'

export const revalidate = 60

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Blog',
    description: 'Latest news, articles, and insights on waste management, environmental sustainability, and Green Label Services updates.',
    path: '/blog',
  })
}

const POSTS_PER_PAGE = 9

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
    // fallback
  }

  const totalPages = Math.ceil(total / POSTS_PER_PAGE)

  // Transform posts for PostCard
  const transformedPosts = posts.map((p: any) => ({
    title: p.title,
    slug: p.slug?.current || p.slug,
    excerpt: p.excerpt || '',
    featuredImage: p.featuredImage ? urlFor(p.featuredImage).width(600).url() : undefined,
    category: p.category ? { name: p.category.name, slug: p.category.slug?.current || p.category.slug } : undefined,
    author: p.author ? { name: p.author.name } : undefined,
    publishedAt: p.publishedAt,
    tags: p.tags?.map((t: any) => ({ name: t.name, slug: t.slug?.current || t.slug })),
  }))

  return (
    <>
      <Hero backgroundImage="/images/gallery/img3.jpg"
        heading="Blog & News"
        subheading="Latest Insights on Waste Management"
        variant="fullWidth"
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          {categories.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              <Link
                href="/blog"
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  !params.category ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </Link>
              {categories.map((cat: any) => (
                <Link
                  key={cat.slug?.current || cat.slug}
                  href={`/blog/category/${cat.slug?.current || cat.slug}`}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    params.category === (cat.slug?.current || cat.slug)
                      ? 'bg-brand-green text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.name} ({cat.postCount})
                </Link>
              ))}
            </div>
          )}

          {/* Search bar */}
          <form action="/blog/search" method="get" className="mb-10">
            <div className="relative mx-auto max-w-xl">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                name="q"
                defaultValue={params.q || ''}
                placeholder="Search articles..."
                className="w-full rounded-full border border-gray-300 py-3 pl-12 pr-4 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              />
            </div>
          </form>

          {/* Posts Grid */}
          {transformedPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {transformedPosts.map((post: any) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <i className="fa-solid fa-newspaper mb-4 text-5xl text-gray-300" />
              <h3 className="text-xl font-bold text-gray-900">No posts found</h3>
              <p className="mt-2 text-gray-600">Check back soon for new articles.</p>
              <Link href="/blog" className="mt-4 inline-block text-brand-green hover:underline">
                View all posts
              </Link>
            </div>
          )}

          <Pagination currentPage={page} totalPages={totalPages} basePath="/blog" />
        </div>
      </section>
    </>
  )
}
