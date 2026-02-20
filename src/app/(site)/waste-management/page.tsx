import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/utils/seo'
import { fetchPageContent } from '@/lib/utils/cms-page-helper'
import CMSPage from '@/components/shared/CMSPage'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Waste Management',
    description: 'Comprehensive waste management solutions for businesses and institutions across Uganda.',
    path: '/waste-management',
  })
}

export default async function WasteManagementPage() {
  const { content } = await fetchPageContent('waste-management')

  return (
    <CMSPage
      title="Waste Management"
      breadcrumbs={[{ label: 'Waste Management' }]}
      content={content}
      fallbackContent="<h2>Waste Management Solutions</h2><p>Green Label Services provides end-to-end waste management solutions for businesses, healthcare facilities, and industrial operations across Uganda.</p><h3>Our Services Include</h3><ul><li>Solid waste collection and disposal</li><li>Hazardous waste management</li><li>Medical waste treatment</li><li>Industrial waste handling</li><li>Waste auditing and consulting</li></ul><p>Contact us at <a href='mailto:info@greenlabelservicesug.com'>info@greenlabelservicesug.com</a> to learn more.</p>"
    />
  )
}
