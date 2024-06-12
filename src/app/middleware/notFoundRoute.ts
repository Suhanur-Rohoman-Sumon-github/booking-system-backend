import { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFoundRoute = (req: Request, res: Response) => {
  const statusCode = 400;
  const massage = 'route not found';
  return res.status(statusCode).json({
    success: false,
    massage,
    error: '',
  });
};

export default notFoundRoute;
