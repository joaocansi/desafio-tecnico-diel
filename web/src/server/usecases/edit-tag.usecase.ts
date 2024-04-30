import api from '@/utils/axios';
import messages from '@/utils/default-messages';
import { AxiosError } from 'axios';

interface EditTaskInput {
  id: string;
  name: string;
}

export default async function editTagUseCase(data: EditTaskInput) {
  try {
    const res = await api.put(`/tags/${data.id}`, {
      name: data.name,
    });
    return res.data;
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
