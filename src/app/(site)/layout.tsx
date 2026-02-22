import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/layout/BackToTop'
import QuoteModal from '@/components/shared/QuoteModal'
import ChatbotWidget from '@/components/shared/ChatbotWidget'
import CookieConsent from '@/components/shared/CookieConsent'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  // TODO: Fetch services from Sanity for the mega menu and footer
  // const services = await getServices()
  const services: { title: string; slug: string }[] = []

  return (
    <>
      <Navbar services={services} />
      <main id="main-content">{children}</main>
      <Footer services={services} />
      <BackToTop />
      <QuoteModal />
      <ChatbotWidget />
      <CookieConsent />
    </>
  )
}
