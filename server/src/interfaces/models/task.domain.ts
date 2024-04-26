import Tag from './tag.domain';
import User from './user.domain';

export default class Task {
  id: string;
  title: string;
  description: string;
  authorId: string;
  author: User;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
}
