'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(30, 'Username must be less than 30 characters')
      .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    first_name: z.string().min(1, 'First name is required'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email')
      .transform((v) => v.toLowerCase().trim()),
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

const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

export type AuthFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function signUp(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const raw = Object.fromEntries(formData.entries())
  const parsed = signUpSchema.safeParse(raw)

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

    const { data: existingUsername } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', data.username)
      .single()

    if (existingUsername) {
      return {
        success: false,
        message: 'Username is already taken.',
        errors: { username: ['This username is already taken'] },
      }
    }

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          username: data.username,
          first_name: data.first_name,
        },
      },
    })

    if (error) {
      if (error.message.includes('already registered')) {
        return {
          success: false,
          message: 'This email is already registered.',
          errors: { email: ['This email is already registered'] },
        }
      }
      throw error
    }

    redirect('/login?registered=true')
  } catch (error) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') throw error
    console.error('Sign up error:', error)
    return { success: false, message: 'Something went wrong. Please try again.' }
  }
}

export async function signIn(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const raw = Object.fromEntries(formData.entries())
  const parsed = signInSchema.safeParse(raw)

  if (!parsed.success) {
    return {
      success: false,
      message: 'Please enter your email and password.',
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const data = parsed.data

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      return { success: false, message: 'Invalid email or password.' }
    }

    redirect('/dashboard')
  } catch (error) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') throw error
    console.error('Sign in error:', error)
    return { success: false, message: 'Something went wrong. Please try again.' }
  }
}

export async function signOut(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
