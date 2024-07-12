import {
  Body,
  HttpCode,
  Post,
  Res,
} from 'next-api-decorators';
import { RegisterFaceRequest } from './request';
import { type NextApiResponse } from 'next';
import { FRService } from '@/src/backend/infrastructure/face-recognition/face-recognition.service';
import { awaitToError } from '@/src/utils/await-to-error';
import { BaseHandler, enhancedHandler } from '@/src/utils/handler';

class RegisterHandler extends BaseHandler {
  @Post('/')
  @HttpCode(200)
  async register(@Body() body: RegisterFaceRequest, @Res() res: NextApiResponse) {
    const [err, response] = await awaitToError(FRService.getService().registerFace(body));
    
    if (err) {
      throw err
    }
    res.setHeader('Access-Control-Allow-Origin', '*');

    return response;
  }
}

export default enhancedHandler(RegisterHandler);
