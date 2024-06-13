import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.services';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await UserServices.createStudentIntoDB(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user is created successfully',
    data: result,
  });
});


export const userControllers = {
  createUser,
  
};
