import express from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { userValidation } from './user.validation';
import { adminValidation } from '../admin/admin.validation';
import { AuthValidation } from '../auth/auth.validation';
import { AuthControllers } from '../auth/auth.controler';

const router = express.Router();

// Correct path setup, assuming you want to handle the user creation at '/signup'
router.post(
  '/signup',
  validateRequest(userValidation.createUserValidationSchema),
  userControllers.createUser,
);

// handle login user
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

// Admin creation route
router.post(
  '/create-admin',
  validateRequest(adminValidation.createAdminValidationSchema),
  userControllers.createAdmin,
);

export const UserRoute = router;
