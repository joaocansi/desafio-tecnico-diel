import User from '../models/user.domain';

export type CreateUserData = {
  name: string;
  email: string;
  password: string;
};

export default interface IUserRepository {
  create(data: CreateUserData): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
