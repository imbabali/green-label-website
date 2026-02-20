import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/utils/seo'
import { fetchPageContent } from '@/lib/utils/cms-page-helper'
import CMSPage from '@/components/shared/CMSPage'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Drop Off Locations',
    description: 'Green Label Services drop off locations and collection points across Uganda.',
    path: '/locations',
  })
}

export default async function DropOffLocationsPage() {
  const { content } = await fetchPageContent('locations')

  return (
    <CMSPage
      title="Drop Off Locations" heroImage="/images/hero/aga1.webp"
      content={content}
      fallbackContent="<h2>Drop Off Locations</h2><p>Find your nearest Green Label Services drop off point or collection center.</p><h3>Main Office</h3><p>Plot 89, Block 29 Church Road, Off Mawanda Rd, Kampala, Uganda</p><h3>Regional Facilities</h3><ul><li><strong>Iganga Facility</strong> — Waste treatment and recycling center</li><li><strong>Mbarara Depot</strong> — Western Uganda operations base</li><li><strong>Gulu Depot</strong> — Northern Uganda collection point</li></ul><p>For collection scheduling or drop-off inquiries, call +256 772 423 092.</p>"
    />
  )
}
