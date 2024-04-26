import ITokenProvider from '../../../interfaces/utils/token-provider.domain';
import jwt from 'jsonwebtoken';
import config from '../../config';

type Payload = {
  id: string;
  iat: number;
  exp: number;
};

export default class JwtTokenProvider implements ITokenProvider {
  verifyToken(token: string): string | null {
    try {
      const payload = jwt.verify(token, config.jwt.secret) as Payload;
      return payload.id;
    } catch (error) {
      return null;
    }
  }
  generateToken(id: string): string {
    const token = jwt.sign({ id }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
    return token;
  }
}
