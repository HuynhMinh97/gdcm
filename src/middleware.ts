// import { getCookie } from 'typescript-cookie'
import { NextRequest, NextResponse } from 'next/server';

// Sample middleware to redirect from / -> /home
export function middleware(request: NextRequest) {
  const currentUrl = request.nextUrl.clone();
  const isLoggin = request.cookies?.get('logged_in')?.value;
  console.log('middleware', isLoggin);
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
  // Not Protected Pages
  // if (
  //   isLoggin &&
  //   [
  //     '/',
  //     '/auth/login',
  //     '/auth/forgot_password',
  //     '/auth/reset_password'
  //   ].lastIndexOf(currentUrl.pathname) > -1
  // ) {
  //   return NextResponse.redirect(new URL('/report/main', request.url));
  // }
  return NextResponse.next();
}
