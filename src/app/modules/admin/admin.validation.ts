import z from 'zod';

const createAdminValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    address: z.string(),
    phone: z.number(),
    password: z.string(),
    id:z.string().optional()
  }),
});

export const adminValidation = {
  createAdminValidationSchema,
};
