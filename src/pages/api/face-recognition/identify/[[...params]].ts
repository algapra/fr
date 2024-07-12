import {
  Body,
  HttpCode,
  Post,
  Res,
} from 'next-api-decorators';
import { IdentifyFaceRequest } from './request';
import { type NextApiResponse } from 'next';
import { FRService } from '@/src/backend/infrastructure/face-recognition/face-recognition.service';
import { awaitToError } from '@/src/utils/await-to-error';
import { BaseHandler, enhancedHandler } from '@/src/utils/handler';

class IdentifyHandler extends BaseHandler {
  @Post('/')
  @HttpCode(200)
  async identify(@Body() body: IdentifyFaceRequest, @Res() res: NextApiResponse) {
    const [err, response] = await awaitToError(FRService.getService().identifyFace(body));
    if (err) {
      throw err
    }
    res.setHeader('Access-Control-Allow-Origin', '*');

    return response;
  }
}

export default enhancedHandler(IdentifyHandler);
