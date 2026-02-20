import Link from 'next/link'
import AuthGuard from '@/components/auth/AuthGuard'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="font-heading text-xl font-bold text-brand-green">
              Green Label Services
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-brand-green">
                Dashboard
              </Link>
              <Link href="/profile/edit" className="text-sm font-medium text-gray-700 hover:text-brand-green">
                Profile
              </Link>
              <Link href="/reviews/my-reviews" className="text-sm font-medium text-gray-700 hover:text-brand-green">
                My Reviews
              </Link>
              <Link href="/" className="text-sm text-gray-500 hover:text-brand-green">
                <i className="fa-solid fa-arrow-left mr-1" /> Back to Site
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </AuthGuard>
  )
}
