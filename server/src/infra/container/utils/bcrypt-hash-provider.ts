import IHashProvider from '../../../interfaces/utils/hash-provider.domain';
import bcrypt, { compare } from 'bcryptjs';

export default class BcryptHashProvider implements IHashProvider {
  generateHash(payload: string): Promise<string> {
    const hash = bcrypt.hash(payload, 10);
    return hash;
  }

  compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
