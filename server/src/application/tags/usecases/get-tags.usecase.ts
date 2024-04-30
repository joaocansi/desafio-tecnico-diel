import { inject, injectable } from 'tsyringe';
import ITagRepository from '../../../interfaces/repositories/tag-repository.domain';
import Tag from '../../../interfaces/models/tag.domain';
import Usecase from '../../../interfaces/usecases';
import * as Yup from 'yup';
import { validateData } from '../../../infra/error/yup-error-handler';

type GetTagsUsecaseInput = {
  author_id: string;
};
type GetTagsUsecaseOutput = Tag[];

const GetTagsUsecaseValidation = Yup.object().shape({
  author_id: Yup.string().uuid().required(),
});

@injectable()
export default class GetTagsUsecase
  implements Usecase<GetTagsUsecaseInput, GetTagsUsecaseOutput>
{
  constructor(
    @inject('TagRepository')
    private tagRepository: ITagRepository,
  ) {}

  async execute(data: GetTagsUsecaseInput): Promise<GetTagsUsecaseOutput> {
    await validateData(data, GetTagsUsecaseValidation);
    return await this.tagRepository.getAllByAuthor(data.author_id);
  }
}
