'use client'

import { useState, useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { emailSchema } from '@/lib/validators/email'
import { phoneRequiredSchema } from '@/lib/validators/phone'
import { submitApplication } from '@/lib/actions/application'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const ACCEPTED_EXTENSIONS = '.pdf, .doc, .docx'

const jobApplicationSchema = z.object({
  job_slug: z.string(),
  first_name: z.string().min(1, 'First name is required').max(50, 'First name must be less than 50 characters'),
  last_name: z.string().min(1, 'Last name is required').max(50, 'Last name must be less than 50 characters'),
  email: emailSchema,
  phone: phoneRequiredSchema,
  current_company: z.string().optional().default(''),
  current_position: z.string().optional().default(''),
  linkedin_profile: z
    .string()
    .optional()
    .default('')
    .refine(
      (val) =>
        !val ||
        /^https?:\/\/(www\.)?linkedin\.com/.test(val),
      { message: 'Must be a valid LinkedIn URL (e.g., https://linkedin.com/in/yourname)' }
    ),
  portfolio_url: z
    .string()
    .optional()
    .default('')
    .refine(
      (val) => !val || /^https?:\/\//.test(val),
      { message: 'Must be a valid URL starting with http:// or https://' }
    ),
  cover_letter: z.string().optional().default(''),
})

type JobApplicationFormData = z.infer<typeof jobApplicationSchema>

interface JobApplicationFormProps {
  jobSlug: string
  jobTitle: string
}

export default function JobApplicationForm({
  jobSlug,
  jobTitle,
}: JobApplicationFormProps) {
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobApplicationFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(jobApplicationSchema) as any,
    defaultValues: {
      job_slug: jobSlug,
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      current_company: '',
      current_position: '',
      linkedin_profile: '',
      portfolio_url: '',
      cover_letter: '',
    },
  })

  const validateFile = useCallback((file: File): boolean => {
    setFileError(null)

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setFileError(`Invalid file type. Accepted formats: ${ACCEPTED_EXTENSIONS}`)
      return false
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError('File is too large. Maximum size is 5MB.')
      return false
    }

    return true
  }, [])

  const handleFileSelect = useCallback(
    (file: File) => {
      if (validateFile(file)) {
        setSelectedFile(file)
      } else {
        setSelectedFile(null)
      }
    },
    [validateFile]
  )

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    setFileError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const onSubmit = async (data: JobApplicationFormData) => {
    setSubmitStatus(null)

    if (!selectedFile) {
      setFileError('Resume is required')
      return
    }

    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })
      formData.append('resume', selectedFile)

      const result = await submitApplication({ success: false, message: '' }, formData)
      if (result.success) {
        setSubmitStatus({ type: 'success', message: result.message })
        reset()
        removeFile()
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      {/* Hidden job slug */}
      <input type="hidden" {...register('job_slug')} />

      <h3 className="text-xl font-semibold text-gray-900">
        Apply for {jobTitle}
      </h3>

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

      {/* Section 1: Personal Information */}
      <fieldset>
        <legend className="mb-4 text-lg font-semibold text-gray-900">
          Personal Information
        </legend>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* First Name */}
          <div>
            <label htmlFor="first_name" className="mb-1 block text-sm font-medium text-gray-700">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="first_name"
              autoComplete="given-name"
              {...register('first_name')}
              aria-invalid={!!errors.first_name}
              aria-describedby={errors.first_name ? 'first_name-error' : undefined}
              className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
                errors.first_name
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-brand-green'
              }`}
              placeholder="John"
            />
            {errors.first_name && (
              <p id="first_name-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.first_name.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="last_name" className="mb-1 block text-sm font-medium text-gray-700">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="last_name"
              autoComplete="family-name"
              {...register('last_name')}
              aria-invalid={!!errors.last_name}
              aria-describedby={errors.last_name ? 'last_name-error' : undefined}
              className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
                errors.last_name
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-brand-green'
              }`}
              placeholder="Doe"
            />
            {errors.last_name && (
              <p id="last_name-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.last_name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="app-email" className="mb-1 block text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="app-email"
              inputMode="email"
              autoComplete="email"
              {...register('email')}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'app-email-error' : undefined}
              className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
                errors.email
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-brand-green'
              }`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p id="app-email-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="app-phone" className="mb-1 block text-sm font-medium text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="app-phone"
              inputMode="tel"
              autoComplete="tel"
              {...register('phone')}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'app-phone-error' : undefined}
              className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
                errors.phone
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-brand-green'
              }`}
              placeholder="+256 772 423 092"
            />
            {errors.phone && (
              <p id="app-phone-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      {/* Section 2: Professional Experience */}
      <fieldset>
        <legend className="mb-4 text-lg font-semibold text-gray-900">
          Professional Experience
        </legend>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Current Company */}
          <div>
            <label htmlFor="current_company" className="mb-1 block text-sm font-medium text-gray-700">
              Current Company
            </label>
            <input
              type="text"
              id="current_company"
              autoComplete="organization"
              {...register('current_company')}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 transition-colors focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green"
              placeholder="Current or most recent employer"
            />
          </div>

          {/* Current Position */}
          <div>
            <label htmlFor="current_position" className="mb-1 block text-sm font-medium text-gray-700">
              Current Position
            </label>
            <input
              type="text"
              id="current_position"
              autoComplete="organization-title"
              {...register('current_position')}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 transition-colors focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green"
              placeholder="Your current job title"
            />
          </div>

          {/* LinkedIn Profile */}
          <div>
            <label htmlFor="linkedin_profile" className="mb-1 block text-sm font-medium text-gray-700">
              LinkedIn Profile
            </label>
            <input
              type="url"
              id="linkedin_profile"
              inputMode="url"
              autoComplete="url"
              {...register('linkedin_profile')}
              aria-invalid={!!errors.linkedin_profile}
              aria-describedby={errors.linkedin_profile ? 'linkedin-error' : undefined}
              className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
                errors.linkedin_profile
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-brand-green'
              }`}
              placeholder="https://linkedin.com/in/yourname"
            />
            {errors.linkedin_profile && (
              <p id="linkedin-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.linkedin_profile.message}
              </p>
            )}
          </div>

          {/* Portfolio URL */}
          <div>
            <label htmlFor="portfolio_url" className="mb-1 block text-sm font-medium text-gray-700">
              Portfolio / Website
            </label>
            <input
              type="url"
              id="portfolio_url"
              inputMode="url"
              autoComplete="url"
              {...register('portfolio_url')}
              aria-invalid={!!errors.portfolio_url}
              aria-describedby={errors.portfolio_url ? 'portfolio-error' : undefined}
              className={`w-full rounded-lg border px-4 py-3 text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green ${
                errors.portfolio_url
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-brand-green'
              }`}
              placeholder="https://yourportfolio.com"
            />
            {errors.portfolio_url && (
              <p id="portfolio-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.portfolio_url.message}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      {/* Section 3: Application Materials */}
      <fieldset>
        <legend className="mb-4 text-lg font-semibold text-gray-900">
          Application Materials
        </legend>
        <div className="space-y-4">
          {/* Resume Upload */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Resume / CV <span className="text-red-500">*</span>
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  fileInputRef.current?.click()
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Upload resume. Drag and drop or click to browse. Accepted formats: PDF, DOC, DOCX. Maximum 5MB."
              className={`cursor-pointer rounded-lg border-2 border-dashed p-4 text-center transition-colors sm:p-8 ${
                isDragOver
                  ? 'border-brand-green bg-green-50'
                  : fileError
                    ? 'border-red-400 bg-red-50'
                    : selectedFile
                      ? 'border-brand-green bg-green-50'
                      : 'border-gray-300 hover:border-brand-green hover:bg-gray-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileInputChange}
                className="hidden"
                aria-hidden="true"
              />

              {selectedFile ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-brand-green">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile()
                    }}
                    className="text-sm font-medium text-red-600 underline hover:text-red-800"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-center">
                    <svg
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700">
                    <span className="font-semibold text-brand-green">Click to upload</span> or drag
                    and drop
                  </p>
                  <p className="text-sm text-gray-500">
                    PDF, DOC, or DOCX (max 5MB)
                  </p>
                </div>
              )}
            </div>
            {fileError && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {fileError}
              </p>
            )}
          </div>

          {/* Cover Letter */}
          <div>
            <label htmlFor="cover_letter" className="mb-1 block text-sm font-medium text-gray-700">
              Cover Letter
            </label>
            <textarea
              id="cover_letter"
              {...register('cover_letter')}
              rows={6}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 transition-colors focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green"
              placeholder="Tell us why you're a great fit for this position..."
            />
          </div>
        </div>
      </fieldset>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-lg bg-brand-green px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-brand-green-dark focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
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
            Submitting...
          </>
        ) : (
          'Submit Application'
        )}
      </button>
    </form>
  )
}
