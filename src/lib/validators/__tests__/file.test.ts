import { describe, it, expect } from 'vitest'
import { validateResumeFile, validateImageFile } from '../file'

function createMockFile(name: string, size: number, type: string): File {
  const blob = new Blob(['x'.repeat(size)], { type })
  return new File([blob], name, { type })
}

describe('validateResumeFile', () => {
  it('accepts a valid PDF file', () => {
    const file = createMockFile('resume.pdf', 1024, 'application/pdf')
    const result = validateResumeFile(file)
    expect(result.valid).toBe(true)
    expect(result.error).toBeUndefined()
  })

  it('accepts a valid DOC file', () => {
    const file = createMockFile('resume.doc', 1024, 'application/msword')
    const result = validateResumeFile(file)
    expect(result.valid).toBe(true)
    expect(result.error).toBeUndefined()
  })

  it('accepts a valid DOCX file', () => {
    const file = createMockFile(
      'resume.docx',
      1024,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )
    const result = validateResumeFile(file)
    expect(result.valid).toBe(true)
    expect(result.error).toBeUndefined()
  })

  it('rejects files larger than 5MB', () => {
    const file = createMockFile('resume.pdf', 6 * 1024 * 1024, 'application/pdf')
    const result = validateResumeFile(file)
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/5MB/)
  })

  it('rejects files with invalid extensions', () => {
    const file = createMockFile('resume.txt', 1024, 'text/plain')
    const result = validateResumeFile(file)
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/PDF, DOC, or DOCX/)
  })

  it('rejects files with invalid MIME type but valid extension', () => {
    const file = createMockFile('resume.pdf', 1024, 'text/plain')
    const result = validateResumeFile(file)
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/Invalid file type/)
  })

  it('accepts a file at exactly 5MB', () => {
    const file = createMockFile('resume.pdf', 5 * 1024 * 1024, 'application/pdf')
    const result = validateResumeFile(file)
    expect(result.valid).toBe(true)
  })

  it('rejects files with executable extensions', () => {
    const file = createMockFile('malware.exe', 1024, 'application/pdf')
    const result = validateResumeFile(file)
    expect(result.valid).toBe(false)
  })
})

describe('validateImageFile', () => {
  it('accepts a valid image file', () => {
    const file = createMockFile('photo.jpg', 1024, 'image/jpeg')
    const result = validateImageFile(file)
    expect(result.valid).toBe(true)
    expect(result.error).toBeUndefined()
  })

  it('accepts PNG images', () => {
    const file = createMockFile('photo.png', 1024, 'image/png')
    const result = validateImageFile(file)
    expect(result.valid).toBe(true)
  })

  it('rejects files larger than default 2MB', () => {
    const file = createMockFile('photo.jpg', 3 * 1024 * 1024, 'image/jpeg')
    const result = validateImageFile(file)
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/2MB/)
  })

  it('respects custom max size', () => {
    const file = createMockFile('photo.jpg', 3 * 1024 * 1024, 'image/jpeg')
    const result = validateImageFile(file, 5 * 1024 * 1024)
    expect(result.valid).toBe(true)
  })

  it('rejects non-image files', () => {
    const file = createMockFile('document.pdf', 1024, 'application/pdf')
    const result = validateImageFile(file)
    expect(result.valid).toBe(false)
    expect(result.error).toMatch(/image/)
  })
})
