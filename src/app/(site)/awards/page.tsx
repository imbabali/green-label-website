import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/utils/seo'
import { fetchPageContent } from '@/lib/utils/cms-page-helper'
import CMSPage from '@/components/shared/CMSPage'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Awards & Recognition',
    description: 'Awards and recognition received by Green Label Services for environmental excellence.',
    path: '/awards',
  })
}

export default async function AwardsPage() {
  const { content } = await fetchPageContent('awards')

  return (
    <CMSPage
      title="Awards & Recognition" heroImage="/images/certificates/iso.png"
      content={content}
      fallbackContent="<h2>Awards &amp; Recognition</h2><p>Green Label Services has been recognised for its commitment to environmental excellence and outstanding waste management services.</p><h3>Notable Awards</h3><ul><li><strong>Best Waste Management Company</strong> — National Environmental Award 2022</li><li><strong>Environmental Excellence Award</strong> — East Africa Business Awards 2020</li><li><strong>Community Impact Award</strong> — Uganda CSR Awards 2019</li></ul>"
    />
  )
}
