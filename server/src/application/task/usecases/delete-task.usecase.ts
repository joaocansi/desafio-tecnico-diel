import Usecase from '../../../interfaces/usecases';
import { validateData } from '../../../infra/error/yup-error-handler';
import ServerError from '../../../infra/error';
import * as Yup from 'yup';
import { inject, injectable } from 'tsyringe';
import ITaskRepository from '../../../interfaces/repositories/task-repository.domain';

type DeleteTaskUsecaseInput = {
  id: string;
  author_id: string;
};

type DeleteTaskUsecaseOutput = void;

const DeleteTaskUsecaseValidation = Yup.object().shape({
  id: Yup.string().uuid().required(),
  author_id: Yup.string().uuid().required(),
});

@injectable()
export default class DeleteTaskUsecase
  implements Usecase<DeleteTaskUsecaseInput, DeleteTaskUsecaseOutput>
{
  constructor(
    @inject('TaskRepository') private taskRepository: ITaskRepository,
  ) {}

  async execute(data: DeleteTaskUsecaseInput) {
    await validateData(data, DeleteTaskUsecaseValidation);

    const task = await this.taskRepository.findById({
      id: data.id,
      author_id: data.author_id,
    });

    if (!task) {
      throw new ServerError('Task not found', 404);
    }

    await this.taskRepository.delete({
      id: data.id,
      author_id: data.author_id,
    });
  }
}
