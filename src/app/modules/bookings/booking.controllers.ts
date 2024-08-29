import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { bookingService } from './booking.service';

const createBookings = catchAsync(async (req, res) => {
  const result = await bookingService.crateBookingInDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});
const getAllBookings = catchAsync(async (req, res) => {
  const result = await bookingService.getAllBookingFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});
const getMyBookings = catchAsync(async (req, res) => {
  const { userId } = req.user;
  
  const result = await bookingService.getMyBookings(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking ret successfully',
    data: result,
  });
});
const updateBooking = catchAsync(async (req, res) => {
  const result = await bookingService.updateBookingInDb(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});
const deleteBooking = catchAsync(async (req, res) => {
  const result = await bookingService.deleteBookingInDb(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully',
    data: result,
  });
});

export const bookingsControllers = {
  createBookings,
  getAllBookings,
  getMyBookings,
  updateBooking,
  deleteBooking,
};
