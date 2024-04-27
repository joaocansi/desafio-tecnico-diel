import { inject, injectable } from 'tsyringe';
import Usecase from '../../../interfaces/usecases';
import ServerError from '../../../infra/error';
import ITokenProvider from '../../../interfaces/utils/token-provider.domain';

type AuthorizeUserUsecaseInput = {
  authorization?: string;
  deleteToken: () => void;
};

type AuthorizeUserUsecaseOutput = {
  user_id: string;
};

@injectable()
export default class AuthorizeUserUsecase
  implements Usecase<AuthorizeUserUsecaseInput, AuthorizeUserUsecaseOutput>
{
  constructor(@inject('TokenProvider') private tokenProvider: ITokenProvider) {}

  async execute(
    input: AuthorizeUserUsecaseInput,
  ): Promise<AuthorizeUserUsecaseOutput> {
    const token = input.authorization;
    if (!token || !token.startsWith('Bearer ')) {
      throw new ServerError('Token not found', 401);
    }

    const tokenValue = token.split('Bearer ')[1];
    const payload = this.tokenProvider.verifyToken(tokenValue);

    if (!payload) {
      input.deleteToken();
      throw new ServerError('Unauthorized', 401);
    }

    return { user_id: payload };
  }
}
