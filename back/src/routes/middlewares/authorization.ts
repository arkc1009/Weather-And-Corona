import { NextFunction, Request, Response } from 'express';
import { createAccessToken } from '../../service/tokenService';
import { findUser } from '../../service/userService';
import { evalExpires } from '../../utils/evalExpires';
import { makeError } from '../../utils/makeError';
import { verifyToken } from '../../utils/verifyToken';

export const authorization = (req: Request, res: Response, next: NextFunction) => {
  const { access_token, refresh_token } = req.cookies;
  const decodeAccess = verifyToken(access_token);
  const decodeRefresh = verifyToken(refresh_token);

  console.log(access_token);
  console.log(refresh_token);
  console.log(decodeAccess);
  console.log(decodeRefresh);

  //accessToken O
  if (decodeAccess) {
    console.log('debug: accessToken access!');
    const { email } = decodeAccess as { email: string };
    res.locals.email = email;
    next();
    return;
  }

  //accessToken X, refreshToken O
  if (decodeRefresh) {
    console.log('debug: refreshToken access!');
    const { email } = decodeRefresh as { email: string };

    const user = findUser(email);
    if (!user || user.refresh !== refresh_token) {
      makeError(res, 408, '토큰이 유효하지 않습니다.');
      return;
    }

    const accessToken = createAccessToken({ email });
    if (!accessToken) {
      makeError(res, 409, '토큰 발급을 할 수 없습니다.');
      return;
    }

    res.cookie('access_token', accessToken, {
      maxAge: 1000 * evalExpires(process.env.JWT_ACCESS_TIME || '60*10'),
    });
    console.log('debug: create new accessToken!');

    res.locals.email = email;
    next();
    return;
  }

  //accessToken X, refreshToken X
  makeError(res, 408, '토큰이 만료되었습니다.');
  return;
};
