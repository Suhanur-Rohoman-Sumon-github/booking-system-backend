import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { RoomRouter } from '../modules/room/room.route';

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
];

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));

export default router;
