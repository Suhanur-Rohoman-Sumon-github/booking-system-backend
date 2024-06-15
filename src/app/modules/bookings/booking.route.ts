import express from 'express';
import { bookingsControllers } from './booking.controllers';
import { User_Role } from '../user/user.const';
import Auth from '../../middleware/auth';

const router = express.Router();


router.post('/',Auth(User_Role.admin || User_Role.user ), bookingsControllers.createBookings);
router.get('/',Auth(User_Role.admin ), bookingsControllers.getAllBookings);
router.patch('/:id',Auth(User_Role.admin ), bookingsControllers.updateBooking);


export const BookingRoute = router;
