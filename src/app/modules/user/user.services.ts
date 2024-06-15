import mongoose from 'mongoose';
import { TUser } from './user.interface';
import { userModel } from './user.model';
import { generateAdminId, generateUserId } from './user.utils';
import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { adminModel } from '../admin/admin.model';
import { TAdmin } from '../admin/admin.interface';

const createStudentIntoDB = async (payload: TUser) => {
  const newUser = payload;
  newUser.id = await generateUserId();
  const result = userModel.create(newUser);
  return result;
};
const createAdminIntoDB = async (
  payload: TAdmin,
) => {
  // create a user object
  const userData: Partial<TAdmin> = payload
  

  //set student role
  userData.role = 'admin'
  
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateAdminId()
   
    // create a user (transaction-1)
    const newUser = await userModel.create([userData], { session })
   
    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a admin (transaction-2)
    const newAdmin = await adminModel.create([payload], { session })

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }

    await session.commitTransaction()
    await session.endSession()

    return newAdmin
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

export const UserServices = {
  createStudentIntoDB,
  createAdminIntoDB
};
