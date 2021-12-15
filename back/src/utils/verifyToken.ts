import jwt from 'jsonwebtoken';

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_KEY || 'jwt');
  } catch (error) {
    console.log(error);
    return null;
  }
};
