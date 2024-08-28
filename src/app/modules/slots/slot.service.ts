import { TSlot } from './slot.interface';
import { slotModel } from './slot.model';
import { generateSlots } from './slot.utils';

const createSlotInDb = async (payload: TSlot) => {
  const { room, date, startTime, endTime } = payload;
  const slotDuration = 60;

  const generatedSlots = generateSlots(startTime, endTime, slotDuration);

  const slotsToSave = generatedSlots.map((slot) => ({
    room,
    date,
    startTime: slot.startTime,
    endTime: slot.endTime,
  }));

  const result = await slotModel.insertMany(slotsToSave);
  return result;
};
const getAvailableSlotsFromDb = async (date?: string, roomId?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = { isBooked: false };
 
  if (date) {
    query.date = date;
  }

  if (roomId) {
    query.room = roomId;
  }

  const availableSlots = await slotModel.find(query).populate('room').exec();
  return availableSlots;
};
export const slotServices = {
  createSlotInDb,
  getAvailableSlotsFromDb,
};
