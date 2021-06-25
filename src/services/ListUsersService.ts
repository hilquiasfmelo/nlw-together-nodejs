import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
import { classToClass } from 'class-transformer';

class ListUsersService {
  async execute() {
    const usersRepository = getCustomRepository(UsersRepositories);

    const users = await usersRepository.find();

    return classToClass(users);
  }
}

export { ListUsersService };
