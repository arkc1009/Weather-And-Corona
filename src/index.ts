import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

process.env.NODE_ENV =
  process.env.NODE_ENV && process.env.NODE_ENV.trim().toLowerCase() == 'production'
    ? 'production'
    : 'development';

console.log(process.env.NODE_ENV);

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
app.use(express.static(path.join(__dirname, '..', '..', 'front', 'build')));

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.get('/', (req: Request, res: Response) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'front', 'build', 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, '..', '..', 'front', 'build', 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log('server open');
});
