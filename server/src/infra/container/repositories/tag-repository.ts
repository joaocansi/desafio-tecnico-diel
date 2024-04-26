import { plainToClass } from 'class-transformer';
import ITagRepository, {
  CreateTagData,
  FindTagByNameData,
} from '../../../interfaces/repositories/tag-repository.domain';
import { database } from '../../persistence';
import TagEntity from '../../persistence/entities/tags.entity';
import Tag from '../../../interfaces/models/tag.domain';

export default class TagRepository implements ITagRepository {
  async getAllByAuthor(authorId: string): Promise<Tag[]> {
    const tags = await database
      .getRepository(TagEntity)
      .find({ where: { author_id: authorId } });
    return tags.map((tag) => plainToClass(Tag, tag));
  }

  async create(data: CreateTagData): Promise<Tag> {
    const tag = await database.getRepository(TagEntity).save(data);
    return plainToClass(Tag, tag);
  }

  async findByName(data: FindTagByNameData): Promise<Tag | null> {
    const tag = await database.getRepository(TagEntity).findOne({
      where: {
        name: data.name,
        author_id: data.author_id,
      },
    });
    return plainToClass(Tag, tag);
  }
}
