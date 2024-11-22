import { Response as ExpressResponse, Request as ExpressRequest, NextFunction } from 'express';
import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: ExpressRequest,
  res: ExpressResponse,
  next: NextFunction,
): ExpressResponse => {
  console.error(err.message);

  return res.status(500).json({
    message: 'Internal Server Error',
  });
};
