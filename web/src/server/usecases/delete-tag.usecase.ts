import { type Tag } from '@/hooks/use-auth';
import api from '@/utils/axios';
import messages from '@/utils/default-messages';
import { AxiosError } from 'axios';

export default async function deleteTag(id: string): Promise<Tag> {
  try {
    const response = await api.delete(`/tags/${id}`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response?.status === 404)
        throw new Error(messages.objectNotFound.replace('{0}', 'Tag'));
      if (error.response?.status === 401)
        throw new Error(messages.unauthorized);
    }
    throw new Error(messages.internalError);
  }
}
