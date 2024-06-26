import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';
import httpStatus from 'http-status';
import AppError from '../../error/AppError';

const bookingSchema = new Schema<TBooking>(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: 'room',
      required: true,
    },
    slots: [
      {
        type: Schema.Types.ObjectId,
        ref: 'slot',
        required: true,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    isConfirmed: {
      type: String,
      enum: ['confirmed', 'unconfirmed', 'canceled'],
      default: 'unconfirmed',
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

bookingSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

bookingSchema.post<TBooking>('find', function (docs, next) {
  if (!docs) {
    const error = new AppError(httpStatus.NOT_FOUND, 'No Data Found');
    next(error);
  }
  next();
});

export const bookingModel = model<TBooking>('Booking', bookingSchema);
