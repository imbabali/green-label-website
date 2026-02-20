import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL, COMPANY_INFO } from '@/lib/data/constants'

interface SEOParams {
  title: string
  description?: string
  path?: string
  ogImage?: string
  noIndex?: boolean
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
}

const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.svg`

export function generatePageMetadata({
  title,
  description = `${title} - ${COMPANY_INFO.name}`,
  path = '',
  ogImage,
  noIndex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: SEOParams): Metadata {
  const url = `${SITE_URL}${path}`
  const fullTitle = path === '' ? title : `${title} | ${SITE_NAME}`
  const imageUrl = ogImage || DEFAULT_OG_IMAGE

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: type === 'article' ? 'article' : 'website',
      locale: 'en_UG',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
      ...(tags && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: COMPANY_INFO.name,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    description: COMPANY_INFO.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot 89, Block 29 Church Road, Off Mawanda Rd',
      addressLocality: 'Kampala',
      addressCountry: 'UG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY_INFO.geo.latitude,
      longitude: COMPANY_INFO.geo.longitude,
    },
    telephone: COMPANY_INFO.phones[0],
    email: COMPANY_INFO.email,
    foundingDate: `${COMPANY_INFO.founded}`,
    sameAs: [COMPANY_INFO.social.facebook, COMPANY_INFO.social.linkedin],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00',
      },
    ],
  }
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  }
}

export function blogPostJsonLd(post: {
  title: string
  description: string
  slug: string
  publishedAt: string
  updatedAt?: string
  authorName: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    ...(post.updatedAt && { dateModified: post.updatedAt }),
    author: { '@type': 'Person', name: post.authorName },
    publisher: {
      '@type': 'Organization',
      name: COMPANY_INFO.name,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.png` },
    },
    ...(post.image && { image: post.image }),
  }
}

export function jobPostingJsonLd(job: {
  title: string
  description: string
  slug: string
  location: string
  jobType: string
  experienceLevel: string
  salaryMin?: number
  salaryMax?: number
  currency?: string
  applicationDeadline?: string
  isRemote?: boolean
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    url: `${SITE_URL}/careers/jobs/${job.slug}`,
    hiringOrganization: {
      '@type': 'Organization',
      name: COMPANY_INFO.name,
      sameAs: SITE_URL,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressCountry: 'UG',
      },
    },
    employmentType: job.jobType.replace('_', '-').toUpperCase(),
    ...(job.applicationDeadline && { validThrough: job.applicationDeadline }),
    ...(job.isRemote && { jobLocationType: 'TELECOMMUTE' }),
    ...(job.salaryMin && {
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: job.currency || 'UGX',
        value: {
          '@type': 'QuantitativeValue',
          minValue: job.salaryMin,
          maxValue: job.salaryMax,
          unitText: 'MONTH',
        },
      },
    }),
  }
}

export function serviceJsonLd(service: {
  title: string
  description: string
  slug: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: {
      '@type': 'Organization',
      name: COMPANY_INFO.name,
    },
    ...(service.image && { image: service.image }),
    areaServed: { '@type': 'Country', name: 'Uganda' },
  }
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function reviewJsonLd(reviews: { rating: number; author: string; text: string; date: string }[], averageRating: number, totalCount: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY_INFO.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating.toFixed(1),
      reviewCount: totalCount,
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.slice(0, 5).map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: '5' },
      reviewBody: r.text,
      datePublished: r.date,
    })),
  }
}
