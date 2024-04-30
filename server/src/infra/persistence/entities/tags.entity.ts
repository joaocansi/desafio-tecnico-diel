import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import TaskEntity from './task.entity';
import UserEntity from './user.entity';

@Entity('tags')
export default class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @ManyToMany(() => TaskEntity, (task) => task.tags, {
    onDelete: 'CASCADE',
  })
  tasks: TaskEntity[];
  @Column()
  author_id: string;
  @ManyToOne(() => UserEntity, (user) => user.tags)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
