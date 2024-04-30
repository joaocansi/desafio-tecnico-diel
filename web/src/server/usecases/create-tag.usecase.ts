import api from '@/utils/axios';
import { AxiosError } from 'axios';
import { type Tag } from './get-all-tags.usecase';
import messages from '@/utils/default-messages';

export default async function createTag(name: string): Promise<Tag> {
  try {
    const res = await api.post('/tags', {
      name,
    });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response?.status === 409)
        throw new Error(messages.objectAlreadyExists.replace('{0}', 'Tag'));
      if (error.response?.status === 401)
        throw new Error(messages.unauthorized);
    }
    throw new Error(messages.internalError);
  }
}
