import { TUser } from './user.interface';
import { userModel } from './user.model';
import { generateUserId } from './user.utils';

const createStudentIntoDB = async (payload: TUser) => {
  const newUser = payload;
  newUser.id = await generateUserId();
  const result = userModel.create(newUser);
  return result;
};

export const UserServices = {
  createStudentIntoDB,
};
