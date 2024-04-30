import { type Task } from '@/hooks/use-auth';
import api from '@/utils/axios';
import messages from '@/utils/default-messages';
import { AxiosError } from 'axios';
import { type Dayjs } from 'dayjs';

interface GetAllTasksData {
  title?: string;
  date_type?: string;
  date?: Dayjs;
  tags?: string[];
}

export default async function getAllTasks(filters: GetAllTasksData) {
  let params = '';
  if (filters.title) params += `title=${filters.title}&`;
  if (filters.tags && filters.tags.length > 0)
    params += `tags=${filters.tags.join('&tags=')}&`;
  if (filters.date_type) params += `date_type=${filters.date_type}&`;
  if (filters.date) {
    const date = filters.date.format('YYYY-MM-DD');
    params += `date=${date.toString()}`;
  }

  try {
    const res = await api.get(`/tasks?${params}`);
    return res.data as Task[];
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response?.status === 401)
        throw new Error(messages.unauthorized);
    }
    throw new Error(messages.internalError);
  }
}
