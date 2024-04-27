import { inject, injectable } from 'tsyringe';
import Task from '../../../interfaces/models/task.domain';
import ITaskRepository from '../../../interfaces/repositories/task-repository.domain';
import Usecase from '../../../interfaces/usecases';
import ServerError from '../../../infra/error';

type GetAllTasksUsecaseInput = {
  title: string;
  tags: string;
  author_id: string;
};
type GetAllTasksUsecaseOutput = Task[];

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
    let tags: string[] = [];
    try {
      tags = data.tags.split(',');
    } catch (error) {
      throw new ServerError('Invalid tags', 400);
    }

    const tasks = await this.taskRepository.getAll({
      title: data.title,
      author_id: data.author_id,
      tags,
    });
    return tasks;
  }
}
