import { NextFunction, Request, Response } from 'express';
import AuthorizeUserUsecase from '../usecases/authorize-user.usecase';
import { container } from 'tsyringe';

const isAuthenticatedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;
  const authorizeUserUsecase = container.resolve(AuthorizeUserUsecase);
  const payload = await authorizeUserUsecase.execute({ authorization });
  req.user = {
    id: payload.user_id,
  };
  next();
};

export default isAuthenticatedMiddleware;
