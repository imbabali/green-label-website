import type { Metadata } from 'next'
import Hero from '@/components/shared/Hero'
import PostCard from '@/components/blog/PostCard'
import Pagination from '@/components/shared/Pagination'
import { generatePageMetadata } from '@/lib/utils/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { blogListQuery, blogTagsQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import Link from 'next/link'

export const revalidate = 300

const POSTS_PER_PAGE = 9

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const tags = await sanityFetch<any[]>({ query: blogTagsQuery })
    const tag = tags?.find((t: any) => (t.slug?.current || t.slug) === slug)
    return generatePageMetadata({
      title: tag ? `#${tag.name} — Blog` : 'Tag',
      description: `Browse posts tagged with ${tag?.name || slug}.`,
      path: `/blog/tag/${slug}`,
    })
  } catch {
    return generatePageMetadata({ title: 'Tag', path: `/blog/tag/${slug}` })
  }
}

export default async function BlogTagPage({ params, searchParams }: Props) {
  const { slug } = await params
  const sp = await searchParams
  const page = Math.max(1, parseInt(sp.page || '1', 10))
  const start = (page - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  let posts: any[] = []
  let total = 0
  let tagName = slug

  try {
    const [blogData, tags] = await Promise.all([
      sanityFetch<{ posts: any[]; total: number }>({
        query: blogListQuery,
        params: { category: '', tag: slug, search: '', start, end },
      }),
      sanityFetch<any[]>({ query: blogTagsQuery }),
    ])
    posts = blogData.posts || []
    total = blogData.total || 0
    const tag = tags?.find((t: any) => (t.slug?.current || t.slug) === slug)
    if (tag) tagName = tag.name
  } catch {
    // fallback
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
        heading={`#${tagName}`}
        subheading="Blog Tag"
        variant="fullWidth"
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {transformedPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {transformedPosts.map((post: any) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <i className="fa-solid fa-tags mb-4 text-5xl text-gray-300" />
              <h3 className="text-xl font-bold text-gray-900">No posts with this tag</h3>
              <Link href="/blog" className="mt-4 inline-block text-brand-green hover:underline">
                View all posts
              </Link>
            </div>
          )}

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            basePath={`/blog/tag/${slug}`}
          />
        </div>
      </section>
    </>
  )
}
