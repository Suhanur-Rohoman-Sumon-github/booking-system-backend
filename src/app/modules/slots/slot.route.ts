import express from 'express';
import { slotsControllers } from './slot.controller';


const router = express.Router();

// Correct path setup, assuming you want to handle the user creation at '/signup'
router.post('/', slotsControllers.createSlot);
router.get('/availability', slotsControllers.getSlots);

export const SlotRoute = router;
