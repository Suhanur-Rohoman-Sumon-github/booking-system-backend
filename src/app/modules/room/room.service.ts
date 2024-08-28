import mongoose from 'mongoose';
import { TRoom } from './room.interface';
import { roomModel } from './room.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../../builder/queryBuilder';
import { RoomSearchableFields } from './room.const';

const crateRoomInDb = async (payload: TRoom) => {
  const result = await roomModel.create(payload);
  return result;
};
const getSingleRoomFromDb = async (id: string) => {
  const result = await roomModel.findById(id);
  return result;
};
const getAllRoomFromDb = async (query: Record<string, unknown>) => {
  const RoomQuery = new QueryBuilder(roomModel.find(), query)
    .search(RoomSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();
    const result = await RoomQuery.modelQuery;
    const meta = await RoomQuery.countTotal()
  return {result,meta};
};
const updateRoomFromDb = async (id: string, payload: Partial<TRoom>) => {
  const { amenities, ...otherRemainingData } = payload;

  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    const updateRemainingData = await roomModel.findByIdAndUpdate(
      id,
      otherRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updateRemainingData) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'not able to update remaining data',
      );
    }

    if (amenities) {
      await roomModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { amenities: { $each: amenities } },
        },
        { new: true, runValidators: true, session },
      );
    }

    const result = await roomModel.findById(id).session(session);
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'failed to update data ');
  }
};
const deleteRoomFromDb = async (id: string) => {
  const result = await roomModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const RoomService = {
  crateRoomInDb,
  getSingleRoomFromDb,
  getAllRoomFromDb,
  updateRoomFromDb,
  deleteRoomFromDb,
};
