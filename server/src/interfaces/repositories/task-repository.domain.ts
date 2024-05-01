import Tag from '../models/tag.domain';
import Task from '../models/task.domain';

export type CreateTaskData = {
  title: string;
  description: string;
  date: Date;
  author_id: string;
  tags: Tag[]; // não faz parte do modelo de domínio
};

export type GetAllFilter = {
  title: string;
  author_id: string;
  tags?: Tag[];
  date_type?: string;
  date?: string;
};

export type UpdateTaskData = {
  id: string;
  author_id: string;
  title?: string;
  is_completed?: boolean;
  description?: string;
  tags?: {
    id: string;
  }[];
  date?: Date;
};

export type DeleteTaskData = {
  id: string;
  author_id: string;
};

export type FindByIdData = {
  id: string;
  author_id: string;
};

export default interface ITaskRepository {
  create(data: CreateTaskData): Promise<Task>;
  getAll(filters: GetAllFilter): Promise<Task[]>;
  update(data: UpdateTaskData): Promise<Task>;
  delete(data: DeleteTaskData): Promise<void>;
  findById(data: FindByIdData): Promise<Task | undefined>;
}
