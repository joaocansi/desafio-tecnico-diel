import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserUsecase from '../usecases/authenticate-user.usecase';

export default class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateUserUsecase = container.resolve(AuthenticateUserUsecase);
    const token = await authenticateUserUsecase.execute({ email, password });

    res.setHeader(
      'Set-Cookie',
      `session=${token.access_token}; HttpOnly; Secure; SameSite=None; Domain=localhost; Path=/;`,
    );
    return res.status(201).json(token);
  }
}
