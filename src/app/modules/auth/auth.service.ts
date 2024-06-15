import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { userModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
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

  console.log(isPasswordMatched);
};

export const AuthServices = {
  loginUser,
};
