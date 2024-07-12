'use client';

import { CallbackDisplay } from '@/src/components/payment/CallbackDisplay';
import { UserDataType } from '@/src/context/types';
import { useAuth } from '@/src/hooks/useAuth';
import { usePayment } from '@/src/hooks/usePayment';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const MidtransCallbackHandler = () => {
  const params = useSearchParams();
  const { ferifyPayment } = usePayment();
  const router = useRouter();
  const { me, setUser } = useAuth();

  useEffect(() => {
    const orderId = params?.get('order_id');
    const transactionStatus = params?.get('transaction_status');
    const statusCode = params?.get('status_code');
    if (!orderId || !transactionStatus) {
      return;
    }
    ferifyPayment({
      invoiceId: orderId,
      status: transactionStatus,
      statusCode: statusCode as string,
    })
      .then(() => me())
      .then(data =>
        setUser({ company: { plan: data.company.plan } } as UserDataType),
      )
      .finally(() => {
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return <CallbackDisplay />;
};

export default MidtransCallbackHandler;
