import express from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { adminValidation } from '../admin/admin.validation';


const router = express.Router();


// Admin creation route
router.post(
  '/create-admin',
  validateRequest(adminValidation.createAdminValidationSchema),
  userControllers.createAdmin,
);

export const UserRoute = router;
