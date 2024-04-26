import Tag from '../models/tag.domain';

export type CreateTagData = {
  name: string;
  author_id: string;
};

export type FindTagByNameData = {
  name: string;
  author_id: string;
};

export default interface ITagRepository {
  create(data: CreateTagData): Promise<Tag>;
  findByName(name: FindTagByNameData): Promise<Tag | null>;
  getAllByAuthor(authorId: string): Promise<Tag[]>;
}
