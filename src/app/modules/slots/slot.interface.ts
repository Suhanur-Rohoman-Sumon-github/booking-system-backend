import { Schema } from 'mongoose';

export type TSlot = {
  room: Schema.Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};
