import Tag from './tag.domain';

export default class User {
  id: string;
  name: string;
  email: string;
  password: string;
  tags: Tag[];
  created_at: Date;
  updated_at: Date;
}
