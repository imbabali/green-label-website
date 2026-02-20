import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/utils/seo'
import { fetchPageContent } from '@/lib/utils/cms-page-helper'
import CMSPage from '@/components/shared/CMSPage'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Oil & Gas Services',
    description: 'Specialised waste management solutions for Uganda\'s oil and gas sector.',
    path: '/oil-and-gas',
  })
}

export default async function OilAndGasPage() {
  const { content } = await fetchPageContent('oil-and-gas')

  return (
    <CMSPage
      title="Oil & Gas Services" heroImage="/images/gallery/img3.jpg"
      breadcrumbs={[{ label: 'Oil & Gas Services' }]}
      content={content}
      fallbackContent="<h2>Oil &amp; Gas Waste Management</h2><p>Green Label Services is a leading provider of waste management solutions for Uganda's growing oil and gas sector, ensuring compliance with NEMA regulations and international environmental standards.</p><h3>Our Capabilities</h3><ul><li>Drill cuttings and mud management</li><li>Produced water treatment</li><li>Hazardous waste containment and disposal</li><li>Spill response and remediation</li><li>Environmental impact assessments</li></ul>"
    />
  )
}
