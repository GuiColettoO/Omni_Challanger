import { SessionToken } from '../entity/session-token.entity';
import jwt from 'jsonwebtoken';

export class JsonWebToken implements SessionToken {
  async sign(data: object, secret: string, option?: object): Promise<string> {
    return jwt.sign(data, secret, option);
  }

  async verify(token: string, secret: string): Promise<{ user_id: string }> {
    try {
      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

      return {
        user_id: decoded.id,
      };
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}
