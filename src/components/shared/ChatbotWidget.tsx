'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { COMPANY_INFO } from '@/lib/data/constants'

interface Message {
  id: string
  text: string
  sender: 'bot' | 'user'
  timestamp: Date
  links?: { label: string; href: string }[]
}

const QUICK_ACTIONS = [
  { label: 'Our Services', icon: 'fa-solid fa-recycle' },
  { label: 'Request Quote', icon: 'fa-solid fa-file-invoice' },
  { label: 'Contact Us', icon: 'fa-solid fa-phone' },
  { label: 'Track Pickup', icon: 'fa-solid fa-truck' },
]

function generateId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function getBotResponse(input: string): Message {
  const lower = input.toLowerCase()

  if (lower.includes('service') || lower === 'our services') {
    return {
      id: generateId(),
      text: 'We offer a wide range of waste management services:',
      sender: 'bot',
      timestamp: new Date(),
      links: [
        { label: 'Medical Waste Management', href: '/services' },
        { label: 'Oil & Gas Waste Management', href: '/services' },
        { label: 'Liquid Waste Management', href: '/services' },
        { label: 'Retail Waste Management', href: '/services' },
        { label: 'Equipment Supply', href: '/services' },
        { label: 'Training & Consultation', href: '/services' },
        { label: 'View All Services', href: '/services' },
      ],
    }
  }

  if (lower.includes('quote') || lower.includes('pricing') || lower.includes('price') || lower === 'request quote') {
    return {
      id: generateId(),
      text: `You can request a free quote by clicking the "Request A Quote" button at the top of any page, or visit our quote page. Our team typically responds within 24 hours with a customized quote.`,
      sender: 'bot',
      timestamp: new Date(),
      links: [
        { label: 'Request A Quote', href: '/quote' },
      ],
    }
  }

  if (lower.includes('contact') || lower.includes('reach') || lower.includes('email') || lower.includes('phone') || lower === 'contact us') {
    return {
      id: generateId(),
      text: `Here are our contact details:\n\nPhone: ${COMPANY_INFO.phones[0]}\nAlt: ${COMPANY_INFO.phones[1]}\nEmail: ${COMPANY_INFO.email}\nWhatsApp: ${COMPANY_INFO.whatsapp}\n\nAddress: ${COMPANY_INFO.address}\n\nWorking Hours:\n${COMPANY_INFO.workingHours.weekdays}\n${COMPANY_INFO.workingHours.saturday}\n${COMPANY_INFO.workingHours.sunday}`,
      sender: 'bot',
      timestamp: new Date(),
      links: [
        { label: 'Contact Page', href: '/contact' },
      ],
    }
  }

  if (lower.includes('track') || lower.includes('pickup') || lower.includes('schedule') || lower === 'track pickup') {
    return {
      id: generateId(),
      text: `To track your pickup or schedule a new one, please call our dispatch team directly at ${COMPANY_INFO.emergencyHotline}. For emergencies, this line is available 24/7.`,
      sender: 'bot',
      timestamp: new Date(),
      links: [
        { label: 'Call Dispatch', href: `tel:${COMPANY_INFO.phones[0].replace(/\s/g, '')}` },
      ],
    }
  }

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return {
      id: generateId(),
      text: 'Hello! Welcome to Green Label Services. How can I help you today? You can ask about our services, request a quote, get contact information, or track a pickup.',
      sender: 'bot',
      timestamp: new Date(),
    }
  }

  return {
    id: generateId(),
    text: `I'm sorry, I didn't quite understand that. Here are some things I can help you with:\n\n- Information about our services\n- How to request a quote\n- Our contact details\n- Tracking a pickup\n\nOr you can call us directly at ${COMPANY_INFO.phones[0]} for immediate assistance.`,
    sender: 'bot',
    timestamp: new Date(),
  }
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateId(),
      text: 'Hello! Welcome to Green Label Services. I can help you with information about our services, quotes, and more. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = useCallback(
    (text: string) => {
      if (!text.trim()) return

      const userMessage: Message = {
        id: generateId(),
        text: text.trim(),
        sender: 'user',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setInputValue('')

      // Simulate typing delay
      setTimeout(() => {
        const botResponse = getBotResponse(text)
        setMessages((prev) => [...prev, botResponse])
      }, 600)
    },
    []
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend(inputValue)
  }

  const handleQuickAction = (label: string) => {
    handleSend(label)
  }

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div
          className={`chatbot-widget open fixed bottom-20 right-4 z-40 flex h-[480px] w-[360px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200 sm:right-6`}
          role="complementary"
          aria-label="Chat assistant"
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-gradient-green px-4 py-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
              <i
                className="fa-solid fa-leaf text-lg text-white"
                aria-hidden="true"
              />
            </div>
            <div className="flex-1">
              <p className="font-heading text-sm font-bold text-white">
                Green Label Assistant
              </p>
              <p className="flex items-center gap-1 text-xs text-green-200">
                <span
                  className="inline-block h-2 w-2 rounded-full bg-green-400"
                  aria-hidden="true"
                />
                Online
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-3"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-3 flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                    msg.sender === 'user'
                      ? 'bg-brand-green text-white shadow-sm'
                      : 'bg-brand-green-50 text-gray-800'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  {msg.links && msg.links.length > 0 && (
                    <div className="mt-2 flex flex-col gap-1">
                      {msg.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.href}
                          className={`inline-flex items-center gap-1 text-xs font-medium underline ${
                            msg.sender === 'user'
                              ? 'text-white/90 hover:text-white'
                              : 'text-brand-green hover:text-brand-green-dark'
                          }`}
                        >
                          <i className="fa-solid fa-arrow-right text-[10px]" aria-hidden="true" />
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-1.5 border-t border-gray-100 px-4 py-2">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => handleQuickAction(action.label)}
                className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-brand-green/10 hover:text-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
              >
                <i className={`${action.icon} text-[10px]`} aria-hidden="true" />
                {action.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-gray-100 px-4 py-3"
          >
            <label htmlFor="chatbot-input" className="sr-only">
              Type your message
            </label>
            <input
              ref={inputRef}
              id="chatbot-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-900 transition-colors focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green text-white transition-colors hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <i className="fa-solid fa-paper-plane text-sm" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={isOpen}
        className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green text-white shadow-lg shadow-brand-green/30 transition-all duration-300 hover:bg-brand-green-dark hover:shadow-xl hover:shadow-brand-green/40 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 sm:right-6"
      >
        <i
          className={`text-xl transition-transform duration-300 ${
            isOpen
              ? 'fa-solid fa-xmark rotate-90'
              : 'fa-solid fa-comments'
          }`}
          aria-hidden="true"
        />
      </button>
    </>
  )
}
