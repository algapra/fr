import {
  Body,
  HttpCode,
  Param,
  Post,
} from 'next-api-decorators';
import { ExistanceCheckRequest } from './request';
import { UserService } from '@/src/backend/domains/user.service';
import { BaseHandler, enhancedHandler } from '@/src/utils/handler';

class UserRequestHandler extends BaseHandler {
  @Post('/:param/exists')
  @HttpCode(200)
  create(@Body() body: ExistanceCheckRequest, @Param('param') param: string) {
    return UserService.getService().checkExistance(param, body);
  }
}

export default enhancedHandler(UserRequestHandler);
