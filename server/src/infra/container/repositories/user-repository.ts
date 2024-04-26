import { plainToClass } from 'class-transformer';
import User from '../../../interfaces/models/user.domain';
import IUserRepository, {
  CreateUserData,
} from '../../../interfaces/repositories/user-repository.domain';
import { database } from '../../persistence';
import UserEntity from '../../persistence/entities/user.entity';

export default class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await database
      .getRepository(UserEntity)
      .findOne({ where: { email } });
    return plainToClass(User, user);
  }
  async create(data: CreateUserData): Promise<User> {
    const user = await database.getRepository(UserEntity).save(data);
    return plainToClass(User, user);
  }
}
