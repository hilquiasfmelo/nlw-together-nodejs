import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';

function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const admin = false;

  if (admin) {
    return next();
  }

  return response.status(401).json({
    error: 'User Unauthorized',
  });
}

export { ensureAdmin };
