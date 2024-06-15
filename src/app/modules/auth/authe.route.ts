import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controler';

const router = express.Router();

// Correct path setup, assuming you want to handle the user creation at '/signup'
router.post(
  '/',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoute = router;
