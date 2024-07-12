import { useState } from 'react';
import { createPayment, verifyPayment } from '../services/payment';
import { awaitToError } from '../utils/await-to-error';

export const usePayment = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<any | null>(null);

  const handleSubscription = async ({
    plan,
    price,
    quantity,
  }: {
    plan: string;
    price: number;
    quantity: number;
  }) => {
    setIsLoading(true);
    const [err, pay] = await awaitToError(
      createPayment({
        plan: plan.toUpperCase(),
        price,
        quantity,
      }),
    );
    setIsLoading(false);
    if (err) setError(err.message);

    window.snap.pay(pay?.data.token);
  };

  const ferifyPayment = async (data: {
    invoiceId: string;
    status: string;
    statusCode: string;
    simulation?: boolean;
  }) => {
    setIsLoading(true);
    const res = await awaitToError(verifyPayment(data));
    setIsLoading(false);

    return res;
  };

  return {
    error,
    isLoading,
    payment: data,
    setPayment: setData,
    handleSubscription,
    ferifyPayment,
  };
};
