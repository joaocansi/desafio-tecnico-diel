import api from '@/utils/axios';
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
        throw new Error('E-mail já cadastrado.');
    }
    throw new Error(
      'Não foi possível concluir a requisição. Tente novamente mais tarde.',
    );
  }
}
