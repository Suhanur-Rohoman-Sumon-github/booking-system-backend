import express from 'express';

import validateRequest from '../../middleware/validateRequest';
import { roomControllers } from './room.controller';
import { roomValidations } from './room.validation';
import Auth from '../../middleware/auth';
import { User_Role } from '../user/user.const';

const router = express.Router();

// Correct path setup, assuming you want to handle the user creation at '/signup'
router.post(
  '/',
  Auth(User_Role.admin),
  validateRequest(roomValidations.createRoomValidationSchema),
  roomControllers.createRoom,
);

router.get('/', Auth(User_Role.admin), roomControllers.getAllRoom);

router.get('/:id', Auth(User_Role.admin), roomControllers.getSingleRoom);

router.patch('/:id',Auth(User_Role.admin), roomControllers.updateRoom);

router.delete('/:id', Auth(User_Role.admin), roomControllers.deleteRoom);

export const RoomRouter = router;
