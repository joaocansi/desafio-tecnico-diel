import { DataSource } from 'typeorm';
import TaskEntity from './entities/task.entity';
import TagEntity from './entities/tags.entity';
import UserEntity from './entities/user.entity';

export const database = new DataSource({
  type: process.env.DATABASE_TYPE as any,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [TaskEntity, UserEntity, TagEntity],
});
