import api from '@/utils/axios';
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
        throw new Error('E-mail ou senha está incorreto.');
    }
    throw new Error(
      'Não foi possível concluir a requisição. Tente novamente mais tarde.',
    );
  }
}
