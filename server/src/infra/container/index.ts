import { container } from 'tsyringe';
import ITaskRepository from '../../interfaces/repositories/task-repository.domain';
import TaskRepository from './repositories/task-repository';
import IUserRepository from '../../interfaces/repositories/user-repository.domain';
import IHashProvider from '../../interfaces/utils/hash-provider.domain';
import BcryptHashProvider from './utils/bcrypt-hash-provider';
import UserRepository from './repositories/user-repository';
import ITokenProvider from '../../interfaces/utils/token-provider.domain';
import JwtTokenProvider from './utils/jwt-token-provider';
import ITagRepository from '../../interfaces/repositories/tag-repository.domain';
import TagRepository from './repositories/tag-repository';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
container.registerSingleton<ITokenProvider>('TokenProvider', JwtTokenProvider);

container.registerSingleton<ITagRepository>('TagRepository', TagRepository);
container.registerSingleton<ITaskRepository>('TaskRepository', TaskRepository);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
