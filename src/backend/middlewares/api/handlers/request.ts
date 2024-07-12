import { RequestContext } from '@/src/backend/request-context/request-context';
import { NextFunction } from 'next-api-decorators';
import { NextApiRequest, NextApiResponse } from 'next/types';

export const requestReader = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextFunction,
) => {
  const { record } = RequestContext.getContext();
  RequestContext.setContext({
    record: {
      ...record,
      request: {
        body: req.body ?? undefined,
        queryParam: req.query ?? undefined,
        path: req.url ?? undefined,
        method: req.method ?? undefined,
      },
    },
  });

  next();
};
