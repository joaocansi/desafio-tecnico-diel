import api from '@/utils/axios';
import messages from '@/utils/default-messages';
import { AxiosError } from 'axios';

export default async function deleteTask(id: string) {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response?.status === 404)
        throw new Error(messages.objectNotFound.replace('{0}', 'Tarefa'));
      if (error.response?.status === 401)
        throw new Error(messages.unauthorized);
    }
    throw new Error(messages.internalError);
  }
}
