import { inject, injectable } from 'tsyringe';
import ITagRepository from '../../../interfaces/repositories/tag-repository.domain';
import Tag from '../../../interfaces/models/tag.domain';
import Usecase from '../../../interfaces/usecases';

type GetTagsUsecaseInput = {
  author_id: string;
};
type GetTagsUsecaseOutput = Tag[];

@injectable()
export default class GetTagsUsecase
  implements Usecase<GetTagsUsecaseInput, GetTagsUsecaseOutput>
{
  constructor(
    @inject('TagRepository')
    private tagRepository: ITagRepository,
  ) {}

  async execute(data: GetTagsUsecaseInput): Promise<GetTagsUsecaseOutput> {
    return await this.tagRepository.getAllByAuthor(data.author_id);
  }
}
