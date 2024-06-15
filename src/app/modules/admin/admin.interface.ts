import mongoose from "mongoose";

export type TAdmin = {
    name: string;
  id: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  role: 'admin' ;
  user : mongoose.Types.ObjectId
}