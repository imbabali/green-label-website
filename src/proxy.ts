import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

// Routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/reviews/create',
  '/reviews/my-reviews',
]

// Pattern for dynamic protected routes like /reviews/*/edit
const protectedPatterns = [/^\/reviews\/[^/]+\/edit$/]

// Routes that authenticated users should be redirected away from
const authRoutes = ['/login', '/register']

function isProtectedRoute(pathname: string): boolean {
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    return true
  }
  return protectedPatterns.some((pattern) => pattern.test(pathname))
}

function isAuthRoute(pathname: string): boolean {
  return authRoutes.some((route) => pathname.startsWith(route))
}

export async function proxy(request: NextRequest) {
  // Refresh the session via updateSession
  const response = await updateSession(request)

  const { pathname } = request.nextUrl

  // Check if this route needs auth handling
  const isProtected = isProtectedRoute(pathname)
  const isAuth = isAuthRoute(pathname)

  if (!isProtected && !isAuth) {
    return response
  }

  // Create a Supabase client to check the user session
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Redirect unauthenticated users away from protected routes
  if (isProtected && !user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect authenticated users away from auth routes
  if (isAuth && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Public assets (svg, png, jpg, jpeg, gif, webp, ico)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
