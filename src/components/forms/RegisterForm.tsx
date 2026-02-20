'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { emailSchema } from '@/lib/validators/email'
import { signUp } from '@/lib/actions/auth'

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(30, 'Username must be less than 30 characters')
      .regex(
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores'
      ),
    first_name: z
      .string()
      .min(1, 'First name is required')
      .max(50, 'First name must be less than 50 characters'),
    email: emailSchema,
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[a-zA-Z]/, 'Password must contain at least one letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    password2: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.password2, {
    message: 'Passwords do not match',
    path: ['password2'],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(registerSchema) as any,
    defaultValues: {
      username: '',
      first_name: '',
      email: '',
      password: '',
      password2: '',
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    setSubmitStatus(null)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => formData.append(key, String(value)))
      const result = await signUp({ success: false, message: '' }, formData)
      if (result.success) {
        setSubmitStatus({ type: 'success', message: result.message })
        reset()
      } else {
        setSubmitStatus({ type: 'error', message: result.message })
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again later.',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Status Message */}
      {submitStatus && (
        <div
          role="alert"
          className={`rounded-lg p-4 ${
            submitStatus.type === 'success'
              ? 'border border-green-200 bg-green-50 text-green-800'
              : 'border border-red-200 bg-red-50 text-red-800'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      {/* Username */}
      <div>
        <label htmlFor="reg-username" className="mb-1 block text-sm font-medium text-gray-700">
          Username <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="reg-username"
          {...register('username')}
          aria-invalid={!!errors.username}
          aria-describedby={errors.username ? 'reg-username-error' : 'reg-username-hint'}
          autoComplete="username"
          className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
            errors.username
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:border-brand-green'
          }`}
          placeholder="johndoe"
        />
        {errors.username ? (
          <p id="reg-username-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.username.message}
          </p>
        ) : (
          <p id="reg-username-hint" className="mt-1 text-xs text-gray-500">
            3-30 characters. Letters, numbers, and underscores only.
          </p>
        )}
      </div>

      {/* First Name */}
      <div>
        <label htmlFor="reg-first_name" className="mb-1 block text-sm font-medium text-gray-700">
          First Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="reg-first_name"
          {...register('first_name')}
          aria-invalid={!!errors.first_name}
          aria-describedby={errors.first_name ? 'reg-first_name-error' : undefined}
          autoComplete="given-name"
          className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
            errors.first_name
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:border-brand-green'
          }`}
          placeholder="John"
        />
        {errors.first_name && (
          <p id="reg-first_name-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.first_name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="reg-email" className="mb-1 block text-sm font-medium text-gray-700">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="reg-email"
          {...register('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'reg-email-error' : undefined}
          autoComplete="email"
          className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
            errors.email
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:border-brand-green'
          }`}
          placeholder="john@example.com"
        />
        {errors.email && (
          <p id="reg-email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="reg-password" className="mb-1 block text-sm font-medium text-gray-700">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          id="reg-password"
          {...register('password')}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'reg-password-error' : 'reg-password-hint'}
          autoComplete="new-password"
          className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
            errors.password
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:border-brand-green'
          }`}
          placeholder="Create a strong password"
        />
        {errors.password ? (
          <p id="reg-password-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.password.message}
          </p>
        ) : (
          <p id="reg-password-hint" className="mt-1 text-xs text-gray-500">
            Minimum 8 characters with at least one letter and one number.
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="reg-password2" className="mb-1 block text-sm font-medium text-gray-700">
          Confirm Password <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          id="reg-password2"
          {...register('password2')}
          aria-invalid={!!errors.password2}
          aria-describedby={errors.password2 ? 'reg-password2-error' : undefined}
          autoComplete="new-password"
          className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
            errors.password2
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:border-brand-green'
          }`}
          placeholder="Confirm your password"
        />
        {errors.password2 && (
          <p id="reg-password2-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.password2.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-lg bg-brand-green px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <svg
              className="-ml-1 mr-2 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </button>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium text-brand-green hover:text-brand-green-dark hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  )
}
