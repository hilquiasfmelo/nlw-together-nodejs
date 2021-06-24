import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class CreateAuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    // Verify if e-mail exists
    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new AppError('Email/Password incorrect');
    }

    // Verify if password is correct
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email/Password incorrect');
    }

    // Generate token
    const token = sign(
      { email: user.email },
      '11e89910d7868c8d5f5c1dbd0942ed82',
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    return token;
  }
}

export { CreateAuthenticateUserService };
