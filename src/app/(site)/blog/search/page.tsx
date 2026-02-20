import type { Metadata } from 'next'
import Hero from '@/components/shared/Hero'
import PostCard from '@/components/blog/PostCard'
import Pagination from '@/components/shared/Pagination'
import { generatePageMetadata } from '@/lib/utils/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { blogListQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import Link from 'next/link'

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Search Blog',
    description: 'Search through Green Label Services blog posts and articles.',
    path: '/blog/search',
  })
}

const POSTS_PER_PAGE = 9

interface Props {
  searchParams: Promise<{ q?: string; page?: string }>
}

export default async function BlogSearchPage({ searchParams }: Props) {
  const params = await searchParams
  const query = params.q || ''
  const page = Math.max(1, parseInt(params.page || '1', 10))
  const start = (page - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  let posts: any[] = []
  let total = 0

  if (query) {
    try {
      const blogData = await sanityFetch<{ posts: any[]; total: number }>({
        query: blogListQuery,
        params: { category: '', tag: '', search: query, start, end },
      })
      posts = blogData.posts || []
      total = blogData.total || 0
    } catch {
      // fallback
    }
  }

  const totalPages = Math.ceil(total / POSTS_PER_PAGE)

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
      <Hero
        heading="Search Results"
        variant="fullWidth"
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search form */}
          <form action="/blog/search" method="get" className="mb-10">
            <div className="relative mx-auto max-w-xl">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Search articles..."
                className="w-full rounded-full border border-gray-300 py-3 pl-12 pr-4 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              />
            </div>
          </form>

          {query && (
            <p className="mb-6 text-gray-600">
              {total > 0 ? `Found ${total} result${total !== 1 ? 's' : ''} for` : 'No results for'}{' '}
              <strong>&quot;{query}&quot;</strong>
            </p>
          )}

          {transformedPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {transformedPosts.map((post: any) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : query ? (
            <div className="py-16 text-center">
              <i className="fa-solid fa-magnifying-glass mb-4 text-5xl text-gray-300" />
              <h3 className="text-xl font-bold text-gray-900">No posts found</h3>
              <p className="mt-2 text-gray-600">Try a different search term.</p>
              <Link href="/blog" className="mt-4 inline-block text-brand-green hover:underline">
                Browse all posts
              </Link>
            </div>
          ) : (
            <div className="py-16 text-center">
              <i className="fa-solid fa-magnifying-glass mb-4 text-5xl text-gray-300" />
              <h3 className="text-xl font-bold text-gray-900">Enter a search term</h3>
              <p className="mt-2 text-gray-600">Type above to search our blog.</p>
            </div>
          )}

          {total > POSTS_PER_PAGE && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath="/blog/search"
              searchParams={{ q: query }}
            />
          )}
        </div>
      </section>
    </>
  )
}
