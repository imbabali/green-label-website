import type { Metadata } from 'next'
import Hero from '@/components/shared/Hero'
import ContactForm from '@/components/forms/ContactForm'
import StatsCounter from '@/components/shared/StatsCounter'
import { generatePageMetadata } from '@/lib/utils/seo'
import { COMPANY_INFO } from '@/lib/data/constants'

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Contact Us',
    description:
      'Get in touch with Green Label Services for waste management inquiries, quotes, or emergency services. Available Monday-Saturday in Kampala, Uganda.',
    path: '/contact',
  })
}

export default function ContactPage() {
  return (
    <>
      <Hero backgroundImage="/images/hero/aga1.webp"
        heading="Contact Us"
        subheading="We Are Here to Help"
        variant="fullWidth"
        breadcrumbs={[{ label: 'Contact Us' }]}
        description="Reach out to our team for waste management solutions, service inquiries, or emergency assistance."
      />

      {/* Google Maps */}
      <section className="bg-gray-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7533!2d32.5825!3d0.3476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMjAnNTEuNCJOIDMywrAzNCc1Ny4wIkU!5e0!3m2!1sen!2sug!4v1"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Green Label Services office location in Kampala, Uganda"
          className="w-full"
        />
      </section>

      {/* Contact Form + Info */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="mb-2 font-heading text-2xl font-bold text-gray-900 md:text-3xl">
                Send Us a Message
              </h2>
              <p className="mb-8 text-gray-600">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
              <ContactForm />
            </div>

            {/* Contact Info Card */}
            <div>
              <div className="sticky top-24 space-y-6">
                {/* Address */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 font-heading text-lg font-bold text-gray-900">
                    <i className="fa-solid fa-location-dot mr-2 text-brand-green" aria-hidden="true" />
                    Our Office
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">{COMPANY_INFO.address}</p>
                </div>

                {/* Phone Numbers */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 font-heading text-lg font-bold text-gray-900">
                    <i className="fa-solid fa-phone mr-2 text-brand-green" aria-hidden="true" />
                    Phone Numbers
                  </h3>
                  <ul className="space-y-2">
                    {COMPANY_INFO.phones.map((phone) => (
                      <li key={phone}>
                        <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-sm text-gray-600 hover:text-brand-green">
                          {phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Email */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 font-heading text-lg font-bold text-gray-900">
                    <i className="fa-solid fa-envelope mr-2 text-brand-green" aria-hidden="true" />
                    Email Addresses
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a href={`mailto:${COMPANY_INFO.email}`} className="text-sm text-gray-600 hover:text-brand-green">
                        {COMPANY_INFO.email}
                      </a>
                    </li>
                    <li>
                      <a href={`mailto:${COMPANY_INFO.emailAlt}`} className="text-sm text-gray-600 hover:text-brand-green">
                        {COMPANY_INFO.emailAlt}
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Working Hours */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 font-heading text-lg font-bold text-gray-900">
                    <i className="fa-solid fa-clock mr-2 text-brand-green" aria-hidden="true" />
                    Working Hours
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>{COMPANY_INFO.workingHours.weekdays}</li>
                    <li>{COMPANY_INFO.workingHours.saturday}</li>
                    <li>{COMPANY_INFO.workingHours.sunday}</li>
                  </ul>
                </div>

                {/* Emergency */}
                <div className="rounded-xl bg-red-50 p-6 ring-1 ring-red-100">
                  <h3 className="mb-2 font-heading text-lg font-bold text-red-700">
                    <i className="fa-solid fa-triangle-exclamation mr-2" aria-hidden="true" />
                    Emergency Hotline
                  </h3>
                  <p className="mb-3 text-sm text-red-600">
                    For urgent waste management emergencies, call us 24/7:
                  </p>
                  <a
                    href={`tel:${COMPANY_INFO.emergencyHotline.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
                  >
                    <i className="fa-solid fa-phone" aria-hidden="true" />
                    {COMPANY_INFO.emergencyHotline}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsCounter
        stats={[
          { value: 25, suffix: '+', label: 'Years Experience', icon: 'fa-solid fa-calendar' },
          { value: 2194, suffix: '+', label: 'Active Clients', icon: 'fa-solid fa-building' },
          { value: 300, suffix: '+', label: 'Team Members', icon: 'fa-solid fa-users' },
          { value: 99, suffix: '%', label: 'Satisfaction', icon: 'fa-solid fa-star' },
        ]}
        darkBackground
      />
    </>
  )
}
