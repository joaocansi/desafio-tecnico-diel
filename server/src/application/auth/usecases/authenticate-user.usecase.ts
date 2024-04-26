import { inject, injectable } from 'tsyringe';
import Usecase from '../../../interfaces/usecases';
import * as Yup from 'yup';
import IUserRepository from '../../../interfaces/repositories/user-repository.domain';
import ITokenProvider from '../../../interfaces/utils/token-provider.domain';
import { validateData } from '../../../infra/error/yup-error-handler';
import ServerError from '../../../infra/error';
import IHashProvider from '../../../interfaces/utils/hash-provider.domain';

type AuthenticateUserUsecaseInput = {
  email: string;
  password: string;
};

type AuthenticateUserUsecaseOutput = {
  access_token: string;
};

const AuthenticateUserUsecaseValidation = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(4).max(24).required(),
});

@injectable()
export default class AuthenticateUserUsecase
  implements
    Usecase<AuthenticateUserUsecaseInput, AuthenticateUserUsecaseOutput>
{
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('TokenProvider') private tokenProvider: ITokenProvider,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  async execute(
    data: AuthenticateUserUsecaseInput,
  ): Promise<AuthenticateUserUsecaseOutput> {
    await validateData(data, AuthenticateUserUsecaseValidation);
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new ServerError('E-mail/password is incorrect', 401);
    }

    const passwordMatch = await this.hashProvider.compareHash(
      data.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new ServerError('E-mail/password is incorrect', 401);
    }

    const token = this.tokenProvider.generateToken(user.id);
    return { access_token: token };
  }
}
