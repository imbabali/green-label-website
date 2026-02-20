'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { PortableText, type PortableTextComponents } from '@portabletext/react'

interface PostDetailProps {
  post: {
    title: string
    slug: string
    content: any // PortableText value
    excerpt: string
    featuredImage?: string
    category?: { name: string; slug: string }
    author?: {
      name: string
      bio?: string
      avatar?: string
    }
    tags?: { name: string; slug: string }[]
    publishedAt: string
    gallery?: { url: string; alt: string; caption?: string }[]
  }
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6 text-xl font-bold text-gray-900">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-4 text-lg font-semibold text-gray-900">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-brand-green bg-green-50 py-4 pl-6 pr-4 italic text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-1 text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-1 text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-brand-green underline decoration-brand-green/30 transition-colors hover:text-brand-green-dark hover:decoration-brand-green"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-6">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src={value.asset?.url || value.url || ''}
            alt={value.alt || ''}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>
        {value.caption && (
          <figcaption className="mt-2 text-center text-sm text-gray-500">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
}

function estimateReadingTime(content: any): number {
  if (!content) return 1
  const text = JSON.stringify(content)
  const wordCount = text.split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / 200))
}

export default function PostDetail({ post }: PostDetailProps) {
  const [copied, setCopied] = useState(false)

  const date = new Date(post.publishedAt)
  const formattedDate = format(date, 'MMMM d, yyyy')
  const day = format(date, 'd')
  const month = format(date, 'MMM')
  const year = format(date, 'yyyy')
  const readingTime = estimateReadingTime(post.content)

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/blog/${post.slug}`
      : `/blog/${post.slug}`

  const shareTitle = encodeURIComponent(post.title)
  const shareUrlEncoded = encodeURIComponent(shareUrl)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = shareUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <article>
      {/* Header */}
      <header className="mb-8">
        {/* Date Box + Tags */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="flex flex-col items-center rounded-lg bg-brand-green px-3 py-2 text-center text-white">
            <span className="text-xl font-bold leading-tight">{day}</span>
            <span className="text-xs font-medium uppercase leading-tight">
              {month}
            </span>
            <span className="text-[10px] leading-tight opacity-80">
              {year}
            </span>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/blog/tag/${tag.slug}`}
                  className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-medium text-brand-green transition-colors hover:bg-brand-green/20"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        {/* Author Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          {post.author && (
            <div className="flex items-center gap-3">
              {post.author.avatar ? (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10">
                  <i
                    className="fa-solid fa-user text-brand-green"
                    aria-hidden="true"
                  />
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-900">
                  {post.author.name}
                </p>
                <p className="text-xs text-gray-500">{formattedDate}</p>
              </div>
            </div>
          )}

          <span className="hidden text-gray-300 sm:inline" aria-hidden="true">
            |
          </span>

          <span className="flex items-center gap-1.5">
            <i className="fa-regular fa-clock" aria-hidden="true" />
            {readingTime} min read
          </span>

          {post.category && (
            <>
              <span
                className="hidden text-gray-300 sm:inline"
                aria-hidden="true"
              >
                |
              </span>
              <Link
                href={`/blog/category/${post.category.slug}`}
                className="font-medium text-brand-orange transition-colors hover:text-brand-orange-dark"
              >
                {post.category.name}
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* Excerpt */}
      {post.excerpt && (
        <div className="mb-8 rounded-lg border-l-4 border-brand-orange bg-orange-50 p-5">
          <p className="text-lg font-medium leading-relaxed text-gray-700">
            {post.excerpt}
          </p>
        </div>
      )}

      {/* Content */}
      <div className="prose-custom mb-8">
        <PortableText
          value={post.content}
          components={portableTextComponents}
        />
      </div>

      {/* Gallery */}
      {post.gallery && post.gallery.length > 0 && (
        <section className="mb-8" aria-labelledby="gallery-heading">
          <h2
            id="gallery-heading"
            className="mb-4 text-2xl font-bold text-gray-900"
          >
            Gallery
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {post.gallery.map((image, index) => (
              <figure
                key={index}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {image.caption && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Share Buttons */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Share this article
        </h3>
        <div className="flex flex-wrap gap-2">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrlEncoded}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Facebook"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:ring-offset-2"
          >
            <i className="fa-brands fa-facebook-f" aria-hidden="true" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${shareUrlEncoded}&text=${shareTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Twitter"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1DA1F2] text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:ring-offset-2"
          >
            <i className="fa-brands fa-twitter" aria-hidden="true" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrlEncoded}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0A66C2] text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:ring-offset-2"
          >
            <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
          </a>
          <a
            href={`mailto:?subject=${shareTitle}&body=${shareUrlEncoded}`}
            aria-label="Share via Email"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-600 text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
          >
            <i className="fa-solid fa-envelope" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label={copied ? 'Link copied' : 'Copy link'}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              copied
                ? 'bg-brand-green text-white focus:ring-brand-green'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400'
            }`}
          >
            <i
              className={copied ? 'fa-solid fa-check' : 'fa-solid fa-link'}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </article>
  )
}
