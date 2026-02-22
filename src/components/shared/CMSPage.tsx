import { PortableText } from '@portabletext/react'
import Hero from '@/components/shared/Hero'
import Link from 'next/link'
import { GradientOrb, WaveDivider } from '@/components/shared/DecorativeElements'

interface CMSPageProps {
  title: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any[]
  fallbackContent?: string
  heroImage?: string
  children?: React.ReactNode
}

export default function CMSPage({
  title,
  content,
  fallbackContent,
  heroImage,
  children,
}: CMSPageProps) {
  return (
    <>
      <Hero heading={title} variant="fullWidth" backgroundImage={heroImage} />

      <section className="bg-gradient-subtle py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="border-l-4 border-brand-green/20 pl-6">
            {content ? (
              <div className="portable-text">
                <PortableText value={content} />
              </div>
            ) : fallbackContent ? (
              // Safety: fallbackContent is developer-authored static HTML from page
              // definitions (e.g., policy pages), not user-generated input. It is safe
              // to render via dangerouslySetInnerHTML without escaping.
              <div
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: fallbackContent }}
              />
            ) : null}
          </div>
          {children}
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-green py-16">
        {/* Decorative elements */}
        <GradientOrb color="orange" size="lg" className="-right-32 -top-32 opacity-20" />
        <GradientOrb color="green" size="md" className="-bottom-16 -left-16 opacity-20" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 pattern-dots" />
        <WaveDivider flip />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-white md:text-3xl">
            Need More Information?
          </h2>
          <p className="mt-3 text-gray-200">
            Contact our team for any questions or inquiries about our services.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-brand-orange px-6 py-3 font-semibold text-white shadow-lg shadow-brand-orange/25 transition-colors hover:bg-brand-orange-dark"
            >
              Contact Us
            </Link>
            <Link
              href="#quote"
              data-quote-trigger=""
              className="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Request A Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
