/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
      trim:true
    },
    id: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique:true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
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
  },
  {
    timestamps: true,
  },
);

// add hashing password
userSchema.pre('save', async function (next) {
  // hashing password and save into db
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

//   validate the user is already exists
userSchema.pre('save', async function (next) {
  const user = this;
  const existingUser = await userModel.findOne({ email: user.email });
  if (existingUser) {
    const error = new Error('Email already exists');
    return next(error);
  }

  next();
});

//   removing the password after successfully create a user
userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.id;
    return ret;
  },
});

export const userModel = model<TUser>('user', userSchema);
