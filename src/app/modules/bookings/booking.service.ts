import mongoose from 'mongoose';
import { roomModel } from '../room/room.model';
import { slotModel } from '../slots/slot.model';
import { TBooking } from './booking.interface';
import { bookingModel } from './booking.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { userModel } from '../user/user.model';


const crateBookingInDb = async (payload: Partial<TBooking>) => {
  const { date, slots, room, user } = payload;

  const session = await mongoose.startSession();
  session.startTransaction();
  // Validate and parse input data
  try {
    const roomDoc = await roomModel.findById(room).session(session);
    if (!roomDoc) {
      throw new Error('Room not found');
    }

    // Calculate total amount
    const totalAmount = roomDoc.pricePerSlot * (slots as []).length;

    await slotModel.updateMany(
      { _id: { $in: slots } },
      { $set: { isBooked: true } },
      { session },
    );

    const createdBooking = await bookingModel.create(
      [
        {
          date,
          slots,
          room,
          user,
          totalAmount,
        },
      ],
      { session },
    );

    // Populate the created booking with references
    const populatedResult = await bookingModel
      .findById(createdBooking[0]._id)
      .populate('slots')
      .populate('room')
      .populate('user')
      .session(session)
      .exec();

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return populatedResult;
  } catch (error) {
    // Abort the transaction
    await session.abortTransaction();
    session.endSession();

    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'error to create');
  }
};
const getAllBookingFromDb = async () => {
  const result = await bookingModel.find();
  return result;
};
const getMyBookings = async (customUserId:string) => {
  const user = await userModel.findOne({ id:customUserId }).exec();

  if(!user){
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR,"no user found")
  }

  const bookings = await bookingModel
    .find({ user: user._id }) 
    .populate('user')
    .exec();

 return bookings
};
const updateBookingInDb = async (id:string,payload:Partial<TBooking>) => {
  console.log(id);
  console.log(payload);
  const updatedBooking = await bookingModel.findByIdAndUpdate(
    id,
    { $set: payload }, 
    { new: true } 
  )
return updatedBooking
};
export const bookingService = {
  crateBookingInDb,
  getAllBookingFromDb,
  getMyBookings,
  updateBookingInDb
};
