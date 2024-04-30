import { plainToClass } from 'class-transformer';
import Task from '../../../interfaces/models/task.domain';
import ITask from '../../../interfaces/models/task.domain';
import ITaskRepository, {
  CreateTaskData,
  DeleteTaskData,
  FindByIdData,
  GetAllFilter,
  UpdateTaskData,
} from '../../../interfaces/repositories/task-repository.domain';
import { database } from '../../persistence';
import TaskEntity from '../../persistence/entities/task.entity';
import { Between, Equal, ILike, In } from 'typeorm';

export default class TaskRepository implements ITaskRepository {
  async findById(data: FindByIdData): Promise<Task | undefined> {
    const task = await database
      .getRepository(TaskEntity)
      .findOneBy({ id: data.id, author_id: data.author_id });
    return plainToClass(Task, task);
  }

  async update(data: UpdateTaskData): Promise<Task> {
    const task = database.getRepository(TaskEntity).save(data);
    return plainToClass(Task, task);
  }

  async getAll(filters: GetAllFilter): Promise<Task[]> {
    const filter = createGetAllQuery(filters);
    const taskRepository = database.getRepository(TaskEntity);
    const tasks = await taskRepository.find({
      where: {
        ...filter,
        author_id: filters.author_id,
      },
      relations: ['tags'],
      select: ['id', 'title', 'description', 'date', 'tags', 'is_completed'],
    });

    return tasks.map((task) => plainToClass(Task, task));
  }

  async create(data: CreateTaskData): Promise<Task> {
    const task = await database.getRepository(TaskEntity).save(data);
    return plainToClass(Task, task);
  }

  async delete(data: DeleteTaskData): Promise<void> {
    const taskRepository = database.getRepository(TaskEntity);
    await taskRepository.delete(data.id);
  }
}

const createGetAllQuery = (filters: GetAllFilter) => {
  const where: any = {
    author_id: filters.author_id,
  };

  if (filters.title) where.title = ILike(`%${filters.title}%`);

  if (filters.tags && filters.tags.length > 0)
    where.tags = {
      id: In(filters.tags.map((tag) => tag.id)),
    };

  if (!filters.date_type || !filters.date) {
    return where;
  }

  const date = new Date(filters.date);
  if (filters.date_type === 'day') {
    where.date = Equal(date);
  }

  if (filters.date_type === 'week') {
    const minDate = new Date(date);
    const maxDate = new Date(date);

    minDate.setDate(minDate.getDate() - minDate.getUTCDay());
    maxDate.setDate(maxDate.getDate() + (6 - maxDate.getUTCDay()));

    where.date = Between(minDate, maxDate);
  }

  if (filters.date_type === 'month') {
    const minDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const maxDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    where.date = Between(minDate, maxDate);
  }

  return where;
};
