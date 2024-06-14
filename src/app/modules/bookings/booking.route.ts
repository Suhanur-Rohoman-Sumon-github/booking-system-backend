import express from 'express';
import { bookingsControllers } from './booking.controllers';

const router = express.Router();

// Correct path setup, assuming you want to handle the user creation at '/signup'
router.post('/', bookingsControllers.createBookings);

export const BookingRoute = router;
