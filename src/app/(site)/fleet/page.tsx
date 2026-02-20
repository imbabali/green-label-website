import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/utils/seo'
import { fetchPageContent } from '@/lib/utils/cms-page-helper'
import CMSPage from '@/components/shared/CMSPage'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Our Fleet',
    description: 'Green Label Services fleet of specialized waste collection and transport vehicles.',
    path: '/fleet',
  })
}

export default async function OurFleetPage() {
  const { content } = await fetchPageContent('fleet')

  return (
    <CMSPage
      title="Our Fleet"
      breadcrumbs={[{ label: 'Our Fleet' }]}
      content={content}
      fallbackContent="<h2>Our Fleet & Vehicles</h2><p>Green Label Services operates a modern fleet of over 50 specialized vehicles for waste collection, transport, and disposal across Uganda.</p><h3>Vehicle Types</h3><ul><li>Compactor trucks for general waste</li><li>Vacuum tankers for liquid waste</li><li>Specialized medical waste vehicles with temperature control</li><li>Skip loaders for construction and industrial waste</li><li>Roll-on/roll-off trucks for large-volume operations</li></ul><p>All vehicles are GPS-tracked, regularly maintained, and comply with NEMA transport regulations.</p>"
    />
  )
}
