import { type Task } from '@/hooks/use-auth';
import api from '@/utils/axios';
import messages from '@/utils/default-messages';
import { AxiosError } from 'axios';
import { type Dayjs } from 'dayjs';

interface CreateTaskInput {
  title: string;
  description: string;
  date: Dayjs;
  tags: string[];
}

export default async function createTask(data: CreateTaskInput) {
  const date = data.date.format('YYYY-MM-DD');
  try {
    const res = await api.post('/tasks', {
      title: data.title,
      description: data.description,
      date,
      tags: data.tags,
    });
    return res.data as Task;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response?.status === 401)
        throw new Error(messages.unauthorized);
    }
    throw new Error(messages.internalError);
  }
}
