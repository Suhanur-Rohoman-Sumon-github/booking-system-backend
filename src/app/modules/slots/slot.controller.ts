import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { slotServices } from './slot.service';

const createSlot = catchAsync(async (req, res) => {
  const result = await slotServices.createSlotInDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'slot created successfully',
    data: result,
  });
});
const getSlots = catchAsync(async (req, res) => {
  const { date, roomId } = req.query;
  

  const availableSlots = await slotServices.getAvailableSlotsFromDb(
    date as string,
    roomId as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available slots retrieved successfully',
    data: availableSlots,
  });
});

export const slotsControllers = {
  createSlot,
  getSlots,
};
