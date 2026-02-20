import type { Metadata } from 'next'
import { DM_Sans, Raleway, Fraunces } from 'next/font/google'
import './globals.css'
import { SITE_NAME, SITE_URL, COMPANY_INFO } from '@/lib/data/constants'

const dmSans = DM_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

const raleway = Raleway({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
})

const fraunces = Fraunces({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${COMPANY_INFO.tagline}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Green Label Services is Uganda\'s leading waste management company providing medical waste, oil & gas waste, liquid waste, and hazardous waste collection and disposal services.',
  keywords: [
    'waste management Uganda',
    'medical waste disposal',
    'oil gas waste management',
    'hazardous waste collection',
    'Green Label Services',
    'Kampala waste services',
  ],
  authors: [{ name: COMPANY_INFO.name }],
  creator: COMPANY_INFO.name,
  openGraph: {
    type: 'website',
    locale: 'en_UG',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${COMPANY_INFO.tagline}`,
    description:
      'Uganda\'s leading waste management company. 25+ years of safe, trusted waste collection and disposal services.',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: COMPANY_INFO.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  other: {
    'geo.region': 'UG',
    'geo.placename': 'Kampala',
    'geo.position': `${COMPANY_INFO.geo.latitude};${COMPANY_INFO.geo.longitude}`,
    ICBM: `${COMPANY_INFO.geo.latitude}, ${COMPANY_INFO.geo.longitude}`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${dmSans.variable} ${raleway.variable} ${fraunces.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
