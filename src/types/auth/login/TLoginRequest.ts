import * as z from 'zod';

export const loginDataSchema = z.object({
  username: z.string().min(1, {
    message: 'userNameRequired'
  }),
  password: z
    .string()
    .min(1, {
      message: 'passwordRequired'
    })
    .min(6, 'minPassword')
    .max(25, 'maxPassword'),
  role: z.string().optional()
});

export type TLoginRequest = z.infer<typeof loginDataSchema>;
