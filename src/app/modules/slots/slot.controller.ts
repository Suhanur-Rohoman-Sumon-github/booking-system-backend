import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { slotServices } from "./slot.service";

const createSlot = catchAsync(async (req, res) => {
    const result = await slotServices.createSlotInDb(req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'slot created successfully',
      data: result,
    });
  });

  export const slotsControllers = {
    createSlot
  }