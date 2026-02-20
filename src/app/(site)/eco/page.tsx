import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/utils/seo'
import { fetchPageContent } from '@/lib/utils/cms-page-helper'
import CMSPage from '@/components/shared/CMSPage'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Sustainability',
    description: 'Our commitment to environmental sustainability and eco-friendly waste management.',
    path: '/eco',
  })
}

export default async function SustainabilityPage() {
  const { content } = await fetchPageContent('eco')

  return (
    <CMSPage
      title="Sustainability"
      breadcrumbs={[{ label: 'Sustainability' }]}
      content={content}
      fallbackContent="<h2>Environmental Commitment</h2><p>At Green Label Services, sustainability is at the core of everything we do. We believe that responsible waste management is essential to protecting Uganda's environment for future generations.</p><h3>Our Approach</h3><p>We prioritize waste minimization, recycling, and resource recovery in all our operations. Our processes are designed to maximize environmental benefits while meeting strict regulatory requirements.</p><h3>Recycling Programs</h3><p>We operate comprehensive recycling programs that divert significant waste volumes from landfills, processing over 76,000 tonnes of recyclable materials annually.</p>"
    />
  )
}
