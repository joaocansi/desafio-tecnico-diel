import { inject, injectable } from 'tsyringe';
import ITaskRepository from '../../../interfaces/repositories/task-repository.domain';
import Task from '../../../interfaces/models/task.domain';

import * as Yup from 'yup';
import { validateData } from '../../../infra/error/yup-error-handler';

type CreateTaskUsecaseInput = {
  title: string;
  description: string;
  tags: string[];
  author_id: string;
  date: Date;
};

type CreateTaskUsecaseOutput = Task;

const CreateTaskUsecaseValidation = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  tags: Yup.array().of(Yup.string().uuid()).required(),
  author_id: Yup.string().uuid().required(),
  date: Yup.string().datetime().required(),
});

@injectable()
export default class CreateTaskUsecase {
  constructor(
    @inject('TaskRepository') private taskRepository: ITaskRepository,
  ) {}

  async execute(
    data: CreateTaskUsecaseInput,
  ): Promise<CreateTaskUsecaseOutput> {
    await validateData(data, CreateTaskUsecaseValidation);

    const task = await this.taskRepository.create({
      author_id: data.author_id,
      title: data.title,
      description: data.description,
      tagsId: data.tags,
      date: data.date,
    });
    return task;
  }
}
