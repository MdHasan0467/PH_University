import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import { AnyZodObject } from 'zod';
import { StudentValidations } from '../student/student.validation';

const router = express.Router();

const validateRequest = (schema : AnyZodObject) =>{
  return async (req: Request, res: Response, next: NextFunction) => {

    // Validate the request body against the schema
    const zidParsedData = await schema.parseAsync({
      body : req.body,
    })
    next();
  }
};

router.post('/create-student', validateRequest(StudentValidations), UserControllers.createStudent);

export const UserRoutes = router;
