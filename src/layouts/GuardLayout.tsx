import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import BlankLayout from '../@core/layouts/BlankLayout';
import UserLayout from './UserLayout';
import GuestGuard from '../@core/components/auth/GuestGuard';
import AuthGuard from '../@core/components/auth/AuthGuard';
import AclGuard from '../@core/components/auth/AclGuard';
import Spinner from 'src/@core/components/spinner';

import { defaultACLObj } from '../configs/acl';

type GuardProps = {
  authGuard: boolean;
  guestGuard: boolean;
  children: ReactNode;
};

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>;
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>;
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>;
  }
};

export const GuardLayout: FC<PropsWithChildren> = ({ children }) => {
  const aclAbilities = defaultACLObj;
  const pathname = usePathname();
  const auth = useAuth();
  const authGuard = auth.user !== null;
  const guestGuard = auth.user === null;

  const pathsToInclude = [
    '/login',
    '/register',
    '/forgot-password',
    '/404',
    '/recognize',
    '/pricing/pricing-plans',
    '/pricing/subscription-payments',
    '/pricing/pending-payments',
    '/midtrans/callback',
    '/internal'
  ];

  return (
    <Guard authGuard={authGuard} guestGuard={guestGuard}>
      <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard}>
        {pathsToInclude.some(path => pathname?.includes(path)) ? (
          <BlankLayout>{children}</BlankLayout>
        ) : (
          <UserLayout>{children}</UserLayout>
        )}
      </AclGuard>
    </Guard>
  );
};
