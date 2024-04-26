import 'reflect-metadata';
import 'express-async-errors';

import { config } from 'dotenv';
config();

import './infra/container';
import { database } from './infra/persistence';

import express, { NextFunction, Request, Response } from 'express';
import taskRouter from './application/task';
import userRouter from './application/user';
import ServerError from './infra/error';
import authRouter from './application/auth';
import tagsRouter from './application/tags';

import cors from 'cors';
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    preflightContinue: true,
  }),
);
app.use(express.json());
app.use('/tasks', taskRouter);
app.use('/tags', tagsRouter);
app.use('/users', userRouter);
app.use('/users/auth', authRouter);
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ServerError)
    return res.status(err.statusCode).json({ message: err.message });

  console.error(err);
  return res.status(500).json({ message: 'Internal server error' });
});

database.initialize().then(() => {
  const PORT = process.env.PORT || 3333;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
