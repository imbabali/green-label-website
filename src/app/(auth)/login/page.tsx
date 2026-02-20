import type { Metadata } from 'next'
import Link from 'next/link'
import LoginForm from '@/components/forms/LoginForm'
import { generatePageMetadata } from '@/lib/utils/seo'

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: 'Login',
    description: 'Sign in to your Green Label Services account.',
    path: '/login',
  })
}

export default function LoginPage() {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-100">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10">
          <i className="fa-solid fa-leaf text-3xl text-brand-green" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-gray-900">Welcome Back</h1>
        <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
      </div>

      <LoginForm />

      <div className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-semibold text-brand-green hover:underline">
          Create one
        </Link>
      </div>

      <div className="mt-4 text-center">
        <Link href="/" className="text-sm text-gray-500 hover:text-brand-green">
          <i className="fa-solid fa-arrow-left mr-1" /> Back to website
        </Link>
      </div>
    </div>
  )
}
