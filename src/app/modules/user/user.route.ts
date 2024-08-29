import express from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { adminValidation } from '../admin/admin.validation';
import Auth from '../../middleware/auth';
import { User_Role } from './user.const';

const router = express.Router();

// Admin creation route
router.post(
  '/create-admin',
  validateRequest(adminValidation.createAdminValidationSchema),
  userControllers.createAdmin,
);
router.get(
  '/get-me',
  Auth( User_Role.user || User_Role.admin),
  userControllers.getMe,
);

export const UserRoute = router;
