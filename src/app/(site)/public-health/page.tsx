import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/utils/seo'
import { fetchPageContent } from '@/lib/utils/cms-page-helper'
import CMSPage from '@/components/shared/CMSPage'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Public Health Services',
    description: 'Public health waste management services supporting communities across Uganda.',
    path: '/public-health',
  })
}

export default async function PublicHealthPage() {
  const { content } = await fetchPageContent('public-health')

  return (
    <CMSPage
      title="Public Health Services"
      breadcrumbs={[{ label: 'Public Health Services' }]}
      content={content}
      fallbackContent="<h2>Public Health Services</h2><p>Green Label Services partners with public health institutions to ensure safe, compliant management of medical and healthcare waste across Uganda.</p><h3>Services</h3><ul><li>Medical waste collection and treatment</li><li>Sharps and pharmaceutical waste disposal</li><li>Infection control waste management</li><li>Healthcare facility waste audits</li><li>Staff training on waste handling protocols</li></ul>"
    />
  )
}
