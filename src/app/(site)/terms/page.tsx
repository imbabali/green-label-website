import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/utils/seo'
import { fetchPageContent } from '@/lib/utils/cms-page-helper'
import CMSPage from '@/components/shared/CMSPage'

export const revalidate = 86400

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Terms & Conditions',
    description: 'Terms and conditions for using Green Label Services.',
    path: '/terms',
  })
}

export default async function TermsConditionsPage() {
  const { content } = await fetchPageContent('terms')

  return (
    <CMSPage
      title="Terms & Conditions"
      breadcrumbs={[{ label: 'Terms & Conditions' }]}
      heroImage="/images/hero/abt.png"
      content={content}
      fallbackContent="<h2>Terms & Conditions</h2><p>These terms govern your use of Green Label Services Ltd's website and services. By using our services, you agree to these terms.</p><h3>Service Agreement</h3><p>All waste management services are provided subject to a service agreement between Green Label Services and the client.</p><h3>Liability</h3><p>Green Label Services maintains full insurance coverage for waste management operations and assumes liability for waste from the point of collection.</p><h3>Payment Terms</h3><p>Payment terms are as specified in individual service agreements. Standard terms are net 30 days from invoice date.</p>"
    />
  )
}
