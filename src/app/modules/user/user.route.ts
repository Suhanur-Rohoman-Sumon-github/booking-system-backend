import express from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { userValidation } from './user.validation';
import { adminValidation } from '../admin/admin.validation';

const router = express.Router();

// Correct path setup, assuming you want to handle the user creation at '/signup'
router.post(
  '/',
  validateRequest(userValidation.createUserValidationSchema),
  userControllers.createUser,
);

// Admin creation route
router.post(
  '/create-admin',
  validateRequest(adminValidation.createAdminValidationSchema),
  userControllers.createAdmin,
);

export const UserRoute = router;
