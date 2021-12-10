import express from 'express';

const router: express.Router = express.Router();

router.get('/temp', (req: express.Request, res: express.Response) => {
  res.send('hello Router!');
});

export default router;
