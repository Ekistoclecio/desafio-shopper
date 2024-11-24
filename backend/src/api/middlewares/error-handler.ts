import { BaseError } from '@/core/errors/baseError';
import { Response as ExpressResponse, Request as ExpressRequest, NextFunction } from 'express';
import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (
  err: Error | BaseError,
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction,
): ExpressResponse => {
  console.error(err.message);

  if (err instanceof BaseError) {
    const { response_code, ...error } = err.toJSON();
    return res.status(response_code).json(error);
  }

  return res.status(500).json({
    message: 'Internal Server Error',
  });
};
