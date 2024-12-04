import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { pb } from './lib/pocketbase'

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === '/auth/login' || path === '/auth/signup' || path === '/'

  // Check if user is authenticated
  const isAuth = pb.authStore.isValid

  // Redirect authenticated users away from auth pages
  if (isPublicPath && isAuth) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect unauthenticated users to login
  if (!isPublicPath && !isAuth) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}