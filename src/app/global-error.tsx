'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f9fafb',
            padding: '1rem',
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#166534' }}>
            Oops!
          </h1>
          <h2 style={{ marginTop: '1rem', fontSize: '1.5rem', color: '#1f2937' }}>
            Something went wrong
          </h2>
          <p style={{ marginTop: '0.5rem', color: '#6b7280', maxWidth: '28rem' }}>
            We apologize for the inconvenience. Please try again or contact us if
            the problem persists.
          </p>
          {error.digest && (
            <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#9ca3af' }}>
              Error ID: {error.digest}
            </p>
          )}
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button
              onClick={reset}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#15803d',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              Try Again
            </button>
            <a
              href="/"
              style={{
                padding: '0.75rem 1.5rem',
                border: '1px solid #15803d',
                color: '#15803d',
                borderRadius: '0.5rem',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '1rem',
              }}
            >
              Go Home
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
