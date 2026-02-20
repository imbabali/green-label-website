import type { ReactNode } from 'react'

interface CardGridProps {
  children: ReactNode
  columns?: 2 | 3 | 4
}

const columnClasses: Record<2 | 3 | 4, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
}

export default function CardGrid({ children, columns = 3 }: CardGridProps) {
  return (
    <div className={`grid grid-cols-1 gap-6 scroll-animate ${columnClasses[columns]}`}>
      {children}
    </div>
  )
}
