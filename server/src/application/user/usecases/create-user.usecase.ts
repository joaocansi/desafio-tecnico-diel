import { inject, injectable } from 'tsyringe';
import { Exclude, plainToClass } from 'class-transformer';

import * as Yup from 'yup';

import Usecase from '../../../interfaces/usecases';
import IUserRepository from '../../../interfaces/repositories/user-repository.domain';
import IHashProvider from '../../../interfaces/utils/hash-provider.domain';
import User from '../../../interfaces/models/user.domain';
import { validateData } from '../../../infra/error/yup-error-handler';
import ServerError from '../../../infra/error';

class CreateUserUsecaseInput {
  name: string;
  email: string;
  password: string;
}

class CreateUserUsecaseOutput extends User {
  @Exclude()
  password: string;
}

const CreateUserUsecaseValidation = Yup.object().shape({
  name: Yup.string().min(3).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(4).max(24).required(),
});

@injectable()
export default class CreateUserUsecase
  implements Usecase<CreateUserUsecaseInput, CreateUserUsecaseOutput>
{
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  async execute(
    data: CreateUserUsecaseInput,
  ): Promise<CreateUserUsecaseOutput> {
    await validateData(data, CreateUserUsecaseValidation);

    const userExists = await this.userRepository.findByEmail(data.email);
    if (userExists) {
      throw new ServerError('User already exists', 409);
    }

    const hashedPassword = await this.hashProvider.generateHash(data.password);
    const user = await this.userRepository.create({
      email: data.email,
      name: data.name,
      password: hashedPassword,
    });

    return plainToClass(CreateUserUsecaseOutput, user);
  }
}
