import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateTaskUsecase from '../usecases/create-task.usecase';
import GetAllTasksUsecase from '../usecases/get-all-tasks.usecase';
import UpdateTaskUsecase from '../usecases/update-task.usecase';
import DeleteTaskUsecase from '../usecases/delete-task.usecase';

export default class TaskController {
  async create(req: Request, res: Response) {
    const { title, description, tags, date } = req.body;
    const createTaskUsecase = container.resolve(CreateTaskUsecase);
    const task = await createTaskUsecase.execute({
      title,
      description,
      tags,
      date,
      author_id: req.user.id,
    });
    return res.status(201).json(task);
  }

  async getAll(req: Request, res: Response) {
    const { title, tags, date_type, date } = req.query;

    const getAllTasksUsecase = container.resolve(GetAllTasksUsecase);
    const tasks = await getAllTasksUsecase.execute({
      title: title as string,
      tags: typeof tags === 'string' ? [tags] : (tags as string[]),
      date_type: date_type as string,
      date: date as string,
      author_id: req.user.id,
    });
    return res.json(tasks);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, is_completed, tags, date } = req.body;
    const updateTaskUsecase = container.resolve(UpdateTaskUsecase);
    const task = await updateTaskUsecase.execute({
      id,
      title,
      description,
      tags,
      date,
      is_completed,
      author_id: req.user.id,
    });
    return res.json(task);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleteTaskUsecase = container.resolve(DeleteTaskUsecase);
    await deleteTaskUsecase.execute({ id, author_id: req.user.id });
    return res.status(204).send();
  }
}
