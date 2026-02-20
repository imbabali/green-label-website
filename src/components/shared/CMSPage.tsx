import { PortableText } from '@portabletext/react'
import Hero from '@/components/shared/Hero'
import Link from 'next/link'

interface CMSPageProps {
  title: string
  breadcrumbs: { label: string; href?: string }[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any[]
  fallbackContent?: string
  children?: React.ReactNode
}

export default function CMSPage({ title, breadcrumbs, content, fallbackContent, children }: CMSPageProps) {
  return (
    <>
      <Hero heading={title} variant="fullWidth" breadcrumbs={breadcrumbs} />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {content ? (
            <div className="portable-text">
              <PortableText value={content} />
            </div>
          ) : fallbackContent ? (
            <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: fallbackContent }} />
          ) : null}
          {children}
        </div>
      </section>

      <section className="bg-brand-green-dark py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            Need More Information?
          </h2>
          <p className="mt-3 text-gray-300">
            Contact our team for any questions or inquiries about our services.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white hover:bg-brand-orange-dark"
            >
              Contact Us
            </Link>
            <Link
              href="#quote"
              data-quote-trigger=""
              className="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Request A Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
