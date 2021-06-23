import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { TagsRepositories } from '../repositories/TagsRepositories';

class CreateTagService {
  async execute(name: string) {
    const tagsRepository = getCustomRepository(TagsRepositories);

    if (!name) {
      throw new AppError('Name field must be filled');
    }

    const tagAlreadyExists = await tagsRepository.findOne({ name });

    if (tagAlreadyExists) {
      throw new AppError('Tag already exists');
    }

    const tag = tagsRepository.create({
      name,
    });

    await tagsRepository.save(tag);

    return tag;
  }
}

export { CreateTagService };
