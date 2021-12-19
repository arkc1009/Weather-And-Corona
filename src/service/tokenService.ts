import jwt from 'jsonwebtoken';
import { evalExpires } from '../utils/evalExpires';

export const createAccessToken = (payload: { email: string }) => {
  const JWTKEY = process.env.JWT_KEY || 'jwt';

  return jwt.sign(payload, JWTKEY, {
    expiresIn: evalExpires(process.env.JWT_ACCESS_TIME || '60*10'),
  });
};

export const createRefreshToken = (payload: { email: string }) => {
  const JWTKEY = process.env.JWT_KEY || 'jwt';

  return jwt.sign(payload, JWTKEY, {
    expiresIn: evalExpires(process.env.JWT_REFRESH_TIME || '60*60'),
  });
};
