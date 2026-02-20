import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/utils/seo'
import { fetchPageContent } from '@/lib/utils/cms-page-helper'
import CMSPage from '@/components/shared/CMSPage'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Human Resources',
    description: 'Green Label Services human resources and team.',
    path: '/human-resources',
  })
}

export default async function HumanResourcesPage() {
  const { content } = await fetchPageContent('human-resources')

  return (
    <CMSPage
      title="Human Resources"
      heroImage="/images/training/training4.jpg"
      content={content}
      fallbackContent="<h2>Human Resources</h2><p>Our team of over 300 qualified professionals is the backbone of Green Label Services. We invest heavily in training, development, and employee welfare.</p><h3>Our Team</h3><ul><li>Environmental scientists and engineers</li><li>Certified waste management specialists</li><li>Health and safety professionals</li><li>Logistics and fleet managers</li><li>Administrative and support staff</li></ul><p>Interested in joining our team? <a href='/careers'>View current openings</a>.</p>"
    />
  )
}
