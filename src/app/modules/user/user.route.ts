import express from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { userValidation } from './user.validation';

const router = express.Router();

// Correct path setup, assuming you want to handle the user creation at '/signup'
router.post(
  '/',
  validateRequest(userValidation.createUserValidationSchema),
  userControllers.createUser,
);

export const UserRoute = router;
