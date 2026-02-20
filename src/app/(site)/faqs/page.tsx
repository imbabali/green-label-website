import type { Metadata } from 'next'
import Hero from '@/components/shared/Hero'
import { generatePageMetadata, faqJsonLd } from '@/lib/utils/seo'
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
      <Hero
        heading="Frequently Asked Questions"
        subheading="Find answers to common questions"
        variant="fullWidth"
        breadcrumbs={[{ label: 'FAQs' }]}
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {categories.map((cat) => (
            <div key={cat.id} className="mb-10">
              <h2 className="mb-6 flex items-center gap-3 font-heading text-2xl font-bold text-gray-900">
                {cat.icon && <i className={`${cat.icon} text-brand-green`} aria-hidden="true" />}
                {cat.name}
              </h2>
              <div className="space-y-3">
                {cat.items.map((item) => (
                  <details key={item._id} className="group rounded-lg border border-gray-200 bg-white">
                    <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-gray-900 hover:text-brand-green">
                      {item.question}
                      <i className="fa-solid fa-chevron-down text-sm text-gray-400 transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <div className="border-t border-gray-100 px-5 pb-5 pt-3 text-gray-600 leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
