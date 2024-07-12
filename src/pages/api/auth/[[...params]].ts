import {
  Body,
  Get,
  HttpCode,
  Post,
  Res,
} from 'next-api-decorators';
import { LoginRequest, RegisterRequest } from './request';
import { UserService } from '@/src/backend/domains/user.service';
import { type NextApiResponse } from 'next';
import { SessionGuard } from '@/src/backend/middlewares/api/decorators/SessionGuard';
import { COOKIE_SESSION_NAME } from 'src/constants/auth';
import { RequestContext } from '@/src/backend/request-context/request-context';
import { BaseHandler, enhancedHandler } from '@/src/utils/handler';

class AuthHandler extends BaseHandler {
  @Post('/login')
  @HttpCode(200)
  async login(@Body() body: LoginRequest, @Res() res: NextApiResponse) {
    const response = await UserService.getService().login(body);
    res.setHeader(
      'Set-Cookie',
      `${COOKIE_SESSION_NAME}=${response.token}; Path=/; HttpOnly`,
    );

    return response;
  }

  @Post('/register')
  @HttpCode(200)
  async register(@Body() body: RegisterRequest) {
    const response = await UserService.getService().register(body);

    return response;
  }

  @Get('/me')
  @SessionGuard()
  @HttpCode(200)
  async me() {
    const { user } = RequestContext.getContext();

    return user;
  }

  @Post('/logout')
  @SessionGuard()
  @HttpCode(200)
  async logout(@Res() res: NextApiResponse) {
    RequestContext.setContext({ user: null });
    res.setHeader('Set-Cookie', `${COOKIE_SESSION_NAME}=; Path=/; HttpOnly`);

    return { message: 'Logout success' };
  }
}

export default enhancedHandler(AuthHandler);
