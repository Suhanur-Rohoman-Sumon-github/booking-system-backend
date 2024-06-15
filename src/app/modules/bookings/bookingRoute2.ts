import express from 'express';
import { bookingsControllers } from './booking.controllers';
import { User_Role } from '../user/user.const';
import Auth from '../../middleware/auth';

const router = express.Router();

router.get(
  '/',
  Auth(User_Role.admin || User_Role.user),
  bookingsControllers.getMyBookings,
);

export const BookingRoute2 = router;
