import express from 'express';
import authRouter from './Router/authRouter';

const PORT = 3001;
const app: express.Application = express();

app.use('/', authRouter);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('hello express!');
});

app.listen(PORT, () => {
  console.log('server open!');
});
