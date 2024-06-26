import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/Middlewares/globalErrorHandler';
import notFoundRoute from './app/Middlewares/notFoundRoute';
import router from './app/routes';

const app: Application = express();

//~ parsers
app.use(express.json());
app.use(cors());

//^ application routes
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  res.send('University Server is running');
};

app.get('/', test);

//& error handling middlewares
app.use(globalErrorHandler);

//! not found route
app.use(notFoundRoute);

export default app;
