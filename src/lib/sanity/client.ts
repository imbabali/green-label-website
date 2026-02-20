import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

export async function sanityFetch<T>(
  queryOrOptions: string | { query: string; params?: Record<string, unknown> },
  params?: Record<string, unknown>
): Promise<T> {
  if (typeof queryOrOptions === 'string') {
    return client.fetch<T>(queryOrOptions, params ?? {})
  }
  return client.fetch<T>(queryOrOptions.query, queryOrOptions.params ?? {})
}
