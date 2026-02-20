import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/utils/seo'
import { fetchPageContent } from '@/lib/utils/cms-page-helper'
import CMSPage from '@/components/shared/CMSPage'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Safety Standards',
    description: 'Green Label Services safety standards and protocols.',
    path: '/safety',
  })
}

export default async function SafetyStandardsPage() {
  const { content } = await fetchPageContent('safety')

  return (
    <CMSPage
      title="Safety Standards" heroImage="/images/hero/waste.jpg"
      content={content}
      fallbackContent="<h2>Safety Standards</h2><p>Safety is our top priority at Green Label Services. We maintain rigorous safety standards across all operations to protect our employees, clients, and communities.</p><h3>Safety Protocols</h3><ul><li>Comprehensive PPE requirements for all field operations</li><li>Regular safety training and certification programs</li><li>Incident reporting and investigation procedures</li><li>Emergency response protocols</li><li>Regular safety audits and inspections</li></ul><p>Our safety record speaks for itself — 100% compliance with OSHA and NEMA safety requirements.</p>"
    />
  )
}
