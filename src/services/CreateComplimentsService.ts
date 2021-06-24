import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IComplimentRequest {
  user_sender: string;
  user_receiver: string;
  tag_id: string;
  message: string;
}

class CreateComplimentsService {
  async execute({
    user_sender,
    user_receiver,
    tag_id,
    message,
  }: IComplimentRequest) {
    const complimentsRepository = getCustomRepository(ComplimentsRepositories);
    const usersRepository = getCustomRepository(UsersRepositories);

    if (user_sender === user_receiver) {
      throw new AppError('Incorrect user receiver', 401);
    }

    const userReceiverExists = await usersRepository.findOne(user_receiver);

    if (!userReceiverExists) {
      throw new AppError('User receiver does not exists');
    }

    const compliment = complimentsRepository.create({
      user_sender,
      user_receiver,
      tag_id,
      message,
    });

    await complimentsRepository.save(compliment);

    return compliment;
  }
}

export { CreateComplimentsService };
