import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRouter';
import tempRouter from './routes/tempRouter';
import dotenv from 'dotenv';

dotenv.config();

const PORT: number = parseInt(process.env.SERVER_PORT || '3001');
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/temp', tempRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('hello Express again...');
});

app.listen(PORT, () => {
  console.log('server open');
});
