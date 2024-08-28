import express from 'express';
import { slotsControllers } from './slot.controller';
import Auth from '../../middleware/auth';
import { User_Role } from '../user/user.const';

const router = express.Router();

// Correct path setup, assuming you want to handle the user creation at '/signup'
router.post('/', Auth(User_Role.admin), slotsControllers.createSlot);
router.get('/availability',  slotsControllers.getSlots);

export const SlotRoute = router;
