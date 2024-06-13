import express from 'express';

import validateRequest from '../../middleware/validateRequest';
import { roomControllers } from './room.controller';
import { roomValidations } from './room.validation';


const router = express.Router();

// Correct path setup, assuming you want to handle the user creation at '/signup'
router.post('/', validateRequest(roomValidations.createRoomValidationSchema), roomControllers.createRoom);

router.get('/', roomControllers.getAllRoom);

router.get('/:id', roomControllers.getSingleRoom);

router.delete('/:id', roomControllers.deleteRoom);

export const RoomRouter = router;
