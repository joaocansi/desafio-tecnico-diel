import { inject, injectable } from 'tsyringe';
import Usecase from '../../../interfaces/usecases';
import ITagRepository from '../../../interfaces/repositories/tag-repository.domain';
import ServerError from '../../../infra/error';
import * as Yup from 'yup';
import { validateData } from '../../../infra/error/yup-error-handler';

type DeleteTagUsecaseInput = {
  id: string;
  author_id: string;
};

type DeleteTagUsecaseOutput = void;

const DeleteTagUsecaseValidation = Yup.object().shape({
  id: Yup.string().uuid().required(),
  author_id: Yup.string().uuid().required(),
});

@injectable()
export default class DeleteTagUsecase
  implements Usecase<DeleteTagUsecaseInput, DeleteTagUsecaseOutput>
{
  constructor(@inject('TagRepository') private tagRepository: ITagRepository) {}

  async execute(data: DeleteTagUsecaseInput) {
    await validateData(data, DeleteTagUsecaseValidation);

    const tag = await this.tagRepository.findById({
      id: data.id,
      author_id: data.author_id,
    });

    if (!tag) {
      throw new ServerError('Tag not found', 404);
    }

    await this.tagRepository.delete({
      id: data.id,
      author_id: data.author_id,
    });
  }
}
