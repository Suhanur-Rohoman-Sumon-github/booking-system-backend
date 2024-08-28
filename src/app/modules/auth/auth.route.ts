import validateRequest from "../../middleware/validateRequest";
import { userControllers } from "../user/user.controller";
import { userValidation } from "../user/user.validation";
import { AuthControllers } from "./auth.controler";
import { AuthValidation } from "./auth.validation";
import express from 'express';
const router = express.Router();

router.post(
    '/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser,
  );

  router.post(
    '/signup',
    validateRequest(userValidation.createUserValidationSchema),
    userControllers.createUser,
  );
  router.post(
    '/refresh-token',
    AuthControllers.getRefreshToken,
  );
  

export const authRouter = router