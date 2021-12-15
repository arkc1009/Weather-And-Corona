import { Response } from 'express';

export const makeError = (res: Response, code: number, msg: string) => {
  res.status(code).json({
    isSuccess: false,
    msg,
  });

  console.log('[error debug] code:', code, 'msg:', msg);
};
