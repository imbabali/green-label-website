import { PortableText } from '@portabletext/react'
import ServiceFAQAccordion from './ServiceFAQAccordion'

interface ServiceDetailProps {
  service: {
    title: string
    category?: { name: string }
    shortDescription: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fullDescription?: any[]
    features?: string[]
    benefits?: string[]
    serviceAreas?: string[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gallery?: any[]
    faqs?: { question: string; answer: string }[]
    contactEmail?: string
    contactPhone?: string
  }
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  return (
    <div>
      {service.shortDescription && (
        <p className="mb-8 text-lg leading-relaxed text-gray-600">{service.shortDescription}</p>
      )}

      {service.fullDescription && (
        <div className="portable-text mb-10">
          <PortableText value={service.fullDescription} />
        </div>
      )}

      {service.features && service.features.length > 0 && (
        <div className="mb-10">
          <h2 className="mb-4 font-heading text-2xl font-bold text-gray-900">Key Features</h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {service.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <i className="fa-solid fa-check-circle mt-1 text-brand-green" />
                <span className="text-gray-700">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {service.benefits && service.benefits.length > 0 && (
        <div className="mb-10">
          <h2 className="mb-4 font-heading text-2xl font-bold text-gray-900">Benefits</h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {service.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <i className="fa-solid fa-star mt-1 text-brand-orange" />
                <span className="text-gray-700">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {service.serviceAreas && service.serviceAreas.length > 0 && (
        <div className="mb-10">
          <h2 className="mb-4 font-heading text-2xl font-bold text-gray-900">Service Areas</h2>
          <div className="flex flex-wrap gap-2">
            {service.serviceAreas.map((a, i) => (
              <span key={i} className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700">
                <i className="fa-solid fa-map-marker-alt mr-1 text-brand-green" /> {a}
              </span>
            ))}
          </div>
        </div>
      )}

      {service.faqs && service.faqs.length > 0 && (
        <div className="mb-10">
          <h2 className="mb-4 font-heading text-2xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <ServiceFAQAccordion faqs={service.faqs} />
        </div>
      )}

      {(service.contactEmail || service.contactPhone) && (
        <div className="rounded-lg bg-brand-green/5 p-6">
          <h3 className="mb-3 font-heading text-lg font-bold text-gray-900">
            Get in Touch About This Service
          </h3>
          <div className="flex flex-wrap gap-4">
            {service.contactEmail && (
              <a
                href={`mailto:${service.contactEmail}`}
                className="inline-flex items-center gap-2 rounded-md bg-brand-green px-4 py-2 text-sm font-semibold text-white hover:bg-brand-green-dark"
              >
                <i className="fa-solid fa-envelope" /> Email Us
              </a>
            )}
            {service.contactPhone && (
              <a
                href={`tel:${service.contactPhone}`}
                className="inline-flex items-center gap-2 rounded-md bg-brand-orange px-4 py-2 text-sm font-semibold text-white hover:bg-brand-orange-dark"
              >
                <i className="fa-solid fa-phone" /> Call Us
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
