import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/utils/seo'
import { fetchPageContent } from '@/lib/utils/cms-page-helper'
import CMSPage from '@/components/shared/CMSPage'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Training Services',
    description: 'Professional waste management training and certification programmes by Green Label Services.',
    path: '/training',
  })
}

export default async function TrainingPage() {
  const { content } = await fetchPageContent('training')

  return (
    <CMSPage
      title="Training Services"
      breadcrumbs={[{ label: 'Training Services' }]}
      content={content}
      fallbackContent="<h2>Training &amp; Capacity Building</h2><p>The Green Label Training Academy offers professional development programmes for waste management professionals, healthcare workers, and community leaders.</p><h3>Programmes</h3><ul><li>Hazardous waste handling certification</li><li>Medical waste management training</li><li>Environmental compliance workshops</li><li>Community waste awareness programmes</li><li>Corporate waste management training</li></ul><p>Contact us to arrange a training session for your team.</p>"
    />
  )
}
