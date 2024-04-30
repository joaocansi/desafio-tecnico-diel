import api from '@/utils/axios';
import messages from '@/utils/default-messages';
import { AxiosError } from 'axios';

export interface Tag {
  id: string;
  name: string;
}

export default async function getAllTags(): Promise<Tag[]> {
  try {
    const res = await api.get('/tags');
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response?.status === 401)
        throw new Error(messages.unauthorized);
    }
    throw new Error(messages.internalError);
  }
}
