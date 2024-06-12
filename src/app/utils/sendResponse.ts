import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, responseData: TResponse<T>) => {
  const { statusCode, success, message, data } = responseData;
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};

export default sendResponse;
