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
  const count = Children.count(children)
  // >4 items: 3 cols on mobile/tablet, ≤4 items: 2 cols
  const mobileCols = count > 4 ? 'grid-cols-3' : 'grid-cols-2'

  return (
    <ScrollRevealSection>
      <div className={`grid ${mobileCols} gap-3 md:gap-6 ${desktopCols[columns]}`}>
        {Children.map(children, (child, index) => (
          <div className={`reveal reveal-up stagger-${Math.min(index + 1, 6)}`}>
            {child as ReactElement}
          </div>
        ))}
      </div>
    </ScrollRevealSection>
  )
}
