import { mainExceptionHandler } from '@/src/backend/exceptions';
import { logger } from '@/src/backend/logger/config';
import { requestReader } from '@/src/backend/middlewares/api/handlers/request';
import { RequestContext } from '@/src/backend/request-context/request-context';
import { Catch, UseMiddleware, createHandler } from 'next-api-decorators';
import { NextApiRequest, NextApiResponse } from 'next/types';

@UseMiddleware(requestReader)
@Catch(mainExceptionHandler)
export class BaseHandler {}

export const enhancedHandler = (cls: new (...args: any[]) => any) => {
  const result = createHandler(cls);

  return (req: NextApiRequest, res: NextApiResponse) => {
    res.on('finish', () => {
      const { record, user } = RequestContext.getContext();
      logger.info({ ...record, user: user?.username });
    });

    return result(req, res);
  };
};
