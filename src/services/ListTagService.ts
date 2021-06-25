import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from '../repositories/TagsRepositories';
import { classToClass } from 'class-transformer';

class ListTagService {
  async execute() {
    const tagsRepository = getCustomRepository(TagsRepositories);

    const tags = await tagsRepository.find();

    return classToClass(tags);
  }
}

export { ListTagService };
