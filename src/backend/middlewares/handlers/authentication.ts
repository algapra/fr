import { COOKIE_SESSION_NAME } from '@/src/constants/auth';
import { NextRequest, NextResponse } from 'next/server';
import { paymentMiddleware } from './payment';

export const authMiddleware = async (request: NextRequest) => {
  const canAccessWithoutAuth = ['/login', '/register'];
  const canAccessWithOrWithoutAuth = ['/recognize'];
  const authSession = request.cookies.get(COOKIE_SESSION_NAME)?.value;
  const requestUrl = request.nextUrl.pathname;

  if (canAccessWithOrWithoutAuth.includes(requestUrl)) {
    return NextResponse.next();
  } else if (!authSession && !canAccessWithoutAuth.includes(requestUrl)) {
    return NextResponse.redirect(new URL('/login', request.url).href);
  } else if (authSession && canAccessWithoutAuth.includes(requestUrl)) {
    return NextResponse.redirect(new URL('/dashboard', request.url).href);
  }

  // redirect to dashboard if user is authenticated and trying to access home
  if (authSession && requestUrl === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url).href);
  }

  if (!authSession) {
    return NextResponse.next();
  }

  return paymentMiddleware(request);
};
