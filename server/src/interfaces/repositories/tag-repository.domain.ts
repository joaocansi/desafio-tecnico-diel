import Tag from '../models/tag.domain';

export type CreateTagData = {
  name: string;
  author_id: string;
};

export type FindTagByNameData = {
  name: string;
  author_id: string;
};

export type FindByIdsData = {
  ids: string[];
  author_id: string;
};

export default interface ITagRepository {
  create(data: CreateTagData): Promise<Tag>;
  findByName(name: FindTagByNameData): Promise<Tag | null>;
  findByIds(data: FindByIdsData): Promise<Tag[]>;
  getAllByAuthor(authorId: string): Promise<Tag[]>;
}
