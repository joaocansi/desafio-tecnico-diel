import Task from '../models/task.domain';

export type CreateTaskData = {
  title: string;
  description: string;
  date: Date;
  tagsId: string[];
  author_id: string;
};

export type GetAllFilter = {
  title?: string;
  tags?: string[];
  author_id: string;
};

export default interface ITaskRepository {
  create(data: CreateTaskData): Promise<Task>;
  getAll(filters: GetAllFilter): Promise<Task[]>;
  update(data: Partial<Task>): Promise<Task>;
  delete(id: string): Promise<void>;
}
