import type { Metadata } from 'next'
import Hero from '@/components/shared/Hero'
import { generatePageMetadata, faqJsonLd } from '@/lib/utils/seo'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'
import { sanityFetch } from '@/lib/sanity/client'
import { faqsQuery } from '@/lib/sanity/queries'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'FAQs',
    description: 'Frequently asked questions about Green Label Services waste management solutions in Uganda.',
    path: '/faqs',
  })
}

interface FaqItem {
  _id: string
  question: string
  answer: string
  category?: { _id: string; name: string; icon?: string }
}

export default async function FAQsPage() {
  let faqs: FaqItem[] = []
  try {
    faqs = await sanityFetch<FaqItem[]>({ query: faqsQuery })
  } catch {
    // fallback
  }

  // Group by category
  const grouped = new Map<string, { name: string; icon?: string; items: FaqItem[] }>()
  const fallbackFaqs = [
    { category: 'General', icon: 'fa-solid fa-circle-question', items: [
      { q: 'What services does Green Label offer?', a: 'We provide comprehensive waste management solutions including medical waste management, hazardous waste disposal, solid waste collection, oil and gas waste management, and environmental consulting services across Uganda.' },
      { q: 'What areas do you serve?', a: 'We operate across Uganda with our main office in Kampala and regional facilities in Iganga, Mbarara, and Gulu.' },
      { q: 'How do I request a quote?', a: 'You can request a quote by clicking the "Get A Quote" button on our website, calling us at +256 772 423 092, or emailing info@greenlabelservicesug.com.' },
    ]},
    { category: 'Waste Collection', icon: 'fa-solid fa-truck', items: [
      { q: 'How often is waste collected?', a: 'Collection frequency depends on your service plan. We offer daily, weekly, bi-weekly, and monthly collection schedules to suit your needs.' },
      { q: 'Do you handle hazardous waste?', a: 'Yes, we are fully licensed by NEMA to handle hazardous waste including medical waste, chemical waste, and oil and gas waste products.' },
    ]},
    { category: 'Billing & Payments', icon: 'fa-solid fa-credit-card', items: [
      { q: 'What payment methods do you accept?', a: 'We accept bank transfers, mobile money (MTN and Airtel), cheques, and cash payments at our offices.' },
      { q: 'Do you offer monthly billing?', a: 'Yes, we offer flexible billing options including monthly, quarterly, and annual payment plans for regular service contracts.' },
    ]},
    { category: 'Environmental', icon: 'fa-solid fa-leaf', items: [
      { q: 'Are you environmentally certified?', a: 'Yes, we hold multiple NEMA licenses and certifications for waste collection, transportation, treatment, and disposal in compliance with Ugandan environmental regulations.' },
      { q: 'What happens to collected waste?', a: 'Waste is processed at our licensed treatment facilities. We prioritise recycling and energy recovery, with remaining waste disposed of at approved landfills following strict environmental protocols.' },
      { q: 'Do you offer recycling services?', a: 'Yes, we have recycled over 76,000 tonnes of waste material. We sort and process recyclable materials at our Iganga facility.' },
    ]},
  ]

  if (faqs.length > 0) {
    for (const faq of faqs) {
      const catName = faq.category?.name || 'General'
      const catId = faq.category?._id || 'general'
      if (!grouped.has(catId)) {
        grouped.set(catId, { name: catName, icon: faq.category?.icon, items: [] })
      }
      grouped.get(catId)!.items.push(faq)
    }
  }

  const categories = faqs.length > 0
    ? Array.from(grouped.entries()).map(([id, cat]) => ({ id, ...cat }))
    : fallbackFaqs.map((cat, i) => ({
        id: String(i),
        name: cat.category,
        icon: cat.icon,
        items: cat.items.map((item, j) => ({ _id: `${i}-${j}`, question: item.q, answer: item.a }))
      }))

  // Build FAQ JSON-LD
  const allFaqs = categories.flatMap(c => c.items.map(i => ({ question: i.question, answer: i.answer })))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(allFaqs)) }}
      />

      {/* Centered Hero — search/help feel */}
      <Hero
        heading="Frequently Asked Questions"
        subheading="Find Answers to Common Questions"
        description="Everything you need to know about our waste management services, billing, and environmental practices."
        backgroundImage="/images/offices/office1.jpg"
        variant="split"
        badge="Help Centre"
      />

      {/* Category-grouped accordions with glass category headers */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {categories.map((cat, catIndex) => (
            <ScrollRevealSection key={cat.id}>
              <div className={`reveal reveal-up stagger-${Math.min(catIndex + 1, 6)} mb-8`}>
                <div className="glass mb-4 flex items-center gap-3 rounded-xl p-3">
                  {cat.icon && (
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green/10">
                      <i className={`${cat.icon} text-brand-green`} aria-hidden="true" />
                    </span>
                  )}
                  <h2 className="font-heading text-lg font-bold text-gray-900">{cat.name}</h2>
                  <span className="ml-auto rounded-full bg-brand-orange/10 px-2 py-0.5 text-[10px] font-bold text-brand-orange">{cat.items.length}</span>
                </div>
                <div className="space-y-3">
                  {cat.items.map((item) => (
                    <details key={item._id} className="group card-premium rounded-2xl border-l-4 border-l-brand-green bg-white shadow-sm">
                      <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-medium text-gray-900 hover:text-brand-green">
                        {item.question}
                        <i className="fa-solid fa-chevron-down ml-2 text-xs text-gray-400 transition-transform group-open:rotate-180" aria-hidden="true" />
                      </summary>
                      <div className="border-t border-gray-100 px-4 pb-4 pt-3 text-sm leading-relaxed text-gray-600">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </ScrollRevealSection>
          ))}
        </div>
      </section>
    </>
  )
}
