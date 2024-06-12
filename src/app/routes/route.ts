import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/signup',
    route: UserRoute,
  },
];

moduleRoutes.forEach((routes) => router.use(routes.path, routes.route));

export default router;
