import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { RoomService } from './room.service';

const createRoom = catchAsync(async (req, res) => {
  const result = await RoomService.crateRoomInDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room added successfully',
    data: result,
  });
});

const getSingleRoom = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await RoomService.getSingleRoomFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room retrieved successfully',
    data: result,
  });
});
const getAllRoom = catchAsync(async (req, res) => {
  const results = await RoomService.getAllRoomFromDb(req.query);
  const { result, meta } = results;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rooms retrieved successfully',
    data: result,
    meta: meta,
  });
});
const updateRoom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RoomService.updateRoomFromDb(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room updated successfully',
    data: result,
  });
});
const deleteRoom = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await RoomService.deleteRoomFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room deleted successfully',
    data: result,
  });
});

export const roomControllers = {
  createRoom,
  getSingleRoom,
  getAllRoom,
  updateRoom,
  deleteRoom,
};
