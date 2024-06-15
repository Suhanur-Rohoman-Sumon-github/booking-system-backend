import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { RoomRouter } from '../modules/room/room.route';
import { SlotRoute } from '../modules/slots/slot.route';
import { BookingRoute } from '../modules/bookings/booking.route';
import { BookingRoute2 } from '../modules/bookings/bookingRoute2';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoute,
  },
  {
    path: '/room',
    route: RoomRouter,
  },
  {
    path: '/slot',
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
];

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));

export default router;
