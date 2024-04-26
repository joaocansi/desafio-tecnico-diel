import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateTagUsecase from '../usecases/create-tag.usecase';
import GetTagsUsecase from '../usecases/get-tags.usecase';

export default class TagsController {
  async create(req: Request, res: Response) {
    const { name } = req.body;
    const user_id = req.user.id;

    console.log(user_id);

    const createTagUsecase = container.resolve(CreateTagUsecase);
    const tag = await createTagUsecase.execute({ name, author_id: user_id });

    return res.status(201).json(tag);
  }

  async getAll(req: Request, res: Response) {
    const getTagsUsecase = container.resolve(GetTagsUsecase);
    const tags = await getTagsUsecase.execute({ author_id: req.user.id });
    return res.json(tags);
  }
}
