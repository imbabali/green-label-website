import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'

interface PostCardProps {
  post: {
    title: string
    slug: string
    excerpt: string
    featuredImage?: string
    category?: { name: string; slug: string }
    author?: { name: string }
    publishedAt: string
    tags?: { name: string; slug: string }[]
  }
}

export default function PostCard({ post }: PostCardProps) {
  const date = new Date(post.publishedAt)
  const day = format(date, 'd')
  const month = format(date, 'MMM')
  const year = format(date, 'yyyy')

  const truncatedExcerpt =
    post.excerpt.length > 150
      ? post.excerpt.substring(0, 150).trimEnd() + '...'
      : post.excerpt

  return (
    <article className="card-premium group overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100">
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
            <i
              className="fa-solid fa-newspaper text-4xl text-brand-green/30"
              aria-hidden="true"
            />
          </div>
        )}

        {/* Gradient overlay on image bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />

        {/* Date Badge */}
        <div className="absolute left-4 top-4 flex flex-col items-center rounded-lg bg-brand-green px-3 py-2 text-center text-white shadow-lg shadow-brand-green/30 backdrop-blur-sm">
          <span className="text-xl font-bold leading-tight">{day}</span>
          <span className="text-xs font-medium uppercase leading-tight">
            {month}
          </span>
          <span className="text-[10px] leading-tight opacity-80">{year}</span>
        </div>

        {/* Category Tag */}
        {post.category && (
          <Link
            href={`/blog/category/${post.category.slug}`}
            className="absolute right-4 top-4 rounded-full bg-brand-orange px-3 py-1 text-xs font-semibold text-white shadow-md transition-colors hover:bg-brand-orange-dark"
          >
            {post.category.name}
          </Link>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Author */}
        {post.author && (
          <p className="mb-2 text-xs font-medium text-gray-500">
            <i className="fa-solid fa-user mr-1.5" aria-hidden="true" />
            {post.author.name}
          </p>
        )}

        {/* Title */}
        <h3 className="mb-2 text-lg font-bold leading-tight text-gray-900">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors hover:text-brand-green"
          >
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="mb-4 text-sm leading-relaxed text-gray-600">
          {truncatedExcerpt}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag.slug}
                href={`/blog/tag/${tag.slug}`}
                className="rounded-full bg-brand-green-50 px-2.5 py-0.5 text-[11px] font-medium text-brand-green transition-colors hover:bg-brand-green/10"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* Read Article Link */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition-colors hover:text-brand-green-dark"
        >
          Read Article
          <i
            className="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  )
}
