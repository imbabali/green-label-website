import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/utils/seo'
import { fetchPageContent } from '@/lib/utils/cms-page-helper'
import CMSPage from '@/components/shared/CMSPage'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Press Releases',
    description: 'Latest news and press releases from Green Label Services.',
    path: '/press-releases',
  })
}

export default async function PressReleasesPage() {
  const { content } = await fetchPageContent('press-releases')

  return (
    <CMSPage
      title="Press Releases"
      breadcrumbs={[{ label: 'Press Releases' }]}
      content={content}
      fallbackContent="<h2>Press Releases & Newsroom</h2><p>Stay up to date with the latest news, announcements, and media coverage from Green Label Services.</p><p>For media inquiries, please contact our communications team at info@greenlabelservicesug.com.</p>"
    />
  )
}
