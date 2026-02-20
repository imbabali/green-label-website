import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/utils/seo'
import { fetchPageContent } from '@/lib/utils/cms-page-helper'
import CMSPage from '@/components/shared/CMSPage'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Our Projects',
    description: 'Major waste management projects completed by Green Label Services across Uganda.',
    path: '/projects',
  })
}

export default async function ProjectsPage() {
  const { content } = await fetchPageContent('projects')

  return (
    <CMSPage
      title="Our Projects"
      breadcrumbs={[{ label: 'Our Projects' }]}
      content={content}
      fallbackContent="<h2>Our Projects</h2><p>Explore the major waste management projects we have completed across Uganda, from healthcare facilities to oil and gas operations.</p><h3>Featured Projects</h3><ul><li><strong>Kampala Medical Waste Programme</strong> — Comprehensive medical waste management for 50+ healthcare facilities</li><li><strong>Oil Field Waste Management</strong> — Hazardous waste handling for exploration activities in Western Uganda</li><li><strong>Municipal Waste Upgrade</strong> — Modernising waste collection systems for local governments</li></ul>"
    />
  )
}
