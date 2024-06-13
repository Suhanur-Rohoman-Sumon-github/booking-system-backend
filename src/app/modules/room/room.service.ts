import { TRoom } from "./room.interface";
import { roomModel } from "./room.model";


const crateRoomInDb = async (payload: TRoom) => {
 
  const result = await roomModel.create(payload);
  return result;
};
const getSingleRoomFromDb = async (id:string) => {
 
  const result = await roomModel.findById(id);
  return result;
};
const getAllRoomFromDb = async () => {
 
  const result = await roomModel.find();
  return result;
};
const deleteRoomFromDb = async (id:string) => {
 
    const result = await roomModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  return result;
};

export const RoomService = {
  crateRoomInDb,
  getSingleRoomFromDb,
  getAllRoomFromDb,
  deleteRoomFromDb,
  
};
