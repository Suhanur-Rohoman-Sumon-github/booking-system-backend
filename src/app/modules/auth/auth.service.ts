import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { userModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import config from '../../config';
import { createToken } from './auth.utils';
import jwt, { JwtPayload } from 'jsonwebtoken'
const loginUser = async (payload: TLoginUser) => {
  const isUserExists = await userModel.isUserExistFindByEmail(payload.email);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found');
  }

  const isUserDeleted = await userModel.findOne({ isDeleted: true });

  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'user deleted ');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isPasswordMatched = await userModel.isPasswordMatched(
    payload?.password,
    isUserExists?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'password not matched');
  }

  const jwtPayload = {
    userId: isUserExists.id,
    role: isUserExists.role,
  };

  const accessToken = createToken(jwtPayload,config.JWT_ACCESS_SECRET_KEY as string,config.JWT_ACCESS_TOKEN_EXPIRE_IN as string);
  const refreshToken = createToken(jwtPayload,config.JWT_REFRESH_SECRET_KEY as string,config.JWT_REFRESH_TOKEN_EXPIRE_IN as string);

  return {
    accessToken,
    refreshToken,
    user: isUserExists,
  };
};
const getRefreshToken = async (token:string) => {
  
  if (!token) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'refresh token is required ',
    );
  }
  const decoded = jwt.verify(token, config.JWT_REFRESH_SECRET_KEY as string) as JwtPayload;
  
  
  const {userId,role} = decoded
  const user = await userModel.find({userId});
  
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found');
  }

  const isUserDeleted = await userModel.findOne({ isDeleted: true });

  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'user deleted ');
  }
  const jwtPayload = {
    userId,
    role
  };
  
  
  const accessToken = createToken(jwtPayload,config.JWT_ACCESS_SECRET_KEY as string,config.JWT_ACCESS_TOKEN_EXPIRE_IN as string);
  return {accessToken}
};
export const AuthServices = {
  loginUser,
  getRefreshToken
};
