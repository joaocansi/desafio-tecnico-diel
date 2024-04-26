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
  @Column({ type: 'timestamp' })
  date: Date;
  @Column({ default: false })
  isCompleted: boolean;
  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;
  @Column()
  author_id: string;
  @ManyToOne(() => UserEntity, (user) => user.tasks)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;
  @ManyToMany(() => TagsEntity, (tag) => tag.tasks)
  @JoinTable()
  tags: TagsEntity[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
