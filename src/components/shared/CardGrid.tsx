'use client'

import type { ReactNode, ReactElement } from 'react'
import { Children } from 'react'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'

interface CardGridProps {
  children: ReactNode
  columns?: 2 | 3 | 4
}

const columnClasses: Record<2 | 3 | 4, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
}

export default function CardGrid({ children, columns = 3 }: CardGridProps) {
  return (
    <ScrollRevealSection>
      <div className={`grid gap-4 md:gap-6 ${columnClasses[columns]}`}>
        {Children.map(children, (child, index) => (
          <div className={`reveal reveal-up stagger-${Math.min(index + 1, 6)}`}>
            {child as ReactElement}
          </div>
        ))}
      </div>
    </ScrollRevealSection>
  )
}
