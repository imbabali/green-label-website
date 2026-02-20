import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/utils/seo'
import { fetchPageContent } from '@/lib/utils/cms-page-helper'
import CMSPage from '@/components/shared/CMSPage'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Mining Services',
    description: 'Environmental waste management solutions for Uganda\'s mining industry.',
    path: '/mining',
  })
}

export default async function MiningPage() {
  const { content } = await fetchPageContent('mining')

  return (
    <CMSPage
      title="Mining Services" heroImage="/images/gallery/img4.jpg"
      content={content}
      fallbackContent="<h2>Mining Waste Management</h2><p>Green Label Services provides environmentally responsible waste management solutions for mining operations throughout Uganda.</p><h3>Our Mining Services</h3><ul><li>Mine waste characterisation and management</li><li>Tailings and slag disposal</li><li>Chemical waste handling</li><li>Environmental compliance monitoring</li><li>Site remediation and rehabilitation</li></ul>"
    />
  )
}
