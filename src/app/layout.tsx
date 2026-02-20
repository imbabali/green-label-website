import type { Metadata, Viewport } from 'next'
import { DM_Sans, Raleway, Fraunces } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2c632c',
}

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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_UG',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${COMPANY_INFO.tagline}`,
    description:
      'Uganda\'s leading waste management company. 25+ years of safe, trusted waste collection and disposal services.',
    images: [{ url: `${SITE_URL}/images/og-image.png`, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: COMPANY_INFO.tagline,
    images: [`${SITE_URL}/images/og-image.png`],
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
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl0HPNiekfRLfg8+p0all20u7gA0hMatt4J6VkZYi3fOn+p8gSwCYfpKf8MDBK0fNO0RsFP+s2sktg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${dmSans.variable} ${raleway.variable} ${fraunces.variable} font-sans antialiased`}
      >
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
