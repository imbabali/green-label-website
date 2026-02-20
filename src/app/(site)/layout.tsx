import TopBar from '@/components/layout/TopBar'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/layout/BackToTop'
// TODO: Import QuoteModal once created
// import QuoteModal from '@/components/shared/QuoteModal'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: Fetch services from Sanity for the mega menu and footer
  // const services = await getServices()
  const services: { title: string; slug: string }[] = []

  return (
    <>
      <TopBar />
      <Navbar services={services} />
      <main id="main-content">{children}</main>
      <Footer services={services} />
      <BackToTop />
      {/* TODO: Render QuoteModal here once created */}
      {/* <QuoteModal /> */}
    </>
  )
}
