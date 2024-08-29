/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import { TUser, UserModels } from './user.interface';

const addressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  country: String,
  zipCode: String,
});
const userSchema = new Schema<TUser, UserModels>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    id: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    addresses: addressSchema,
    address: { type: String },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Virtual for address as a single string
userSchema.virtual('addressString').get(function () {
  const address = this.address as any; 
  return `${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.zip}`;
});

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// Middleware to check if the email already exists
userSchema.pre('save', async function (next) {
  const user = this;
  const existingUser = await userModel.findOne({ email: user.email });
  if (existingUser) {
    return next(new Error('Email already exists'));
  }
  next();
});

// Transform output to remove password
userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

userSchema.statics.isUserExistFindByEmail = async function (email: string) {
  return await this.findOne({ email });
};
userSchema.statics.isPasswordMatched = async function (
  myPlaintextPassword,
  hashPassword,
) {
  return await bcrypt.compare(myPlaintextPassword, hashPassword);
};

export const userModel = model<TUser, UserModels>('user', userSchema);
