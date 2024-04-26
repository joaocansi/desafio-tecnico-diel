import { inject, injectable } from 'tsyringe';
import Usecase from '../../../interfaces/usecases';
import Tag from '../../../interfaces/models/tag.domain';
import ITagRepository from '../../../interfaces/repositories/tag-repository.domain';
import ServerError from '../../../infra/error';

import * as Yup from 'yup';
import { validateData } from '../../../infra/error/yup-error-handler';

type CreateTagUsecaseInput = {
  name: string;
  author_id: string;
};

type CreateTagUsecaseOutput = Tag;

const CreateTagUsecaseValidation = Yup.object().shape({
  name: Yup.string().required(),
  author_id: Yup.string().uuid().required(),
});

@injectable()
export default class CreateTagUsecase
  implements Usecase<CreateTagUsecaseInput, CreateTagUsecaseOutput>
{
  constructor(@inject('TagRepository') private tagRepository: ITagRepository) {}

  async execute(data: CreateTagUsecaseInput): Promise<CreateTagUsecaseOutput> {
    await validateData(data, CreateTagUsecaseValidation);

    const tagExists = await this.tagRepository.findByName({
      name: data.name,
      author_id: data.author_id,
    });
    if (tagExists) {
      throw new ServerError('Tag already exists', 409);
    }

    const tag = await this.tagRepository.create({
      name: data.name,
      author_id: data.author_id,
    });
    return tag;
  }
}
