'use client'

import { useScrollReveal } from '@/lib/hooks/useScrollReveal'
import type { ReactNode } from 'react'

interface ScrollRevealSectionProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section'
}

export default function ScrollRevealSection({
  children,
  className = '',
  as: Tag = 'div',
}: ScrollRevealSectionProps) {
  const ref = useScrollReveal()

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
