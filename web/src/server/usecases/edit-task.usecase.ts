import { type Task } from '@/hooks/use-auth';
import api from '@/utils/axios';
import messages from '@/utils/default-messages';
import { AxiosError } from 'axios';
import { type Dayjs } from 'dayjs';

interface EditTaskInput {
  id: string;
  title: string;
  description: string;
  tags: string[];
  date: Dayjs;
}

export default async function editTaskUseCase(data: EditTaskInput) {
  try {
    const res = await api.put(`/tasks/${data.id}`, {
      title: data.title,
      description: data.description,
      tags: data.tags,
      date: data.date.format('YYYY-MM-DD'),
    });
    return res.data as Task;
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
