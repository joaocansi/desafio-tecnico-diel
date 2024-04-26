import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateTaskUsecase from '../usecases/create-task.usecase';
import GetAllTasksUsecase from '../usecases/get-all-tasks.usecase';

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
    const { title, tags } = req.query;
    const getAllTasksUsecase = container.resolve(GetAllTasksUsecase);
    const tasks = await getAllTasksUsecase.execute({
      title: title as string,
      tags: tags as string,
      author_id: req.user.id,
    });
    return res.json(tasks);
  }
}
