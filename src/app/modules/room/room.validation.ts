import z from 'zod';
const createRoomValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    roomNo: z.number(),
    floorNo: z.number(),
    capacity: z.number(),
    pricePerSlot: z.number(),
    amenities: z.array(z.string()),
  }),
});

export const roomValidations = {
  createRoomValidationSchema,
};
