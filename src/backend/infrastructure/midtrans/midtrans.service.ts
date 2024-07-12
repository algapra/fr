import { config } from '@/config';
import * as Midtrans from 'midtrans-client';
import { CreateTransactionRequest } from 'src/backend/models/midtrans';

export class MidtransService {
  static service = new MidtransService();
  static getService = () => MidtransService.service;
  static snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: config.midtrans.serverKey as string,
    clientKey: config.midtrans.clientKey as string,
  });

  async createTransaction(
    createTransactionTokenRequest: CreateTransactionRequest,
  ) {
    return MidtransService.snap.createTransaction({
      transaction_details: {
        order_id: createTransactionTokenRequest.id,
        gross_amount:
          createTransactionTokenRequest.price *
          createTransactionTokenRequest.quantity,
      },
      credit_card: {
        secure: true,
      },
      callbacks: {
        finish: config.midtrans.callbackUrl,
      },
    });
  }

  async getTransactionStatus(transactionId: string) {
    return MidtransService.snap.transaction.status(transactionId);
  }
}
