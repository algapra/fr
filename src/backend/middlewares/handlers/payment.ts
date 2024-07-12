import { COOKIE_SESSION_NAME } from '@/src/constants/auth';
import { NextRequest, NextResponse } from 'next/server';
import { validate } from '@/src/utils/jwt';
import { UserEntity } from '../../infrastructure/database/user/user.entity';
import { Profile } from '../../models/profile';
import { config } from '@/config';

export const paymentMiddleware = async (request: NextRequest) => {
  const shouldRedirectWhenPaid = [
    '/pricing/pricing-plans',
    '/pricing/subscription-payments',
    '/midtrans/callback',
  ];
  const allowedPaths = ['/midtrans/callback'];
  const simulatorPaths = ['/internal/simulator/midtrans'];
  const whiteListedPaths = [...allowedPaths, ...simulatorPaths];
  const appIsProduction = config.appEnv === 'production';

  if (!appIsProduction && simulatorPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const authSession = request.cookies.get(COOKIE_SESSION_NAME)?.value;
  if (!authSession) {
    return NextResponse.next();
  }

  const { payload } = await validate<UserEntity<Profile>>(
    authSession as string,
  );

  if (shouldRedirectWhenPaid.includes(request.nextUrl.pathname)) {
    if (payload.company.plan) {
      return NextResponse.redirect(new URL('/dashboard', request.url).href);
    }
  } else if (
    !payload.company.plan &&
    whiteListedPaths.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.next();
  } else if (
    !payload.company.plan &&
    !shouldRedirectWhenPaid.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(
      new URL('/pricing/pricing-plans', request.url).href,
    );
  }

  return NextResponse.next();
};
