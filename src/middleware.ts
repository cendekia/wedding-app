import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // If the path starts with /admin, check for admin token
  if (path.startsWith('/admin')) {
    const token = request.cookies.get('admin_token');

    // Redirect to login if no token exists
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Configure the paths that middleware should run on
export const config = {
  matcher: [
    // Match all admin routes
    '/admin/:path*',
  ],
}; 