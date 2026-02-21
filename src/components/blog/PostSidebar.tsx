import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'

interface PostSidebarProps {
  author?: {
    name: string
    bio?: string
    socialLinks?: {
      twitter?: string
      linkedin?: string
      facebook?: string
      website?: string
    }
  }
  categories: { name: string; slug: string; postCount: number }[]
  tags: { name: string; slug: string }[]
  recentPosts: {
    title: string
    slug: string
    featuredImage?: string
    publishedAt: string
  }[]
}

export default function PostSidebar({
  author,
  categories,
  tags,
  recentPosts,
}: PostSidebarProps) {
  return (
    <aside aria-label="Blog sidebar" className="space-y-8">
      {/* Author Box */}
      {author && (
        <div className="rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-100">
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            About the Author
          </h3>
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10">
              <i
                className="fa-solid fa-user text-2xl text-brand-green"
                aria-hidden="true"
              />
            </div>
            <p className="mb-2 font-semibold text-gray-900">{author.name}</p>
            {author.bio && (
              <p className="mb-3 text-sm leading-relaxed text-gray-600">
                {author.bio}
              </p>
            )}
            {author.socialLinks && (
              <div className="flex justify-center gap-3">
                {author.socialLinks.twitter && (
                  <a
                    href={author.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${author.name} on Twitter`}
                    className="text-gray-400 transition-colors hover:text-[#1DA1F2]"
                  >
                    <i className="fa-brands fa-twitter" aria-hidden="true" />
                  </a>
                )}
                {author.socialLinks.linkedin && (
                  <a
                    href={author.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${author.name} on LinkedIn`}
                    className="text-gray-400 transition-colors hover:text-[#0A66C2]"
                  >
                    <i
                      className="fa-brands fa-linkedin-in"
                      aria-hidden="true"
                    />
                  </a>
                )}
                {author.socialLinks.facebook && (
                  <a
                    href={author.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${author.name} on Facebook`}
                    className="text-gray-400 transition-colors hover:text-[#1877F2]"
                  >
                    <i
                      className="fa-brands fa-facebook-f"
                      aria-hidden="true"
                    />
                  </a>
                )}
                {author.socialLinks.website && (
                  <a
                    href={author.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${author.name}'s website`}
                    className="text-gray-400 transition-colors hover:text-brand-green"
                  >
                    <i className="fa-solid fa-globe" aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Search Widget */}
      <div className="rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-100">
        <h3 className="mb-4 text-lg font-bold text-gray-900">Search</h3>
        <form action="/blog/search" method="get" role="search">
          <div className="relative">
            <label htmlFor="sidebar-search" className="sr-only">
              Search blog posts
            </label>
            <i
              className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <input
              id="sidebar-search"
              type="search"
              name="q"
              placeholder="Search articles..."
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-gray-900 transition-colors focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
            />
          </div>
          <button
            type="submit"
            className="mt-3 w-full rounded-lg bg-brand-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
          >
            Search
          </button>
        </form>
      </div>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <div className="rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-100">
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            Recent Posts
          </h3>
          <ul className="space-y-4" role="list">
            {recentPosts.map((recentPost) => (
              <li key={recentPost.slug}>
                <Link
                  href={`/blog/${recentPost.slug}`}
                  className="group flex gap-3"
                >
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    {recentPost.featuredImage ? (
                      <Image
                        src={recentPost.featuredImage}
                        alt={recentPost.title}
                        fill
                        sizes="64px"
                        className="object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-green/5 to-brand-orange/5">
                        <i
                          className="fa-solid fa-newspaper text-sm text-brand-green/30"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium text-gray-900 transition-colors group-hover:text-brand-green">
                      {recentPost.title}
                    </p>
                    <time
                      dateTime={recentPost.publishedAt}
                      className="mt-1 text-xs text-gray-500"
                    >
                      {format(
                        new Date(recentPost.publishedAt),
                        'MMM d, yyyy'
                      )}
                    </time>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <div className="rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-100">
          <h3 className="mb-4 text-lg font-bold text-gray-900">Categories</h3>
          <ul className="space-y-2" role="list">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/blog/category/${category.slug}`}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-brand-green/5 hover:text-brand-green"
                >
                  <span className="font-medium">{category.name}</span>
                  <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-gray-100 px-2 text-xs font-semibold text-gray-500">
                    {category.postCount}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tag Cloud */}
      {tags.length > 0 && (
        <div className="rounded-xl bg-white p-6 shadow-md ring-1 ring-gray-100">
          <h3 className="mb-4 text-lg font-bold text-gray-900">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/blog/tag/${tag.slug}`}
                className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:border-brand-green hover:bg-brand-green/10 hover:text-brand-green"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
