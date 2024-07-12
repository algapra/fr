import { Generic } from '@/@types/generic';
import { request } from '../hooks/useRequest';

export interface Payment extends Generic {
  token: string;
  redirect_url: string;
}

export interface PaymentInfo {
  plan: string;
  price: number;
  quantity: number;
}

export const createPayment = async ({ plan, price, quantity }: PaymentInfo) => {
  const paymentInfo = {
    name: plan.toUpperCase(),
    price,
    quantity,
  };

  const response = await request.post<Payment>(
    `/payment/midtrans/tokenizer`,
    paymentInfo,
  );

  return response;
};

export const verifyPayment = async ({
  invoiceId,
  status,
  statusCode,
  simulation,
}: {
  invoiceId: string;
  status: string;
  statusCode: string;
  simulation?: boolean;
}) => {
  const response = await request.post(`/payment/midtrans/callback`, {
    invoiceId,
    status,
    statusCode,
    simulation,
  });

  return response;
};
