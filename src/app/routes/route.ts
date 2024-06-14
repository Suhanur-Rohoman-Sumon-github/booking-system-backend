import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { RoomRouter } from '../modules/room/room.route';
import { SlotRoute } from '../modules/slots/slot.route';
import { BookingRoute } from '../modules/bookings/booking.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/signup',
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
];

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));

export default router;
