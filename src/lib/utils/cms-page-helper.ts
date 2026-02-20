import { sanityFetch } from '@/lib/sanity/client'
import { pageQuery } from '@/lib/sanity/queries'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchPageContent(slug: string): Promise<{ content: any[] | undefined }> {
  try {
    const page = await sanityFetch<{ content: unknown[] } | null>({ query: pageQuery, params: { slug } })
    return { content: (page?.content as any[] | undefined) ?? undefined }
  } catch {
    return { content: undefined }
  }
}
