import { Request, Response, NextFunction } from 'express';
import { HttpException } from '@/utils/http-exception';
import { env } from '@/config/env';

export function errorHandler(
  err: Error | HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
 ) {
  console.error('❌ Error:', err);

  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
      ...(env.NODE_ENV === 'development' && { errors: err.errors }),
    });
  }

  res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: 'Internal server error',
    ...(env.NODE_ENV === 'development' && { error: err.message }),
  });
}
