'use client'

import type { ReactNode, ReactElement } from 'react'
import { Children } from 'react'
import ScrollRevealSection from '@/components/shared/ScrollRevealSection'

interface CardGridProps {
  children: ReactNode
  columns?: 2 | 3 | 4
}

const desktopCols: Record<2 | 3 | 4, string> = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
}

export default function CardGrid({ children, columns = 3 }: CardGridProps) {
  return (
    <ScrollRevealSection>
      <div className={`flex gap-4 overflow-x-auto pb-2 hide-scrollbar snap-x snap-mandatory lg:grid lg:overflow-visible lg:pb-0 md:gap-6 ${desktopCols[columns]}`}>
        {Children.map(children, (child, index) => (
          <div className={`min-w-[70vw] shrink-0 snap-start sm:min-w-[45vw] lg:min-w-0 lg:shrink reveal reveal-up stagger-${Math.min(index + 1, 6)}`}>
            {child as ReactElement}
          </div>
        ))}
      </div>
    </ScrollRevealSection>
  )
}
