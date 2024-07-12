import { NextApiRequest, NextApiResponse } from 'next/types';
import { HttpException } from 'next-api-decorators';
import { RequestContext } from '../request-context/request-context';

export const mainExceptionHandler = (
  error: unknown,
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const statusCode = error instanceof HttpException ? error.statusCode : 500;
  const message =
    error instanceof HttpException
      ? error.message
      : 'An unknown error occurred.';
  const errors =
    error instanceof HttpException && error.errors?.length
      ? error.errors
      : [message];
  const { record } = RequestContext.getContext();
  RequestContext.setContext({
    record: {
      ...record,
      error: {
        statusCode,
        message,
        errors,
        stack: error instanceof Error ? error.stack : undefined,
      },
    },
  });

  res.status(statusCode).json({
    statusCode,
    message,
    errors,
    stack:
      error instanceof Error && process.env.NODE_ENV === 'development'
        ? error.stack
        : undefined,
  });
};
