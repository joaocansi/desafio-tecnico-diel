import { inject, injectable } from 'tsyringe';
import { validateData } from '../../../infra/error/yup-error-handler';

import ITaskRepository from '../../../interfaces/repositories/task-repository.domain';
import Task from '../../../interfaces/models/task.domain';

import * as Yup from 'yup';
import ITagRepository from '../../../interfaces/repositories/tag-repository.domain';
import ServerError from '../../../infra/error';
import sanitize from 'sanitize-html';
import dayjs from 'dayjs';

type CreateTaskUsecaseInput = {
  title: string;
  description: string;
  tags: string[];
  author_id: string;
  date: string;
};

type CreateTaskUsecaseOutput = Task;

const CreateTaskUsecaseValidation = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  tags: Yup.array().of(Yup.string().uuid()).required(),
  author_id: Yup.string().uuid().required(),
  date: Yup.string().matches(/[0-9]{4}-[0-9]{2}-[0-9]{2}/),
});

@injectable()
export default class CreateTaskUsecase {
  constructor(
    @inject('TaskRepository') private taskRepository: ITaskRepository,
    @inject('TagRepository') private tagRepository: ITagRepository,
  ) {}

  async execute(
    data: CreateTaskUsecaseInput,
  ): Promise<CreateTaskUsecaseOutput> {
    await validateData(data, CreateTaskUsecaseValidation);

    const tags = await this.tagRepository.findByIds({
      ids: data.tags,
      author_id: data.author_id,
    });

    if (tags.length !== data.tags.length)
      throw new ServerError('These tags do not belong to you', 403);

    const task = await this.taskRepository.create({
      author_id: data.author_id,
      title: data.title,
      description: sanitize(data.description), // Prevenção para ataques XSS
      tags,
      date: new Date(data.date),
    });
    return task;
  }
}
