'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const reviewSchema = z.object({
  service_type: z.string().min(1, 'Service type is required'),
  service_name: z
    .string()
    .min(1, 'Service name is required')
    .transform((v) =>
      v
        .trim()
        .replace(/\s+/g, ' ')
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ')
    ),
  title: z.string().min(1, 'Review title is required').max(200),
  overall_rating: z.coerce.number().min(1, 'Rating is required').max(5),
  quality_rating: z.coerce.number().min(1).max(5),
  value_rating: z.coerce.number().min(1).max(5),
  customer_service_rating: z.coerce.number().min(1).max(5),
  comment: z.string().min(10, 'Please write at least 10 characters').max(2000),
  would_recommend: z.coerce.boolean().default(true),
})

export type ReviewFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function createReview(
  _prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  const raw = Object.fromEntries(formData.entries())
  const parsed = reviewSchema.safeParse(raw)

  if (!parsed.success) {
    return {
      success: false,
      message: 'Please fix the errors below.',
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const data = parsed.data

  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, message: 'You must be logged in to create a review.' }
    }

    const { data: review, error } = await supabase
      .from('reviews')
      .insert({
        user_id: user.id,
        service_type: data.service_type,
        service_name: data.service_name,
        title: data.title,
        overall_rating: data.overall_rating,
        quality_rating: data.quality_rating,
        value_rating: data.value_rating,
        customer_service_rating: data.customer_service_rating,
        comment: data.comment,
        would_recommend: data.would_recommend,
      })
      .select('id')
      .single()

    if (error) {
      if (error.code === '23505') {
        return {
          success: false,
          message: 'You have already reviewed this service. Please edit your existing review.',
        }
      }
      throw error
    }

    redirect(`/reviews/${review.id}`)
  } catch (error) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') throw error
    console.error('Review creation error:', error)
    return { success: false, message: 'Something went wrong. Please try again.' }
  }
}

export async function updateReview(
  _prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  const reviewId = formData.get('review_id') as string
  const raw = Object.fromEntries(formData.entries())
  const parsed = reviewSchema.safeParse(raw)

  if (!parsed.success) {
    return {
      success: false,
      message: 'Please fix the errors below.',
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const data = parsed.data

  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, message: 'You must be logged in.' }
    }

    const { error } = await supabase
      .from('reviews')
      .update({
        service_type: data.service_type,
        service_name: data.service_name,
        title: data.title,
        overall_rating: data.overall_rating,
        quality_rating: data.quality_rating,
        value_rating: data.value_rating,
        customer_service_rating: data.customer_service_rating,
        comment: data.comment,
        would_recommend: data.would_recommend,
      })
      .eq('id', reviewId)
      .eq('user_id', user.id)

    if (error) throw error

    redirect(`/reviews/${reviewId}`)
  } catch (error) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') throw error
    console.error('Review update error:', error)
    return { success: false, message: 'Something went wrong. Please try again.' }
  }
}

export async function deleteReview(reviewId: string): Promise<ReviewFormState> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, message: 'You must be logged in.' }
    }

    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId)
      .eq('user_id', user.id)

    if (error) throw error

    redirect('/reviews')
  } catch (error) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') throw error
    console.error('Review deletion error:', error)
    return { success: false, message: 'Something went wrong. Please try again.' }
  }
}
