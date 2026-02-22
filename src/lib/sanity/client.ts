import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
if (!projectId) throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is required')

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
if (!dataset) throw new Error('NEXT_PUBLIC_SANITY_DATASET is required')

export const client = createClient({
  projectId,
  dataset,
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
