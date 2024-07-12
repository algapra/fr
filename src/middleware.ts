import type { NextRequest } from 'next/server';
import { authMiddleware } from './backend/middlewares/handlers/authentication';

// This function can be marked `async` if using `await` inside
export const middleware = (request: NextRequest) => authMiddleware(request);

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (assets files on images folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};
