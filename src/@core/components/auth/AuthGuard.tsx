// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react';

// ** Next Import
import { useRouter, usePathname } from 'next/navigation';

// ** Hooks Import
import { useAuth } from '@/src/hooks/useAuth';

interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props;

  return <>{children}</>;
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const mustRouteToHomeWhenAuthenticated = ['/login', '/register'];
  const allowedForGuest = ['/login', '/register', '/recognize'];

  useEffect(
    () => {
      if (auth.user === null) {
        if (allowedForGuest.includes(pathname as string)) {
          return;
        }

        return router.replace('/login');
      } else {
        if (mustRouteToHomeWhenAuthenticated.includes(pathname as string)) {
          return router.replace('/dashboard');
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, auth.user],
  );

  if (auth.user === null) {
    return fallback;
  }

  return <>{children}</>;
};

export default AuthGuard;
