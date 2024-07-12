// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react';

// ** Next Import
import { useRouter, usePathname } from 'next/navigation';

// ** Hooks Import
import { useAuth } from '@/src/hooks/useAuth';

interface GuestGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props;

  return <>{children}</>;
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      auth.user === null &&
      pathname !== '/register' &&
      pathname !== '/pricing/pricing-plans' &&
      pathname !== '/pricing/subscription-payments' &&
      pathname !== '/pricing/pending-payments'
    ) {
      router.replace('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  if (auth.user !== null) {
    return fallback;
  }

  return <>{children}</>;
};

export default GuestGuard;
