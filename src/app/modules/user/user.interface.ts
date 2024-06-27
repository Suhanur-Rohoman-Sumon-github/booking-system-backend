/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { User_Role } from './user.const';

export interface TUser {
  name: string;
  id: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: 'admin' | 'user';
  isDeleted: boolean;
}

export interface UserModels extends Model<TUser> {
  isUserExistFindByEmail(email: string): Promise<TUser | null>;
  isPasswordMatched(
    password: string,
    hasPassword: string,
  ): Promise<TUser | null>;
}

export type TUserRol = keyof typeof User_Role;
