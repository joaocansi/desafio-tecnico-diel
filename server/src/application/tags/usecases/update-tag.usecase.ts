import { inject, injectable } from 'tsyringe';
import { validateData } from '../../../infra/error/yup-error-handler';
import Tag from '../../../interfaces/models/tag.domain';
import Usecase from '../../../interfaces/usecases';

import * as Yup from 'yup';
import ITagRepository from '../../../interfaces/repositories/tag-repository.domain';
import ServerError from '../../../infra/error';

type UpdateTagUsecaseInput = {
  id: string;
  name: string;
  author_id: string;
};

type UpdateTagUsecaseOutput = Tag;

const UpdateTagUsecaseValidation = Yup.object().shape({
  id: Yup.string().uuid().required(),
  name: Yup.string().required(),
  author_id: Yup.string().uuid().required(),
});

@injectable()
export default class UpdateTagUsecase
  implements Usecase<UpdateTagUsecaseInput, UpdateTagUsecaseOutput>
{
  constructor(@inject('TagRepository') private tagRepository: ITagRepository) {}

  async execute(data: UpdateTagUsecaseInput): Promise<UpdateTagUsecaseOutput> {
    await validateData(data, UpdateTagUsecaseValidation);

    const tag = await this.tagRepository.findById({
      id: data.id,
      author_id: data.author_id,
    });

    if (!tag) {
      throw new ServerError('Tag not found', 404);
    }

    const updatedTag = await this.tagRepository.update({
      id: data.id,
      name: data.name,
      author_id: data.author_id,
    });
    return updatedTag;
  }
}
