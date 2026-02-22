import type { Metadata } from 'next'
import Hero from '@/components/shared/Hero'
import StatsCounter from '@/components/shared/StatsCounter'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import CardGrid from '@/components/shared/CardGrid'
import { GradientOrb, DotPattern } from '@/components/shared/DecorativeElements'
import { generatePageMetadata, reviewJsonLd } from '@/lib/utils/seo'
import Link from 'next/link'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Customer Reviews',
    description:
      'Read reviews from Green Label Services customers about our waste management solutions across Uganda.',
    path: '/reviews',
  })
}

const testimonials = [
  {
    name: 'Dr Sarah Namubiru',
    role: 'Hospital Administrator',
    org: 'Mulago National Referral Hospital',
    service: 'Medical Waste Management',
    rating: 5,
    comment:
      'Green Label has transformed our medical waste handling. Their team is professional, punctual, and fully compliant with NEMA regulations. We have not had a single incident since partnering with them.',
    recommend: true,
  },
  {
    name: 'James Okello',
    role: 'Operations Manager',
    org: 'TotalEnergies Uganda',
    service: 'Oil & Gas Waste Management',
    rating: 5,
    comment:
      'Outstanding service in managing our drilling waste and hazardous materials. Green Label understands the strict requirements of the oil and gas sector and delivers consistently.',
    recommend: true,
  },
  {
    name: 'Grace Akello',
    role: 'Facilities Manager',
    org: 'Shoprite Kampala',
    service: 'Retail Waste Management',
    rating: 5,
    comment:
      'Reliable and affordable waste collection for all our retail outlets across Kampala. Their recycling programme has helped us reduce waste costs by 30%.',
    recommend: true,
  },
  {
    name: 'Peter Musoke',
    role: 'Managing Director',
    org: 'Roofings Group',
    service: 'Industrial Waste Management',
    rating: 5,
    comment:
      'We needed a partner who could handle large-scale industrial waste safely. Green Label exceeded expectations — their equipment is modern and their documentation is impeccable.',
    recommend: true,
  },
  {
    name: 'Esther Birungi',
    role: 'Town Clerk',
    org: 'Mbarara Municipal Council',
    service: 'Municipal Waste Management',
    rating: 4,
    comment:
      'Green Label has been instrumental in keeping Mbarara clean. Their community engagement and education programmes make them much more than just a waste collector.',
    recommend: true,
  },
  {
    name: 'Robert Kiggundu',
    role: 'HSE Director',
    org: 'CNOOC Uganda',
    service: 'Hazardous Waste Disposal',
    rating: 5,
    comment:
      'The level of professionalism and regulatory compliance is world-class. Green Label is the only waste management company I trust with hazardous materials in the Albertine region.',
    recommend: true,
  },
]

const serviceHighlights = [
  { icon: 'fa-solid fa-hospital', title: 'Medical Waste', reviews: '350+', rating: '4.9' },
  { icon: 'fa-solid fa-oil-well', title: 'Oil & Gas Waste', reviews: '120+', rating: '4.8' },
  { icon: 'fa-solid fa-store', title: 'Retail Waste', reviews: '280+', rating: '4.7' },
  { icon: 'fa-solid fa-industry', title: 'Industrial Waste', reviews: '200+', rating: '4.8' },
  { icon: 'fa-solid fa-city', title: 'Municipal Waste', reviews: '150+', rating: '4.6' },
  { icon: 'fa-solid fa-skull-crossbones', title: 'Hazardous Waste', reviews: '90+', rating: '4.9' },
]

