import { Body, HttpCode, Post, Res } from 'next-api-decorators';
import {
  PaymentMidtransCallbackRequest,
  PaymentMidtransRequest,
} from './request';
import { SessionGuard } from '@/src/backend/middlewares/api/decorators/SessionGuard';
import { PaymentService } from '@/src/backend/domains/payment.service';
import { COOKIE_SESSION_NAME } from '@/src/constants/auth';
import { type NextApiResponse } from 'next';
import { BaseHandler, enhancedHandler } from '@/src/utils/handler';

class PaymentMidtransHandler extends BaseHandler {
  @Post('/tokenizer')
  @HttpCode(200)
  @SessionGuard()
  create(@Body() body: PaymentMidtransRequest) {
    return PaymentService.getService().createPayment(body);
  }

  @Post('/callback')
  @HttpCode(200)
  @SessionGuard()
  async callback(
    @Body() body: PaymentMidtransCallbackRequest,
    @Res() res: NextApiResponse,
  ) {
    const response = await PaymentService.getService().callbackHandler(body);
    res.setHeader(
      'Set-Cookie',
      `${COOKIE_SESSION_NAME}=${response.updatedUser}; Path=/; HttpOnly`,
    );

    return { status: response.status };
  }
}

export default enhancedHandler(PaymentMidtransHandler);
