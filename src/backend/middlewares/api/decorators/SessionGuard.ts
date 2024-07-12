import { NextApiRequest, NextApiResponse } from 'next';
import { NextFunction, createMiddlewareDecorator } from 'next-api-decorators';
import { UserService } from '../../../domains/user.service';
import { COOKIE_SESSION_NAME } from '@/src/constants/auth';
import { RequestContext } from '../../../request-context/request-context';

export const SessionGuard = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const session = req.cookies[COOKIE_SESSION_NAME];
    if (!session) {
      res.status(401).json({ message: 'Unauthorized' });

      return;
    }

    const user = await UserService.getService().me(session as string);
    RequestContext.setContext({ user });

    return next();
  },
);
