// import { getCookie } from 'typescript-cookie'
import { NextRequest, NextResponse } from 'next/server';

// Sample middleware to redirect from / -> /home
export function middleware(request: NextRequest) {
  const currentUrl = request.nextUrl.clone();
  const isLoggin = request.cookies?.get('logged_in')?.value;
  // Protected Pages
  if (
    isLoggin === undefined &&
    (['/', '/report/main', '/auth/change_password'].lastIndexOf(
      currentUrl.pathname
    ) > -1 ||
      currentUrl.pathname.lastIndexOf('/report') > -1)
  ) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  return NextResponse.next();
}