export default function ReviewsPage() {
  // Compute aggregate rating from testimonials
  const totalRating = testimonials.reduce((sum, t) => sum + t.rating, 0)
  const averageRating = totalRating / testimonials.length
  const reviewCount = testimonials.length

  const aggregateJsonLd = reviewJsonLd(
    testimonials.map((t) => ({
      rating: t.rating,
      author: t.name,
      text: t.comment,
      date: '2025-01-01',
    })),
    averageRating,
    reviewCount
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateJsonLd) }}
      />

      <Hero
        heading="Customer Reviews"
        subheading="What Our Clients Say"
        description="Read what our clients have to say about our waste management services. Over 2,000 satisfied clients across Uganda trust Green Label Services."
        backgroundImage="/images/hero/waste.jpg"
        variant="split"
        badge="Client Feedback"
        flipped
        stats={[
          { value: '4.8', label: 'Avg Rating' },
          { value: '2,194+', label: 'Clients' },
          { value: '99%', label: 'Recommend' },
          { value: '25+', label: 'Years' },
        ]}
      />

      <StatsCounter
        stats={[
          { value: 2194, suffix: '+', label: 'Happy Clients', icon: 'fa-solid fa-face-smile' },
          { value: 4.8, label: 'Average Rating', icon: 'fa-solid fa-star', suffix: '/5' },
          { value: 99, suffix: '%', label: 'Would Recommend', icon: 'fa-solid fa-thumbs-up' },
          { value: 25, suffix: '+', label: 'Years Trusted', icon: 'fa-solid fa-shield-halved' },
        ]}
        darkBackground
      />

      {/* Service Ratings */}
      <section className="relative overflow-hidden bg-white py-12 md:py-16">
        <GradientOrb color="green" size="lg" className="-left-32 -top-20 opacity-15" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl">
              <i className="fa-solid fa-chart-bar mr-2 text-brand-green" aria-hidden="true" />
              Ratings by Service
            </h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-600">
              Consistently high ratings across every service category we offer.
            </p>
          </ScrollRevealSection>
          <CardGrid columns={3}>
            {serviceHighlights.map((s) => (
              <div
                key={s.title}
                className="card-premium rounded-2xl border-b-2 border-b-brand-orange bg-white p-4 text-center shadow-md"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10">
                  <i className={`${s.icon} text-xl text-brand-green`} aria-hidden="true" />
                </div>
                <h3 className="font-heading text-sm font-bold text-gray-900">{s.title}</h3>
                <div className="mt-2 flex items-center justify-center gap-1">
                  <i className="fa-solid fa-star text-amber-400" aria-hidden="true" />
                  <span className="text-lg font-bold text-gray-900">{s.rating}</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">{s.reviews} reviews</p>
              </div>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative overflow-hidden bg-gradient-warm py-12 md:py-16">
        <GradientOrb color="orange" size="lg" className="-right-32 top-10 opacity-20" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl">
              <i className="fa-solid fa-quote-left mr-2 text-brand-green" aria-hidden="true" />
              Client Testimonials
            </h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-600">
              Hear directly from the organisations that depend on our services every day.
            </p>
          </ScrollRevealSection>
          <ScrollRevealSection>
            <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <div
                  key={t.name}
                  className={`reveal reveal-up stagger-${Math.min(i + 1, 6)} card-premium relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 md:p-6 shadow-md`}
                >
                  <i
                    className="fa-solid fa-quote-left absolute -right-2 -top-2 text-6xl text-brand-green/5"
                    aria-hidden="true"
                  />
                  <div className="relative z-10">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex gap-0.5">
                        {Array.from({ length: t.rating }, (_, j) => (
                          <i
                            key={j}
                            className="fa-solid fa-star text-xs text-amber-400"
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      {t.recommend && (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
                          <i className="fa-solid fa-thumbs-up mr-1" aria-hidden="true" />
                          Recommends
                        </span>
                      )}
                    </div>
                    <p className="mb-3 text-xs leading-relaxed text-gray-600">
                      &ldquo;{t.comment}&rdquo;
                    </p>
                    <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-white ring-2 ring-brand-green/20">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900">{t.name}</p>
                        <p className="text-[10px] text-gray-500">
                          {t.role}, {t.org}
                        </p>
                      </div>
                    </div>
                    <span className="mt-2 inline-block rounded-full bg-brand-green/10 px-2 py-0.5 text-[10px] font-medium text-brand-green">
                      {t.service}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Why Clients Trust Us */}
      <section className="bg-gradient-subtle py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollRevealSection>
            <h2 className="reveal reveal-up mb-2 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl">
              <i className="fa-solid fa-shield-halved mr-2 text-brand-green" aria-hidden="true" />
              Why Clients Trust Us
            </h2>
            <p className="reveal reveal-up stagger-1 mx-auto mb-8 max-w-xl text-center text-sm text-gray-600">
              The reasons our clients choose Green Label Services over the competition.
            </p>
          </ScrollRevealSection>
          <CardGrid columns={3}>
            {[
              {
                icon: 'fa-solid fa-certificate',
                title: 'Fully Licensed',
                desc: 'NEMA-licensed for hazardous and non-hazardous waste across all regions of Uganda.',
              },
              {
                icon: 'fa-solid fa-clock',
                title: 'Always On Time',
                desc: '99.5% on-time collection rate — we never leave you waiting.',
              },
              {
                icon: 'fa-solid fa-leaf',
                title: 'Eco-Friendly',
                desc: 'Sustainable disposal methods with a focus on recycling and resource recovery.',
              },
              {
                icon: 'fa-solid fa-headset',
                title: '24/7 Support',
                desc: 'Round-the-clock emergency response and dedicated account management.',
              },
              {
                icon: 'fa-solid fa-truck',
                title: 'Modern Fleet',
                desc: 'GPS-tracked, specialised vehicles for every waste type and volume.',
              },
              {
                icon: 'fa-solid fa-file-shield',
                title: 'Full Compliance',
                desc: 'Complete documentation, manifests, and audit trails for regulatory peace of mind.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="card-premium flex items-start gap-3 rounded-2xl border-l-4 border-l-brand-green bg-white p-4 shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green/10">
                  <i className={`${item.icon} text-lg text-brand-green`} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="mb-1 font-heading text-sm font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </CardGrid>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-green py-12">
        <DotPattern />
        <GradientOrb color="orange" size="lg" className="-right-32 -top-20 opacity-20" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading text-xl font-bold text-white md:text-2xl">
            <i className="fa-solid fa-star mr-2" aria-hidden="true" />
            Join Our Satisfied Clients
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-white/80">
            Experience the service that thousands of organisations across Uganda trust every day.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="#quote"
              data-quote-trigger=""
              className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-orange/25 hover:bg-brand-orange-dark"
            >
              Get A Quote
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border-2 border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
