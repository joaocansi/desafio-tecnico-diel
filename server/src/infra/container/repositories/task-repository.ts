import { plainToClass } from 'class-transformer';
import Task from '../../../interfaces/models/task.domain';
import ITask from '../../../interfaces/models/task.domain';
import ITaskRepository, {
  CreateTaskData,
  GetAllFilter,
} from '../../../interfaces/repositories/task-repository.domain';
import { database } from '../../persistence';
import TaskEntity from '../../persistence/entities/task.entity';
import { ILike, In } from 'typeorm';

export default class TaskRepository implements ITaskRepository {
  async getAll(filters: GetAllFilter): Promise<Task[]> {
    let where = {} as any;
    if (filters.title) {
      where.title = ILike(`%${filters.title}%`);
    }

    if (filters.tags) {
      where.tags = {
        id: In(filters.tags),
      };
    }

    const tasks = await database.getRepository(TaskEntity).find({
      where: {
        ...where,
        author_id: filters.author_id,
      },
    });
    return tasks.map((task) => plainToClass(Task, task));
  }

  async create(data: CreateTaskData): Promise<Task> {
    const tags = data.tagsId.map((tagId) => ({ ...new Task(), id: tagId }));
    const task = await database.getRepository(TaskEntity).save({
      author_id: data.author_id,
      title: data.title,
      description: data.description,
      date: data.date,
      tags,
    });
    return plainToClass(Task, task);
  }

  update(data: ITask): Promise<ITask> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
