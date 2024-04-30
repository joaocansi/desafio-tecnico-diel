import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import TagsEntity from './tags.entity';
import UserEntity from './user.entity';

@Entity('tasks')
export default class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({ type: 'timestamp with time zone' })
  date: Date;
  @Column({ default: false })
  is_completed: boolean;
  @Column()
  author_id: string;
  @ManyToOne(() => UserEntity, (user) => user.tasks)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;
  @ManyToMany(() => TagsEntity, (tag) => tag.tasks)
  @JoinTable()
  tags: TagsEntity[];
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
