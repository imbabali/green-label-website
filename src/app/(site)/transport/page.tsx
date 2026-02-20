import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/utils/seo'
import { fetchPageContent } from '@/lib/utils/cms-page-helper'
import CMSPage from '@/components/shared/CMSPage'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Transport Services',
    description: 'Safe and reliable waste transport services across Uganda by Green Label Services.',
    path: '/transport',
  })
}

export default async function TransportPage() {
  const { content } = await fetchPageContent('transport')

  return (
    <CMSPage
      title="Transport Services" heroImage="/images/vehicles/harzard_vehicle5.jpg"
      content={content}
      fallbackContent="<h2>Waste Transport Services</h2><p>Green Label Services operates a modern fleet of over 50 specialised vehicles for safe, compliant waste transport across Uganda.</p><h3>Our Fleet</h3><ul><li>Hazardous waste tankers</li><li>Medical waste collection vehicles</li><li>Compactor trucks</li><li>Roll-on/roll-off containers</li><li>Emergency response vehicles</li></ul><p>All vehicles are GPS-tracked and operated by trained, certified drivers.</p>"
    />
  )
}
