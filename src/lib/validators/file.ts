const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_RESUME_EXTENSIONS = ['.pdf', '.doc', '.docx']
const ALLOWED_RESUME_MIMES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export function validateResumeFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'Resume file is required' }
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'Resume must be less than 5MB' }
  }

  const extension = '.' + file.name.split('.').pop()?.toLowerCase()
  if (!ALLOWED_RESUME_EXTENSIONS.includes(extension)) {
    return { valid: false, error: 'Resume must be a PDF, DOC, or DOCX file' }
  }

  if (!ALLOWED_RESUME_MIMES.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Please upload a PDF, DOC, or DOCX file' }
  }

  return { valid: true }
}

export function validateImageFile(file: File, maxSize = 2 * 1024 * 1024): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'Image file is required' }
  }

  if (file.size > maxSize) {
    return { valid: false, error: `Image must be less than ${maxSize / (1024 * 1024)}MB` }
  }

  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'File must be an image' }
  }

  return { valid: true }
}
