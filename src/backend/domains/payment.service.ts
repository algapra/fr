import {
  PaymentMidtransCallbackRequest,
  PaymentMidtransRequest,
} from 'src/pages/api/payment/midtrans/request';
import { awaitToError } from 'src/utils/await-to-error';
import { MidtransService } from 'src/backend/infrastructure/midtrans/midtrans.service';
import { UnprocessableEntityException } from 'next-api-decorators';
import { RequestContext } from 'src/backend/request-context/request-context';
import { PaymentGatewayData } from 'src/backend/models/payment-gateway';
import { CompanyRepository } from 'src/backend/infrastructure/database/company/company.repository';
import { TransactionRepository } from 'src/backend/infrastructure/database/transaction/transaction.repository';
import {
  PaymentGateway,
  TransactionStatus,
} from 'src/backend/infrastructure/database/transaction/transaction.entity';
import { UserService } from './user.service';
import { encode } from '@/src/utils/jwt';

export class PaymentService {
  public static readonly service: PaymentService = new PaymentService();
  static getService(): PaymentService {
    return PaymentService.service;
  }

  async createPayment(createTransactionTokenRequest: PaymentMidtransRequest) {
    const fourRandomNumber = Math.floor(1000 + Math.random() * 9000);
    const id = `TRX-${fourRandomNumber}-${new Date().getTime()}`;
    const [err, response] = await awaitToError(
      MidtransService.getService().createTransaction({
        id,
        price: createTransactionTokenRequest.price,
        quantity: createTransactionTokenRequest.quantity,
      }),
    );
    if (err) {
      throw new UnprocessableEntityException(err.message);
    }

    const user = RequestContext.getContext().user;
    const paymentGatewayData: PaymentGatewayData = {
      Midtrans: {
        token: response?.token as string,
        redirect_url: response?.redirect_url as string,
      },
    };
    await Promise.all([
      TransactionRepository.getRepository().insert({
        company: user?.company,
        invoice: id,
        item: createTransactionTokenRequest.name,
        amount:
          createTransactionTokenRequest.price *
          createTransactionTokenRequest.quantity,
        status: TransactionStatus.PENDING,
        paymentMethod: 'bank-transfer',
        paymentGateway: PaymentGateway.MIDTRANS,
        paymentGatewayData: JSON.stringify(
          paymentGatewayData,
        ) as unknown as PaymentGatewayData,
      }),
    ]);

    return {
      token: response?.token,
      redirect_url: response?.redirect_url,
    };
  }

  async callbackHandler(callbackRequest: PaymentMidtransCallbackRequest) {
    if (
      callbackRequest.status !== 'settlement' ||
      callbackRequest.statusCode !== '200'
    ) {
      throw new UnprocessableEntityException('Transaction Failed');
    }
    const user = RequestContext.getContext().user;
    const transaction = await TransactionRepository.getRepository().findOne({
      where: {
        company: {
          id: user?.company.id,
        },
        status: TransactionStatus.PENDING,
        paymentGateway: PaymentGateway.MIDTRANS,
        invoice: callbackRequest.invoiceId,
      },
    });

    if (!transaction) {
      throw new UnprocessableEntityException('Transaction not found');
    }

    let transactionStatus: any = null;
    if (!callbackRequest.simulation) {
      const [err, response] = await awaitToError(
        MidtransService.getService().getTransactionStatus(transaction.invoice),
      );
      if (err) {
        throw new UnprocessableEntityException(err.message);
      }
      transactionStatus = response?.status;
    } else {
      transactionStatus = 'success';
    }

    await Promise.all([
      CompanyRepository.getRepository().update(
        {
          id: user?.company.id,
        },
        {
          plan: transaction.item,
        },
      ),
      TransactionRepository.getRepository().update(
        {
          id: transaction.id,
        },
        {
          status: TransactionStatus.SUCCESS,
        },
      ),
    ]);

    // must return encoded updated user data
    const u = await UserService.getService().getUserDataById(
      user?.id as string,
    );
    const updatedUser = await encode(u);

    return {
      status: transactionStatus,
      updatedUser,
    };
  }
}
