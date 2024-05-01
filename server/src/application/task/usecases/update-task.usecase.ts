import { inject, injectable } from 'tsyringe';
import Task from '../../../interfaces/models/task.domain';
import Usecase from '../../../interfaces/usecases';
import ITaskRepository from '../../../interfaces/repositories/task-repository.domain';

import * as Yup from 'yup';
import ITagRepository from '../../../interfaces/repositories/tag-repository.domain';
import ServerError from '../../../infra/error';
import { validateData } from '../../../infra/error/yup-error-handler';
import Tag from '../../../interfaces/models/tag.domain';

type UpdateTaskUsecaseInput = {
  id: string;
  author_id: string;
  title?: string;
  is_completed?: boolean;
  description?: string;
  tags?: string[];
  date?: string;
};

type UpdateTaskUsecaseOutput = Task;

const UpdateTaskUsecaseValidation = Yup.object().shape({
  id: Yup.string().uuid().required(),
  author_id: Yup.string().uuid().required(),
  title: Yup.string(),
  description: Yup.string(),
  is_completed: Yup.boolean(),
  tags: Yup.array().of(Yup.string()),
  date: Yup.string().matches(/[0-9]{4}-[0-9]{2}-[0-9]{2}/),
});

@injectable()
export default class UpdateTaskUsecase
  implements Usecase<UpdateTaskUsecaseInput, UpdateTaskUsecaseOutput>
{
  constructor(
    @inject('TaskRepository') private taskRepository: ITaskRepository,
    @inject('TagRepository') private tagRepository: ITagRepository,
  ) {}

  async execute(
    data: UpdateTaskUsecaseInput,
  ): Promise<UpdateTaskUsecaseOutput> {
    await validateData(data, UpdateTaskUsecaseValidation);

    let tags: Tag[] = [];
    if (data.tags) {
      tags = await this.tagRepository.findByIds({
        ids: data.tags,
        author_id: data.author_id,
      });

      if (tags.length !== data.tags.length) {
        throw new ServerError('These tags do not belong to you', 403);
      }
    }

    const task = await this.taskRepository.findById({
      id: data.id,
      author_id: data.author_id,
    });

    if (!task) {
      throw new ServerError('Task not found', 404);
    }

    const updatedTask = await this.taskRepository.update({
      ...data,
      tags: tags.length > 0 ? tags : undefined,
    });

    console.log(updatedTask);

    return updatedTask;
  }
}
