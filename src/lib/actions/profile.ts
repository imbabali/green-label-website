'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const profileSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().optional().default(''),
  bio: z.string().max(500).optional().default(''),
  date_of_birth: z.string().optional().default(''),
  phone: z.string().optional().default(''),
  location: z.string().optional().default(''),
})

export type ProfileFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function updateProfile(
  _prevState: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const raw = Object.fromEntries(formData.entries())
  const photoFile = formData.get('photo') as File | null
  const parsed = profileSchema.safeParse(raw)

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
      redirect('/login')
    }

    let photoUrl: string | undefined

    if (photoFile && photoFile.size > 0) {
      if (photoFile.size > 2 * 1024 * 1024) {
        return {
          success: false,
          message: 'Photo must be less than 2MB.',
          errors: { photo: ['Photo must be less than 2MB'] },
        }
      }

      if (!photoFile.type.startsWith('image/')) {
        return {
          success: false,
          message: 'File must be an image.',
          errors: { photo: ['File must be an image'] },
        }
      }

      const allowedExts = ['jpg', 'jpeg', 'png', 'webp', 'avif']
      const ext = photoFile.name.split('.').pop()?.toLowerCase()
      if (!ext || !allowedExts.includes(ext)) {
        return { success: false, message: 'Invalid image format. Accepted: JPG, PNG, WebP, AVIF.' }
      }
      const fileName = `${user.id}/avatar.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, photoFile, {
          contentType: photoFile.type,
          upsert: true,
        })

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(fileName)
      photoUrl = urlData.publicUrl
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: data.first_name,
        last_name: data.last_name || null,
        bio: data.bio || null,
        date_of_birth: data.date_of_birth || null,
        phone: data.phone || null,
        location: data.location || null,
        ...(photoUrl && { photo_url: photoUrl }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (error) throw error

    return { success: true, message: 'Profile updated successfully!' }
  } catch (error) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') throw error
    console.error('Profile update error:', error)
    return { success: false, message: 'Error updating your profile. Please try again.' }
  }
}
