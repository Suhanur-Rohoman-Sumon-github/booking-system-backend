import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { paymentService } from './payment.service';
import sendResponse from '../../utils/sendResponse';

const createPaymentIntent = catchAsync(async (req, res) => {
  const { price } = req.body;
  const results = await paymentService.createPaymentIntentInDb(price.price);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'new payment intent added',
    data: results,
  });
});

export const paymentsControllers = {
  createPaymentIntent,
};
