import { Request, Response } from 'express';
import { UserInputType } from '../interfaces/User';
import { addUser, findUser, modifyUser } from '../service/userService';
import { createAccessToken, createRefreshToken } from '../service/tokenService';
import { evalExpires } from '../utils/evalExpires';
import { makeError } from '../utils/makeError';
import { Users } from '../model/User';

export const login = (req: Request, res: Response) => {
  const { email, password }: UserInputType = req.body;
  if (!email.trim() || !password.trim()) {
    makeError(res, 400, '올바른 형식이 아닙니다.');
    return;
  }

  const user = findUser(email);
  if (!user) {
    makeError(res, 401, '사용자가 존재하지 않습니다.');
    return;
  }

  if (user.password !== password) {
    makeError(res, 402, '비밀번호가 올바르지 않습니다.');
    return;
  }

  //token logic // expiresIn: 1(int) = 1s(time)
  const refreshToken = createRefreshToken({ email });
  const accessToken = createAccessToken({ email });

  if (!refreshToken || !accessToken) {
    makeError(res, 409, '토큰 발급을 할 수 없습니다.');
    return;
  }

  const data = modifyUser(email, { refresh: refreshToken });

  res.cookie('refresh_token', refreshToken, {
    maxAge: 1000 * evalExpires(process.env.JWT_REFRESH_TIME || '60*60'),
    httpOnly: true,
  });
  res.cookie('access_token', accessToken, {
    maxAge: 1000 * evalExpires(process.env.JWT_ACCESS_TIME || '60*10'),
  });

  res.status(200).json({
    isSuccess: true,
    msg: '로그인을 성공했습니다.',
    data,
  });
};

export const register = (req: Request, res: Response) => {
  const { email, password, name, location }: UserInputType = req.body;
  const prevLength = Users.length;

  if (!email.trim() || !password.trim()) {
    makeError(res, 400, '올바른 형식이 아닙니다.');
    return;
  }

  const user = findUser(email);
  if (user) {
    makeError(res, 401, '이미 사용중인 이메일입니다.');
    return;
  }

  const newUsers = addUser({ email, password, name, location });
  if (prevLength === newUsers.length) {
    makeError(res, 400, '회원가입을 실패했습니다.');
    return;
  }

  res.status(200).json({
    isSuccess: true,
    msg: '회원가입을 성공했습니다.',
  });
};
