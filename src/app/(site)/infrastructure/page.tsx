import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/utils/seo'
import { fetchPageContent } from '@/lib/utils/cms-page-helper'
import CMSPage from '@/components/shared/CMSPage'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Infrastructure',
    description: 'Green Label Services infrastructure and facilities.',
    path: '/infrastructure',
  })
}

export default async function InfrastructurePage() {
  const { content } = await fetchPageContent('infrastructure')

  return (
    <CMSPage
      title="Infrastructure" heroImage="/images/offices/office1.jpg"
      content={content}
      fallbackContent="<h2>Infrastructure & Facilities</h2><p>Our infrastructure includes state-of-the-art waste treatment facilities, storage depots, and operational bases strategically located across Uganda.</p><h3>Key Facilities</h3><ul><li>Main operational base in Kampala</li><li>Waste treatment facility in Iganga</li><li>Regional depot in Mbarara</li><li>Modern laboratories for waste analysis</li><li>Vehicle maintenance workshops</li></ul>"
    />
  )
}
