import api from '@/utils/axios';
import messages from '@/utils/default-messages';
import { AxiosError } from 'axios';

interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export default async function createUser(data: CreateUserData) {
  try {
    const res = await api.post('/users', data);
    return res;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response?.status === 409)
        throw new Error(messages.emailAlreadyInUse);
      if (error.response?.status === 401)
        throw new Error(messages.unauthorized);
    }
    throw new Error(messages.internalError);
  }
}
