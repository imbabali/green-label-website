interface GradientOrbProps {
  color?: 'green' | 'orange'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function GradientOrb({ color = 'green', size = 'md', className = '' }: GradientOrbProps) {
  const sizeClasses = { sm: 'h-32 w-32', md: 'h-64 w-64', lg: 'h-96 w-96' }
  const bgClasses = {
    green: 'bg-brand-green/15',
    orange: 'bg-brand-orange/15',
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${sizeClasses[size]} ${bgClasses[color]} ${className}`}
    />
  )
}

interface WaveDividerProps {
  color?: string
  flip?: boolean
  className?: string
}

export function WaveDivider({ color = '#ffffff', flip = false, className = '' }: WaveDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 w-full overflow-hidden ${flip ? 'top-0 rotate-180' : 'bottom-0'} ${className}`}
      style={{ height: '48px' }}
    >
      <svg
        viewBox="0 0 1440 48"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <path
          d="M0,24 C360,0 720,48 1080,24 C1260,12 1380,18 1440,24 L1440,48 L0,48 Z"
          fill={color}
        />
      </svg>
    </div>
  )
}

export function DotPattern({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 pattern-dots ${className}`}
    />
  )
}
