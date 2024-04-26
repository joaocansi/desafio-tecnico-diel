import { Request, Response } from 'express';
import CreateUserUsecase from '../usecases/create-user.usecase';
import { container } from 'tsyringe';

export default class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUserUsecase = container.resolve(CreateUserUsecase);
    const user = await createUserUsecase.execute({ name, email, password });
    return response.json({ ...user });
  }
}
