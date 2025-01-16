import { NextResponse } from 'next/server';

export function middleware(request) {
  const authTokens = request.cookies.get("auth")?.value;

  if (request.nextUrl.pathname.startsWith("/pages") && !authTokens) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  
  if (authTokens && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/pages', request.url));
  }

  
  if (authTokens && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/pages', request.url));
  }

  const response = NextResponse.next()

}

export const config = {
  matcher: ['/pages(.*)', '/'],
}