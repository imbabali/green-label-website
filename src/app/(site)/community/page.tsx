import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/utils/seo'
import { fetchPageContent } from '@/lib/utils/cms-page-helper'
import CMSPage from '@/components/shared/CMSPage'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Community Impact',
    description: 'Green Label Services community engagement and social responsibility.',
    path: '/community',
  })
}

export default async function CommunityImpactPage() {
  const { content } = await fetchPageContent('community')

  return (
    <CMSPage
      title="Community Impact"
      breadcrumbs={[{ label: 'Community Impact' }]}
      content={content}
      fallbackContent="<h2>Community Impact</h2><p>Green Label Services is deeply committed to making a positive difference in the communities where we operate across Uganda.</p><h3>Our Initiatives</h3><ul><li>Environmental education programs in schools</li><li>Community cleanup campaigns</li><li>Waste management training for local authorities</li><li>Employment opportunities for local communities</li><li>Sponsorship of environmental conservation projects</li></ul>"
    />
  )
}
