import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/utils/seo'
import { fetchPageContent } from '@/lib/utils/cms-page-helper'
import CMSPage from '@/components/shared/CMSPage'

export const revalidate = 86400

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Privacy Policy',
    description: 'Green Label Services privacy policy and data protection practices.',
    path: '/privacy',
  })
}

export default async function PrivacyPolicyPage() {
  const { content } = await fetchPageContent('privacy')

  return (
    <CMSPage
      title="Privacy Policy"
      breadcrumbs={[{ label: 'Privacy Policy' }]}
      heroImage="/images/hero/abt.png"
      content={content}
      fallbackContent="<h2>Privacy Policy</h2><p>Green Label Services Ltd is committed to protecting your personal information. This policy outlines how we collect, use, and safeguard your data in compliance with Uganda's Data Protection and Privacy Act 2019.</p><h3>Information We Collect</h3><p>We collect personal information when you use our services, submit forms, or contact us. This includes your name, email, phone number, and service-related details.</p><h3>How We Use Your Information</h3><p>Your information is used to provide waste management services, respond to inquiries, process applications, and improve our services.</p><h3>Data Security</h3><p>We implement appropriate security measures to protect your personal data from unauthorized access, alteration, or disclosure.</p><h3>Contact Us</h3><p>For privacy-related inquiries, contact us at info@greenlabelservicesug.com or call +256 772 423 092.</p>"
    />
  )
}
