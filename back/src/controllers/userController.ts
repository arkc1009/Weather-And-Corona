import { Request, Response } from 'express';
import { UserModifyType } from '../interfaces/User';
import { findUser, modifyUser } from '../service/userService';
import { makeError } from '../utils/makeError';

export const getProfile = (req: Request, res: Response) => {
  const user = findUser(res.locals.email);
  if (!user) {
    makeError(res, 407, '유저를 찾을 수 없습니다.');
    return;
  }

  const { email, name, location, intro } = user;
  res.status(200).json({
    isSuccess: true,
    msg: '성공적으로 프로필을 가져왔습니다.',
    data: { email, name, location, intro },
  });
};

export const updateProfile = (req: Request, res: Response) => {
  const data: UserModifyType = req.body;

  const user = modifyUser(res.locals.email, data);
  if (!user) {
    makeError(res, 407, '프로필 수정을 실패했습니다.');
    return;
  }

  const { email, name, location, intro } = user;
  res.status(200).json({
    isSuccess: true,
    msg: '성공적으로 프로필을 수정했습니다.',
    data: { email, name, location, intro },
  });
};
