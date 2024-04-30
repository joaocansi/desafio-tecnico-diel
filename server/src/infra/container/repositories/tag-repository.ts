import { plainToClass } from 'class-transformer';
import ITagRepository, {
  CreateTagData,
  DeleteData,
  FindByIdsData,
  FindTagByNameData,
  UpdateData,
} from '../../../interfaces/repositories/tag-repository.domain';
import { database } from '../../persistence';
import TagEntity from '../../persistence/entities/tags.entity';
import Tag from '../../../interfaces/models/tag.domain';
import { In } from 'typeorm';

export default class TagRepository implements ITagRepository {
  async update(data: UpdateData): Promise<Tag> {
    const tag = await database.getRepository(TagEntity).save(data);
    return plainToClass(Tag, tag);
  }

  async findById(data: DeleteData): Promise<Tag | null> {
    const tag = await database.getRepository(TagEntity).findOne({
      where: {
        id: data.id,
        author_id: data.author_id,
      },
    });
    return plainToClass(Tag, tag);
  }

  async delete(data: DeleteData): Promise<void> {
    await database.getRepository(TagEntity).delete({
      id: data.id,
      author_id: data.author_id,
    });
  }
  async findByIds(data: FindByIdsData): Promise<Tag[]> {
    const tags = await database.getRepository(TagEntity).find({
      where: {
        id: In(data.ids),
        author_id: data.author_id,
      },
    });
    return tags.map((tag) => plainToClass(Tag, tag));
  }
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
