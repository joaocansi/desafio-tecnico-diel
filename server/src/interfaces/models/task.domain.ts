import Tag from './tag.domain';
import User from './user.domain';

export default class Task {
  id: string;
  title: string;
  description: string;
  author_id: string;
  author: User;
  duration: string;
  date: Date;
  tags: Tag[];
  created_at: Date;
  updated_at: Date;
}
