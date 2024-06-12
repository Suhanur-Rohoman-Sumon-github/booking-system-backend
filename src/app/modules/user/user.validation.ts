import z from 'zod'
const createUserValidationSchema = (z.object({
    body:z.object({
        name:z.string(),
        id:z.string().optional(),
        email:z.string(),
        address:z.string(),
        phone:z.number(),
        role:z.enum(['user', 'admin']).default('user'),
        password:z.string()

    })
}))

export const userValidation ={
    createUserValidationSchema
}