import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Hero from '@/components/shared/Hero'
import PostDetail from '@/components/blog/PostDetail'
import PostSidebar from '@/components/blog/PostSidebar'
import CommentSection from '@/components/blog/CommentSection'
import { generatePageMetadata, blogPostJsonLd } from '@/lib/utils/seo'
import { sanityFetch } from '@/lib/sanity/client'
import { blogPostQuery, blogCategoriesQuery, blogTagsQuery } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { fallbackPosts, fallbackCategories, fallbackTags } from '@/lib/data/fallback-blog'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await sanityFetch<any>({ query: blogPostQuery, params: { slug } })
    if (!post) {
      const fb = fallbackPosts.find((p) => p.slug === slug)
      if (fb) return generatePageMetadata({ title: fb.title, description: fb.excerpt, path: `/blog/${slug}` })
      return generatePageMetadata({ title: 'Post Not Found', path: `/blog/${slug}` })
    }
    return generatePageMetadata({
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      path: `/blog/${slug}`,
    })
  } catch {
    const fb = fallbackPosts.find((p) => p.slug === slug)
    if (fb) return generatePageMetadata({ title: fb.title, description: fb.excerpt, path: `/blog/${slug}` })
    return generatePageMetadata({ title: 'Blog Post', path: `/blog/${slug}` })
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  let post: any = null
  let categories: any[] = []
  let tags: any[] = []

  try {
    const [postData, catsData, tagsData] = await Promise.all([
      sanityFetch<any>({ query: blogPostQuery, params: { slug } }),
      sanityFetch<any[]>({ query: blogCategoriesQuery }),
      sanityFetch<any[]>({ query: blogTagsQuery }),
    ])
    post = postData
    categories = catsData || []
    tags = tagsData || []
  } catch {
    // Sanity not configured — check fallbacks below
  }

  // If no CMS data, try fallback posts
  if (!post) {
    const fb = fallbackPosts.find((p) => p.slug === slug)
    if (!fb) notFound()

    const fbIndex = fallbackPosts.indexOf(fb)
    const prevPost = fbIndex > 0 ? fallbackPosts[fbIndex - 1] : null
    const nextPost = fbIndex < fallbackPosts.length - 1 ? fallbackPosts[fbIndex + 1] : null

    post = {
      ...fb,
      slug: fb.slug,
      previousPost: prevPost ? { slug: prevPost.slug, title: prevPost.title } : null,
      nextPost: nextPost ? { slug: nextPost.slug, title: nextPost.title } : null,
      relatedPosts: fallbackPosts.filter((p) => p.slug !== slug).slice(0, 3),
    }
    categories = fallbackCategories
    tags = fallbackTags
  }

  // Fetch comments from Supabase
  let comments: { id: string; name: string; content: string; created_at: string; parent_id: string | null }[] = []
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('comments')
      .select('id, name, content, created_at, parent_id')
      .eq('post_slug', slug)
      .eq('status', 'approved')
      .order('created_at', { ascending: true })
    comments = data || []
  } catch {
    // Comments fetch failed, continue without them
  }

  const isFallback = typeof post.featuredImage === 'string'

  const transformedPost = {
    title: post.title,
    slug: post.slug?.current || post.slug || slug,
    content: post.content,
    excerpt: post.excerpt || '',
    featuredImage: isFallback
      ? post.featuredImage
      : post.featuredImage ? urlFor(post.featuredImage).width(1200).url() : undefined,
    category: post.category ? { name: post.category.name, slug: post.category.slug?.current || post.category.slug } : undefined,
    author: post.author ? {
      name: post.author.name,
      bio: post.author.bio,
      avatar: !isFallback && post.author.photo ? urlFor(post.author.photo).width(80).url() : undefined,
    } : undefined,
    tags: post.tags?.map((t: any) => ({ name: t.name, slug: t.slug?.current || t.slug })) || [],
    publishedAt: post.publishedAt,
    gallery: !isFallback ? post.gallery?.map((img: any) => ({
      url: img.asset?.url || (img.asset ? urlFor(img).width(800).url() : ''),
      alt: img.alt || post.title,
      caption: img.caption,
    })) : undefined,
  }

  const sidebarCategories = categories.map((c: any) => ({
    name: c.name,
    slug: c.slug?.current || c.slug,
    postCount: c.postCount || 0,
  }))

  const sidebarTags = tags.map((t: any) => ({
    name: t.name,
    slug: t.slug?.current || t.slug,
  }))

  const recentPosts = (post.relatedPosts || []).map((p: any) => ({
    title: p.title,
    slug: p.slug?.current || p.slug,
    featuredImage: typeof p.featuredImage === 'string'
      ? p.featuredImage
      : p.featuredImage ? urlFor(p.featuredImage).width(100).url() : undefined,
    publishedAt: p.publishedAt,
  }))

  const jsonLd = blogPostJsonLd({
    title: post.title,
    description: post.excerpt || '',
    slug: slug,
    publishedAt: post.publishedAt,
    authorName: post.author?.name || 'Green Label Services',
    image: transformedPost.featuredImage,
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero
        heading="Blog"
        subheading="News & Insights"
        description="Stay informed with the latest articles on waste management and environmental sustainability."
        backgroundImage="/images/gallery/img3.jpg"
        variant="split"
        badge="Latest Articles"
      />

      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <PostDetail post={transformedPost} />

              {/* Previous / Next */}
              <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6">
                {post.previousPost ? (
                  <Link href={`/blog/${post.previousPost.slug?.current || post.previousPost.slug}`} className="text-sm text-brand-green hover:underline">
                    <i className="fa-solid fa-arrow-left mr-1" /> {post.previousPost.title}
                  </Link>
                ) : <span />}
                {post.nextPost ? (
                  <Link href={`/blog/${post.nextPost.slug?.current || post.nextPost.slug}`} className="text-sm text-brand-green hover:underline">
                    {post.nextPost.title} <i className="fa-solid fa-arrow-right ml-1" />
                  </Link>
                ) : <span />}
              </div>

              {/* Comments */}
              <div className="mt-12">
                <CommentSection postSlug={slug} comments={comments} />
              </div>
            </div>

            <PostSidebar
              author={transformedPost.author}
              categories={sidebarCategories}
              tags={sidebarTags}
              recentPosts={recentPosts}
            />
          </div>
        </div>
      </section>
    </>
  )
}
