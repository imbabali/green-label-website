import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left panel — branding (hidden on mobile) */}
      <div className="hidden w-1/2 bg-gradient-green p-12 lg:flex lg:flex-col lg:justify-between">
        <Link href="/" className="flex items-center gap-1" aria-label="Green Label Services home">
          <span className="font-heading text-2xl font-extrabold tracking-tight text-white">
            GREEN
          </span>
          <span className="font-heading text-2xl font-extrabold tracking-tight text-brand-orange">
            LABEL
          </span>
        </Link>

        <div className="relative">
          {/* Decorative orb */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(247,148,29,0.3) 0%, transparent 70%)' }}
          />
          <h1 className="relative z-10 font-heading text-4xl font-bold leading-tight text-white">
            Safe And Trusted<br />Waste Collection Service
          </h1>
          <p className="relative z-10 mt-4 text-lg text-green-200">
            Uganda&apos;s leading waste management company with over 25 years of experience.
          </p>
        </div>

        <p className="text-sm text-green-300/60">
          &copy; {new Date().getFullYear()} Green Label Services. All rights reserved.
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex w-full items-center justify-center bg-white px-4 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Mobile-only logo */}
          <div className="mb-8 text-center lg:hidden">
            <Link href="/" className="inline-flex items-center gap-1">
              <span className="font-heading text-xl font-extrabold tracking-tight text-brand-green">GREEN</span>
              <span className="font-heading text-xl font-extrabold tracking-tight text-brand-orange">LABEL</span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
