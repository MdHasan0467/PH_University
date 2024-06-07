import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

const shenabahini = (req: Request, res: Response, next: NextFunction) => {
  next();
};

router.post('/create-student', shenabahini, UserControllers.createStudent);

export const UserRoutes = router;
