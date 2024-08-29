import { Router } from 'express';
import { RoomRouter } from '../modules/room/room.route';
import { SlotRoute } from '../modules/slots/slot.route';
import { BookingRoute } from '../modules/bookings/booking.route';
import { BookingRoute2 } from '../modules/bookings/bookingRoute2';
import { authRouter } from '../modules/auth/auth.route';
import { PaymentsRoute } from '../modules/payment/payment.route';
import { UserRoute } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/rooms',
    route: RoomRouter,
  },
  {
    path: '/slots',
    route: SlotRoute,
  },
  {
    path: '/bookings',
    route: BookingRoute,
  },
  {
    path: '/my-bookings',
    route: BookingRoute2,
  },
  {
    path: '/user',
    route: UserRoute,
  },
  {
    path: '/create-payment-intent',
    route: PaymentsRoute,
  },
];

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));

export default router;
