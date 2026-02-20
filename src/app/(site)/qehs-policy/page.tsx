import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/utils/seo'
import { fetchPageContent } from '@/lib/utils/cms-page-helper'
import CMSPage from '@/components/shared/CMSPage'

export const revalidate = 86400

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'QEHS Policy',
    description: 'Quality, Environment, Health and Safety policy of Green Label Services.',
    path: '/qehs-policy',
  })
}

export default async function QEHSPolicyPage() {
  const { content } = await fetchPageContent('qehs-policy')

  return (
    <CMSPage
      title="QEHS Policy"
      breadcrumbs={[{ label: 'QEHS Policy' }]}
      heroImage="/images/certificates/qehs_policy.png"
      content={content}
      fallbackContent="<h2>Quality, Environment, Health & Safety Policy</h2><p>Green Label Services is committed to maintaining the highest standards of quality, environmental management, and occupational health and safety across all operations.</p><h3>Our Commitments</h3><ul><li>Comply with all applicable legal and regulatory requirements</li><li>Prevent pollution and minimize environmental impact</li><li>Provide a safe and healthy workplace for all employees</li><li>Continuously improve our management systems</li><li>Engage with stakeholders on sustainability matters</li></ul>"
    />
  )
}
