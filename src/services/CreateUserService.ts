import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({ name, email, password, admin = false }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new AppError('Email incorrect', 401);
    }

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
      admin,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
