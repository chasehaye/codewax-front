import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/c', '/projects', '/projects/add'];

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = pathname.startsWith('/auth');

  if (!token && isProtected) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/prompt', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};
