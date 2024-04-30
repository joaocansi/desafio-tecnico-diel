import Task from './task.domain';
import User from './user.domain';

export default class Tag {
  id: string;
  name: string;
  tasks: Task[];
  author_id: string;
  author: User;
  created_at: Date;
  updated_at: Date;
}
