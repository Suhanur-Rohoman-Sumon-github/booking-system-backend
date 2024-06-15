import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes/route';
import notFoundRoute from './app/middleware/notFoundRoute';
import handleGlobalError from './app/middleware/globalErrorHandelar';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// Application routers
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  const i = 44;
  res.send(`server  is ${i}`);
});

// handle 404 route
app.use(notFoundRoute);
app.use(handleGlobalError);

export default app;
