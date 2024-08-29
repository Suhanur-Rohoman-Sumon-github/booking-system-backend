/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { User_Role } from './user.const';

type TAddress = {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
};

export type TUser = {
  name: string;
  id?: string;
  email: string;
  password: string;
  phone: string;
  addresses: TAddress;
  address: TAddress;
  role: 'admin' | 'user';
  isDeleted: boolean;
  profileImage:string
};

export interface UserModels extends Model<TUser> {
  isUserExistFindByEmail(email: string): Promise<TUser | null>;
  isPasswordMatched(
    password: string,
    hasPassword: string,
  ): Promise<TUser | null>;
}

export type TUserRol = keyof typeof User_Role;
