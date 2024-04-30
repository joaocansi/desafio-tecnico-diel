import { inject, injectable } from 'tsyringe';
import Task from '../../../interfaces/models/task.domain';
import ITaskRepository from '../../../interfaces/repositories/task-repository.domain';
import Usecase from '../../../interfaces/usecases';
import ServerError from '../../../infra/error';

import * as Yup from 'yup';
import { validateData } from '../../../infra/error/yup-error-handler';
import Tag from '../../../interfaces/models/tag.domain';

type GetAllTasksUsecaseInput = {
  title: string;
  author_id: string;
  tags?: string[];
  date_type?: string;
  date?: string;
};
type GetAllTasksUsecaseOutput = Task[];

const GetAllTasksValidation = Yup.object().shape({
  title: Yup.string(),
  tags: Yup.array().of(Yup.string()),
  date_type: Yup.string().equals(['month', 'week', 'day']),
  date: Yup.string().matches(/[0-9]{4}-[0-9]{2}-[0-9]{2}/),
  author_id: Yup.string().required(),
});

@injectable()
export default class GetAllTasksUsecase
  implements Usecase<GetAllTasksUsecaseInput, GetAllTasksUsecaseOutput>
{
  constructor(
    @inject('TaskRepository') private taskRepository: ITaskRepository,
  ) {}

  async execute(
    data: GetAllTasksUsecaseInput,
  ): Promise<GetAllTasksUsecaseOutput> {
    await validateData(data, GetAllTasksValidation);

    let tags = [] as Tag[];
    if (data.tags) {
      tags = data.tags.map((tag) => ({ ...new Tag(), id: tag }));
    }

    const tasks = await this.taskRepository.getAll({
      ...data,
      tags: tags.length > 0 ? tags : undefined,
    });
    return tasks;
  }
}
