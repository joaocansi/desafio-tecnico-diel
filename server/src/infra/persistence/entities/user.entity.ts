import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import TaskEntity from './task.entity';
import TagEntity from './tags.entity';

@Entity('users')
export default class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany(() => TaskEntity, (task) => task.author)
  tasks: TaskEntity[];
  @OneToMany(() => TagEntity, (tags) => tags.author)
  tags: TagEntity[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
