import { Router, Request, Response } from 'express';
import { authorization } from './middlewares/authorization';

const router = Router();

//토큰 만료, 재발급 테스트 ( 완료 )
router.get('/', authorization, (req: Request, res: Response) => {
  const id = res.locals.id;
  res.send('authorization! to' + id);
});

export default router;
