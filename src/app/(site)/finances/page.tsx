import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/utils/seo'
import { fetchPageContent } from '@/lib/utils/cms-page-helper'
import CMSPage from '@/components/shared/CMSPage'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Financial Capacity',
    description: 'Green Label Services financial strength and capacity.',
    path: '/finances',
  })
}

export default async function FinancialCapacityPage() {
  const { content } = await fetchPageContent('finances')

  return (
    <CMSPage
      title="Financial Capacity"
      breadcrumbs={[{ label: 'Financial Capacity' }]}
      content={content}
      fallbackContent="<h2>Financial Strength</h2><p>Green Label Services maintains strong financial health, enabling us to invest in modern equipment, technology, and personnel to deliver world-class waste management services.</p><h3>Key Financial Highlights</h3><ul><li>25 years of consistent growth</li><li>Diversified revenue streams across waste management sectors</li><li>Strong client retention rates</li><li>Ongoing investment in technology and infrastructure</li></ul>"
    />
  )
}
