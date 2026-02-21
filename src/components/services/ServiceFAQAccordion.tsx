'use client'

import { useState } from 'react'

interface FAQ {
  question: string
  answer: string
}

export default function ServiceFAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="divide-y divide-gray-200 rounded-lg border border-gray-200">
      {faqs.map((faq, i) => {
        const panelId = `faq-answer-${i}`
        const isOpen = openIndex === i
        return (
          <div key={i} className={isOpen ? 'border-l-4 border-l-brand-green' : ''}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-50"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span className="pr-4 font-semibold text-gray-900">{faq.question}</span>
              <i
                className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'} shrink-0 text-brand-green transition-transform`}
                aria-hidden="true"
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-hidden={!isOpen}
              className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}
            >
              <p className="px-6 leading-relaxed text-gray-600">{faq.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
