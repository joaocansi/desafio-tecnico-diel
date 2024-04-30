import api from '@/utils/axios';
import messages from '@/utils/default-messages';
import { AxiosError } from 'axios';

interface AuthenticateUserData {
  email: string;
  password: string;
}

export default async function authenticateUser(data: AuthenticateUserData) {
  try {
    const res = await api.post('/users/auth', data);
    return res;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      if (error.response?.status === 401)
        throw new Error(messages.emailOrPasswordIncorrect);
    }
    throw new Error(messages.internalError);
  }
}
