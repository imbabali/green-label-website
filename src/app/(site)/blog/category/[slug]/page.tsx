import type { Metadata } from 'next'
import Hero from '@/components/shared/Hero'
import PostCard from '@/components/blog/PostCard'
import Pagination from '@/components/shared/Pagination'
import { generatePageMetadata } from '@/lib/utils/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { blogListQuery, blogCategoriesQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import Link from 'next/link'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import EmptyState from '@/components/shared/EmptyState'

export const revalidate = 300

const POSTS_PER_PAGE = 9

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  // Find category name
  try {
    const categories = await sanityFetch<any[]>({ query: blogCategoriesQuery })
    const cat = categories?.find((c: any) => (c.slug?.current || c.slug) === slug)
    return generatePageMetadata({
      title: cat ? `${cat.name} — Blog` : 'Category',
      description: cat?.description || `Browse posts in the ${cat?.name || slug} category.`,
      path: `/blog/category/${slug}`,
    })
  } catch {
    return generatePageMetadata({ title: 'Category', path: `/blog/category/${slug}` })
  }
}

export default async function BlogCategoryPage({ params, searchParams }: Props) {
  const { slug } = await params
  const sp = await searchParams
  const page = Math.max(1, parseInt(sp.page || '1', 10))
  const start = (page - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  let posts: any[] = []
  let total = 0
  let categoryName = slug

  try {
    const [blogData, categories] = await Promise.all([
      sanityFetch<{ posts: any[]; total: number }>({
        query: blogListQuery,
        params: { category: slug, tag: '', search: '', start, end },
      }),
      sanityFetch<any[]>({ query: blogCategoriesQuery }),
    ])
    posts = blogData.posts || []
    total = blogData.total || 0
    const cat = categories?.find((c: any) => (c.slug?.current || c.slug) === slug)
    if (cat) categoryName = cat.name
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
        heading={categoryName}
        subheading="Blog Category"
        description="Browse articles in this category."
        backgroundImage="/images/gallery/img3.jpg"
        variant="split"
        flipped
      />

      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {transformedPosts.length > 0 ? (
            <ScrollRevealSection>
              <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
                {transformedPosts.map((post: any, index: number) => (
                  <div key={post.slug} className={`reveal reveal-up stagger-${Math.min(index + 1, 6)}`}>
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            </ScrollRevealSection>
          ) : (
            <EmptyState
              icon="fa-solid fa-folder-open"
              title="No posts in this category"
              actionLabel="View all posts"
              actionHref="/blog"
            />
          )}

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            basePath={`/blog/category/${slug}`}
          />
        </div>
      </section>
    </>
  )
}
