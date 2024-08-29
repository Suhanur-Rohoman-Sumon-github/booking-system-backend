import z from 'zod';

const addressSchema = z
  .object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    zipCode: z.string(),
  })
  .optional();

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    id: z.string().optional(),
    email: z.string(),
    addresses: addressSchema,
    address: z.string().optional(),
    phone: z.string(),
    role: z.enum(['user', 'admin']).default('user'),
    password: z.string(),
    profileImage:z.string()
  }),
});

export const userValidation = {
  createUserValidationSchema,
};
