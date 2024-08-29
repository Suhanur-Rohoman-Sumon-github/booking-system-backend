import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const { accessToken, user, refreshToken } = await AuthServices.loginUser(
    req.body,
  );
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_Env === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user login successfully',
    token: accessToken,
    data: user,
  });
});
const getRefreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const results = await AuthServices.getRefreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'access token retrieve successfully',
    data: results,
  });
});

export const AuthControllers = {
  loginUser,
  getRefreshToken,
};
