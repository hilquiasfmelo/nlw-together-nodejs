import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { UsersRepositories } from '../repositories/UsersRepositories';

async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request;

  const usersRepository = getCustomRepository(UsersRepositories);

  const { admin } = await usersRepository.findOne(user_id);

  if (!admin) {
    throw new AppError('Unauthorized', 401);
  }

  return next();
}

export { ensureAdmin };
